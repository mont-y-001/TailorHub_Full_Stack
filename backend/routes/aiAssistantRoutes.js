import { Router } from "express";
import OpenAI from "openai";

const router = Router();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const SYSTEM_PROMPT = `You are a professional tailoring and fashion assistant for TailorHub. You help users with:

1. Fabric recommendations (e.g., "Which fabric is best for a wedding suit?")
2. Fabric measurements (e.g., "How much fabric is needed for a kurta?")
3. Service selection (e.g., "Which service should I choose for blazer alteration?")
4. General tailoring advice, garment care, fitting tips, etc.

Keep your answers helpful, concise, and tailored to the user's needs. If you don't know something, be honest.`;

router.post("/chat", async (req, res) => {
  try {
    const { message } = req.body;

    if (!message || typeof message !== "string" || !message.trim()) {
      return res.status(400).json({ error: "Message is required" });
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: message },
      ],
      max_tokens: 500,
      temperature: 0.7,
    });

    const reply = completion.choices[0]?.message?.content || "Sorry, I couldn't generate a response.";

    res.json({ reply });
  } catch (error) {
    console.error("AI Assistant Error:", error);

    // Handle specific OpenAI errors gracefully
    if (error.status === 401) {
      return res.status(500).json({ error: "AI service is not configured. Please add an OPENAI_API_KEY to your .env file." });
    }
    if (error.status === 429) {
      return res.status(429).json({ error: "Too many requests. Please try again later." });
    }

    res.status(500).json({ error: "Something went wrong. Please try again." });
  }
});

export default router;