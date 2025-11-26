import express from 'express';
import { ChatOpenAI } from '@langchain/openai';
import { HumanMessage, SystemMessage, AIMessage } from '@langchain/core/messages';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const model = new ChatOpenAI({
  openAiApiKey: process.env.OPENAI_API_KEY,
  modelName: 'gpt-3.5-turbo',
  temperature: 0.7,
});

// System prompt for therapist persona
const systemPrompt = `You are Anna, a compassionate and empathetic AI therapist specializing in sports psychology and athlete mental health. Your role is to:

- Listen actively and validate the user's feelings
- Ask thoughtful, open-ended questions to help them explore their emotions
- Use techniques from CBT (Cognitive Behavioral Therapy) when appropriate
- Focus on athlete-specific challenges like performance anxiety, identity beyond sports, transitions, and team dynamics
- Never diagnose mental health conditions
- Encourage professional help when needed
- Keep responses concise (2-4 sentences) and conversational
- Show warmth and understanding in every response

Remember: You're here to support, not replace, professional mental health care.`;

app.post('/api/chat', async (req, res) => {
  try {
    const { messages } = req.body;

    console.log('Received messages:', messages); // Debug log

    // Convert message history to LangChain format
    const formattedMessages = [
      new SystemMessage(systemPrompt),
      ...messages.map(msg => 
        msg.type === 'user' 
          ? new HumanMessage(msg.text)
          : new AIMessage(msg.text)
      )
    ];

    const response = await model.invoke(formattedMessages);
    
    console.log('AI Response:', response.content); // Debug log
    
    res.json({ message: response.content });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Failed to get response', details: error.message });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log('API Key loaded:', process.env.OPENAI_API_KEY ? '✓ Yes' : '✗ No');
});
