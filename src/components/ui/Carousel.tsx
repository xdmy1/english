"use client";

import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { cn } from "@/lib/cn";

export interface CarouselSlide {
  src: string;
  alt: string;
  caption: string;
}

/**
 * Photo carousel with drag, keyboard control and a light parallax on the
 * image inside each frame. Autoplay pauses on hover, on focus, on any
 * interaction, and never starts when the visitor prefers reduced motion.
 */
export function Carousel({
  slides,
  labels,
  className,
}: {
  slides: CarouselSlide[];
  /**
   * `gallery` and `slide` are aria-roledescriptions, which a screen reader
   * speaks verbatim — so unlike a role name they have to arrive translated.
   */
  labels: {
    previous: string;
    next: string;
    goToSlide: string;
    region: string;
    gallery: string;
    slide: string;
  };
  className?: string;
}) {
  // Held in state, not a ref: the plugin instance must be created once, and a
  // ref cannot be read during render to build the plugin list.
  const [autoplay] = useState(() =>
    Autoplay({ delay: 6000, stopOnInteraction: true, stopOnMouseEnter: true }),
  );
  const plugins = useMemo(() => [autoplay], [autoplay]);

  const [emblaRef, embla] = useEmblaCarousel(
    { loop: true, align: "start", duration: 26, skipSnaps: false },
    plugins,
  );

  const [selected, setSelected] = useState(0);
  const parallaxRef = useRef<Array<HTMLDivElement | null>>([]);
  const scrubRef = useRef<HTMLSpanElement>(null);
  const lastProgress = useRef(0);

  const onSelect = useCallback(() => {
    if (!embla) return;
    setSelected(embla.selectedScrollSnap());
  }, [embla]);

  // DOM writes only, so it is safe to run on mount without touching state.
  const applyParallax = useCallback(() => {
    if (!embla) return;
    const engine = embla.internalEngine();
    const scrollProgress = embla.scrollProgress();

    embla.scrollSnapList().forEach((snap, index) => {
      let diff = snap - scrollProgress;

      if (engine.options.loop) {
        for (const loopItem of engine.slideLooper.loopPoints) {
          const target = loopItem.target();
          if (index === loopItem.index && target !== 0) {
            const sign = Math.sign(target);
            if (sign === -1) diff = snap - (1 + scrollProgress);
            if (sign === 1) diff = snap + (1 - scrollProgress);
          }
        }
      }

      const node = parallaxRef.current[index];
      if (node) node.style.transform = `translate3d(${diff * -14}%,0,0)`;
    });
  }, [embla]);

  // Also DOM writes only. The scrub bar moves every frame of every drag, and
  // routing that through state re-rendered the whole carousel each time.
  const onScroll = useCallback(() => {
    if (!embla) return;
    const next = Math.max(0, Math.min(1, embla.scrollProgress()));
    const bar = scrubRef.current;

    if (bar) {
      // Looping carries scrollProgress from ~1 back to ~0 in a single frame.
      // Easing that sends the bar the full width of the track backwards while
      // the slides travel forwards, so the wrap is made instantly instead.
      bar.style.transitionProperty =
        Math.abs(next - lastProgress.current) > 0.5 ? "none" : "";
      bar.style.transform = `translateX(${next * (slides.length - 1) * 100}%)`;
    }

    lastProgress.current = next;
    applyParallax();
  }, [embla, applyParallax, slides.length]);

  useEffect(() => {
    if (!embla) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      autoplay.stop();
    }

    // Position the plates for first paint. The scrub bar and `selected` are
    // already rendered at the values embla reports for index 0.
    applyParallax();

    embla.on("select", onSelect);
    embla.on("reInit", onSelect);
    embla.on("scroll", onScroll);
    embla.on("reInit", onScroll);

    return () => {
      embla.off("select", onSelect);
      embla.off("reInit", onSelect);
      embla.off("scroll", onScroll);
      embla.off("reInit", onScroll);
    };
  }, [embla, autoplay, onSelect, onScroll, applyParallax]);

  const scrollTo = (index: number) => embla?.scrollTo(index);

  return (
    <div
      className={cn("group/carousel relative", className)}
      role="region"
      aria-roledescription={labels.gallery}
      aria-label={labels.region}
    >
      <div className="overflow-hidden rounded-2xl" ref={emblaRef}>
        <div className="flex touch-pan-y">
          {slides.map((slide, index) => (
            <div
              key={slide.src}
              className="relative min-w-0 flex-[0_0_100%] pl-0 sm:flex-[0_0_78%] sm:pr-4 lg:flex-[0_0_62%]"
              role="group"
              aria-roledescription={labels.slide}
              aria-label={`${index + 1} / ${slides.length}`}
            >
              <figure className="relative overflow-hidden rounded-2xl bg-navy-900">
                <div className="relative aspect-[4/3] overflow-hidden sm:aspect-[3/2]">
                  <div
                    ref={(node) => {
                      parallaxRef.current[index] = node;
                    }}
                    className="absolute inset-0 scale-[1.16] will-change-transform"
                  >
                    <Image
                      src={slide.src}
                      alt={slide.alt}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 78vw, 62vw"
                      className="object-cover"
                    />
                  </div>
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-navy-950/85 to-transparent"
                  />
                </div>
                <figcaption className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end gap-3 p-5 sm:p-6">
                  <span
                    aria-hidden="true"
                    className="mb-[0.45rem] block h-[3px] w-7 shrink-0 bg-red-500"
                  />
                  <span className="font-display text-base leading-snug font-medium text-white sm:text-lg">
                    {slide.caption}
                  </span>
                </figcaption>
              </figure>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 flex items-center gap-5">
        <div className="flex items-center gap-2">
          <CarouselButton
            label={labels.previous}
            onClick={() => embla?.scrollPrev()}
            direction="prev"
          />
          <CarouselButton
            label={labels.next}
            onClick={() => embla?.scrollNext()}
            direction="next"
          />
        </div>

        {/* Scrub bar doubles as the progress indicator. The travelling bar is
            a fixed width and only its transform changes. It is already on
            screen and moves both ways, so it eases in and out. */}
        <div className="relative h-px flex-1 bg-line">
          <span
            ref={scrubRef}
            aria-hidden="true"
            className="absolute top-[-1px] left-0 h-[3px] bg-navy-800 transition-transform duration-250 ease-in-out-quint"
            style={{ width: `${100 / slides.length}%` }}
          />
        </div>

        {/* Dots sit on a fixed 24px grid and only the pill inside each one
            scales, so the row never animates its own width. */}
        <div className="flex items-center">
          {slides.map((slide, index) => (
            <button
              key={slide.src}
              type="button"
              onClick={() => scrollTo(index)}
              aria-label={labels.goToSlide.replace("{n}", String(index + 1))}
              aria-current={selected === index}
              className="group/dot flex size-6 items-center justify-center"
            >
              <span
                aria-hidden="true"
                className={cn(
                  "block h-1.5 w-4 origin-center rounded-full",
                  "transition-[transform,background-color] duration-200 ease-out-quint",
                  selected === index
                    ? "scale-x-100 bg-navy-800"
                    : // navy-200 was 1.5:1 on white — the unselected dots read
                      // as nothing at all, so the row looked like one control.
                      "scale-x-[0.375] bg-navy-400 can-hover:group-hover/dot:bg-navy-500",
                )}
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function CarouselButton({
  label,
  onClick,
  direction,
}: {
  label: string;
  onClick: () => void;
  direction: "prev" | "next";
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="press flex size-10 items-center justify-center rounded-full border border-navy-200 bg-white text-navy-800 transition-colors duration-200 ease-out-quint can-hover:hover:border-navy-300 can-hover:hover:bg-navy-50"
    >
      <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" className="size-4">
        <path
          d={direction === "prev" ? "M13 8H3m0 0 3.75-3.75M3 8l3.75 3.75" : "M3 8h10m0 0-3.75-3.75M13 8l-3.75 3.75"}
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}
