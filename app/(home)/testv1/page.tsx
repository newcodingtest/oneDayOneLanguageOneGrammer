'use client';

import DayCounter from '@/components/DayCounter';
import ExampleSentences from '@/components/ExampleSentences';
import Footer from '@/components/Footer';
import GrammarExplanation from '@/components/GrammarExplanation';
import Header from '@/components/Header';
import SentenceCard from '@/components/SentenceCard';
import { audioService } from '@/lib/audioService';
import { useState } from 'react';
import useSWR from 'swr';

// Fetcher 정의
const fetcher = (url: string) => fetch(url).then(res => {
  if (!res.ok) throw new Error('데이터를 가져오는데 실패했습니다.');
  return res.json();
});

// 인터페이스 정의 (생략 가능하나 유지)
interface ExampleSentence { id: number; text: string; translation: string; }
interface GrammarLesson {
  date: string; day: number; sentence: string; sentenceTranslation: string;
  grammarTitle: string; grammarExplanation: string; structure: string; examples: ExampleSentence[];
}

export default function DailyGrammarPage() {
  const [isPlaying, setIsPlaying] = useState<number | null>(null);
  // 1. SWR로 통합 (useState, useEffect, fetchGrammarLesson 모두 대체)
  // 페이지 진입 시 자동으로 /api/grammar?day=1을 호출합니다.
  const day = new Date().getDate();
  const { data: lesson, error, isLoading } = useSWR<GrammarLesson>(`'/api/grammer?day=${day}'`, fetcher,{
    revalidateOnFocus: false, // 창을 다시 클릭했을 때 자동 요청 방지
  revalidateOnReconnect: false, // 인터넷 연결 시 자동 요청 방지
  dedupingInterval: 600000, // 10분 동안은 같은 요청을 보내지 않고 캐시 사용
  });

  // 2. TTS 재생 함수
  const playAudioV1 = async (text: string, id: number) => {
    try {
      setIsPlaying(id);
      await audioService.playV1(text, { lang: 'en', rate: 0.9 });
      setIsPlaying(null);
    } catch (error) {
      console.error("재생 중 오류 발생:", error);
      setIsPlaying(null);
    }
  };

  // 3. 로딩 및 에러 상태 처리 (lesson 데이터가 없을 때 하단 UI 렌더링 방지)
  if (isLoading) return <div className="flex h-screen items-center justify-center">로딩 중...</div>;
  if (error) return <div className="flex h-screen items-center justify-center text-red-500">{error.message}</div>;
  if (!lesson) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <Header />
      
      <main className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 py-4 sm:py-6 lg:py-8">
        {/* 이제 lesson 데이터가 존재함이 보장됩니다 */}
        <DayCounter
          date={lesson.date}
          day={lesson.day}
        />
        
        <SentenceCard
          sentence={lesson.sentence}
          translation={lesson.sentenceTranslation}
          isPlaying={isPlaying === 0}
          onPlay={() => playAudioV1(lesson.sentence, 0)}
        />  

        <GrammarExplanation
          title={lesson.grammarTitle}
          explanation={lesson.grammarExplanation}
          structure={lesson.structure}
        />

        <ExampleSentences
          examples={lesson.examples}
          playingId={isPlaying}
          onPlay={(text, id) => playAudioV1(text, id)}
        />
      </main>

      <Footer />
    </div>
  );
}