// modules/content/content.generator.ts
import { askGemini } from "@/lib/ai/gemini";
import { contentConfig, ContentType } from "./content.config";

function cleanJson(text: string) {
  return text.replace(/```json\n?|\n?```/g, "").trim();
}

export async function generateContent(
  type: ContentType,
  year: number,
  month: number,
  day: number
) {
  const config = contentConfig[type];
  const isProd = process.env.DEPLOY_LEVEL === "prod";

  const prompt = config.prompt(year, month, day);

  const raw = isProd
    ? await askGemini({
        client: config.client,
        prompt,
        maxTokens: config.maxTokens,
      })
    : JSON.stringify(config.sample(year, month, day));

  return cleanJson(raw);
}