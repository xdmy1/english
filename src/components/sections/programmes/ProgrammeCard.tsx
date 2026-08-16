import {
  levels,
  programmes,
  type ProgrammeFacts,
  type ProgrammeId,
} from "@/data/catalogue";
import { format } from "@/i18n/format";
import type { ProgrammesDict } from "@/i18n/types";
import { Card, FactRow, Tag } from "@/components/ui/Card";
import { CheckList } from "@/components/ui/CheckList";
import { cn } from "@/lib/cn";

/**
 * The most repeated object on the site: one programme, stated in full.
 *
 * Reading order is deliberate — what it is, who it is for, what it costs you in
 * time, what you get. The card carries no link because a programme has no page
 * of its own; the anchor id is what the footer's deep links land on.
 */
export function ProgrammeCard({
  id,
  dict,
  className,
}: {
  id: ProgrammeId;
  dict: ProgrammesDict;
  className?: string;
}) {
  const facts = programmes[id];
  const item = dict.items[id];

  /* Self-describing, so they need no label: "132 academic hours · 2× per week". */
  const load = [
    facts.hours === null ? null : format(dict.facts.hours, { n: facts.hours }),
    facts.sessionsPerWeek === null
      ? null
      : format(dict.facts.perWeek, { n: facts.sessionsPerWeek }),
    facts.minutesPerSession === null
      ? null
      : format(dict.facts.minutes, { n: facts.minutesPerSession }),
  ].filter((entry): entry is string => entry !== null);

  return (
    <article id={id} className={cn("h-full", className)}>
      <Card
        className={cn("h-full", facts.featured && "border-navy-200")}
        tone="paper"
      >
        {facts.featured ? (
          /* The brand's navy-over-red rule, flagging the two flagship routes. */
          <span
            aria-hidden="true"
            className="brand-rule absolute top-7 -left-px h-16 w-[3px] rounded-r-full"
          />
        ) : null}

        {facts.levels.length > 0 ? (
          <ul
            aria-label={dict.facts.levels}
            className="flex flex-wrap items-center gap-1.5"
          >
            {facts.levels.map((level) => (
              <li key={level}>
                <Tag>{levels[level].cefr}</Tag>
              </li>
            ))}
          </ul>
        ) : null}

        <h3 className="mt-5 text-[1.375rem] leading-[1.2] font-semibold tracking-[-0.015em]">
          {item.name}
        </h3>

        <p className="font-display mt-2 text-[0.9375rem] leading-snug text-slate-500 italic">
          {item.tagline}
        </p>

        <p className="mt-4 max-w-[62ch] text-[0.9375rem] leading-[1.7] text-slate-600">
          {item.body}
        </p>

        <dl className="mt-6 border-t border-line">
          <FactRow label={dict.facts.ages} value={ageValue(facts, dict)} />
        </dl>

        {load.length > 0 ? (
          <ul className="flex flex-wrap items-center gap-x-2.5 gap-y-1 border-t border-line py-2.5 text-[0.8125rem] text-slate-600 tabular-nums">
            {load.map((entry, index) => (
              <li key={entry} className="flex items-center gap-2.5">
                {index > 0 ? (
                  <span
                    aria-hidden="true"
                    className="size-1 shrink-0 rounded-full bg-navy-300"
                  />
                ) : null}
                {entry}
              </li>
            ))}
          </ul>
        ) : null}

        <CheckList size="sm" items={item.highlights} className="mt-5" />

        <div className="mt-auto border-t border-line pt-5">
          <p className="eyebrow text-slate-500">{dict.facts.outcomeLabel}</p>
          <p className="mt-2 max-w-[62ch] text-[0.875rem] leading-[1.65] text-slate-600">
            {item.outcome}
          </p>
        </div>
      </Card>
    </article>
  );
}

/** "7–11", "18+" when the band is open-ended, or the dictionary's any-age copy. */
function ageValue(facts: ProgrammeFacts, dict: ProgrammesDict): string {
  if (!facts.ages) return dict.facts.anyAge;
  const [from, to] = facts.ages;
  return to >= 99 ? `${from}+` : `${from}–${to}`;
}
