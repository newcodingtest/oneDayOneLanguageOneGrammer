'use client';

import { useEffect, useState } from 'react';

// 아이콘 컴포넌트 (lucide-react 대체)
const Volume2 = ({ className = '' }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
  </svg>
);

const ChevronLeft = ({ className = '' }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
  </svg>
);

const ChevronRight = ({ className = '' }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
  </svg>
);

const BookOpen = ({ className = '' }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
  </svg>
);

const Calendar = ({ className = '' }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
);

const Menu = ({ className = '' }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
  </svg>
);

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
  const [currentDay, setCurrentDay] = useState<number>(1);
  const [lesson, setLesson] = useState<GrammarLesson | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // API에서 문법 데이터 가져오기
  const fetchGrammarLesson = async (day: number) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(`/api/grammar?day=${day}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch grammar lesson');
      }
      
      const data: GrammarLesson = await response.json();
      setLesson(data);
    } catch (err) {
      setError('문법 데이터를 불러오는데 실패했습니다. 다시 시도해주세요.');
      console.error('Error fetching grammar:', err);
    } finally {
      setLoading(false);
    }
  };

  // 컴포넌트 마운트 시 데이터 로드
  useEffect(() => {
    fetchGrammarLesson(currentDay);
  }, [currentDay]);

  // 이전/다음 버튼 핸들러
  const handlePrevious = () => {
    if (currentDay > 1) {
      setCurrentDay(currentDay - 1);
    }
  };

  const handleNext = () => {
    setCurrentDay(currentDay + 1);
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

  // 로딩 상태
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">오늘의 문법을 불러오는 중...</p>
        </div>
      </div>
    );
  }

  // 에러 상태
  if (error || !lesson) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center">
        <div className="text-center bg-white p-8 rounded-2xl shadow-lg max-w-md">
          <div className="text-red-500 text-5xl mb-4">⚠️</div>
          <h2 className="text-xl font-bold text-gray-800 mb-2">오류가 발생했습니다</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button 
            onClick={() => fetchGrammarLesson(currentDay)}
            className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors"
          >
            다시 시도
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      {/* Header - 완전 반응형 */}
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 py-3 sm:py-4 flex items-center justify-between">
          <div className="flex items-center gap-2 sm:gap-3">
            <BookOpen className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-blue-600 flex-shrink-0" />
            <h1 className="text-base sm:text-xl lg:text-2xl font-bold text-gray-800 truncate">
              하루 영어문법 1개
            </h1>
          </div>
          <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors flex-shrink-0">
            <Menu className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600" />
          </button>
        </div>
      </header>

      {/* Main Content - 완전 반응형 */}
      <main className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 py-4 sm:py-6 lg:py-8">
        {/* Date & Day Counter - 모바일/태블릿/데스크탑 최적화 */}
        <div className="bg-white rounded-xl sm:rounded-2xl shadow-md p-4 sm:p-5 lg:p-6 mb-4 sm:mb-5 lg:mb-6 border border-gray-200">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0">
            <div className="w-full sm:w-auto">
              <div className="flex items-center gap-2 text-gray-600 mb-1">
                <Calendar className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                <span className="text-xs sm:text-sm">{lesson.date}</span>
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-blue-600">
                Day {lesson.day}
              </h2>
            </div>
            <div className="flex gap-2 w-full sm:w-auto justify-end">
              <button 
                onClick={handlePrevious}
                disabled={currentDay === 1}
                className="p-2 sm:p-3 hover:bg-gray-100 active:bg-gray-200 rounded-lg border border-gray-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
              </button>
              <button 
                onClick={handleNext}
                className="p-2 sm:p-3 hover:bg-gray-100 active:bg-gray-200 rounded-lg border border-gray-300 transition-colors"
              >
                <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
              </button>
            </div>
          </div>
        </div>

        {/* Today's Sentence - 반응형 텍스트 크기 */}
        <div className="bg-white rounded-xl sm:rounded-2xl shadow-md p-4 sm:p-5 lg:p-6 mb-4 sm:mb-5 lg:mb-6 border border-gray-200">
          <h3 className="text-base sm:text-lg font-semibold text-gray-700 mb-3 sm:mb-4 flex items-center gap-2">
            <div className="w-1.5 sm:w-2 h-5 sm:h-6 bg-blue-500 rounded flex-shrink-0"></div>
            <span>오늘의 문장</span>
          </h3>
          
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 sm:p-5 lg:p-6 rounded-lg sm:rounded-xl mb-4 border border-blue-100">
            <p className="text-lg sm:text-xl lg:text-2xl text-gray-800 leading-relaxed mb-3 sm:mb-4 font-medium break-words">
              {lesson.sentence}
            </p>
            <p className="text-sm sm:text-base lg:text-lg text-gray-600 leading-relaxed break-words">
              {lesson.sentenceTranslation}
            </p>
          </div>
          
          <button 
            onClick={() => playAudio(lesson.sentence, 0)}
            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-blue-500 text-white px-5 sm:px-6 py-3 rounded-lg hover:bg-blue-600 active:bg-blue-700 transition-colors shadow-sm"
          >
            <Volume2 className={`w-5 h-5 flex-shrink-0 ${isPlaying === 0 ? 'animate-pulse' : ''}`} />
            <span className="font-medium text-sm sm:text-base">발음 듣기</span>
          </button>
        </div>

        {/* Grammar Explanation - 반응형 레이아웃 */}
        <div className="bg-white rounded-xl sm:rounded-2xl shadow-md p-4 sm:p-5 lg:p-6 mb-4 sm:mb-5 lg:mb-6 border border-gray-200">
          <h3 className="text-base sm:text-lg font-semibold text-gray-700 mb-3 sm:mb-4 flex items-center gap-2">
            <div className="w-1.5 sm:w-2 h-5 sm:h-6 bg-yellow-500 rounded flex-shrink-0"></div>
            <span>문법 설명</span>
          </h3>
          
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 sm:p-5 rounded-r-lg mb-4">
            <h4 className="text-lg sm:text-xl font-bold text-gray-800 mb-2 break-words">
              {lesson.grammarTitle}
            </h4>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed break-words">
              {lesson.grammarExplanation}
            </p>
          </div>

          <div className="bg-gray-50 p-3 sm:p-4 rounded-lg border border-gray-200">
            <p className="text-xs sm:text-sm text-gray-600 mb-1">구조</p>
            <p className="text-sm sm:text-base lg:text-lg font-mono font-semibold text-blue-600 break-words">
              {lesson.structure}
            </p>
          </div>
        </div>

        {/* Example Sentences - 완전 반응형 카드 */}
        <div className="bg-white rounded-xl sm:rounded-2xl shadow-md p-4 sm:p-5 lg:p-6 border border-gray-200">
          <h3 className="text-base sm:text-lg font-semibold text-gray-700 mb-3 sm:mb-4 flex items-center gap-2">
            <div className="w-1.5 sm:w-2 h-5 sm:h-6 bg-green-500 rounded flex-shrink-0"></div>
            <span>예시 문장</span>
          </h3>
          
          <div className="space-y-3 sm:space-y-4">
            {lesson.examples.map((example) => (
              <div 
                key={example.id}
                className="bg-gray-50 p-3 sm:p-4 lg:p-5 rounded-lg sm:rounded-xl border border-gray-200 hover:border-green-300 hover:bg-green-50 active:bg-green-100 transition-all"
              >
                {/* 모바일: 세로 레이아웃, 태블릿+: 가로 레이아웃 */}
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 sm:gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start gap-2 mb-2">
                      <span className="bg-green-500 text-white text-xs font-bold px-2 py-1 rounded flex-shrink-0 mt-0.5">
                        {example.id}
                      </span>
                      <p className="text-base sm:text-lg text-gray-800 font-medium leading-relaxed break-words">
                        {example.text}
                      </p>
                    </div>
                    <p className="text-sm sm:text-base text-gray-600 leading-relaxed break-words ml-0 sm:ml-8">
                      {example.translation}
                    </p>
                  </div>
                  
                  <button
                    onClick={() => playAudio(example.text, example.id)}
                    className="self-end sm:self-start flex-shrink-0 p-2.5 sm:p-3 hover:bg-green-100 active:bg-green-200 rounded-lg transition-colors border border-gray-300"
                    aria-label={`예시 문장 ${example.id} 발음 듣기`}
                  >
                    <Volume2 className={`w-5 h-5 text-green-600 ${isPlaying === example.id ? 'animate-pulse' : ''}`} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Buttons - 반응형 버튼 */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-6 sm:mt-8">
          <button 
            onClick={handlePrevious}
            disabled={currentDay === 1}
            className="w-full sm:flex-1 bg-gray-200 text-gray-700 py-3 sm:py-4 rounded-lg sm:rounded-xl font-semibold hover:bg-gray-300 active:bg-gray-400 transition-colors text-sm sm:text-base disabled:opacity-50 disabled:cursor-not-allowed"
          >
            이전 문법
          </button>
          <button 
            onClick={handleNext}
            className="w-full sm:flex-1 bg-blue-500 text-white py-3 sm:py-4 rounded-lg sm:rounded-xl font-semibold hover:bg-blue-600 active:bg-blue-700 transition-colors text-sm sm:text-base"
          >
            다음 문법
          </button>
        </div>
      </main>

      {/* Footer - 반응형 */}
      <footer className="bg-white border-t border-gray-200 mt-8 sm:mt-10 lg:mt-12">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 py-4 sm:py-5 lg:py-6 text-center text-gray-600 text-xs sm:text-sm">
          <p>매일 하나씩 영어 문법을 마스터하세요 📚</p>
          <p className="text-xs text-gray-500 mt-2">Powered by Claude AI</p>
        </div>
      </footer>
    </div>
  );
}