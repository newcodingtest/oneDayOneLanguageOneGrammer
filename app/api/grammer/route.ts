// app/api/grammar/route.ts
import { GrammarLesson } from "@/types/grammer";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from 'next/server';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");
// ✅ 서버 캐시 유효 시간 설정 (단위: 초)
// 86400초 = 24시간
export const revalidate = 86400;
export const dynamic = 'force-static'; // 이 파일은 무조건 정적 결과물로 취급해!

export const askGemini = async (prompt: string) => {
  console.log("gemini model: ", process.env.GEMINI_MODEL as string);
  try {
    // 2. 모델 선택 (gemini-1.5-flash가 빠르고 무료 할당량이 많습니다)
    const model = genAI.getGenerativeModel({ 
      model: process.env.GEMINI_MODEL as string,
      generationConfig: {
        responseMimeType: "application/json",
        maxOutputTokens: 2000, // 기존보다 크게 설정 (예: 2000)
      }
    });

    // 3. 콘텐츠 생성
    const result = await model.generateContent(prompt);
    const response = await result.response;
  console.log("1. 텍스트 내용:", response.text());
  console.log("2. 종료 사유 (예: STOP, MAX_TOKENS):", response.candidates?.[0].finishReason);
  console.log("3. 토큰 사용량:", response.usageMetadata);
    return response.text();
  } catch (error) {
    console.error("Gemini API 호출 중 오류 발생:", error);
  }
};

  // 샘플 데이터
  let sampleLesson: GrammarLesson = {
    date: '2026년 1월 28일',
    day: 28,
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
  };

let lastFetched: number = 0;

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const day = searchParams.get('day') || '1';

  try {
    const prompt = `당신은 영어 문법 교육 전문가입니다. Day ${day}에 해당하는 영어 문법 학습 콘텐츠를 생성해주세요.

다음 JSON 형식으로만 응답해주세요 (다른 설명 없이 JSON만):

{
  "date": "2026년 1월 ${day}일",
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

    const now = Date.now();
    // 1시간(3600000ms) 동안 서버 메모리에 보관
    if(sampleLesson && (now - lastFetched < 3600000)){
      return Response.json(sampleLesson)
    }
    console.log("계속 api 요청한다");
    lastFetched = now;

    const response = await askGemini(prompt);
    console.log("response: ", response);
    const data = await response as string;
    
    // JSON 파싱 (```json 제거)
    const cleanContent = data.replace(/```json\n?|\n?```/g, '').trim();
    const grammarData = JSON.parse(cleanContent);
    sampleLesson = grammarData;

    return NextResponse.json(grammarData);

  } catch (error) {
    console.error('Grammar generation error:', error);
    return NextResponse.json(
      { error: 'Failed to generate grammar content' },
      { status: 500 }
    );
  }
}