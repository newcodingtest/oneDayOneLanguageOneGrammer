import { GrammarLesson } from "@/types/grammer";

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