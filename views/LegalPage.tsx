import type { LegalPageContent } from '@/data/legal-content';

type LegalPageProps = {
  page: LegalPageContent;
};

export function LegalPage({ page }: LegalPageProps) {
  const sections = [...page.sections].sort((a, b) => {
    if (a.language === '日本語') return -1;
    if (b.language === '日本語') return 1;
    return 0;
  });
  const primarySection = sections[0];

  return (
    <div className="grain bg-artbar-bg min-h-screen pt-36 pb-24">
      <div className="mx-auto max-w-[1100px] px-6 md:px-10">
        <header className="mb-14 border-b border-artbar-navy/10 pb-10">
          <span className="mb-4 block font-heading text-sm font-bold uppercase tracking-widest text-artbar-taupe">
            Artbar Tokyo
          </span>
          <h1 className="font-heading text-4xl font-heavy text-artbar-navy md:text-6xl">
            {primarySection?.eyebrow ?? page.title}
          </h1>
          <p className="mt-4 text-lg text-artbar-gray">{page.title}</p>
          {page.updated ? (
            <p className="mt-5 text-sm text-artbar-gray">発効日 / Effective date: {page.updated}</p>
          ) : null}
        </header>

        <div className="space-y-10">
          {sections.map((section) => (
            <section
              key={`${page.slug}-${section.language}`}
              className="rounded-[var(--radius-feature)] border border-white bg-white/85 p-6 shadow-sm md:p-10"
              lang={section.language === '日本語' ? 'ja' : 'en'}
            >
              <div className="mb-8 flex flex-col gap-3 border-b border-artbar-navy/10 pb-6 md:flex-row md:items-end md:justify-between">
                <div>
                  <span className="mb-2 block font-heading text-xs font-bold uppercase tracking-widest text-artbar-taupe">
                    {section.eyebrow}
                  </span>
                  <h2 className="font-heading text-3xl font-bold text-artbar-navy md:text-4xl">
                    {section.title}
                  </h2>
                </div>
                <span className="w-fit rounded-full bg-artbar-bg px-4 py-2 text-sm font-medium text-artbar-navy">
                  {section.language}
                </span>
              </div>

              {section.intro ? (
                <p className="mb-8 text-base leading-8 text-artbar-navy md:text-lg">{section.intro}</p>
              ) : null}

              <div className="space-y-8">
                {section.blocks.map((block, index) => (
                  <div key={`${section.language}-${block.heading ?? 'fields'}-${index}`}>
                    {block.heading ? (
                      <h3 className="mb-3 font-heading text-xl font-bold text-artbar-navy">
                        {block.heading}
                      </h3>
                    ) : null}

                    {block.body?.map((paragraph) => (
                      <p key={paragraph} className="mb-3 text-base leading-8 text-artbar-gray">
                        {paragraph}
                      </p>
                    ))}

                    {block.list ? (
                      <ul className="mt-4 space-y-3 text-base leading-7 text-artbar-gray">
                        {block.list.map((item) => (
                          <li key={item} className="flex gap-3">
                            <span className="mt-3 h-1.5 w-1.5 flex-none rounded-full bg-artbar-taupe" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    ) : null}

                    {block.fields ? (
                      <dl className="divide-y divide-artbar-navy/10 overflow-hidden rounded-2xl border border-artbar-navy/10 bg-artbar-bg/60">
                        {block.fields.map((field) => (
                          <div key={field.label} className="grid gap-2 px-5 py-4 md:grid-cols-[240px_1fr] md:gap-6">
                            <dt className="font-heading text-sm font-bold uppercase tracking-wide text-artbar-navy">
                              {field.label}
                            </dt>
                            <dd className="text-base leading-7 text-artbar-gray">{field.value}</dd>
                          </div>
                        ))}
                      </dl>
                    ) : null}
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
