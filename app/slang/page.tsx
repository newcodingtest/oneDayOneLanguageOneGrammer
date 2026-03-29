// app/slang/page.tsx
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { getSlang } from "@/lib/getGrammarLesson";
import { getKstToday } from "@/lib/date/kst";
import { SlangItem, SlangLesson } from "@/types/slang";

const toneBadgeMap: Record<SlangItem["tone"], string> = {
  casual: "😎 캐주얼",
  friendly: "😊 친근함",
  playful: "😆 장난스러움",
  rude: "⚠️ 다소 거침",
  strong: "🔥 강한 표현",
  internet: "📱 인터넷 슬랭",
};

const intensityBadgeMap: Record<SlangItem["intensity"], string> = {
  low: "🟢 약함",
  medium: "🟠 중간",
  high: "🔴 강함",
};

export default async function SlangPage() {
  console.log("🔥 서버에서 실행됨 (SSR)");

  const { year, month, day } = getKstToday();
  const start = Date.now();

  const rawLesson = await getSlang(year, month, day);
  const lesson: SlangLesson =
    typeof rawLesson === "string" ? JSON.parse(rawLesson) : rawLesson;

  const end = Date.now();

  console.log("슬랭 정보:", lesson);
  console.log(`⏱️ 서버 처리 시간: ${end - start}ms`);

  return (
    <div className="min-h-screen bg-slate-100">
      <Header />

      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* 상단 히어로 */}
        <section className="mb-8 rounded-3xl bg-gradient-to-br from-fuchsia-600 via-violet-600 to-indigo-600 text-white p-6 shadow-lg">
          <p className="text-sm font-semibold text-white/80 mb-2">
            DAILY ENGLISH SLANG
          </p>
          <h1 className="text-3xl font-extrabold">
            🔥 {lesson.seriesTitle}
          </h1>
          <p className="mt-2 text-sm text-white/90">{lesson.description}</p>
          <div className="mt-4 flex flex-wrap gap-2 text-sm">
            <span className="bg-white/15 px-3 py-1 rounded-full">
              📆 {year}-{month}-{day}
            </span>
            <span className="bg-white/15 px-3 py-1 rounded-full">
              🎯 난이도: {lesson.level}
            </span>
          </div>
        </section>

        <div className="space-y-6">
          {lesson.items.map((item, index) => (
            <article
              key={`${item.slang}-${index}`}
              className="bg-white rounded-3xl shadow-md border border-slate-200 overflow-hidden"
            >
              {/* 카드 헤더 */}
              <div className="bg-slate-50 px-6 py-5 border-b border-slate-200">
                <div className="flex flex-wrap gap-2 mb-3">
                  <span className="inline-block bg-fuchsia-100 text-fuchsia-700 text-xs font-bold px-3 py-1 rounded-full">
                    {item.category}
                  </span>
                  <span className="inline-block bg-indigo-100 text-indigo-700 text-xs font-bold px-3 py-1 rounded-full">
                    {toneBadgeMap[item.tone]}
                  </span>
                  <span className="inline-block bg-amber-100 text-amber-700 text-xs font-bold px-3 py-1 rounded-full">
                    {intensityBadgeMap[item.intensity]}
                  </span>
                </div>

                <h2 className="text-2xl font-extrabold text-slate-900">
                  ✨ {item.slang}
                </h2>

                <p className="text-slate-500 mt-1">[{item.pronunciation}]</p>

                {item.literalMeaning && (
                  <p className="text-sm text-slate-600 mt-3">
                    📘 직역 느낌: {item.literalMeaning}
                  </p>
                )}
              </div>

              <div className="px-6 py-6 space-y-6">
                {/* 의미 */}
                <section>
                  <h3 className="font-extrabold text-slate-900 mb-3">
                    🎯 의미
                  </h3>
                  <div className="flex flex-col gap-3">
                    {item.meaning.map((m, i) => (
                      <div
                        key={i}
                        className="bg-fuchsia-50 border border-fuchsia-200 rounded-2xl px-4 py-4 text-slate-900 font-bold"
                      >
                        🔹 {m}
                      </div>
                    ))}
                  </div>
                </section>

                {/* 뉘앙스 */}
                <section>
                  <h3 className="font-extrabold text-slate-900 mb-3">
                    🧠 뉘앙스
                  </h3>
                  <div className="bg-violet-50 border border-violet-200 rounded-2xl p-4 text-slate-800">
                    {item.nuance}
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
                        <p className="mt-3 text-sm text-slate-600">
                          🎬 상황: {ex.situation}
                        </p>
                      </div>
                    ))}
                  </div>
                </section>

                {/* 사용 상황 */}
                <section>
                  <h3 className="font-extrabold text-slate-900 mb-3">
                    📊 사용 상황
                  </h3>
                  <div className="flex flex-col gap-3">
                    <div className="bg-white border border-slate-200 rounded-2xl p-4 text-slate-900 font-semibold">
                      🧑 주로 쓰는 사람: {item.usage.usedBy}
                    </div>
                    <div className="bg-white border border-slate-200 rounded-2xl p-4 text-slate-900 font-semibold">
                      📱 온라인: {item.usage.online}
                    </div>
                    <div className="bg-white border border-slate-200 rounded-2xl p-4 text-slate-900 font-semibold">
                      🗣️ 오프라인: {item.usage.offline}
                    </div>
                    <div className="bg-white border border-slate-200 rounded-2xl p-4 text-slate-900 font-semibold">
                      💼 비즈니스 환경: {item.usage.business}
                    </div>
                  </div>
                </section>

                {/* 대체 표현 */}
                <section>
                  <h3 className="font-extrabold text-slate-900 mb-3">
                    🔁 비슷하거나 순한 표현
                  </h3>
                  <div className="flex flex-col gap-3">
                    {item.alternatives.map((alt, i) => (
                      <div
                        key={i}
                        className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4"
                      >
                        <p className="font-bold text-slate-900">
                          🔹 {alt.expression}
                        </p>
                        <p className="text-sm text-slate-500">
                          [{alt.pronunciation}]
                        </p>
                        <p className="text-sm text-slate-800 mt-2">
                          톤: {alt.tone}
                        </p>
                        <p className="text-sm text-slate-700 mt-1">
                          {alt.note}
                        </p>
                      </div>
                    ))}
                  </div>
                </section>

                {/* 주의 */}
                <section>
                  <h3 className="font-extrabold text-slate-900 mb-3">
                    ⚠️ 주의할 점
                  </h3>
                  <div className="bg-rose-50 border border-rose-200 rounded-2xl p-4 text-slate-800">
                    {item.caution}
                  </div>
                </section>

                {/* 문화 메모 */}
                <section>
                  <h3 className="font-extrabold text-slate-900 mb-3">
                    🌍 문화 메모
                  </h3>
                  <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 text-slate-800">
                    {item.culturalNote}
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