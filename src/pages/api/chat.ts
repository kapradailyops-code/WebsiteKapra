import type { NextApiRequest, NextApiResponse } from "next";

const SYSTEM_PROMPT = `You are Akira, the intelligent assistant for Kapra Web AI — a premium digital experience studio specializing in web development, mobile apps, AI solutions, UI/UX design, e-commerce, and tech strategy.

Your role:
- Answer questions about Kapra's services, process, and capabilities
- Help visitors understand what Kapra can build for them
- Guide them toward booking a discovery call or submitting a project inquiry
- Be concise, confident, and on-brand — premium, direct, no fluff

Services Kapra offers:
1. Web Development — Next.js, React, CMS, SEO, animations
2. Mobile Applications — React Native, Expo, iOS & Android
3. AI Solutions — LLM integration, RAG pipelines, custom workflows
4. UI/UX Design — brand identity, Figma systems, interaction design
5. E-Commerce — Shopify, headless commerce, conversion optimization
6. Tech Strategy — architecture, stack selection, team structuring

Process: Discovery Call → Technical Brief → Design Sprint → Build & Ship → Handoff & Scale
Typical projects launch in 4–8 weeks.
Always suggest visiting /contact to start a project or /services to learn more.
Keep responses short — 2–4 sentences max unless more detail is requested. Speak as "we" for Kapra.`;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).end();

  const { messages } = req.body as { messages: { role: string; text: string }[] };
  if (!messages?.length) return res.status(400).json({ error: "No messages provided" });

  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) return res.status(500).json({ error: "API key not configured" });

  // Skip the seeded UI greeting — not a real conversation turn
  const conversationMessages = messages.filter((m, i) => !(i === 0 && m.role === "assistant"));

  const groqMessages = [
    { role: "system", content: SYSTEM_PROMPT },
    ...conversationMessages.map((m) => ({
      role: m.role === "assistant" ? "assistant" : "user",
      content: m.text,
    })),
  ];

  try {
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: groqMessages,
        max_tokens: 512,
        temperature: 0.7,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("Groq error:", JSON.stringify(data));
      return res.status(response.status).json({ error: data?.error?.message ?? "Groq API error" });
    }

    const reply = data.choices?.[0]?.message?.content ?? "I couldn't generate a response right now.";
    return res.status(200).json({ reply });
  } catch (e) {
    console.error("Chat handler error:", e);
    return res.status(500).json({ error: "Failed to reach Groq API" });
  }
}
