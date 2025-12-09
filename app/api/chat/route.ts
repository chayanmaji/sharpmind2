import { generateText } from "ai";
import { openai } from "@ai-sdk/openai";

const MODELS = {
    GPT4: 'gpt-4.1-nano'
}

export async function POST(req: Request) {
  const { prompt } = await req.json();

  const { text } = await generateText({
    model: openai(MODELS.GPT4),
    prompt
  });

  return Response.json({ text });
}