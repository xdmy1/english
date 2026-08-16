import { Tag } from "@/components/ui/Card";
import { Carousel, type CarouselSlide } from "@/components/ui/Carousel";
import { Container, Section, SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { roomIds, rooms } from "@/data/catalogue";
import type { Locale } from "@/i18n/config";
import { formatNumber } from "@/i18n/format";
import type { AboutDict, CommonDict } from "@/i18n/types";

/**
 * Placeholder artwork, in the order the dictionary lists the gallery.
 * Replaced file-for-file once the centre supplies its own photographs.
 */
const galleryArtwork = [
  "/facilities/classroom.svg",
  "/facilities/computer-lab.svg",
  "/facilities/library.svg",
  "/facilities/reception.svg",
] as const;

/**
 * A seating plan in miniature: one mark per chair, two rows deep, so the
 * capacity of a room reads as a picture before it reads as a figure.
 */
function SeatPlan({ seats }: { seats: number }) {
  return (
    <span
      aria-hidden="true"
      className="hidden grid-flow-col grid-rows-2 gap-[3px] sm:grid"
    >
      {Array.from({ length: seats }, (_, i) => (
        <span key={i} className="block size-[5px] rounded-[1px] bg-navy-300" />
      ))}
    </span>
  );
}

export function Facilities({
  t,
  locale,
  actions,
  photoPlaceholder,
  index,
}: {
  t: AboutDict["facilities"];
  locale: Locale;
  actions: CommonDict["actions"];
  /** "Photo to follow" — the artwork below is ours, not a photograph yet. */
  photoPlaceholder: string;
  index: number;
}) {
  const slides: CarouselSlide[] = t.gallery
    .slice(0, galleryArtwork.length)
    .map((entry, i) => ({
      src: galleryArtwork[i],
      alt: entry.alt,
      caption: entry.caption,
    }));

  return (
    <Section id="facilities" tone="chalk">
      <Container>
        <SectionHeading
          eyebrow={t.header.eyebrow}
          title={t.header.title}
          lead={t.header.lead}
          index={index}
        />

        <ul className="mt-14 grid gap-x-14 gap-y-8 sm:mt-16 sm:grid-cols-2">
          {roomIds.map((id, i) => (
            <Reveal as="li" key={id} delay={Math.min(i, 3) * 50}>
              <div className="border-t border-line pt-5">
                <div className="flex items-center justify-between gap-4">
                  <h3 className="text-[1.0625rem] font-semibold text-navy-900">
                    {t.rooms[id].name}
                  </h3>
                  <span className="flex items-center gap-2.5">
                    <SeatPlan seats={rooms[id].seats} />
                    <span className="font-display text-[0.9375rem] font-semibold text-navy-700 tabular-nums">
                      {formatNumber(locale, rooms[id].seats)}
                    </span>
                  </span>
                </div>
                <p className="mt-2 text-[0.875rem] leading-[1.7] text-slate-600">
                  {t.rooms[id].body}
                </p>
              </div>
            </Reveal>
          ))}
        </ul>

        {slides.length > 0 ? (
          <Reveal delay={60}>
            <Carousel
              className="mt-16 sm:mt-20"
              slides={slides}
              labels={{
                previous: actions.previous,
                next: actions.next,
                goToSlide: actions.goToSlide,
                region: t.header.title,
                gallery: actions.gallery,
                slide: actions.slide,
              }}
            />
          </Reveal>
        ) : null}

        <Reveal delay={80}>
          <div className="mt-7 flex max-w-3xl flex-col items-start gap-3 sm:flex-row sm:items-baseline sm:gap-5">
            <Tag tone="muted" className="shrink-0">
              {photoPlaceholder}
            </Tag>
            <p className="text-[0.8125rem] leading-[1.7] text-slate-500">
              {t.galleryNote}
            </p>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
