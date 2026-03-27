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


export const OLD_VERB_PROMPT = (years: number, month: number, day: number) => {
  
return `당신은 한국인을 위한 영어 학습 콘텐츠 제작자다.

목표:
- 한국인 학습자가 실생활에서 바로 써먹을 수 있는 구동사 학습 카드를 만든다.
- 결과는 반드시 JSON 형식으로만 출력한다.
- 이 JSON은 웹사이트에서 바로 렌더링될 데이터다.

중요:
- 설명문, 서론, 마크다운, 코드블록 절대 금지
- 반드시 유효한 JSON만 출력

생성 조건:
- 총 5개의 구동사를 생성한다
- 난이도: 초중급
- 실제 회화, 비즈니스, 콘텐츠에서 자주 쓰이는 표현만 사용
- 너무 어려운 표현, 거의 쓰이지 않는 표현은 제외
- 서로 겹치지 않는 표현으로 구성

카테고리 규칙:
- 감정 태그 금지
- 반드시 상황 기반으로 작성
  예: 일상회화, 비즈니스, 인간관계, 감정표현, 회사, 콘텐츠, 여행

출력 JSON 구조:

{
  "seriesTitle": "구동사 뿌시기",
  "items": [
    {
      "category": "비즈니스",
      "expression": "spin off",
      "pronunciation": "스핀 오프",
      "coreMeaning": [
        "(사업·부서를) 분리해 독립시키다"
      ],
      "extendedMeaning": [
        "(아이디어나 작품에서) 파생되다"
      ],
      "examples": [
        {
          "english": "The company spun off a new startup.",
          "pronunciation": "더 컴퍼니 스펀 오프 어 뉴 스타트업",
          "korean": "그 회사는 새 스타트업을 분사했다."
        },
        {
          "english": "The movie spun off a TV series.",
          "pronunciation": "더 무비 스펀 오프 어 티비 시리즈",
          "korean": "그 영화에서 TV 시리즈가 파생됐다."
        }
      ],
      "similarExpressions": [
        {
          "expression": "branch off",
          "pronunciation": "브랜치 오프",
          "note": "큰 흐름에서 갈라져 나오는 느낌"
        },
        {
          "expression": "split off",
          "pronunciation": "스플릿 오프",
          "note": "본체에서 분리되는 느낌"
        }
      ],
      "usage": {
        "dailyConversation": "보통",
        "business": "높음",
        "media": "높음"
      },
      "nuance": "원래 있던 것에서 떨어져 나와 새롭게 독립하는 느낌",
      "quiz": {
        "question": "그 회사는 AI 사업부를 분사했다.",
        "answer": "The company spun off its AI division."
      }
    }
  ]
}

세부 규칙:
1. items는 반드시 5개 생성
2. examples는 각 항목마다 정확히 2개
3. similarExpressions는 반드시 2개
4. usage 값은 "낮음", "보통", "높음" 중 하나만 사용
5. category는 짧고 직관적으로 작성
6. pronunciation은 한국인이 읽기 쉬운 한글 표기
7. nuance는 한 문장으로 작성
8. quiz는 한국어 문장 → 영어 정답 구조로 작성
9. 모든 영어 문장은 실제 자연스럽게 쓰이는 표현이어야 한다
10. 해석은 번역투 금지, 자연스러운 한국어로 작성
11. JSON 외의 텍스트는 절대 출력하지 않는다`
};

export const WORDS_PROMPT = (years: number, month: number, day: number) => {
  
return `당신은 한국인을 위한 영어 학습 콘텐츠 제작자다.

목표:
- 시험(SAT/GRE/TOEFL)과 실전 회화/비즈니스 모두에 도움이 되는 영어 단어 학습 카드를 만든다.
- 단순 암기가 아니라 “뉘앙스 + 실제 사용 상황”까지 이해할 수 있게 만든다.
- 결과는 반드시 JSON 형식으로만 출력한다.

중요:
- JSON 외의 텍스트 절대 출력 금지
- 설명문, 코드블록, 마크다운 금지

난이도 기준:
- 중상급 (Intermediate ~ Advanced)
- 시험에서도 등장하지만 실제 회화/비즈니스에서도 사용 가능한 단어만 선택
- 지나치게 어려운 학술 단어, 거의 쓰이지 않는 단어는 제외

생성 조건:
- 총 5개의 단어 생성
- 서로 의미 겹치지 않게 구성
- “실제로 써먹을 수 있는 단어” 우선

카테고리 규칙:
- 상황 기반으로 작성
  예: 비즈니스, 인간관계, 감정표현, 협상, 커뮤니케이션, 사회/이슈

출력 JSON 구조:

{
  "seriesTitle": "단어 뿌시기",
  "level": "sat_plus_conversation",
  "items": [
    {
      "category": "커뮤니케이션",
      "word": "articulate",
      "pronunciation": "아티큘레이트",
      "coreMeaning": [
        "(생각이나 의견을) 명확하게 표현하다"
      ],
      "extendedMeaning": [
        "논리적으로 말하다",
        "또박또박 전달하다"
      ],
      "examples": [
        {
          "english": "She articulated her ideas clearly during the meeting.",
          "pronunciation": "쉬 아티큘레이티드 허 아이디어스 클리얼리 듀링 더 미팅",
          "korean": "그녀는 회의에서 자신의 생각을 명확하게 표현했다."
        },
        {
          "english": "It's important to articulate your concerns.",
          "pronunciation": "잇츠 임포턴트 투 아티큘레이트 유어 컨선즈",
          "korean": "자신의 우려를 명확히 말하는 것이 중요하다."
        }
      ],
      "similarWords": [
        {
          "word": "express",
          "pronunciation": "익스프레스",
          "note": "일반적으로 표현하다 (더 넓은 의미)"
        },
        {
          "word": "convey",
          "pronunciation": "컨베이",
          "note": "의미나 감정을 전달하는 느낌"
        }
      ],
      "usage": {
        "dailyConversation": "보통",
        "business": "높음",
        "exam": "높음"
      },
      "nuance": "단순 표현이 아니라 논리적으로 명확하게 전달하는 느낌",
      "collocations": [
        "articulate ideas",
        "articulate thoughts",
        "articulate concerns"
      ],
      "quiz": {
        "question": "그는 자신의 의견을 명확하게 표현했다.",
        "answer": "He articulated his opinion clearly."
      }
    }
  ]
}

세부 규칙:
1. items는 반드시 5개 생성
2. examples는 정확히 2개
3. similarWords는 반드시 2개
4. usage 값은 "낮음", "보통", "높음"만 사용
5. category는 상황 기반으로 작성
6. pronunciation은 한국인이 읽기 쉬운 한글 표기
7. nuance는 한 문장으로 작성
8. collocations는 최소 3개
9. quiz는 한국어 → 영어 문장
10. 예문은 실제 회화/비즈니스에서 자연스럽게 쓰이는 문장
11. 해석은 번역투 금지
12. JSON 외 텍스트 절대 출력 금지`
};