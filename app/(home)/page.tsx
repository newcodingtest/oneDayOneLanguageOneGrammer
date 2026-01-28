'use client';

import DayCounter from '@/components/DayCounter';
import ExampleSentences from '@/components/ExampleSentences';
import Footer from '@/components/Footer';
import GrammarExplanation from '@/components/GrammarExplanation';
import Header from '@/components/Header';
import SentenceCard from '@/components/SentenceCard';
import { useState } from 'react';

interface ExampleSentence {
  id: number;
  text: string;
  translation: string;
}

interface GrammarLesson {
  date: string;
  day: number;
  sentence: string;
  sentenceTranslation: string;
  grammarTitle: string;
  grammarExplanation: string;
  structure: string;
  examples: ExampleSentence[];
}

export default function DailyGrammarPage() {
  const [isPlaying, setIsPlaying] = useState<number | null>(null);

  // 샘플 데이터
  const lesson: GrammarLesson = {
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

  // TTS 재생 함수 (Web Speech API 사용)
  const playAudio = (text: string, id: number) => {
    if ('speechSynthesis' in window) {
      // 이전 재생 중지
      window.speechSynthesis.cancel();
      
      setIsPlaying(id);
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US';
      utterance.rate = 0.9;
      
      utterance.onend = () => {
        setIsPlaying(null);
      };
      
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      {/* Header - 완전 반응형 */}
      <Header />
      
      {/* Main Content - 완전 반응형 */}
      <main className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 py-4 sm:py-6 lg:py-8">
        {/* Date & Day Counter - 모바일/태블릿/데스크탑 최적화 */}
        <DayCounter
          date={lesson.date}
          day={lesson.day}
        />
        {/* Today's Sentence - 반응형 텍스트 크기 */}
        <SentenceCard
          sentence={lesson.sentence}
          translation={lesson.sentenceTranslation}
          isPlaying={isPlaying===0?true:false}
          onPlay={() => playAudio(lesson.sentence, 0)}
        />  

        {/* Grammar Explanation - 반응형 레이아웃 */}
        <GrammarExplanation
          title={lesson.grammarTitle}
          explanation={lesson.grammarExplanation}
          structure={lesson.structure}
        />

        {/* Example Sentences - 완전 반응형 카드 */}
    
        <ExampleSentences
          examples={lesson.examples}
          playingId={isPlaying}
          onPlay={(text, id) => playAudio(text, id)}
        />
      </main>

      {/* Footer - 반응형 */}
      <Footer />
    </div>
  );
}