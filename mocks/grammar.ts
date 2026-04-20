import { GrammarLesson } from "@/types/grammer";
import { MistakeItem, MistakeLesson } from "@/types/mistake";
import { SlangLesson } from "@/types/slang";

export const getSampleLesson = (years: number, month: number, day: number): GrammarLesson => ({
    date: `${years}년 ${month}월 ${day}일`,
    day: day,
    sentence: 'Having finished the project, she decided to take a well-deserved break.',
    sentenceTranslation: '프로젝트를 마친 후, 그녀는 당연히 받아야 할 휴식을 취하기로 결정했다.',
    grammarTitle: '분사 구문 (Participle Phrase)',
    grammarExplanation: '완료 분사구문 "Having + p.p"는 주절의 동작보다 먼저 일어난 일을 나타냅니다. 시간, 이유, 조건 등을 나타낼 때 사용되며, 문장을 더 간결하고 세련되게 만들어줍니다.',
    structure: 'Having + 과거분사, 주어 + 동사',
    examples: [
      {
        id: 1,
        text: 'Having lived in Korea for 10 years, he speaks Korean fluently.',
        translation: '한국에서 10년을 살았기 때문에, 그는 한국어를 유창하게 말한다.'
      },
      {
        id: 2,
        text: 'Having completed all the tasks, we went home early.',
        translation: '모든 업무를 완료한 후, 우리는 일찍 집에 갔다.'
      },
      {
        id: 3,
        text: 'Having studied hard, she passed the exam with flying colors.',
        translation: '열심히 공부했기 때문에, 그녀는 시험에 훌륭하게 합격했다.'
      },
      {
        id: 4,
        text: 'Having never traveled abroad, I was nervous about the trip.',
        translation: '해외여행을 한 번도 해본 적이 없어서, 나는 여행에 대해 긴장했다.'
      }
    ]
  });

  export const getSampleSLANG = (years: number, month: number, day: number): SlangLesson  => ({
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
});

  export const getSampleMistake = (years: number, month: number, day: number): MistakeLesson  => (
    {
      "date": "2026-4-20",
      "topic": "직역해서 틀리는 영어 (한국식 사고)",
      "items": [
        {
          "wrong": "I am boring.",
          "correct": "I am bored.",
          "reason": "한국어로는 '나 지루해'라고 말하니까 boring을 바로 붙이기 쉽다. 그런데 영어에서 boring은 '지루하게 만드는' 쪽이고, bored가 '지루함을 느끼는' 쪽이다.",
          "nuance": "I am boring.이라고 하면 원어민은 '나는 재미없는 사람이야' 또는 '내가 사람들을 지루하게 해'라는 뜻으로 받아들인다.",
          "exampleWrong": "This movie is so long. I am boring.",
          "exampleCorrect": "This movie is so long. I am bored.",
          "tip": "-ing는 감정을 주는 쪽, -ed는 감정을 느끼는 쪽이라고 기억하면 쉽다."
        },
        {
          "wrong": "I and my friend went there.",
          "correct": "My friend and I went there.",
          "reason": "한국어 어순 그대로 '나와 내 친구'라고 생각해서 I를 먼저 쓰는 경우가 많다. 하지만 영어에서는 보통 상대를 먼저 말하고 자신을 뒤에 둔다.",
          "nuance": "문법적으로 아주 크게 틀렸다고 느끼지 않을 수도 있지만, 원어민 입장에서는 어색하고 덜 자연스럽게 들린다. 특히 기본 회화에서 티가 난다.",
          "exampleWrong": "I and my friend are going to Hongdae tonight.",
          "exampleCorrect": "My friend and I are going to Hongdae tonight.",
          "tip": "영어에서는 '상대 먼저, 나중에 나' 패턴을 습관처럼 가져가면 된다."
        },
        {
          "wrong": "I ate medicine.",
          "correct": "I took medicine.",
          "reason": "한국어에서는 약을 '먹다'라고 하니까 eat를 그대로 떠올리기 쉽다. 하지만 영어에서는 약은 보통 take를 쓴다.",
          "nuance": "I ate medicine.도 의미는 전달될 수 있지만 아주 한국식 영어 느낌이 난다. 원어민은 바로 '아, 직역했구나'라고 느낄 수 있다.",
          "exampleWrong": "Wait, I need to eat medicine first.",
          "exampleCorrect": "Wait, I need to take my medicine first.",
          "tip": "음식은 eat, 약은 take로 묶어서 외우면 잘 안 틀린다."
        }
      ]
    }

);