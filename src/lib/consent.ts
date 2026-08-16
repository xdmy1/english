"use client";

import { useSyncExternalStore } from "react";

/**
 * Cookie-consent store.
 *
 * Nothing beyond `necessary` runs until the visitor opts in, refusing is one
 * click, and the choice is versioned so a change to what we load re-asks.
 */

export const CONSENT_COOKIE = "tbi_consent";
export const CONSENT_VERSION = 1;

export interface ConsentState {
  v: number;
  /** Always true — session, security and language cookies. */
  necessary: true;
  /** Reserved for a future analytics tool. Nothing reads it yet. */
  analytics: boolean;
  /** Third-party map embed on the contact page. */
  maps: boolean;
  /** ISO date the choice was made, so the notice can state it. */
  at: string;
}

export type ConsentCategory = "analytics" | "maps";

export const DEFAULT_CONSENT: Omit<ConsentState, "at"> = {
  v: CONSENT_VERSION,
  necessary: true,
  analytics: false,
  maps: false,
};

const EVENT = "tbi:consent";

function readCookie(name: string): string | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(
    new RegExp(`(?:^|; )${name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}=([^;]*)`),
  );
  return match ? decodeURIComponent(match[1]!) : null;
}

export function readConsent(): ConsentState | null {
  const raw = readCookie(CONSENT_COOKIE);
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw) as ConsentState;
    if (parsed.v !== CONSENT_VERSION) return null;
    return { ...parsed, necessary: true };
  } catch {
    return null;
  }
}

export function writeConsent(next: Pick<ConsentState, "analytics" | "maps">): ConsentState {
  const value: ConsentState = {
    ...DEFAULT_CONSENT,
    ...next,
    at: new Date().toISOString(),
  };
  const oneYear = 60 * 60 * 24 * 365;
  document.cookie = `${CONSENT_COOKIE}=${encodeURIComponent(
    JSON.stringify(value),
  )}; path=/; max-age=${oneYear}; samesite=lax${
    location.protocol === "https:" ? "; secure" : ""
  }`;
  window.dispatchEvent(new CustomEvent<ConsentState>(EVENT, { detail: value }));
  return value;
}

export function clearConsent() {
  document.cookie = `${CONSENT_COOKIE}=; path=/; max-age=0; samesite=lax`;
  window.dispatchEvent(new CustomEvent<ConsentState | null>(EVENT, { detail: null }));
}

/* ── The cookie as an external store ─────────────────────────────────────────
   The choice lives in a cookie, not in React, so it is read with
   useSyncExternalStore rather than copied into state by an effect. The parsed
   value is memoised against the raw cookie string, because getSnapshot must
   return the same reference until something actually changes. */

let cachedRaw: string | null = null;
let cachedValue: ConsentState | null = null;
let primed = false;

function subscribe(onStoreChange: () => void): () => void {
  window.addEventListener(EVENT, onStoreChange);
  return () => window.removeEventListener(EVENT, onStoreChange);
}

function getSnapshot(): ConsentState | null {
  const raw = readCookie(CONSENT_COOKIE);
  if (!primed || raw !== cachedRaw) {
    primed = true;
    cachedRaw = raw;
    cachedValue = readConsent();
  }
  return cachedValue;
}

/** The server has no cookie jar, so it always renders the "not asked" state. */
const getServerSnapshot = (): ConsentState | null => null;
const isHydrated = () => true;
const isNotHydrated = () => false;

/** Reads consent after hydration, so the server-rendered HTML stays cacheable. */
export function useConsent(): {
  consent: ConsentState | null;
  ready: boolean;
  set: (next: Pick<ConsentState, "analytics" | "maps">) => void;
  reset: () => void;
} {
  const consent = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const ready = useSyncExternalStore(subscribe, isHydrated, isNotHydrated);

  return {
    consent,
    ready,
    // Both writers dispatch EVENT, which re-runs getSnapshot for every reader.
    set: (next) => {
      writeConsent(next);
    },
    reset: clearConsent,
  };
}

/** True only once the visitor has actively allowed the category. */
export function useConsentFor(category: ConsentCategory): {
  allowed: boolean;
  ready: boolean;
  allow: () => void;
} {
  const { consent, ready, set } = useConsent();
  return {
    allowed: Boolean(consent?.[category]),
    ready,
    allow: () =>
      set({
        analytics: consent?.analytics ?? false,
        maps: consent?.maps ?? false,
        [category]: true,
      } as Pick<ConsentState, "analytics" | "maps">),
  };
}
