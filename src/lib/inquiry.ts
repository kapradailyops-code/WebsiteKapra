export const inquiryScopeOptions = [
  "Launch site",
  "Marketing website",
  "Mobile app",
  "AI workflow",
  "Mixed project",
] as const;

export type InquiryPayload = {
  name: string;
  email: string;
  company: string;
  scope: string;
  summary: string;
  pageUri?: string;
  pageName?: string;
};

type InquiryApiError = {
  error?: string;
};

function getFormValue(formData: FormData, key: keyof Omit<InquiryPayload, "pageUri" | "pageName">) {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

export function buildInquiryPayload(
  form: HTMLFormElement,
  selectedScope: string
): InquiryPayload {
  const formData = new FormData(form);

  return {
    name: getFormValue(formData, "name"),
    email: getFormValue(formData, "email"),
    company: getFormValue(formData, "company"),
    scope: getFormValue(formData, "scope") || selectedScope,
    summary: getFormValue(formData, "summary"),
    pageUri: typeof window === "undefined" ? undefined : window.location.href,
    pageName: typeof document === "undefined" ? undefined : document.title,
  };
}

export async function submitInquiry(payload: InquiryPayload) {
  const response = await fetch("/api/contact", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (response.ok) {
    return;
  }

  let message = "Unable to send your inquiry right now. Please try again shortly.";

  try {
    const data = (await response.json()) as InquiryApiError;
    if (typeof data.error === "string" && data.error.trim()) {
      message = data.error;
    }
  } catch {
    // Preserve the fallback message when the response body is empty or invalid JSON.
  }

  throw new Error(message);
}
