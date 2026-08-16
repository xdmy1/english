"use client";

import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";

import { localeMeta, type Locale } from "@/i18n/config";

const useIsomorphicLayoutEffect =
  typeof window === "undefined" ? useEffect : useLayoutEffect;

/** Strong ease-out, matching --ease-out-quint. */
function easeOutQuint(t: number): number {
  return 1 - Math.pow(1 - t, 5);
}

/**
 * Counts a headline number up once, when it scrolls into view.
 *
 * The final value is what the server renders, so search engines and users
 * without JavaScript always see the real figure; the count-down to zero
 * happens in a layout effect, before the browser paints.
 */
export function CountUp({
  value,
  locale,
  decimals = 0,
  prefix = "",
  suffix = "",
  duration = 1500,
  className,
}: {
  value: number;
  locale: Locale;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(value);
  const animated = useRef(false);

  // Memoised because the count is ~90 renders long: building an
  // Intl.NumberFormat per frame spends the animation budget in ICU setup.
  const formatter = useMemo(
    () =>
      new Intl.NumberFormat(localeMeta[locale].intl, {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      }),
    [locale, decimals],
  );

  useIsomorphicLayoutEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setDisplay(0);
  }, []);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;

    const run = () => {
      if (animated.current) return;
      animated.current = true;
      const start = performance.now();

      const step = (now: number) => {
        const t = Math.min((now - start) / duration, 1);
        setDisplay(value * easeOutQuint(t));
        if (t < 1) frame = requestAnimationFrame(step);
        else setDisplay(value);
      };

      frame = requestAnimationFrame(step);
    };

    if (node.getBoundingClientRect().top < window.innerHeight * 0.9) {
      run();
    } else {
      const observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              run();
              observer.disconnect();
            }
          }
        },
        { threshold: 0.4 },
      );
      observer.observe(node);
      return () => {
        observer.disconnect();
        cancelAnimationFrame(frame);
      };
    }

    return () => cancelAnimationFrame(frame);
  }, [value, duration]);

  return (
    <span ref={ref} className={className} data-numeric>
      {prefix}
      {formatter.format(display)}
      {suffix}
    </span>
  );
}
