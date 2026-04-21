// lib/ai/gemini.ts
import { GoogleGenerativeAI } from "@google/generative-ai";

export function createGeminiClient(apiKey?: string) {
  return new GoogleGenerativeAI(apiKey || "");
}

export async function askGemini({
  client,
  prompt,
  maxTokens = 2000,
}: {
  client: GoogleGenerativeAI;
  prompt: string;
  maxTokens?: number;
}) {
  const model = client.getGenerativeModel({
    model: process.env.GEMINI_MODEL as string,
    generationConfig: {
      responseMimeType: "application/json",
      maxOutputTokens: maxTokens,
    },
  });

  const result = await model.generateContent(prompt);
  return result.response.text();
}