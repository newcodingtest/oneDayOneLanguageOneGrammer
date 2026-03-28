//"use client"
// app/daily-grammar/page.tsx
import Footer from '@/components/Footer';
import GrammarContentClient from '@/components/GrammarContentClient'; // 새로 만들 파일
import Header from '@/components/Header';
import { getKstToday } from '@/lib/date/kst';
import { getGrammarLesson } from '@/lib/getGrammarLesson';
import { GrammarLesson } from '@/types/grammer';


// export default function DailyGrammarPage() {
// const [lesson, setLesson] = useState<GrammarLesson | null>(null);

//  useEffect(() => {
//     async function fetchLesson() {
//       try {
//         const res = await fetch("/api/grammar");
//         const data: GrammarLesson = await res.json();
//         setLesson(data);
//       } catch (err) {
//         console.error("Failed to fetch lesson:", err);
//       }
//     }
//     fetchLesson();
//   }, []);

//   if (!lesson) return <div>Loading...</div>;

//   return (
// <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
//       <Header />
//       {/* 본문 */}
//       <GrammarContentClient lesson={lesson} />

//       <Footer />
//     </div>
//   );
// }

export default async function DailyGrammarPage() {

   const { year, month, day } = getKstToday();
  
    const start = Date.now();
  
    const lesson: GrammarLesson = await getGrammarLesson(year, month, day);

  
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