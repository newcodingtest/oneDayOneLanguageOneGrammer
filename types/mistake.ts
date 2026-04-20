export interface MistakeItem {
  wrong: string;        // 틀린 표현
  correct: string;      // 올바른 표현
  reason: string;       // 왜 틀렸는지 (핵심)
  nuance: string;       // 뉘앙스 차이
  exampleWrong: string;
  exampleCorrect: string;
  tip: string;          // 기억법
}

export interface MistakeLesson {
  date: string;
  topic: string;
  items: MistakeItem[];
}