"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import type { Locale } from "@/i18n/config";
import { href } from "@/i18n/routes";
import type { CommonDict } from "@/i18n/types";
import { cn } from "@/lib/cn";
import { useConsent } from "@/lib/consent";
import { Button } from "@/components/ui/Button";

/**
 * Consent notice.
 *
 * Refusing is exactly as easy as accepting — same size, same weight, side by
 * side — nothing is pre-ticked, and no non-essential cookie is written before
 * a choice is made.
 */
export function CookieConsent({
  locale,
  dict,
}: {
  locale: Locale;
  dict: CommonDict["cookieBanner"];
}) {
  const { consent, ready, set } = useConsent();
  const [expanded, setExpanded] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [maps, setMaps] = useState(false);
  const [mounted, setMounted] = useState(false);

  // One frame of delay so the card animates in rather than snapping.
  useEffect(() => {
    if (!ready || consent) return;
    const id = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(id);
  }, [ready, consent]);

  if (!ready || consent) return null;

  return (
    <div
      role="dialog"
      aria-modal="false"
      aria-labelledby="cookie-title"
      className={cn(
        "fixed inset-x-3 bottom-3 z-[60] sm:inset-x-auto sm:bottom-6 sm:left-6 sm:max-w-[26rem]",
        "transition-[opacity,transform] duration-300 ease-out-quint",
        mounted ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0",
      )}
    >
      <div className="overflow-hidden rounded-2xl border border-line bg-white shadow-pop">
        <span aria-hidden="true" className="brand-rule block h-1.5 w-full" />

        <div className="p-5 sm:p-6">
          <h2 id="cookie-title" className="font-display text-lg font-semibold text-navy-900">
            {dict.title}
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-slate-600">
            {dict.body}{" "}
            <Link
              href={href(locale, "cookies")}
              className="link-underline font-medium text-navy-800"
            >
              {dict.readMore}
            </Link>
          </p>

          <div
            className={cn(
              "grid transition-[grid-template-rows,opacity] duration-300 ease-out-quint",
              expanded ? "mt-4 grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
            )}
          >
            <div className="overflow-hidden">
              <ul className="flex flex-col gap-3 border-y border-line py-4">
                <li className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm font-semibold text-navy-900">
                      {dict.categories.necessary.title}
                    </p>
                    <p className="mt-0.5 text-[0.8125rem] leading-relaxed text-slate-500">
                      {dict.categories.necessary.body}
                    </p>
                  </div>
                  <span className="mt-1 shrink-0 rounded-full bg-navy-50 px-2.5 py-1 text-2xs font-semibold tracking-[0.08em] text-navy-700 uppercase">
                    {dict.alwaysOn}
                  </span>
                </li>

                <ConsentToggle
                  title={dict.categories.analytics.title}
                  body={dict.categories.analytics.body}
                  checked={analytics}
                  onChange={setAnalytics}
                />
                <ConsentToggle
                  title={dict.categories.maps.title}
                  body={dict.categories.maps.body}
                  checked={maps}
                  onChange={setMaps}
                />
              </ul>
            </div>
          </div>

          <div className="mt-5 flex flex-wrap items-center gap-2">
            <Button
              size="sm"
              className="flex-1 sm:flex-none"
              onClick={() => set({ analytics: true, maps: true })}
            >
              {dict.acceptAll}
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="flex-1 sm:flex-none"
              onClick={() => set({ analytics: false, maps: false })}
            >
              {dict.rejectAll}
            </Button>
            {expanded ? (
              <Button
                size="sm"
                variant="ghost"
                className="flex-1 sm:flex-none"
                onClick={() => set({ analytics, maps })}
              >
                {dict.save}
              </Button>
            ) : (
              <button
                type="button"
                onClick={() => setExpanded(true)}
                className="link-underline ml-auto text-[0.8125rem] font-medium text-slate-600"
              >
                {dict.customise}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function ConsentToggle({
  title,
  body,
  checked,
  onChange,
}: {
  title: string;
  body: string;
  checked: boolean;
  onChange: (value: boolean) => void;
}) {
  return (
    <li className="flex items-start justify-between gap-4">
      <div>
        <p className="text-sm font-semibold text-navy-900">{title}</p>
        <p className="mt-0.5 text-[0.8125rem] leading-relaxed text-slate-500">{body}</p>
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        aria-label={title}
        onClick={() => onChange(!checked)}
        className={cn(
          "mt-1 flex h-6 w-11 shrink-0 items-center rounded-full p-0.5 transition-colors duration-200 ease-out-quint",
          checked ? "bg-navy-800" : "bg-slate-300",
        )}
      >
        <span
          className={cn(
            "size-5 rounded-full bg-white shadow-sm transition-transform duration-200 ease-out-quint",
            checked ? "translate-x-5" : "translate-x-0",
          )}
        />
      </button>
    </li>
  );
}

/** Footer link that re-opens the choice. */
export function CookieSettingsButton({ label }: { label: string }) {
  const { reset } = useConsent();
  return (
    <button
      type="button"
      onClick={() => {
        reset();
        window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
      }}
      className="link-underline text-left"
    >
      {label}
    </button>
  );
}
