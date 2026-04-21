// modules/content/content.service.ts
import { unstable_cache } from "next/cache";
import { generateContent } from "./content.generator";
import { contentConfig, ContentType } from "./content.config";

function secondsUntilNextMidnightKST() {
  const now = new Date();
  const utcMs = now.getTime() + now.getTimezoneOffset() * 60_000;
  const kstNow = new Date(utcMs + 9 * 60 * 60_000);

  const next = new Date(kstNow);
  next.setHours(24, 0, 0, 0);

  return Math.floor((next.getTime() - kstNow.getTime()) / 1000);
}

export async function getContent(
  type: ContentType,
  year: number,
  month: number,
  day: number
) {
  const config = contentConfig[type];
  const revalidate = secondsUntilNextMidnightKST();

  const key = [`${config.tag}-${year}-${month}-${day}`];

  const cached = unstable_cache(
    () => generateContent(type, year, month, day),
    key,
    {
      revalidate,
      tags: [config.tag, key[0]],
    }
  );

  return cached();
}