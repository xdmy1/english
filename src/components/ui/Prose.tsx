import type { ReactNode } from "react";

import { cn } from "@/lib/cn";

/**
 * Long-form typography for the legal pages. Deliberately narrow (about 68
 * characters) and set in the display serif, because these are documents
 * people occasionally have to read properly.
 */
export function Prose({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "max-w-[68ch] text-[0.9375rem] leading-[1.75] text-slate-700",
        "[&_a]:font-medium [&_a]:text-navy-800 [&_a]:underline [&_a]:underline-offset-2",
        "[&_p+p]:mt-4",
        "[&_strong]:font-semibold [&_strong]:text-navy-900",
        "[&_ul]:mt-4 [&_ul]:flex [&_ul]:flex-col [&_ul]:gap-2",
        "[&_li]:relative [&_li]:pl-5",
        "[&_li]:before:absolute [&_li]:before:left-0 [&_li]:before:top-[0.72em] [&_li]:before:size-1.5 [&_li]:before:rounded-full [&_li]:before:bg-red-400",
        className,
      )}
    >
      {children}
    </div>
  );
}

/** Table used inside legal documents (cookie register, processing purposes). */
export function LegalTable({
  columns,
  rows,
  caption,
}: {
  columns: string[];
  rows: string[][];
  caption?: string;
}) {
  return (
    <div className="mt-6 overflow-x-auto rounded-xl border border-line">
      <table className="w-full min-w-[36rem] border-collapse text-left text-[0.875rem]">
        {caption ? <caption className="sr-only">{caption}</caption> : null}
        <thead>
          <tr className="bg-chalk">
            {columns.map((column) => (
              <th
                key={column}
                scope="col"
                className="border-b border-line px-4 py-3 text-2xs font-semibold tracking-[0.08em] text-navy-700 uppercase"
              >
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={index} className="align-top">
              {row.map((cell, cellIndex) => (
                <td
                  key={cellIndex}
                  className="border-b border-line px-4 py-3.5 leading-relaxed text-slate-700 last:border-r-0"
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
