export const ENGLISH_LEARNING_PROMPT = (years: number, month: number, day: number) => `당신은 영어 문법 교육 전문가입니다. Day ${day}에 해당하는 영어 문법 학습 콘텐츠를 생성해주세요.

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
- 1. 매일 다른 문법을 다뤄주세요
- 2. Random Difficulty: Day ${day}에 상관없이 매일 다양한 난이도를 섞어 학습자가 지루하지 않게 해주세요.
- 3. Beyond Textbooks: "I am fine, thank you" 같은 문장은 금지입니다. 대신 "I'm doing great", "Can't complain" 처럼 진짜 원어민의 반응을 넣어주세요.
- 4. Hyper-Localization: 한국어 번역 시에도 20대들이 사용하는 '힙한 말투'를 적절히 섞어 학습 흥미를 높여주세요. (예: "That's cap" -> "그건 좀 에바지").
- 5. Context is King: 상황(situation)을 구체적으로 설정하여 어떤 맥락에서 이 영어를 써야 할지 바로 이해하게 하세요
- 6. Formatting: 반드시 유효한 JSON 형식이어야 합니다.
`