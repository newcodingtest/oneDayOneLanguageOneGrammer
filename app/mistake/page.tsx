import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { getKstToday } from "@/lib/date/kst";
import { getContent } from "@/modules/content/content.service";
import { MistakeLesson } from "@/types/mistake";

export default async function MistakePage() {
  console.log("🔥 서버에서 실행됨 (SSR)");

  const { year, month, day } = getKstToday();

  const start = Date.now();

  const rawLesson =  await getContent(
                  "mistake",
                  year,
                  month + 1,
                  day
      );
  const lesson: MistakeLesson =
    typeof rawLesson === "string" ? JSON.parse(rawLesson) : rawLesson;

  const end = Date.now();

  console.log("Mistake 정보:", lesson);
  console.log(`⏱️ 서버 처리 시간: ${end - start}ms`);

  return (
    <div className="min-h-screen bg-slate-100">
      <Header />

      <main className="max-w-3xl mx-auto px-4 py-8">
        <section className="mb-8 rounded-3xl bg-gradient-to-br from-rose-500 to-pink-500 text-white p-6 shadow-lg">
          <h1 className="text-3xl font-extrabold">
            ❌ 한국인이 자주 틀리는 표현
          </h1>
          <p className="mt-3 text-base font-semibold text-white/90">
            📚 오늘의 주제: {lesson.topic ?? "공감 100% 실수 표현"}
          </p>
          <p className="mt-2 text-sm text-white/80">
            {year}-{month}-{day}
          </p>
        </section>

        <div className="space-y-5">
          {lesson.items.map((item, index) => (
            <article
              key={`${item.wrong}-${index}`}
              className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-md"
            >
              <div className="px-5 pt-5 pb-4 border-b border-slate-100">
                <div className="mb-3 inline-flex rounded-full bg-rose-100 px-3 py-1 text-xs font-bold text-rose-700">
                  Mistake #{index + 1}
                </div>

                <div className="space-y-3">
                  <div>
                    <p className="text-xs font-bold tracking-wide text-slate-400">
                      WRONG
                    </p>
                    <p className="mt-1 text-xl font-extrabold text-rose-500 line-through decoration-2">
                      {item.wrong}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs font-bold tracking-wide text-slate-400">
                      BETTER
                    </p>
                    <p className="mt-1 text-2xl font-extrabold text-slate-900">
                      {item.correct}
                    </p>
                  </div>
                </div>
              </div>

              <div className="px-5 py-5 space-y-4">
                <section className="rounded-2xl bg-slate-50 p-4">
                  <h3 className="text-sm font-extrabold text-slate-900">
                    왜 많이 틀릴까?
                  </h3>
                  <p className="mt-2 text-sm leading-7 text-slate-700">
                    {item.reason}
                  </p>

                  <p className="mt-3 text-sm leading-7 text-slate-600">
                    <span className="font-bold text-slate-800">원어민 느낌:</span>{" "}
                    {item.nuance}
                  </p>
                </section>

                <section className="grid gap-3 md:grid-cols-2">
                  <div className="rounded-2xl border border-rose-200 bg-rose-50 p-4">
                    <p className="text-xs font-bold text-rose-500">어색한 예문</p>
                    <p className="mt-2 text-sm font-semibold leading-6 text-slate-800">
                      {item.exampleWrong}
                    </p>
                  </div>

                  <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4">
                    <p className="text-xs font-bold text-emerald-600">
                      자연스러운 예문
                    </p>
                    <p className="mt-2 text-sm font-semibold leading-6 text-slate-800">
                      {item.exampleCorrect}
                    </p>
                  </div>
                </section>

                <section className="rounded-2xl bg-amber-50 border border-amber-200 p-4">
                  <p className="text-xs font-bold text-amber-700">기억 팁</p>
                  <p className="mt-2 text-sm leading-6 text-slate-800">
                    {item.tip}
                  </p>
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