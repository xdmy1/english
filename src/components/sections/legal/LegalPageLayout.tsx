import { ArrowRight, Button } from "@/components/ui/Button";
import { PageHero } from "@/components/ui/PageHero";
import { LegalTable, Prose } from "@/components/ui/Prose";
import { Reveal } from "@/components/ui/Reveal";
import { Container, Eyebrow, Section } from "@/components/ui/Section";
import type { Locale } from "@/i18n/config";
import { format } from "@/i18n/format";
import { href } from "@/i18n/routes";
import type { CommonDict, LegalPage, LegalSection } from "@/i18n/types";
import { cn } from "@/lib/cn";

/**
 * Turns a heading into an anchor id. Diacritics are decomposed and dropped, so
 * "Datele copiilor și reprezentantul legal" becomes
 * "datele-copiilor-si-reprezentantul-legal". Scripts with no ASCII at all —
 * Cyrillic, for instance — reduce to nothing, and fall back to the positional
 * id so a Russian heading still gets a stable, linkable anchor.
 */
function slugify(heading: string, index: number): string {
  const slug = heading
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/-{2,}/g, "-")
    .replace(/^-|-$/g, "");

  return slug || `section-${index + 1}`;
}

/** Slugs for a whole document, de-duplicated in document order. */
function documentSlugs(sections: LegalSection[]): string[] {
  const used = new Map<string, number>();

  return sections.map((section, index) => {
    const base = slugify(section.heading, index);
    const seen = (used.get(base) ?? 0) + 1;
    used.set(base, seen);
    return seen === 1 ? base : `${base}-${seen}`;
  });
}

function ordinal(index: number): string {
  return String(index + 1).padStart(2, "0");
}

/**
 * The one layout behind the privacy notice, the cookie policy and the terms.
 * A masthead, a table of contents that stays in the margin while the document
 * scrolls, and the document itself set to a readable measure. These are pages
 * people arrive at with a specific question, so the numbering and the anchors
 * matter more than anything decorative.
 */
export function LegalPageLayout({
  locale,
  page,
  updatedLabel,
  updatedDate,
  tocTitle,
  commonDict,
}: {
  locale: Locale;
  page: LegalPage;
  /** "Last updated {date}" */
  updatedLabel: string;
  updatedDate: string;
  tocTitle: string;
  commonDict: CommonDict;
}) {
  const slugs = documentSlugs(page.sections);
  const updated = format(updatedLabel, { date: updatedDate });

  return (
    <>
      <PageHero
        eyebrow={commonDict.footer.legalTitle}
        title={page.title}
        lead={page.lead}
        tone="chalk"
        aside={
          <div className="flex items-center gap-4 rounded-xl border border-line bg-white px-5 py-4">
            <span
              aria-hidden="true"
              className="brand-rule h-9 w-[3px] shrink-0 rounded-full"
            />
            <p className="text-[0.8125rem] leading-snug font-medium text-navy-800">
              {updated}
            </p>
          </div>
        }
      />

      <Section tone="paper" size="md">
        <Container>
          <div className="grid gap-y-12 lg:grid-cols-12 lg:gap-x-12">
            {/* ── Table of contents ─────────────────────────────────────── */}
            <div className="min-w-0 lg:col-span-4">
              <nav
                aria-labelledby="legal-toc-title"
                className={cn(
                  "rounded-2xl border border-line bg-chalk p-5 sm:p-6",
                  "lg:sticky lg:top-28 lg:max-h-[calc(100vh-8rem)] lg:overflow-y-auto",
                  "lg:rounded-none lg:border-0 lg:bg-transparent lg:p-0",
                  "no-scrollbar",
                )}
              >
                <Reveal>
                  <h2 id="legal-toc-title" className="eyebrow text-navy-500">
                    {tocTitle}
                  </h2>
                </Reveal>

                <Reveal delay={60}>
                  <ol className="mt-5 grid border-t border-line sm:grid-cols-2 sm:gap-x-10 lg:grid-cols-1">
                    {page.sections.map((section, index) => (
                      <li key={slugs[index]}>
                        <a
                          href={`#${slugs[index]}`}
                          className="group flex h-full items-baseline gap-3 border-b border-line py-2.5"
                        >
                          <span className="eyebrow shrink-0 text-red-500">
                            {ordinal(index)}
                          </span>
                          <span
                            className={cn(
                              "link-underline text-[0.875rem] leading-[1.45] text-slate-600",
                              "transition-colors duration-200 ease-out-quint",
                              "can-hover:group-hover:text-navy-900",
                            )}
                          >
                            {section.heading}
                          </span>
                        </a>
                      </li>
                    ))}
                  </ol>
                </Reveal>
              </nav>
            </div>

            {/*
              ── The document ─────────────────────────────────────────────
              min-w-0 is load-bearing: a grid item defaults to
              min-width: auto, so the 36rem min-width on the legal tables
              would widen this column past the viewport instead of scrolling
              inside its own overflow container.
            */}
            <div className="min-w-0 lg:col-span-7 lg:col-start-6">
              <div className="flex flex-col gap-10 sm:gap-12">
                {page.sections.map((section, index) => (
                  <section
                    key={slugs[index]}
                    id={slugs[index]}
                    className={cn(
                      "scroll-mt-[calc(var(--header-h)+2rem)]",
                      index > 0 && "border-t border-line pt-10 sm:pt-12",
                    )}
                  >
                    <Reveal>
                      <Eyebrow index={index + 1} />
                    </Reveal>

                    <Reveal delay={60}>
                      {/*
                        A clause heading, not a page section heading: these run
                        a dozen to a document, so they sit a step below the
                        site's h2 scale on purpose.
                      */}
                      <h2 className="mt-3 text-[1.3125rem] leading-[1.25] font-semibold tracking-[-0.015em] text-navy-900 sm:text-[1.5rem]">
                        {section.heading}
                      </h2>
                    </Reveal>

                    {section.paragraphs?.length || section.bullets?.length ? (
                      <Reveal delay={120}>
                        <Prose className="mt-5 [&>ul:first-child]:mt-0">
                          {section.paragraphs?.map((paragraph, i) => (
                            <p key={`p-${i}`}>{paragraph}</p>
                          ))}

                          {section.bullets?.length ? (
                            <ul>
                              {section.bullets.map((bullet, i) => (
                                <li key={`b-${i}`}>{bullet}</li>
                              ))}
                            </ul>
                          ) : null}
                        </Prose>
                      </Reveal>
                    ) : null}

                    {section.table ? (
                      <Reveal delay={180}>
                        <LegalTable
                          columns={section.table.columns}
                          rows={section.table.rows}
                          caption={section.heading}
                        />
                      </Reveal>
                    ) : null}
                  </section>
                ))}
              </div>

              {/* ── Where to write about this document ──────────────────── */}
              <Reveal>
                <aside className="mt-14 rounded-2xl border border-line bg-chalk p-6 sm:mt-16 sm:p-7">
                  <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between sm:gap-10">
                    <div>
                      <Eyebrow>{commonDict.nav.contact}</Eyebrow>
                      <h2 className="mt-3 text-[1.25rem] leading-[1.25] font-semibold tracking-[-0.015em] text-navy-900 sm:text-[1.375rem]">
                        {commonDict.brand.name}
                      </h2>
                      <p className="mt-2 text-[0.9375rem] leading-[1.6] text-slate-600">
                        {commonDict.brand.tagline}
                      </p>
                    </div>

                    <Button
                      href={href(locale, "contact")}
                      variant="outline"
                      size="md"
                      className="shrink-0"
                      trailing={<ArrowRight />}
                    >
                      {commonDict.actions.contact}
                    </Button>
                  </div>
                </aside>
              </Reveal>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
