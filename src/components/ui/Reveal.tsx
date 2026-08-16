"use client";

import { useEffect, useRef, type ElementType, type ReactNode } from "react";

import { cn } from "@/lib/cn";

/**
 * Scroll reveal. Deliberately small: 10px of travel and 480ms, once only.
 * The transition is plain CSS so it keeps running off the main thread while
 * the rest of the page is still loading.
 *
 * Content is always present in the HTML — only opacity is animated — and a
 * <noscript> rule below un-hides everything when JavaScript is unavailable.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  as: As = "div",
  y = 10,
}: {
  children: ReactNode;
  className?: string;
  /** Stagger in ms. Keep siblings 40–80ms apart. */
  delay?: number;
  as?: ElementType;
  y?: number;
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    // The reveal is a CSS state on the element, not React state: flipping an
    // attribute avoids a render pass per element on a page that has dozens.
    const show = () => node.setAttribute("data-shown", "");

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      show();
      return;
    }

    // Already in view on first paint (above the fold) — show without waiting.
    if (node.getBoundingClientRect().top < window.innerHeight * 0.92) {
      show();
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            show();
            observer.disconnect();
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.01 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <As
      ref={ref}
      data-reveal=""
      className={cn("reveal", className)}
      style={
        {
          "--reveal-delay": `${delay}ms`,
          "--reveal-y": `${y}px`,
        } as React.CSSProperties
      }
    >
      {children}
    </As>
  );
}
