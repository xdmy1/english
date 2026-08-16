import type { Metadata } from "next";
import { notFound } from "next/navigation";

import {
  Timetable,
  type TimetableOption,
  type TimetableOptionGroup,
  type TimetableSlot,
} from "@/components/schedule/Timetable";
import { CtaBand } from "@/components/site/CtaBand";
import { NotePanel } from "@/components/ui/Note";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { Container, Section, SectionHeading } from "@/components/ui/Section";
import { StatCard } from "@/components/ui/StatCard";
import {
  levelIds,
  levels,
  programmeGroupIds,
  programmes,
  programmesByGroup,
  roomIds,
  type ProgrammeGroupId,
} from "@/data/catalogue";
import {
  dayIds,
  isSample,
  scheduleBounds,
  slots,
  term,
  toMinutes,
} from "@/data/schedule";
import { isPlaceholderName, monogram, team, type TeamMemberId } from "@/data/team";
import { isLocale, type Locale } from "@/i18n/config";
import { format, formatDate } from "@/i18n/format";
import { getDictionary } from "@/i18n/get-dictionary";
import { pageMetadata } from "@/lib/metadata";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata(props: Props): Promise<Metadata> {
  const { locale } = await props.params;
  if (!isLocale(locale)) return {};
  const dict = await getDictionary(locale);
  return pageMetadata({
    locale,
    route: "schedule",
    title: dict.schedule.seo.title,
    description: dict.schedule.seo.description,
  });
}

export default async function SchedulePage(props: Props) {
  const { locale } = await props.params;
  if (!isLocale(locale)) notFound();

  const typedLocale = locale as Locale;
  const dict = await getDictionary(typedLocale);
  const t = dict.schedule;

  /* ── Term ──────────────────────────────────────────────────────────────── */

  const dayMonth: Intl.DateTimeFormatOptions = { day: "numeric", month: "long" };
  const termRange = format(t.term.label, {
    start: formatDate(typedLocale, term.startDate, dayMonth),
    end: formatDate(typedLocale, term.endDate, dayMonth),
  });
  const termName = t.term[term.labelKey];

  /* ── Rows ──────────────────────────────────────────────────────────────── */

  // A teacher whose real name has not been supplied yet is shown as the
  // placeholder badge with the id's digit, so the six of them stay tellable
  // apart in the filter without inventing a name for anyone.
  const memberById = new Map(team.map((member) => [member.id, member]));
  const teacherName = (id: TeamMemberId): string => {
    const member = memberById.get(id);
    if (!member) return dict.common.placeholder.badge;
    return isPlaceholderName(member.name)
      ? `${dict.common.placeholder.badge} · ${monogram(member)}`
      : member.name;
  };

  const dayOrder = new Map(dayIds.map((id, index) => [id, index]));

  const rows: TimetableSlot[] = slots
    .map((slot) => ({
      id: slot.id,
      day: slot.day,
      start: slot.start,
      end: slot.end,
      startMin: toMinutes(slot.start),
      endMin: toMinutes(slot.end),
      group: slot.group,
      programmeId: slot.programmeId,
      programmeGroupId: programmes[slot.programmeId].group,
      programmeName: dict.programmes.items[slot.programmeId].name,
      levelId: slot.levelId,
      levelShort: levels[slot.levelId].cefr,
      teacherId: slot.teacherId,
      teacherName: teacherName(slot.teacherId),
      roomId: slot.roomId,
      roomName: t.rooms[slot.roomId].name,
      roomShort: t.rooms[slot.roomId].short,
    }))
    .sort(
      (a, b) =>
        (dayOrder.get(a.day) ?? 0) - (dayOrder.get(b.day) ?? 0) ||
        a.startMin - b.startMin ||
        a.group.localeCompare(b.group),
    );

  /* ── Filter options — only what the timetable actually contains ────────── */

  const usedProgrammes = new Set(rows.map((row) => row.programmeId));
  const usedLevels = new Set(rows.map((row) => row.levelId));
  const usedTeachers = new Set(rows.map((row) => row.teacherId));
  const usedRooms = new Set(rows.map((row) => row.roomId));
  const usedGroups = new Set(rows.map((row) => row.programmeGroupId));

  const programmeOptions: TimetableOptionGroup[] = programmeGroupIds
    .map((group) => ({
      label: dict.programmes.groups[group].title,
      items: programmesByGroup[group]
        .filter((id) => usedProgrammes.has(id))
        .map((id) => ({ value: id, label: dict.programmes.items[id].name })),
    }))
    .filter((group) => group.items.length > 0);

  const levelOptions: TimetableOption[] = levelIds
    .filter((id) => usedLevels.has(id))
    .map((id) => ({ value: id, label: dict.programmes.levelNames[id] }));

  const teacherOptions: TimetableOption[] = team
    .filter((member) => usedTeachers.has(member.id))
    .map((member) => ({ value: member.id, label: teacherName(member.id) }));

  const roomOptions: TimetableOption[] = roomIds
    .filter((id) => usedRooms.has(id))
    .map((id) => ({ value: id, label: t.rooms[id].name }));

  const dayOptions: TimetableOption[] = dayIds.map((id) => ({
    value: id,
    label: t.days[id].long,
  }));

  const groupLabels = Object.fromEntries(
    programmeGroupIds.map((group) => [group, dict.programmes.groups[group].title]),
  ) as Record<ProgrammeGroupId, string>;

  const days = dayIds.map((id) => ({
    id,
    long: t.days[id].long,
    short: t.days[id].short,
  }));

  return (
    <>
      <PageHero
        eyebrow={t.hero.eyebrow}
        title={t.hero.title}
        lead={t.hero.lead}
        tone="chalk"
        aside={
          <StatCard
            size="sm"
            eyebrow={termName}
            value={termRange}
            className="lg:w-[19rem]"
          />
        }
      />

      {/* ── The timetable ─────────────────────────────────────────────────── */}
      <Section id="timetable" tone="paper">
        <Container width="wide">
          <SectionHeading index={1} eyebrow={termName} title={t.filters.title} />

          {/* Rendered only while src/data/schedule.ts still holds illustrative
              rows. Flip `isSample` to false and it goes with the sample. */}
          {isSample ? (
            <Reveal delay={60} className="mt-10 sm:mt-12">
              <NotePanel
                as="aside"
                title={t.sampleNotice.title}
                titleId="sample-notice"
                className="max-w-3xl"
              >
                {t.sampleNotice.body}
              </NotePanel>
            </Reveal>
          ) : null}

          <Reveal delay={120} className="mt-10 sm:mt-12">
            <Timetable
              slots={rows}
              days={days}
              bounds={scheduleBounds()}
              options={{
                programmes: programmeOptions,
                levels: levelOptions,
                teachers: teacherOptions,
                rooms: roomOptions,
                days: dayOptions,
              }}
              labels={{
                filters: t.filters,
                views: t.views,
                columns: t.columns,
                groups: groupLabels,
              }}
              groupIds={programmeGroupIds.filter((group) => usedGroups.has(group))}
            />
          </Reveal>
        </Container>
      </Section>

      {/* ── How to read it ────────────────────────────────────────────────── */}
      <Section id="legend" tone="chalk">
        <Container>
          <SectionHeading index={2} eyebrow={t.hero.eyebrow} title={t.legend.title} />

          <div className="mt-12 grid gap-x-12 gap-y-12 sm:mt-14 lg:grid-cols-12">
            <ol className="lg:col-span-7">
              {t.legend.items.map((item, index) => (
                <Reveal
                  key={item.title}
                  as="li"
                  delay={Math.min(index, 3) * 60}
                  className="mt-7 grid grid-cols-[2rem_1fr] gap-x-4 border-t border-line pt-7 first:mt-0 first:border-t-0 first:pt-0 sm:grid-cols-[2.75rem_1fr] sm:gap-x-6"
                >
                  <span
                    aria-hidden="true"
                    className="font-display text-[1.0625rem] leading-7 font-semibold text-red-500 tabular-nums"
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="text-[1.0625rem] leading-7 font-semibold text-navy-900">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-[0.9375rem] leading-[1.7] text-slate-600">
                      {item.body}
                    </p>
                  </div>
                </Reveal>
              ))}
            </ol>

            <Reveal delay={120} className="lg:col-span-4 lg:col-start-9">
              <aside className="rounded-2xl border border-line bg-white p-6 sm:p-7">
                <span aria-hidden="true" className="brand-rule block h-[3px] w-16" />
                <ul className="mt-6">
                  {t.notes.map((note) => (
                    <li
                      key={note}
                      className="border-t border-line py-4 text-[0.875rem] leading-[1.7] text-slate-600 first:border-t-0 first:pt-0 last:pb-0"
                    >
                      {note}
                    </li>
                  ))}
                </ul>
              </aside>
            </Reveal>
          </div>
        </Container>
      </Section>

      <CtaBand
        locale={typedLocale}
        eyebrow={dict.common.ctaBand.eyebrow}
        title={t.cta.title}
        body={t.cta.body}
        primary={t.cta.primary}
        secondary={t.cta.secondary}
        note={dict.common.ctaBand.note}
      />
    </>
  );
}
