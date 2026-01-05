import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { ChatOpenAI } from "@langchain/openai";
import {
  HumanMessage,
  SystemMessage,
  AIMessage,
} from "@langchain/core/messages";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// -------------------------------
// Model
// -------------------------------
const model = new ChatOpenAI({
  openAIApiKey: process.env.OPENAI_API_KEY,
  modelName: "gpt-5.1",

  temperature: 0.5,
  maxTokens: 300,
});

// -------------------------------
// Simple Memory Store
// -------------------------------
// key = sessionId, value = array of messages
const memoryStore = new Map();

// limit memory to avoid excessive context length
const MEMORY_LIMIT = 15;

// -------------------------------
// System Prompt
// -------------------------------
const systemPrompt = `
You are Anna, a warm and empathetic mental-wellness guide for athletes.
Your goal is to help users reflect, feel heard, and navigate challenges.

Follow these rules:
- respond in 2–4 sentences
- validate emotions before giving guidance
- ask one gentle question when appropriate
- never diagnose or mention disorders
- do not offer crisis advice or danger instructions
- keep language simple and deeply human
- use previous memory to stay consistent with past messages
`;

// -------------------------------
// Chat Route
// -------------------------------
app.post("/api/chat", async (req, res) => {
  try {
    const { messages, sessionId } = req.body;

    if (!sessionId) {
      return res.status(400).json({
        error: "Missing sessionId. Include a unique ID for each user.",
      });
    }

    // get existing memory or create new one
    if (!memoryStore.has(sessionId)) {
      memoryStore.set(sessionId, []);
    }

    const sessionMemory = memoryStore.get(sessionId);

    // update memory with new messages
    messages.forEach((msg) => {
      sessionMemory.push(
        msg.type === "user"
          ? new HumanMessage(msg.text)
          : new AIMessage(msg.text)
      );
    });

    // enforce memory limit
    while (sessionMemory.length > MEMORY_LIMIT) {
      sessionMemory.shift(); // remove oldest message
    }

    // combine memory + system prompt
    const conversation = [
      new SystemMessage(systemPrompt.trim()),
      ...sessionMemory,
    ];

    const aiResponse = await model.invoke(conversation);

    // save AI response to memory
    sessionMemory.push(new AIMessage(aiResponse.content));

    memoryStore.set(sessionId, sessionMemory);

    return res.json({ message: aiResponse.content });
  } catch (err) {
    console.error("Chat error:", err);

    res.status(500).json({
      error: "Server error while generating AI response.",
      details: err.message,
    });
  }
});

// -------------------------------
// Server
// -------------------------------
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`✓ Server running on port ${PORT}`);
  console.log(
    `✓ API key loaded: ${process.env.OPENAI_API_KEY ? "yes" : "no"}`
  );
});

