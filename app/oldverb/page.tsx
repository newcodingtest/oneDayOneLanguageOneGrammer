// app/test/page.tsx
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { getKstToday } from "@/lib/date/kst";
import { getContent } from "@/modules/content/content.service";

interface PhrasalVerbExample {
  english: string;
  pronunciation: string;
  korean: string;
}

interface SimilarExpression {
  expression: string;
  pronunciation: string;
  note: string;
}

interface PhrasalVerbItem {
  category: string;
  expression: string;
  pronunciation: string;
  coreMeaning: string[];
  extendedMeaning: string[];
  examples: PhrasalVerbExample[];
  similarExpressions: SimilarExpression[];
  usage: {
    dailyConversation: string;
    business: string;
    media: string;
  };
  nuance: string;
  quiz: {
    question: string;
    answer: string;
  };
}

interface PhrasalVerbLesson {
  seriesTitle: string;
  items: PhrasalVerbItem[];
}

export default async function TestGrammarPage() {
  console.log("🔥 서버에서 실행됨 (SSR)");

  const { year, month, day } = getKstToday();

  const start = Date.now();

  const rawLesson = await getContent(
                    "phrasal",
                    year,
                    month + 1,
                    day
        );
  const lesson: PhrasalVerbLesson =
    typeof rawLesson === "string" ? JSON.parse(rawLesson) : rawLesson;

  const end = Date.now();

  console.log("구동사 정보:", lesson);
  console.log(`⏱️ 서버 처리 시간: ${end - start}ms`);

  return (
  <div className="min-h-screen bg-slate-100">
      <Header />

      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* 상단 */}
        <section className="mb-8 rounded-3xl bg-gradient-to-br from-indigo-600 to-violet-600 text-white p-6 shadow-lg">
          <h1 className="text-3xl font-extrabold">
            🚀 {lesson.seriesTitle}
          </h1>
          <p className="mt-2 text-sm text-white/80">
            {year}-{month}-{day}
          </p>
        </section>

        <div className="space-y-6">
          {lesson.items.map((item, index) => (
            <article
              key={`${item.expression}-${index}`}
              className="bg-white rounded-3xl shadow-md border border-slate-200 overflow-hidden"
            >
              {/* 헤더 */}
              <div className="bg-slate-50 px-6 py-5 border-b border-slate-200">
                <span className="inline-block bg-indigo-100 text-indigo-700 text-xs font-bold px-3 py-1 rounded-full mb-3">
                  {item.category}
                </span>

                <h2 className="text-2xl font-extrabold text-slate-900">
                  ✨ {item.expression}
                </h2>

                <p className="text-slate-500 mt-1">
                  [{item.pronunciation}]
                </p>
              </div>

              <div className="px-6 py-6 space-y-6">

                {/* 핵심 뜻 */}
                <section>
                  <h3 className="font-extrabold text-slate-900 mb-3">
                    🎯 핵심 뜻
                  </h3>
                  <div className="flex flex-col gap-3">
                    {item.coreMeaning.map((m, i) => (
                      <div
                        key={i}
                        className="bg-indigo-50 border border-indigo-200 rounded-2xl px-4 py-4 text-indigo-900 font-bold"
                      >
                        🔹 {m}
                      </div>
                    ))}
                  </div>
                </section>

                {/* 확장 뜻 */}
                <section>
                  <h3 className="font-extrabold text-slate-900 mb-3">
                    ➕ 확장 뜻
                  </h3>
                  <div className="flex flex-col gap-3">
                    {item.extendedMeaning.map((m, i) => (
                      <div
                        key={i}
                        className="bg-violet-50 border border-violet-200 rounded-2xl px-4 py-4 text-violet-900 font-semibold"
                      >
                        🔸 {m}
                      </div>
                    ))}
                  </div>
                </section>

                {/* 예문 */}
                <section>
                  <h3 className="font-extrabold text-slate-900 mb-3">
                    💬 예문
                  </h3>
                  <div className="flex flex-col gap-3">
                    {item.examples.map((ex, i) => (
                      <div
                        key={i}
                        className="bg-blue-50 border border-blue-100 rounded-2xl p-4"
                      >
                        <p className="font-bold text-slate-900">
                          💡 {ex.english}
                        </p>
                        <p className="text-sm text-slate-500 mt-1">
                          [{ex.pronunciation}]
                        </p>
                        <p className="text-slate-800 mt-2">
                          👉 {ex.korean}
                        </p>
                      </div>
                    ))}
                  </div>
                </section>

                {/* 유사 표현 */}
                <section>
                  <h3 className="font-extrabold text-slate-900 mb-3">
                    🔁 유사 표현
                  </h3>
                  <div className="flex flex-col gap-3">
                    {item.similarExpressions.map((s, i) => (
                      <div
                        key={i}
                        className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4"
                      >
                        <p className="font-bold text-slate-900">
                          🔹 {s.expression}
                        </p>
                        <p className="text-sm text-slate-500">
                          [{s.pronunciation}]
                        </p>
                        <p className="text-sm text-slate-800 mt-2">
                          {s.note}
                        </p>
                      </div>
                    ))}
                  </div>
                </section>

                {/* 뉘앙스 */}
                <section>
                  <h3 className="font-extrabold text-slate-900 mb-3">
                    🧠 뉘앙스
                  </h3>
                  <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 text-slate-800">
                    {item.nuance}
                  </div>
                </section>

                {/* 사용 빈도 */}
                <section>
                  <h3 className="font-extrabold text-slate-900 mb-3">
                    📊 사용 빈도
                  </h3>
                <div className="flex flex-col gap-3">
                  <div className="bg-white border border-slate-200 rounded-2xl p-4 text-slate-900 font-semibold">
                    📌 일상 회화: {item.usage.dailyConversation}
                  </div>

                  <div className="bg-white border border-slate-200 rounded-2xl p-4 text-slate-900 font-semibold">
                    💼 비즈니스: {item.usage.business}
                  </div>

                  <div className="bg-white border border-slate-200 rounded-2xl p-4 text-slate-900 font-semibold">
                    🎬 미디어: {item.usage.media}
                  </div>
                </div>
                </section>

                {/* 퀴즈 */}
                <section>
                  <h3 className="font-extrabold text-slate-900 mb-3">
                    ❓ 퀴즈
                  </h3>
                  <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-4">
                    <p className="font-bold text-slate-900">
                      🧩 Q. {item.quiz.question}
                    </p>
                    <p className="mt-2 text-amber-700 font-bold">
                      ✅ A. {item.quiz.answer}
                    </p>
                  </div>
                </section>

              </div>
            </article>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}