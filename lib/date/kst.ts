// lib/date/kst.ts
export interface KstDateParts {
  year: number;
  month: number;
  day: number;
}

export function getKstNow(): Date {
  const now = new Date();
  const utcMs = now.getTime() + now.getTimezoneOffset() * 60_000;
  return new Date(utcMs + 9 * 60 * 60_000);
}

export function getKstToday(): KstDateParts {
  const kstNow = getKstNow();

  return {
    year: kstNow.getFullYear(),
    month: kstNow.getMonth() + 1,
    day: kstNow.getDate(),
  };
}

export function getKstTomorrow(): KstDateParts {
  const kstNow = getKstNow();

  const tomorrow = new Date(kstNow);
  tomorrow.setDate(tomorrow.getDate() + 1); // ✅ 안전한 +1

  return {
    year: tomorrow.getFullYear(),
    month: tomorrow.getMonth() + 1,
    day: tomorrow.getDate(),
  };
}

export function secondsUntilNextMidnightKST(): number {
  const kstNow = getKstNow();
  const nextMidnight = new Date(kstNow);
  nextMidnight.setHours(24, 0, 0, 0);

  const diffMs = nextMidnight.getTime() - kstNow.getTime();
  return Math.max(1, Math.floor(diffMs / 1000));
}

export function buildGrammarDateKey(year: number, month: number, day: number): string {
  return `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}