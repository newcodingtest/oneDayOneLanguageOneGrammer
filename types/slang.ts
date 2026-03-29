export interface SlangLesson {
  seriesTitle: string;
  level: string;
  description: string;
  items: SlangItem[];
}

export interface SlangItem {
  category: string;
  slang: string;
  pronunciation: string;
  meaning: string[];
  literalMeaning?: string;
  nuance: string;
  tone: "casual" | "friendly" | "playful" | "rude" | "strong" | "internet";
  intensity: "low" | "medium" | "high";
  usage: {
    usedBy: string;
    online: string;
    offline: string;
    business: string;
  };
  examples: SlangExample[];
  alternatives: AlternativeExpression[];
  caution: string;
  culturalNote: string;
  quiz: {
    question: string;
    answer: string;
  };
}

export interface SlangExample {
  english: string;
  pronunciation: string;
  korean: string;
  situation: string;
}

export interface AlternativeExpression {
  expression: string;
  pronunciation: string;
  tone: string;
  note: string;
}