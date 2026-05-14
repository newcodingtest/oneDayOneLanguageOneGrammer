// components/site/InfoPageLayout.tsx

type InfoSection = {
  icon?: string;
  title: string;
  paragraphs: string[];
};

type InfoPageLayoutProps = {
  badge: string;
  title: string;
  description: string;
  sections: InfoSection[];
};

export default function InfoPageLayout({
  badge,
  title,
  description,
  sections,
}: InfoPageLayoutProps) {
  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-indigo-50">
      <section className="mx-auto max-w-4xl px-4 py-10 sm:px-6 sm:py-14">
        <div className="mb-8 text-center">
          <div className="mb-3 inline-flex items-center rounded-full bg-blue-100 px-4 py-1.5 text-xs font-semibold text-blue-700 ring-1 ring-blue-200">
            {badge}
          </div>

          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            {title}
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-gray-600 sm:text-base">
            {description}
          </p>
        </div>

        <div className="space-y-4">
          {sections.map((section, index) => (
            <article
              key={index}
              className="rounded-2xl border border-gray-200 bg-white/90 p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md sm:p-6"
            >
              <div className="mb-3 flex items-center gap-3">
                {section.icon && (
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-xl">
                    {section.icon}
                  </div>
                )}

                <h2 className="text-lg font-bold text-gray-900">
                  {section.title}
                </h2>
              </div>

              <div className="space-y-3 text-sm leading-7 text-gray-700 sm:text-base">
                {section.paragraphs.map((paragraph, paragraphIndex) => (
                  <p key={paragraphIndex}>{paragraph}</p>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}