"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";

import { LOCALE_COOKIE, locales, localeMeta, type Locale } from "@/i18n/config";
import { href, routeKeyFromPathname } from "@/i18n/routes";
import { format } from "@/i18n/format";
import { cn } from "@/lib/cn";

function remember(locale: Locale) {
  // Secure to match the consent cookie: this one decides where src/proxy.ts
  // sends the visitor, so it must not be settable over plain HTTP.
  document.cookie =
    `${LOCALE_COOKIE}=${locale}; path=/; max-age=${60 * 60 * 24 * 365}; samesite=lax` +
    (location.protocol === "https:" ? "; secure" : "");
}

export function LanguageSwitcher({
  locale,
  labels,
  tone = "dark",
  className,
  placement = "bottom",
  forceClosed = false,
}: {
  locale: Locale;
  labels: { label: string; switchTo: string };
  tone?: "dark" | "light";
  className?: string;
  /**
   * Which way the menu opens. Use "top" anywhere the switcher sits inside a
   * clipping container — the footer and the mobile sheet both scroll or hide
   * their overflow, and a downward menu would be cut off.
   */
  placement?: "bottom" | "top";
  /** Set while the switcher's container is being hidden, so the menu goes with it. */
  forceClosed?: boolean;
}) {
  const pathname = usePathname();
  const routeKey = routeKeyFromPathname(pathname);
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const listId = useId();

  // Derived during render rather than in an effect, so the menu is never
  // painted open for a frame inside a container that has just been hidden.
  const [wasForceClosed, setWasForceClosed] = useState(forceClosed);
  if (wasForceClosed !== forceClosed) {
    setWasForceClosed(forceClosed);
    if (forceClosed && open) setOpen(false);
  }

  useEffect(() => {
    if (!open) return;

    const onPointerDown = (event: PointerEvent) => {
      if (!wrapRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      // Take focus back before closing: the list is inerted on close, and an
      // inert ancestor blurs whatever is inside it. Only when focus is in here
      // — Escape pressed elsewhere on the page should not summon it.
      if (wrapRef.current?.contains(document.activeElement)) {
        buttonRef.current?.focus();
      }
      setOpen(false);
    };

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <div ref={wrapRef} className={cn("relative", className)}>
      {/*
        No aria-haspopup: that announces a menu widget, and what opens is a
        plain list of links with no arrow-key model behind it. An expanded
        disclosure needs only aria-expanded and aria-controls.
      */}
      <button
        ref={buttonRef}
        type="button"
        aria-expanded={open}
        aria-controls={listId}
        aria-label={labels.label}
        onClick={() => setOpen((value) => !value)}
        className={cn(
          "press flex h-9 items-center gap-1.5 rounded-full border px-3 text-[0.8125rem] font-semibold transition-colors duration-200 ease-out-quint",
          tone === "dark"
            ? "border-navy-200 text-navy-800 can-hover:hover:border-navy-300 can-hover:hover:bg-navy-50"
            : "border-white/25 text-white can-hover:hover:border-white/50 can-hover:hover:bg-white/10",
        )}
      >
        <GlobeIcon />
        <span>{localeMeta[locale].short}</span>
        <svg
          viewBox="0 0 12 12"
          fill="none"
          aria-hidden="true"
          className={cn(
            "size-3 transition-transform duration-200 ease-out-quint",
            open && "rotate-180",
          )}
        >
          <path d="m3 4.5 3 3 3-3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      <ul
        id={listId}
        aria-label={labels.label}
        inert={!open}
        className={cn(
          "absolute right-0 z-50 w-44 rounded-xl border border-line bg-white p-1.5 shadow-pop",
          "transition-[opacity,transform,visibility] duration-200 ease-out-quint",
          placement === "top"
            ? "bottom-full mb-2 origin-bottom-right"
            : "top-full mt-2 origin-top-right",
          open ? "visible scale-100 opacity-100" : "invisible scale-[0.97] opacity-0",
        )}
      >
        {locales.map((code) => {
          const current = code === locale;
          return (
            <li key={code}>
              <Link
                href={href(code, routeKey)}
                hrefLang={localeMeta[code].htmlLang}
                lang={localeMeta[code].htmlLang}
                aria-current={current ? "true" : undefined}
                aria-label={format(labels.switchTo, { language: localeMeta[code].label })}
                onClick={() => {
                  remember(code);
                  setOpen(false);
                }}
                className={cn(
                  "flex items-center justify-between rounded-lg px-3 py-2 text-sm transition-colors duration-150 ease-out-quint",
                  current
                    ? "bg-navy-50 font-semibold text-navy-900"
                    : "text-slate-600 can-hover:hover:bg-navy-50 can-hover:hover:text-navy-900",
                )}
              >
                <span>{localeMeta[code].label}</span>
                <span className="text-2xs font-semibold tracking-[0.12em] text-slate-400 uppercase">
                  {localeMeta[code].short}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function GlobeIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" className="size-4">
      <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.3" />
      <path
        d="M8 2c1.6 1.6 2.4 3.6 2.4 6S9.6 12.4 8 14M8 2C6.4 3.6 5.6 5.6 5.6 8s.8 4.4 2.4 6M2.4 6h11.2M2.4 10h11.2"
        stroke="currentColor"
        strokeWidth="1.1"
        strokeLinecap="round"
      />
    </svg>
  );
}
