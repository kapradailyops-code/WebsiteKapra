import type { NextApiRequest, NextApiResponse } from "next";
import type { InquiryPayload } from "../../lib/inquiry";

type ContactApiResponse = {
  ok?: true;
  error?: string;
};

type HubSpotField = {
  name: string;
  value: string;
};

type HubSpotErrorResponse = {
  message?: string;
  errors?: Array<{ message?: string }>;
};

type HubSpotSubmitResult =
  | { ok: true }
  | {
      ok: false;
      status: number;
      message: string;
    };

const HUBSPOT_PUBLIC_SUBMIT_URL =
  "https://api.hsforms.com/submissions/v3/integration/submit";
const HUBSPOT_SECURE_SUBMIT_URL =
  "https://api.hsforms.com/submissions/v3/integration/secure/submit";

function readEnv(name: string, fallback?: string) {
  const value = process.env[name]?.trim();
  return value ? value : fallback;
}

function readRequiredEnv(name: string) {
  return readEnv(name) ?? null;
}

function asString(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function splitFullName(fullName: string) {
  const parts = fullName.split(/\s+/).filter(Boolean);

  if (parts.length === 0) {
    return { firstName: "", lastName: "" };
  }

  if (parts.length === 1) {
    return { firstName: parts[0], lastName: "" };
  }

  return {
    firstName: parts[0],
    lastName: parts.slice(1).join(" "),
  };
}

function parseCookieValue(cookieHeader: string | undefined, name: string) {
  if (!cookieHeader) {
    return undefined;
  }

  const cookies = cookieHeader.split(";");

  for (const cookie of cookies) {
    const [rawKey, ...rawValueParts] = cookie.trim().split("=");
    if (rawKey !== name) {
      continue;
    }

    return decodeURIComponent(rawValueParts.join("="));
  }

  return undefined;
}

function getClientIpAddress(req: NextApiRequest) {
  const forwardedFor = req.headers["x-forwarded-for"];

  if (typeof forwardedFor === "string") {
    return forwardedFor.split(",")[0]?.trim() || undefined;
  }

  if (Array.isArray(forwardedFor)) {
    return forwardedFor[0]?.split(",")[0]?.trim() || undefined;
  }

  return req.socket.remoteAddress;
}

function pushField(fields: HubSpotField[], name: string | undefined, value: string) {
  if (!name || !value) {
    return;
  }

  fields.push({ name, value });
}

function buildMessageValue(scope: string, summary: string) {
  const sections: string[] = [];

  if (scope) {
    sections.push(`Project scope: ${scope}`);
  }

  if (summary) {
    sections.push(summary);
  }

  return sections.join("\n\n");
}

function buildHubSpotFields(inquiry: InquiryPayload) {
  const fields: HubSpotField[] = [];
  const fullNameField = readEnv("HUBSPOT_FIELD_NAME");

  if (fullNameField) {
    pushField(fields, fullNameField, inquiry.name);
  } else {
    const { firstName, lastName } = splitFullName(inquiry.name);
    pushField(fields, readEnv("HUBSPOT_FIELD_FIRSTNAME", "firstname"), firstName);
    pushField(fields, readEnv("HUBSPOT_FIELD_LASTNAME", "lastname"), lastName);
  }

  pushField(fields, readEnv("HUBSPOT_FIELD_EMAIL", "email"), inquiry.email);
  pushField(fields, readEnv("HUBSPOT_FIELD_COMPANY", "company"), inquiry.company);

  const scopeField = readEnv("HUBSPOT_FIELD_SCOPE");
  pushField(fields, scopeField, inquiry.scope);

  const messageValue = buildMessageValue(scopeField ? "" : inquiry.scope, inquiry.summary);
  pushField(fields, readEnv("HUBSPOT_FIELD_MESSAGE", "message"), messageValue);

  return fields;
}

function getHubSpotErrorMessage(data: HubSpotErrorResponse | null) {
  if (!data) {
    return null;
  }

  const detailMessages = data.errors
    ?.map((error) => error.message?.trim())
    .filter((message): message is string => Boolean(message));

  if (detailMessages && detailMessages.length > 0) {
    return detailMessages.join(" ");
  }

  if (typeof data.message === "string" && data.message.trim()) {
    return data.message.trim();
  }

  return null;
}

function shouldRetryWithoutAuth(result: HubSpotSubmitResult) {
  if (result.ok) {
    return false;
  }

  if (result.status !== 401 && result.status !== 403) {
    return false;
  }

  const normalizedMessage = result.message.toLowerCase();
  return (
    normalizedMessage.includes("authentication credential") ||
    normalizedMessage.includes("proper permissions") ||
    normalizedMessage.includes("scope")
  );
}

async function submitToHubSpot(
  portalId: string,
  formId: string,
  payload: Record<string, unknown>,
  accessToken?: string | null
): Promise<HubSpotSubmitResult> {
  const url = accessToken
    ? `${HUBSPOT_SECURE_SUBMIT_URL}/${portalId}/${formId}`
    : `${HUBSPOT_PUBLIC_SUBMIT_URL}/${portalId}/${formId}`;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
    },
    body: JSON.stringify(payload),
  });

  if (response.ok) {
    return { ok: true };
  }

  let errorData: HubSpotErrorResponse | null = null;

  try {
    errorData = (await response.json()) as HubSpotErrorResponse;
  } catch {
    errorData = null;
  }

  return {
    ok: false,
    status: response.status,
    message:
      getHubSpotErrorMessage(errorData) ??
      "HubSpot rejected the inquiry. Check your form ID and field mappings.",
  };
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ContactApiResponse>
) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed." });
  }

  const accessToken = readEnv("HUBSPOT_ACCESS_TOKEN");
  const portalId = readRequiredEnv("HUBSPOT_PORTAL_ID");
  const formId = readRequiredEnv("HUBSPOT_FORM_ID");

  if (!portalId || !formId) {
    return res.status(500).json({
      error: "HubSpot is not configured yet. Add HUBSPOT_PORTAL_ID and HUBSPOT_FORM_ID.",
    });
  }

  const requestBody =
    req.body && typeof req.body === "object" ? (req.body as Partial<InquiryPayload>) : {};

  const inquiry: InquiryPayload = {
    name: asString(requestBody.name),
    email: asString(requestBody.email),
    company: asString(requestBody.company),
    scope: asString(requestBody.scope),
    summary: asString(requestBody.summary),
    pageUri: asString(requestBody.pageUri) || undefined,
    pageName: asString(requestBody.pageName) || undefined,
  };

  if (!inquiry.name || !inquiry.email) {
    return res.status(400).json({ error: "Name and email are required." });
  }

  const fields = buildHubSpotFields(inquiry);
  if (fields.length === 0) {
    return res.status(500).json({
      error:
        "HubSpot field mapping produced no fields. Check your HUBSPOT_FIELD_* environment variables.",
    });
  }

  const context: Record<string, string> = {};
  const hubspotCookie = parseCookieValue(req.headers.cookie, "hubspotutk");
  const clientIpAddress = getClientIpAddress(req);
  const pageUri = inquiry.pageUri ?? req.headers.referer;

  if (hubspotCookie) {
    context.hutk = hubspotCookie;
  }

  if (clientIpAddress) {
    context.ipAddress = clientIpAddress;
  }

  if (inquiry.pageName) {
    context.pageName = inquiry.pageName;
  }

  if (pageUri) {
    context.pageUri = pageUri;
  }

  const payload = {
    fields,
    submittedAt: Date.now().toString(),
    ...(Object.keys(context).length > 0 ? { context } : {}),
  };

  let hubspotResult = await submitToHubSpot(portalId, formId, payload, accessToken);

  if (shouldRetryWithoutAuth(hubspotResult)) {
    hubspotResult = await submitToHubSpot(portalId, formId, payload);
  }

  if (!hubspotResult.ok) {
    return res.status(hubspotResult.status >= 500 ? 502 : 400).json({
      error: hubspotResult.message,
    });
  }

  return res.status(200).json({ ok: true });
}
