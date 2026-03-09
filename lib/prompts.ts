export const ENGLISH_LEARNING_PROMPT = (years: number, month: number, day: number) => {
  
const curriculum: Record<number, string> = {
  1 : "현재완료 (Present Perfect)",
  2: "현재완료진행형 (Present Perfect Continuous)",
  3: "과거진행형 (Past Continuous)",
  4: "과거완료 (Past Perfect)",
  5: "조건문 2형",
  6: "조건문 3형",
  7: "수동태 (Passive Voice)",
  8: "간접의문문 (Indirect Questions)",
  9: "사역동사&지각동사 (Make, Have, Let, Help / Watch, Hear 등)",
  10: "관계부사 (where / when / why)",
  11: "동명사 (Gerund)",
  12: "to부정사",
  13: "동명사 vs to부정사",
  14: "강조구문 (It is ~ that)",
  15: "추측 조동사 (might / must / cant)",
  16: "간접화법 (Reported Speech)",
  17: "시제 일치",
  18: "가정법 과거",
  19: "가정법 과거완료",
  20: "조동사 should / must / have to",
  21: "분사구문",
  22: "도치구문",
  23: "get 수동태",
  24: "관사 심화 (a / the / zero article)",
  25: "구동사 (Phrasal Verbs)",
  26: "상관 접속사&연결어 (Not only A but also B, Despite 등)",
  27: "관계절 (Relative Clauses) ",
  28: "명사절 접속사 (Whter / if/ That 등)",
  29: "비교급 & 최상급 심화 (The 비교급, the 비교급/ 원급 비교 등)",
  30: "가정법 혼합 및 I Wish / As if 구문",
  };
const targetTopic = curriculum[day] || "영어 문법";

return `당신은 영어 문법 교육 전문가입니다. 오늘 당신이 반드시 다루어야 할 주제는 오직 **"${targetTopic}"** 입니다.
다음 JSON 형식으로만 응답해주세요 (다른 설명 없이 JSON만):

{
  "date": "2026년 ${month}월 ${day}일",
  "day": ${day},
  "sentence": "긴 영어 예시 문장 (문법이 포함된)",
  "sentenceTranslation": "한글 번역",
  "grammarTitle": "문법 이름 (한글과 영문)",
  "grammarExplanation": "문법에 대한 상세한 설명 (2-3문장)",
  "structure": "문법 구조 예시",
  "examples": [
    {
      "id": 1,
      "text": "예시 문장 1",
      "translation": "한글 번역 1"
    },
    {
      "id": 2,
      "text": "예시 문장 2",
      "translation": "한글 번역 2"
    },
    {
      "id": 3,
      "text": "예시 문장 3",
      "translation": "한글 번역 3"
    },
    {
      "id": 4,
      "text": "예시 문장 4",
      "translation": "한글 번역 4"
    }
  ]
}

중요:
- 1. Beyond Textbooks: "I am fine, thank you" 같은 문장은 금지입니다. 대신 "I'm doing great", "Can't complain" 처럼 진짜 원어민의 반응을 넣어주세요.
- 2. Hyper-Localization: 한국어 번역 시에도 20대들이 사용하는 '힙한 말투'를 적절히 섞어 학습 흥미를 높여주세요. (예: "That's cap" -> "그건 좀 에바지").
- 3. Context is King: 상황(situation)을 구체적으로 설정하여 어떤 맥락에서 이 영어를 써야 할지 바로 이해하게 하세요
`
};