import {
  cambridgeExamIds,
  cambridgeExams,
  levelIds,
  levels,
} from "@/data/catalogue";
import { format } from "@/i18n/format";
import type { ProgrammesDict } from "@/i18n/types";
import { Card } from "@/components/ui/Card";
import { Note } from "@/components/ui/Note";
import { Reveal } from "@/components/ui/Reveal";

const NOTE_ID = "ladder-note";

/**
 * The Cambridge suite as a reference table, not a sales pitch. Current names
 * lead; the pre-2018 abbreviations are kept only as a secondary aid, in
 * brackets, because that is still how most parents in Moldova name the exams.
 */
export function ExamLadder({ dict }: { dict: ProgrammesDict }) {
  const columns = dict.ladder.columns;
  const guided = levelIds.filter((id) => levels[id].guidedHours !== null);

  return (
    <>
      <Reveal className="mt-12 sm:mt-14">
        {/* Full-bleed on phones: the table scrolls rather than squashes. */}
        <div className="-mx-5 overflow-x-auto px-5 sm:mx-0 sm:px-0">
          <table className="w-full min-w-[46rem] border-collapse text-left">
            <caption className="sr-only">{dict.ladder.header.title}</caption>
            <thead>
              <tr className="border-b border-white/20">
                {[
                  columns.exam,
                  columns.legacy,
                  columns.cefr,
                  columns.duration,
                  columns.scale,
                ].map((label) => (
                  <th
                    key={label}
                    scope="col"
                    className="eyebrow pt-0 pr-6 pb-3 align-bottom text-navy-300 last:pr-0"
                  >
                    {label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {cambridgeExamIds.map((id) => {
                const exam = cambridgeExams[id];
                return (
                  <tr
                    key={id}
                    className="border-b border-white/10 transition-colors duration-150 ease-out-quint can-hover:hover:bg-white/[0.045]"
                  >
                    <th
                      scope="row"
                      className="font-display py-4 pr-6 text-[1.0625rem] leading-snug font-medium text-white"
                    >
                      {exam.name}
                    </th>
                    <td className="py-4 pr-6 text-[0.8125rem] text-navy-300">
                      {exam.legacy ? `(${exam.legacy})` : "—"}
                    </td>
                    <td className="py-4 pr-6 text-sm text-navy-100 tabular-nums">
                      {exam.cefr}
                    </td>
                    <td className="py-4 pr-6 text-sm text-navy-100 tabular-nums">
                      {durationLabel(exam.minutes, dict.facts.minutes)}
                    </td>
                    <td className="py-4 text-sm text-navy-100 tabular-nums">
                      {exam.scale}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Reveal>

      <div className="mt-12 grid gap-10 lg:grid-cols-12 lg:gap-14">
        <Reveal delay={60} className="lg:col-span-5">
          <Card tone="navy" className="h-full">
            <p className="eyebrow text-navy-300">{dict.facts.levels}</p>
            <dl aria-describedby={NOTE_ID} className="mt-4">
              {guided.map((id) => (
                <div
                  key={id}
                  className="flex items-baseline justify-between gap-4 border-t border-white/12 py-2.5 first:border-t-0"
                >
                  <dt className="text-[0.875rem] text-navy-200">
                    {dict.levelNames[id]}
                  </dt>
                  <dd className="font-display shrink-0 text-[0.9375rem] font-medium text-white tabular-nums">
                    {levels[id].guidedHours}
                  </dd>
                </div>
              ))}
            </dl>
          </Card>
        </Reveal>

        <Reveal delay={120} className="lg:col-span-7">
          <Note tone="light" id={NOTE_ID}>
            {dict.ladder.note}
          </Note>
        </Reveal>
      </div>
    </>
  );
}

/** 45 → "45 min", 210 → "3h 30", 240 → "4h". */
function durationLabel(minutes: number, minutesTemplate: string): string {
  if (minutes < 60) return format(minutesTemplate, { n: minutes });
  const hours = Math.floor(minutes / 60);
  const rest = minutes % 60;
  return rest === 0
    ? `${hours}h`
    : `${hours}h ${String(rest).padStart(2, "0")}`;
}
