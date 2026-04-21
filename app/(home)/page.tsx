//"use client"
// app/daily-grammar/page.tsx
import Footer from '@/components/Footer';
import GrammarContentClient from '@/components/GrammarContentClient'; // 새로 만들 파일
import Header from '@/components/Header';
import { getKstToday } from '@/lib/date/kst';
import { getContent } from '@/modules/content/content.service';
import { GrammarLesson } from '@/types/grammer';

export default async function DailyGrammarPage() {

   const { year, month, day } = getKstToday();
  
    const start = Date.now();
  
    const rawLesson = await getContent(
                    "grammar",
                    year,
                    month,
                    day
        );
  const lesson: GrammarLesson =
    typeof rawLesson === "string" ? JSON.parse(rawLesson) : rawLesson;
    const end = Date.now();
  
    console.log("구동사 정보:", lesson);
    console.log(`⏱️ 서버 처리 시간: ${end - start}ms`);
  
  return (
<div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <Header />
      {/* 본문 */}
      <GrammarContentClient lesson={lesson} />

      <Footer />
    </div>
  );
}