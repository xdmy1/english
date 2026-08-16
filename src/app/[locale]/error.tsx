"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Section";
import { commonFor, localeFromPathname } from "./boundary-dictionary";

/**
 * The boundary sits inside [locale]/layout.tsx, so the header and footer around
 * it are already in the visitor's language. Loading a dictionary here would mean
 * awaiting a chunk on the one screen where something has already failed, so the
 * three `common` dictionaries are imported statically and picked by pathname.
 */
export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const dict = commonFor(localeFromPathname(usePathname()));

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <Container className="flex flex-col items-start py-24 sm:py-32">
      <span aria-hidden="true" className="brand-rule block h-1.5 w-16" />
      <h1 className="font-display mt-8 max-w-2xl text-4xl leading-tight font-semibold text-navy-900">
        {dict.errorPage.title}
      </h1>
      <p className="mt-4 max-w-xl text-[1.0625rem] leading-relaxed text-slate-600">
        {dict.errorPage.body}
      </p>
      {error.digest ? (
        // A bare reference, marked with a hash rather than a word: there is no
        // dictionary key for the label, and a number sign needs no translating.
        <p className="mt-3 font-mono text-[0.75rem] text-slate-500">#{error.digest}</p>
      ) : null}
      <Button onClick={reset} size="lg" className="mt-8">
        {dict.errorPage.retry}
      </Button>
    </Container>
  );
}
