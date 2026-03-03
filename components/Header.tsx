// components/Header.tsx

import Link from 'next/link';
import { BookOpen } from './icons';

export default function Header() {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 py-3 sm:py-4 flex items-center justify-between">
        
        {/* 로고 영역: 클릭 시 메인(오늘의 문법)으로 이동 */}
        <Link href="/v1" className="flex items-center gap-2 sm:gap-3 hover:opacity-80 transition-opacity">
          <BookOpen className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-blue-600 flex-shrink-0" />
          <h1 className="text-base sm:text-xl lg:text-2xl font-bold text-gray-800 truncate">
            하루 영어문법 1개
          </h1>
        </Link>

        {/* 네비게이션 영역: 모음집 버튼 */}
        <nav className="flex items-center">
          <Link 
            href="/archive" 
            className="flex items-center gap-1.5 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-blue-50 text-blue-700 hover:bg-blue-100 transition-colors border border-blue-100"
          >
            {/* 시계 모양이나 리스트 모양 아이콘이 있다면 여기 넣으세요 */}
            <span className="text-xs sm:text-sm font-semibold whitespace-nowrap">
              지난 문법집
            </span>
            <span className="hidden sm:inline">📚</span>
          </Link>
        </nav>

      </div>
    </header>
  );
}