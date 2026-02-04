export const KOREAN_LEARNING_PROMPT = (years: number, month: number, day: number) => `당신은 영어 문법 교육 전문가입니다. Day ${day}에 해당하는 영어 문법 학습 콘텐츠를 생성해주세요.

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
- 매일 다른 문법을 다뤄주세요
- 실제 원어민들이 자주 사용하는 자연스러운 문장을 만들어주세요
- 예시 문장은 실용적이고 다양한 상황을 포함해주세요
- Day ${day}에 맞는 난이도와 주제를 선택해주세요`;