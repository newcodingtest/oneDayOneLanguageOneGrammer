import Header from '@/components/Header';
import Link from 'next/link';

export default async function ArchivePage() {
  // DB에서 전체 목록을 가져오는 API (가칭)
  const res = await fetch(`http://localhost:3000/api/grammar/today`, {
    next: { revalidate: 3600 } // 목록은 자주 안 변하니 1시간 단위 캐싱
  });
  const lessons = await res.json();

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      <main className="max-w-5xl mx-auto p-6">
        <h1 className="text-3xl font-bold text-slate-800 mb-8">지난 문법 모음집</h1>
        
        {/* 카드 형태의 리스트 레이아웃 */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Link 
              key={lessons.date} 
              href={`/v1?date=${lessons.date}`} // 기존 페이지에 쿼리 파라미터로 전달
              className="group p-6 bg-white rounded-2xl border border-slate-200 hover:border-indigo-400 hover:shadow-lg transition-all"
            >
              <p className="text-sm font-medium text-indigo-500 mb-2">{lessons.date}</p>
              <h2 className="text-xl font-bold text-slate-800 group-hover:text-indigo-600">
                {lessons.grammarTitle}
              </h2>
              <div className="mt-4 flex items-center text-slate-400 text-sm">
                <span>다시 학습하기</span>
                <span className="ml-1 transition-transform group-hover:translate-x-1">→</span>
              </div>
            </Link>
        </div>
      </main>
    </div>
  );
}