import { readFile, readdir } from "fs/promises";
import path from "path";
import type { NextApiRequest, NextApiResponse } from "next";

interface LogoFile {
  name: string;
  src: string;
}

function decodeHtmlEntities(value: string) {
  return value
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");
}

function formatLogoName(fileName: string, svgMarkup?: string) {
  const titleMatch = svgMarkup?.match(/<title>([^<]+)<\/title>/i);

  if (titleMatch?.[1]) {
    return decodeHtmlEntities(titleMatch[1].trim());
  }

  const fallbackName = fileName
    .replace(/\.svg$/i, "")
    .replace(/^\d+[-_ ]*/, "")
    .replace(/dot/g, ".")
    .replace(/[-_]+/g, " ")
    .trim();

  return fallbackName.replace(/\b([a-z])/g, (match) => match.toUpperCase());
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ logos: LogoFile[] } | { error: string }>
) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const logosDirectory = path.join(process.cwd(), "public", "carousel-logos");

  try {
    const entries = await readdir(logosDirectory, { withFileTypes: true });

    const fileNames = entries
      .filter((entry) => entry.isFile() && entry.name.toLowerCase().endsWith(".svg"))
      .map((entry) => entry.name)
      .sort((left, right) => left.localeCompare(right));

    const logos = await Promise.all(
      fileNames.map(async (fileName) => {
        const svgMarkup = await readFile(path.join(logosDirectory, fileName), "utf8");

        return {
          name: formatLogoName(fileName, svgMarkup),
          src: `/carousel-logos/${encodeURIComponent(fileName)}`
        };
      })
    );

    return res.status(200).json({ logos });
  } catch (error) {
    const errorCode = (error as NodeJS.ErrnoException).code;

    if (errorCode === "ENOENT") {
      return res.status(200).json({ logos: [] });
    }

    console.error("Carousel logo handler error:", error);
    return res.status(500).json({ error: "Failed to load carousel logos" });
  }
}
