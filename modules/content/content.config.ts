// modules/content/content.config.ts
import {
  ENGLISH_LEARNING_PROMPT,
  OLD_VERB_PROMPT,
  SLANG_PROMPT,
  MISTAKE_PROMPT,
} from "@/lib/prompts";

import {
  getSampleLesson,
  getSampleSLANG,
  getSampleMistake,
} from "@/mocks/grammar";

import { createGeminiClient } from "@/lib/ai/gemini";

export type ContentType = "grammar" | "phrasal" | "slang" | "mistake";

export const contentConfig = {
  grammar: {
    prompt: ENGLISH_LEARNING_PROMPT,
    sample: getSampleLesson,
    client: createGeminiClient(process.env.GEMINI_API_KEY),
    maxTokens: 2000,
    tag: "grammar",
  },
  phrasal: {
    prompt: OLD_VERB_PROMPT,
    sample: getSampleLesson,
    client: createGeminiClient(process.env.GEMINI_API_KEY_V1),
    maxTokens: 4000,
    tag: "phrasal-verb",
  },
  slang: {
    prompt: SLANG_PROMPT,
    sample: getSampleSLANG,
    client: createGeminiClient(process.env.GEMINI_API_KEY_V2),
    maxTokens: 4000,
    tag: "slang",
  },
  mistake: {
    prompt: MISTAKE_PROMPT,
    sample: getSampleMistake,
    client: createGeminiClient(process.env.GEMINI_API_KEY_V3),
    maxTokens: 4000,
    tag: "mistake",
  },
} as const;