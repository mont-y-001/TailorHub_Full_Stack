import { Router } from "express";
import { GoogleGenerativeAI } from "@google/generative-ai";

const router = Router();

function getGenAI() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return null;
  return new GoogleGenerativeAI(apiKey);
}

console.log("Gemini key configured:", Boolean(process.env.GEMINI_API_KEY));

const SYSTEM_PROMPT = `You are a professional tailoring and fashion assistant for TailorHub. You help users with:

1. Fabric recommendations (e.g., "Which fabric is best for a wedding suit?")
2. Fabric measurements (e.g., "How much fabric is needed for a kurta?")
3. Service selection (e.g., "Which service should I choose for blazer alteration?")
4. General tailoring advice, garment care, fitting tips, etc.

Keep your answers helpful, concise, and tailored to the user's needs. If you don't know something, be honest.`;

/* ---------- FALLBACK ANSWERS (when Gemini API is unavailable) ---------- */
const FALLBACKS = [
  {
    keywords: ["wedding suit", "groom", "tuxedo", "formal suit"],
    answer:
      "For a wedding suit, **Wool** (especially Super 120s–150s Merino) is the gold standard — it drapes beautifully, breathes well, and holds its shape. For summer weddings, **Wool-Mohair blend** adds sheen and airflow. For budget-friendly options, **Wool-Polyester blends** work well. \n\n**Pro tip:** Always go for a 3-piece suit (jacket + waistcoat + trousers) for weddings — it adds versatility for the reception!",
  },
  {
    keywords: ["kurta", "kurti", "indian", "sherwani"],
    answer:
      "For a **kurta**, here's the fabric requirement:\n\n• **Cotton Kurta** (regular fit, knee-length): 2.0–2.5 metres (chest 38–42″)\n• **Linen Kurta**: 2.2–2.7 metres (linen shrinks, so add 10%)\n• **Silk Sherwani**: 3.0–3.5 metres\n• **Cotton / Linen fabric**: Lightweight, perfect for daily wear\n• **Silk / Brocade**: Best for festive occasions\n\n**Key measurement:** Length = (height × 0.45) + 5 cm extra for hem.",
  },
  {
    keywords: ["blazer", "alteration", "jacket"],
    answer:
      "For **blazer alterations**, here's which service to choose:\n\n• **Sleeve shortening** – Choose the 'Jacket Alteration' service if sleeves are too long.\n• **Waist suppression (taking in sides)** – Perfect if the blazer is too boxy.\n• **Shoulder adjustment** – This is complex; only TailorHub's 'Premium Alteration' handles this.\n• **Length shortening** – Standard 'Jacket Alteration' works fine.\n\n✅ **Recommendation:** Go with **'Premium Alteration'** for blazers — it covers all adjustments and ensures the structure is maintained.",
  },
  {
    keywords: ["cotton", "linen", "difference", "compare"],
    answer:
      "**Cotton vs Linen — Key Differences:**\n\n| Feature | Cotton | Linen |\n|---------|--------|-------|\n| Breathability | Good | Excellent (3x more) |\n| Wrinkle resistance | Moderate | Wrinkles easily (natural look) |\n| Durability | Good | Very durable (gets softer with washes) |\n| Cost | Affordable | Moderate to expensive |\n| Best for | Daily wear, shirts | Summer suits, kurtas |\n\n**Verdict:** Choose **Cotton** for ease of care and lower cost. Choose **Linen** for hot climates and a premium, relaxed look.",
  },
  {
    keywords: ["measurement", "measure", "body measurement", "size"],
    answer:
      "**How to take body measurements at home:**\n\n1. **Chest** – Measure around the fullest part, under armpits, tape parallel to floor\n2. **Waist** – Measure at the narrowest point (usually 1″ above belly button)\n3. **Hips** – Measure at the widest part (about 8″ below waist)\n4. **Shoulder width** – From edge of left shoulder to right shoulder\n5. **Sleeve length** – From shoulder edge to wrist bone\n6. **Inseam** – From crotch to ankle (for trousers)\n\n**Tips:** Use a soft measuring tape. Wear fitted clothes. Ask a friend for accuracy. Don't pull the tape too tight!",
  },
  {
    keywords: ["silk", "satin", "fabric"],
    answer:
      "**Silk vs Satin — Which to choose?**\n\n• **Silk** is a natural fibre from silkworms — luxurious, breathable, hypoallergenic. Best for wedding suits, sarees, and premium kurtas.\n• **Satin** is a weave (can be polyester, silk, or nylon) — shiny surface, less breathable, more affordable.\n\n**Recommendation:**\n- **Silk** for weddings and special occasions where comfort matters.\n- **Satin** for costume wear, lining, or budget-friendly formal outfits.\n\n💰 Silk costs 3–5× more than satin.",
  },
  {
    keywords: ["price", "cost", "budget", "cheap", "expensive"],
    answer:
      "**Tailoring Budget Guide at TailorHub:**\n\n• **Basic Alterations** (hemming, sleeve shortening) – Starts at ₹199\n• **Custom Stitching** (shirt, kurta) – Starts at ₹499\n• **Premium Stitching** (suit, sherwani, blazer) – Starts at ₹1,499\n• **Wedding Suit (3-piece)** – Starts at ₹2,999\n\n**Pro tip:** Book a consultation first! We'll measure you and give an exact quote — no hidden charges.",
  },
];

function findFallback(message) {
  const lower = message.toLowerCase();
  for (const fb of FALLBACKS) {
    for (const kw of fb.keywords) {
      if (lower.includes(kw)) return fb.answer;
    }
  }
  return null;
}

function fallbackReply(message) {
  const fallback = findFallback(message);
  if (fallback) {
    return fallback + "\n\n*(AI service is currently unavailable — showing pre-written advice)*";
  }
  return (
    "I'd love to help with that! In the meantime, here are some quick tips:\n\n" +
    "• **Fabrics:** Wool for suits, Cotton for daily wear, Linen for summer\n" +
    "• **Measurements:** Always add 2–3 inches for movement allowance\n" +
    "• **Alterations:** TailorHub offers hemming, taking in/letting out, sleeve adjustments\n\n" +
    "Please try again later, or contact us directly for specific advice! *(AI service is temporarily unavailable)*"
  );
}

/* ---------- ROUTE ---------- */
router.post("/chat", async (req, res) => {
  try {
    const { message } = req.body;

    if (!message || typeof message !== "string" || !message.trim()) {
      return res.status(400).json({ error: "Message is required" });
    }

    const genAI = getGenAI();
    if (!genAI) {
      return res.json({ reply: fallbackReply(message) });
    }

    const models = ["gemini-2.5-flash", "gemini-2.0-flash-lite", "gemini-2.0-flash"];
    let lastError;

    for (const modelName of models) {
      try {
        const model = genAI.getGenerativeModel({
          model: modelName,
          systemInstruction: SYSTEM_PROMPT,
        });

        const result = await model.generateContent(message);
        const reply = result.response.text()?.trim() || "Sorry, I couldn't generate a response.";
        return res.json({ reply });
      } catch (geminiError) {
        lastError = geminiError;
        console.warn(`Gemini API error (${modelName}):`, geminiError.message);
      }
    }

    console.warn("All Gemini models failed, using fallback:", lastError?.message);
    return res.json({ reply: fallbackReply(message) });
  } catch (error) {
    console.error("AI Assistant Error:", error);
    res.status(500).json({ error: "Something went wrong. Please try again." });
  }
});

export default router;
