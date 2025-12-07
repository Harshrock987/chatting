import { OpenRouter } from "@openrouter/sdk";
import { streamText, convertToModelMessages } from "ai";

export const maxDuration = 30;

const openrouter = new OpenRouter({
  apiKey: process.env.OPENROUTER_API_KEY!,
  defaultHeaders: {
    "HTTP-Referer": "http://localhost:3000", // or your deployed site
    "X-Title": "My Chat App",
  },
});

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = streamText({
    model: openrouter.chat("openai/gpt-4o"), // <-- ANY model from OpenRouter
    messages: convertToModelMessages(messages),
  });

  return result.toUIMessageStreamResponse();
}
