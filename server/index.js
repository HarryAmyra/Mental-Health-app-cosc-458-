import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { ChatOpenAI } from "@langchain/openai";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const openAIApiKey = process.env.OPENAI_API_KEY;

const llm = openAIApiKey
  ? new ChatOpenAI({
      model: "gpt-4o",
      temperature: 0.4,
      apiKey: openAIApiKey,
    })
  : null;

function buildSystemPrompt(userProfile) {
  const name = userProfile?.name || "the athlete";
  const sport = userProfile?.sport || "their sport";

  return `
You are Anna "Healing Minds", supportive AI mental-health companion for student-athletes.
Your goals:
- Help ${name} manage stress, emotions, and identity around ${sport} and school.
- Be non-judgmental, encouraging, and clear.
- Ask gentle follow-up questions instead of giving lectures.
- DO NOT give medical diagnoses, prescriptions, or emergency advice.
If the user mentions self-harm, wanting to die, suicide, or not wanting to live:
- Do NOT try to handle this by yourself.
- Tell them you are not an emergency service.
- Gently encourage them to contact a trusted adult, coach, or counselor.
- Encourage them to call emergency services (911 in the U.S.) or the 988 Suicide & Crisis Lifeline.
- Keep responses short (2–4 sentences), calm, and supportive.
`.trim();
}

function containsCrisisLanguage(text = "") {
  const lowered = text.toLowerCase();
  const redFlags = [
    "kill myself",
    "kill myself.",
    "suicide",
    "end my life",
    "end it all",
    "i don't want to live",
    "dont want to live",
    "i want to die",
    "i wanna die",
    "self harm",
    "hurt myself",
  ];
  return redFlags.some((phrase) => lowered.includes(phrase));
}

function buildCrisisReply() {
  return (
    "I’m really glad you told me how you’re feeling. " +
    "I’m not able to help with emergencies, but you deserve real support from a person right now. " +
    "If you’re in immediate danger, please call 911 or your local emergency number. " +
    "In the U.S., you can call or text 988 to reach the Suicide & Crisis Lifeline, " +
    "and it may also help to talk with a trusted adult, coach, or counselor about what you’re going through."
  );
}


app.post("/api/athlete-assistant", async (req, res) => {
  try {
    const { messages = [], userProfile } = req.body;

    const systemPrompt = buildSystemPrompt(userProfile);

    const lastUser = [...messages].reverse().find((m) => m.role === "user");
    if (lastUser && containsCrisisLanguage(lastUser.content || lastUser.text || "")) {
      return res.json({ reply: buildCrisisReply() });
    }

    if (!llm) {
      const lastUser = [...messages].reverse().find((m) => m.role === "user");
      return res.json({
        reply:
          (lastUser
            ? `I hear you saying: "${
                lastUser.content || lastUser.text
              }". Right now this is a demo server reply. Ask your team to add an OPENAI_API_KEY so I can give deeper support.`
            : "Thanks for checking in. This is a demo reply because no OPENAI_API_KEY is configured yet."),
      });
    }

    const lcMessages = [
      { role: "system", content: systemPrompt },
      ...messages.map((m) => ({
        role: m.role === "assistant" ? "assistant" : "user",
        content: m.content || m.text,
      })),
    ];

    const aiMsg = await llm.invoke(lcMessages);

    res.json({ reply: aiMsg.content });
  } catch (err) {
    console.error("Chat error:", err);
    res.status(500).json({ error: "Chat request failed" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`AI chat server listening on http://localhost:${PORT}`);
});
