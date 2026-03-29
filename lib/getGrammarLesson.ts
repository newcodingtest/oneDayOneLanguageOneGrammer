// lib/grammar/getGrammarLesson.ts
import { ENGLISH_LEARNING_PROMPT, OLD_VERB_PROMPT, SLANG_PROMPT } from "@/lib/prompts";
import { getSampleLesson, getSampleSLANG } from "@/mocks/grammar";
import { grammarRepository } from "@/repository/grammarRepository";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { unstable_cache } from "next/cache";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");
const genAIV1 = new GoogleGenerativeAI(process.env.GEMINI_API_KEY_V1 || "");
const genAIV2 = new GoogleGenerativeAI(process.env.GEMINI_API_KEY_V2 || "");

function secondsUntilNextMidnightKST() {
  const now = new Date();
  const utcMs = now.getTime() + now.getTimezoneOffset() * 60_000;
  const kstNow = new Date(utcMs + 9 * 60 * 60_000);

  const kstNextMidnight = new Date(kstNow);
  kstNextMidnight.setHours(24, 0, 0, 0);

  const diffMs = kstNextMidnight.getTime() - kstNow.getTime();
  return Math.max(1, Math.floor(diffMs / 1000));
}

async function askGemini(prompt: string) {
  console.log("잼미니 물어봐~")
  const model = genAI.getGenerativeModel({
    model: process.env.GEMINI_MODEL as string,
    generationConfig: {
      responseMimeType: "application/json",
      maxOutputTokens: 2000,
    },
  });

  const result = await model.generateContent(prompt);
  const response = await result.response;
  return response.text();
}

async function askGeminiV1(prompt: string) {
  console.log("V1 잼미니 물어봐~")
  const model = genAIV1.getGenerativeModel({
    model: process.env.GEMINI_MODEL as string,
    generationConfig: {
      responseMimeType: "application/json",
      maxOutputTokens: 4000,
    },
  });

  const result = await model.generateContent(prompt);
  const response = await result.response;
  return response.text();
}

async function askGeminiV2(prompt: string) {
  console.log("V1 잼미니 물어봐~")
  const model = genAIV2.getGenerativeModel({
    model: process.env.GEMINI_MODEL as string,
    generationConfig: {
      responseMimeType: "application/json",
      maxOutputTokens: 4000,
    },
  });

  const result = await model.generateContent(prompt);
  const response = await result.response;
  return response.text();
}

function cleanJson(text: string) {
  return text.replace(/```json\n?|\n?```/g, "").trim();
}

async function generateAndPersist(year: number, month: number, day: number) {
  const isProd = process.env.DEPLOY_LEVEL === "prod";
  const prompt = ENGLISH_LEARNING_PROMPT(year, month, day);

  console.log(`prompt: ${prompt}`);
  const raw =
    isProd
      ? await askGemini(prompt)
      : JSON.stringify(getSampleLesson(year, month, day));

  const cleanContent = cleanJson(raw);
  const grammarData = JSON.parse(cleanContent);

  // ✅ 캐시 미스(처음 생성)일 때만 저장되도록 이 함수 안에서 저장
  await grammarRepository.save(cleanContent);

  return grammarData;
}

async function generateAndPersistV1(year: number, month: number, day: number) {
  const isProd = process.env.DEPLOY_LEVEL === "prod";
  const prompt = OLD_VERB_PROMPT(year, month, day);

  //console.log(`prompt: ${prompt}`);
  const raw =
    isProd
      ? await askGeminiV1(prompt)
      : JSON.stringify(getGrammarLessonV1(year, month, day));
  console.log(`v1 raw: ${raw} \n\n`)
  
  const cleanContent = cleanJson(raw);
  console.log(`V1 cleanContent: ${cleanContent}`);
  //const grammarData = JSON.parse(cleanContent);

  // ✅ 캐시 미스(처음 생성)일 때만 저장되도록 이 함수 안에서 저장
  await grammarRepository.save(cleanContent);

  return cleanContent;
}

async function generateAndPersistSLANG(year: number, month: number, day: number) {
  const isProd = process.env.DEPLOY_LEVEL === "prod";
  const prompt = SLANG_PROMPT(year, month, day);

  //console.log(`prompt: ${prompt}`);
  const raw =
    isProd
      ? await askGeminiV2(prompt)
      : JSON.stringify(getSampleSLANG(year, month, day));
  console.log(`slang raw: ${raw} \n\n`)
  
  const cleanContent = cleanJson(raw);
  console.log(`slang cleanContent: ${cleanContent}`);
  //const grammarData = JSON.parse(cleanContent);

  // ✅ 캐시 미스(처음 생성)일 때만 저장되도록 이 함수 안에서 저장
  await grammarRepository.save(cleanContent);

  return cleanContent;
}

export async function getGrammarLesson(year: number, month: number, day: number) {
  const revalidate = secondsUntilNextMidnightKST();
  const key = [`grammar-${year}-${month}-${day}`];

  const cached = unstable_cache(
    () => generateAndPersist(year, month, day),
    key,
    { revalidate, tags: ["grammar", `grammar-${year}-${month}-${day}`] }
  );

  return cached();
}

export async function getGrammarLessonV1(year: number, month: number, day: number) {
  const revalidate = secondsUntilNextMidnightKST();
  const key = [`phrasal-verb-${year}-${month}-${day}`];

  const cached = unstable_cache(
    () => generateAndPersistV1(year, month, day),
    key,
    { revalidate, tags: ["phrasal-verb", `phrasal-verb-${year}-${month}-${day}`] }
  );

  return cached();
}

export async function getSlang(year: number, month: number, day: number) {
  const revalidate = secondsUntilNextMidnightKST();
  const key = [`slang-${year}-${month}-${day}`];

  const cached = unstable_cache(
    () => generateAndPersistSLANG(year, month, day),
    key,
    { revalidate, tags: ["pslang", `slang-${year}-${month}-${day}`] }
  );

  return cached();
}



