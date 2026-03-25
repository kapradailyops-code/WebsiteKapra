import { readdir } from "fs/promises";
import path from "path";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ images: string[] } | { error: string }>
) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const imagesDirectory = path.join(process.cwd(), "public", "reveal-images");

  try {
    const entries = await readdir(imagesDirectory, { withFileTypes: true });

    // Filter for common web image formats
    const fileNames = entries
      .filter((entry) => {
        if (!entry.isFile()) return false;
        const ext = entry.name.toLowerCase();
        return ext.endsWith(".jpg") || ext.endsWith(".jpeg") || ext.endsWith(".png") || ext.endsWith(".webp") || ext.endsWith(".gif") || ext.endsWith(".svg");
      })
      .map((entry) => entry.name)
      .sort((a, b) => a.localeCompare(b));

    const images = fileNames.map((fileName) => `/reveal-images/${fileName}`);

    return res.status(200).json({ images });
  } catch (error) {
    const errorCode = (error as NodeJS.ErrnoException).code;

    // If folder doesn't exist yet, return empty array so frontend falls back safely
    if (errorCode === "ENOENT") {
      return res.status(200).json({ images: [] });
    }

    console.error("Reveal images handler error:", error);
    return res.status(500).json({ error: "Failed to load reveal images" });
  }
}
