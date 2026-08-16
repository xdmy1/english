"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import type { Locale } from "@/i18n/config";
import { href } from "@/i18n/routes";
import type { CommonDict } from "@/i18n/types";
import { cn } from "@/lib/cn";
import { readConsent, useConsent, type ConsentState } from "@/lib/consent";
import { Button } from "@/components/ui/Button";
import { Tag } from "@/components/ui/Card";

/**
 * Re-opening the notice must not touch what is stored.
 *
 * The cookie policy promises two things at once: that the banner comes back
 * "with your current choices shown", and that we keep the date of the answer
 * and the version of the banner it was given to. Clearing the cookie to bring
 * the banner back would delete exactly the record art. 7(1) of Legea nr.
 * 195/2024 expects us to be able to produce — and would leave a visitor who
 * only wanted a look at their settings with no choice stored at all. So the
 * footer button broadcasts a request to show the panel, carrying the stored
 * value with it; nothing is written until Accept, Reject or Save is pressed.
 */
const REOPEN_EVENT = "tbi:consent-reopen";

/**
 * Consent notice.
 *
 * Refusing is exactly as easy as accepting — same size, same variant, side by
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
  const [reopened, setReopened] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [maps, setMaps] = useState(false);
  const [mounted, setMounted] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const returnFocusRef = useRef<HTMLElement | null>(null);

  const open = ready && (!consent || reopened);

  useEffect(() => {
    const onReopen = (event: Event) => {
      const stored = (event as CustomEvent<ConsentState | null>).detail;
      // Seed from the record rather than from the defaults, so the switch
      // shows what the visitor actually chose last time.
      setMaps(stored?.maps ?? false);
      setExpanded(true);
      setReopened(true);
      returnFocusRef.current = document.activeElement as HTMLElement | null;
    };
    window.addEventListener(REOPEN_EVENT, onReopen);
    return () => window.removeEventListener(REOPEN_EVENT, onReopen);
  }, []);

  // One frame of delay so the card animates in rather than snapping.
  useEffect(() => {
    if (!open) return;
    const id = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(id);
  }, [open]);

  // Answering from the footer unmounts the card under the pointer. Hand focus
  // back to the control that asked for it instead of dropping it on <body>.
  useEffect(() => {
    if (open) return;
    const target = returnFocusRef.current;
    returnFocusRef.current = null;
    target?.focus();
  }, [open]);

  // Brought back deliberately, so say so: focus the card and let the dialog's
  // name be announced.
  useEffect(() => {
    if (reopened) cardRef.current?.focus();
  }, [reopened]);

  /*
    The card is fixed over the foot of the viewport, so an element the browser
    scrolls into view — a footer link reached by Tab — can land underneath it
    (WCAG 2.4.11). Reserve its height on the scrollport for as long as it is
    up. Measured rather than guessed: the three languages set three heights,
    and expanding the panel changes it again.
  */
  useEffect(() => {
    const card = cardRef.current;
    if (!open || !card) return;

    const root = document.documentElement;
    const previous = root.style.scrollPaddingBottom;
    const measure = () => {
      root.style.scrollPaddingBottom = `${card.offsetHeight + 24}px`;
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(card);
    return () => {
      observer.disconnect();
      root.style.scrollPaddingBottom = previous;
    };
  }, [open]);

  if (!open) return null;

  const choose = (next: Pick<ConsentState, "analytics" | "maps">) => {
    set(next);
    setReopened(false);
    setExpanded(false);
    // Back to the pre-entry position, so a later re-open animates in again.
    setMounted(false);
  };

  return (
    <div
      ref={cardRef}
      role="dialog"
      aria-modal="false"
      aria-labelledby="cookie-title"
      tabIndex={-1}
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

          {/*
            Collapsing to 0fr clips the panel but leaves it in the tab order and
            the accessibility tree — the switches would be announced, and
            focusable, before anyone has asked to see them. `inert` is what
            actually takes them out until the panel is open.
          */}
          <div
            inert={!expanded}
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
                  <Tag className="mt-1 shrink-0">{dict.alwaysOn}</Tag>
                </li>

                {/*
                  There is no analytics category here because the site runs no
                  analytics. The cookie policy promises one will appear in this
                  banner, off by default, if measurement is ever added — so
                  offering the switch today would contradict it and ask for
                  consent to nothing.
                */}
                <ConsentToggle
                  title={dict.categories.maps.title}
                  body={dict.categories.maps.body}
                  checked={maps}
                  onChange={setMaps}
                />
              </ul>
            </div>
          </div>

          {/*
            Both answers carry the same variant. Refusal rendered as the quieter
            outline against a filled Accept is the nudge the brief rules out,
            and the README promises refusal "at equal prominence".
          */}
          <div className="mt-5 flex flex-wrap items-center gap-2">
            <Button
              size="sm"
              className="flex-1 sm:flex-none"
              onClick={() => choose({ analytics: false, maps: true })}
            >
              {dict.acceptAll}
            </Button>
            <Button
              size="sm"
              className="flex-1 sm:flex-none"
              onClick={() => choose({ analytics: false, maps: false })}
            >
              {dict.rejectAll}
            </Button>
            {expanded ? (
              <Button
                size="sm"
                variant="ghost"
                className="flex-1 sm:flex-none"
                onClick={() => choose({ analytics: false, maps })}
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
      {/*
        The off track is slate-500, not a pale grey: at 4.8:1 on the white card
        both the control itself and the white knob that carries its state clear
        the 3:1 WCAG 1.4.11 asks for. A slate-300 pill with a white dot in it is
        1.6:1 twice over — invisible, in both directions, to the people most
        likely to be checking what they agreed to.
      */}
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        aria-label={title}
        onClick={() => onChange(!checked)}
        className={cn(
          "mt-1 flex h-6 w-11 shrink-0 items-center rounded-full p-0.5 transition-colors duration-200 ease-out-quint",
          checked ? "bg-navy-800" : "bg-slate-500",
        )}
      >
        <span
          className={cn(
            "size-5 rounded-full bg-white shadow-[0_1px_2px_rgb(15_30_82/0.16)] transition-transform duration-200 ease-out-quint",
            checked ? "translate-x-5" : "translate-x-0",
          )}
        />
      </button>
    </li>
  );
}

/** Footer link that re-opens the choice without disturbing what is stored. */
export function CookieSettingsButton({ label }: { label: string }) {
  return (
    <button
      type="button"
      onClick={() => {
        window.dispatchEvent(
          new CustomEvent<ConsentState | null>(REOPEN_EVENT, {
            detail: readConsent(),
          }),
        );
      }}
      className="link-underline text-left"
    >
      {label}
    </button>
  );
}
