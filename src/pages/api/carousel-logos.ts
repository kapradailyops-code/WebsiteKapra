import { readdir } from "fs/promises";
import path from "path";
import type { NextApiRequest, NextApiResponse } from "next";

interface LogoFile {
  name: string;
  src: string;
}

function formatLogoName(fileName: string) {
  return fileName
    .replace(/\.svg$/i, "")
    .replace(/^\d+[-_ ]*/, "")
    .replace(/[-_]+/g, " ")
    .trim();
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

    const logos = entries
      .filter((entry) => entry.isFile() && entry.name.toLowerCase().endsWith(".svg"))
      .map((entry) => entry.name)
      .sort((left, right) => left.localeCompare(right))
      .map((fileName) => ({
        name: formatLogoName(fileName),
        src: `/carousel-logos/${encodeURIComponent(fileName)}`
      }));

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
