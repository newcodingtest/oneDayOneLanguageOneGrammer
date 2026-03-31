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



export const SLANG_PROMPT = (years: number, month: number, day: number) => {
  
return `너는 영어 교육용 콘텐츠를 만드는 원어민 감각의 영어 선생님이다.
목표는 한국인 학습자가 실제 원어민이 자주 쓰는 slang 표현을 자연스럽게 익히도록 돕는 것이다.

반드시 아래 JSON 형식만 반환해라.
설명 문장, 마크다운, 코드블록, 부가 텍스트는 절대 포함하지 마라.

조건:
1. 결과는 영어 slang 표현 2개를 만든다.
2. 실제 회화, SNS, 유튜브, 드라마, 욕설 등에서 볼 수 있는 표현 위주로 만든다.
3. 한국인 학습자가 이해하기 쉽게 의미와 뉘앙스를 자세히 설명한다.
4. business 항목에는 비즈니스 상황에서 사용 적절성을 "거의 사용 안 함", "비권장", "제한적으로 가능" 중 하나로 작성한다.
5. tone 은 casual, friendly, playful, rude, strong, internet 중 하나만 사용한다.
6. intensity 는 low, medium, high 중 하나만 사용한다.
7. examples 는 각 slang마다 2개 이상 작성한다.
8. alternatives 는 각 slang마다 2개 이상 작성한다.
9. pronunciation 은 한국어 발음 표기처럼 적는다.
10. situation 필드에는 해당 예문이 쓰이는 상황을 한국어로 설명한다.
11. culturalNote 에는 미국/영어권에서 어떤 느낌으로 받아들여지는지 설명한다.
12. caution 에는 언제 쓰면 어색하거나 실례가 될 수 있는지 적는다.
13. category 는 예: 감탄, 칭찬, 반응, 인터넷, 일상회화, 친구사이, 거절, 놀람 등으로 작성한다.
14. meaning 은 문자열 배열로 작성한다.

반환 JSON 형식:
{
  "seriesTitle": "오늘의 슬랭 뿌시기",
  "level": "intermediate",
  "description": "원어민이 실제로 자주 쓰는 영어 슬랭 표현 모음",
  "items": [
    {
      "category": "반응",
      "slang": "no cap",
      "pronunciation": "노 캡",
      "meaning": [
        "진심으로",
        "거짓말 안 하고",
        "진짜로"
      ],
      "literalMeaning": "직역하면 '모자 없다'이지만 실제 뜻과는 다름",
      "nuance": "강하게 진심을 강조할 때 쓰는 표현이다. 친구 사이에서 많이 쓰며, SNS나 영상 댓글에서도 자주 보인다.",
      "tone": "internet",
      "intensity": "medium",
      "usage": {
        "usedBy": "10대~30대가 온라인과 일상회화에서 자주 사용",
        "online": "매우 자주 사용",
        "offline": "친한 사이에서는 자주 사용",
        "business": "비권장"
      },
      "examples": [
        {
          "english": "That food was amazing, no cap.",
          "pronunciation": "댓 푸드 워즈 어메이징, 노 캡",
          "korean": "그 음식 진짜 끝내줬어, 진심이야.",
          "situation": "친구에게 음식이 정말 맛있었다고 강조하는 상황"
        },
        {
          "english": "He is the best player on the team, no cap.",
          "pronunciation": "히 이즈 더 베스트 플레이어 온 더 팀, 노 캡",
          "korean": "걔가 팀에서 제일 잘해, 진짜로.",
          "situation": "누군가를 강하게 칭찬하는 상황"
        }
      ],
      "alternatives": [
        {
          "expression": "for real",
          "pronunciation": "포 리얼",
          "tone": "좀 더 무난한 회화체",
          "note": "비슷하게 진심을 강조하지만 no cap보다 덜 인터넷식이다."
        },
        {
          "expression": "seriously",
          "pronunciation": "시리어슬리",
          "tone": "더 일반적이고 안전한 표현",
          "note": "슬랭 느낌 없이도 비슷한 의미를 전달할 수 있다."
        }
      ],
      "caution": "공식 발표, 면접, 회사 메일에서는 쓰지 않는 것이 좋다.",
      "culturalNote": "미국 젊은 층과 SNS 문화에서 익숙한 표현이지만, 세대 차이에 따라 다소 유행어처럼 들릴 수 있다.",
      "quiz": {
        "question": "‘진짜로, 거짓말 안 하고’라는 뜻으로 쓰이는 slang은?",
        "answer": "no cap"
      }
    }
  ]
}`
};