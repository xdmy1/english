"use client";

import { useEffect } from "react";

import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Section";

/**
 * Deliberately not translated: this renders when something has already gone
 * wrong, so it must not depend on loading a dictionary.
 */
export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <Container className="flex flex-col items-start py-24 sm:py-32">
      <p className="eyebrow text-red-500">Error</p>
      <h1 className="font-display mt-4 max-w-2xl text-4xl leading-tight font-semibold text-navy-900">
        Something went wrong on this page
      </h1>
      <p className="mt-4 max-w-xl text-[1.0625rem] leading-relaxed text-slate-600">
        The page could not be displayed. Try again, and if it keeps happening please call or email us
        using the details in the footer.
      </p>
      {error.digest ? (
        <p className="mt-3 font-mono text-[0.75rem] text-slate-400">Reference: {error.digest}</p>
      ) : null}
      <Button onClick={reset} size="lg" className="mt-8">
        Try again
      </Button>
    </Container>
  );
}
