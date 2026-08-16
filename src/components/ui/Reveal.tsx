"use client";

import { useEffect, useRef, type ElementType, type ReactNode } from "react";

/*
  One observer and one media query for the whole document. A page carries
  80–90 reveals; giving each its own IntersectionObserver — and its own
  getBoundingClientRect, interleaved with the attribute writes of the reveal
  before it — turned the hydration commit into dozens of forced reflows.

  The manual "am I above the fold?" measurement is gone with it: the bottom
  rootMargin already shrinks the viewport by 8%, so the observer's first
  callback reports exactly the elements the measurement used to catch.
*/
let observer: IntersectionObserver | null = null;
const waiting = new WeakMap<Element, () => void>();
let reducedMotion: MediaQueryList | null = null;

function watch(node: Element, show: () => void) {
  observer ??= new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        waiting.get(entry.target)?.();
        waiting.delete(entry.target);
        observer?.unobserve(entry.target);
      }
    },
    { rootMargin: "0px 0px -8% 0px", threshold: 0.01 },
  );

  waiting.set(node, show);
  observer.observe(node);

  return () => {
    waiting.delete(node);
    observer?.unobserve(node);
  };
}

/**
 * Scroll reveal. Deliberately small: 10px of travel and 520ms, once only.
 * The transition is plain CSS so it keeps running off the main thread while
 * the rest of the page is still loading.
 *
 * Content is always present in the HTML, and globals.css only hides it once
 * an inline head script has confirmed JavaScript is running — see the note
 * beside the `.reveal` rule. Keep first-viewport content out of here anyway:
 * an LCP element that waits for hydration is an LCP element measured late.
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

    reducedMotion ??= window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reducedMotion.matches) {
      show();
      return;
    }

    return watch(node, show);
  }, []);

  return (
    <As
      ref={ref}
      data-reveal=""
      // Joined rather than merged: "reveal" is a base-layer class of our own
      // and shares no conflict group with anything a caller can pass, so the
      // tailwind-merge pass was 80-odd no-ops per page during hydration.
      className={className ? `reveal ${className}` : "reveal"}
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
