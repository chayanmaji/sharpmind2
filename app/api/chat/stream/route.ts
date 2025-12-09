import { streamText } from "ai";
import { openai } from "@ai-sdk/openai";

const MODELS = {
    GPT4: 'gpt-4.1-nano'
}

export async function POST(req: Request) {


  try {
    const { prompt } = await req.json();
    const result = streamText({
      model: openai(MODELS.GPT4),
      prompt,
    });

    return result.toUIMessageStreamResponse();
  }
  catch(error) {
    console.error("Error generating text:", error);
    return Response.json({error: "Failed to generate text"}, { status: 500 });
  }
}