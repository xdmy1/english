"use client";

import { useEffect, useId, useMemo, useState, type ReactNode } from "react";

import { Button } from "@/components/ui/Button";
import { Tag } from "@/components/ui/Card";
import { NotePanel } from "@/components/ui/Note";
import type { LevelId, ProgrammeGroupId, ProgrammeId, RoomId } from "@/data/catalogue";
import type { DayId } from "@/data/schedule";
import type { TeamMemberId } from "@/data/team";
import { format } from "@/i18n/format";
import type { ScheduleDict } from "@/i18n/types";
import { cn } from "@/lib/cn";

/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  THE TIMETABLE
 *
 *  Everything this component shows arrives as an already-resolved string, so it
 *  never touches the dictionary loader and stays a leaf client component.
 *
 *  Two views of the same data:
 *    • Week — a CSS-grid calendar on a 15-minute row unit. Concurrent classes
 *      are packed into lanes the way a calendar does it; a class with nothing
 *      beside it spans the whole day column.
 *    • List — grouped by day, a real definition list per class. This is the
 *      accessible fallback and the primary mobile experience.
 *
 *  Filtering fades rows out rather than removing them, so the week keeps its
 *  shape and you can see what you have excluded.
 * ────────────────────────────────────────────────────────────────────────── */

export interface TimetableSlot {
  id: string;
  day: DayId;
  /** "HH:MM", exactly as authored in src/data/schedule.ts. */
  start: string;
  end: string;
  startMin: number;
  endMin: number;
  group: string;
  programmeId: ProgrammeId;
  programmeGroupId: ProgrammeGroupId;
  programmeName: string;
  levelId: LevelId;
  /** "A2", "Pre A1" — the CEFR band, for chips. */
  levelShort: string;
  teacherId: TeamMemberId;
  teacherName: string;
  roomId: RoomId;
  roomName: string;
  roomShort: string;
}

export interface TimetableOption {
  value: string;
  label: string;
}

export interface TimetableOptionGroup {
  label: string;
  items: TimetableOption[];
}

export interface TimetableLabels {
  filters: ScheduleDict["filters"];
  views: ScheduleDict["views"];
  columns: ScheduleDict["columns"];
  /** Programme-group names, used by the colour legend under the week grid. */
  groups: Record<ProgrammeGroupId, string>;
}

type FilterKey = "programme" | "level" | "teacher" | "room" | "day";

const NO_FILTER = "";

const emptyFilters: Record<FilterKey, string> = {
  programme: NO_FILTER,
  level: NO_FILTER,
  teacher: NO_FILTER,
  room: NO_FILTER,
  day: NO_FILTER,
};

/**
 * Three grounds, not three hues: a deep navy tint, a light navy tint and paper.
 * Exam preparation additionally carries the brand's red rule. The legend under
 * the grid names all three, so colour is never the only signal.
 */
const groupStyles: Record<
  ProgrammeGroupId,
  { block: string; rule: string; swatch: string }
> = {
  curricula: {
    block: "border-navy-200 bg-navy-100",
    rule: "bg-navy-800",
    swatch: "border-navy-300 bg-navy-100",
  },
  courses: {
    block: "border-navy-200 bg-navy-50",
    rule: "bg-navy-400",
    swatch: "border-navy-200 bg-navy-50",
  },
  exams: {
    block: "border-navy-200 bg-white",
    rule: "bg-red-500",
    swatch: "border-navy-200 bg-white",
  },
};

const ROW_MINUTES = 15;

/* ── Component ───────────────────────────────────────────────────────────── */

export function Timetable({
  slots,
  days,
  bounds,
  options,
  labels,
  groupIds,
  className,
}: {
  slots: TimetableSlot[];
  days: { id: DayId; long: string; short: string }[];
  /** Minutes from midnight, snapped to the hour. */
  bounds: { start: number; end: number };
  options: {
    programmes: TimetableOptionGroup[];
    levels: TimetableOption[];
    teachers: TimetableOption[];
    rooms: TimetableOption[];
    days: TimetableOption[];
  };
  labels: TimetableLabels;
  groupIds: ProgrammeGroupId[];
  className?: string;
}) {
  const uid = useId();
  const [filters, setFilters] = useState(emptyFilters);
  const [view, setView] = useState<"auto" | "week" | "list">("auto");
  const [wide, setWide] = useState(false);

  // The week grid is the default from lg up, the list below it. Until the
  // visitor picks a view we let CSS decide, so the server markup is correct
  // at every width; this only keeps the segmented control honest.
  useEffect(() => {
    const query = window.matchMedia("(min-width: 64rem)");
    const sync = () => setWide(query.matches);
    sync();
    query.addEventListener("change", sync);
    return () => query.removeEventListener("change", sync);
  }, []);

  const activeView = view === "auto" ? (wide ? "week" : "list") : view;

  const visibleIds = useMemo(() => {
    const set = new Set<string>();
    for (const slot of slots) {
      if (filters.programme && slot.programmeId !== filters.programme) continue;
      if (filters.level && slot.levelId !== filters.level) continue;
      if (filters.teacher && slot.teacherId !== filters.teacher) continue;
      if (filters.room && slot.roomId !== filters.room) continue;
      if (filters.day && slot.day !== filters.day) continue;
      set.add(slot.id);
    }
    return set;
  }, [slots, filters]);

  const layout = useMemo(() => buildLayout(slots, days), [slots, days]);

  const hasFilters = Object.values(filters).some(Boolean);
  const count = visibleIds.size;
  const setFilter = (key: FilterKey, value: string) =>
    setFilters((current) => ({ ...current, [key]: value }));
  const reset = () => setFilters(emptyFilters);

  const viewLabelId = `${uid}-view`;

  return (
    <div className={className}>
      {/* ── Controls ──────────────────────────────────────────────────────── */}
      <div className="rounded-2xl border border-line bg-chalk p-5 sm:p-6">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          <FilterSelect
            id={`${uid}-programme`}
            label={labels.filters.programme}
            value={filters.programme}
            allLabel={labels.filters.all}
            onChange={(value) => setFilter("programme", value)}
          >
            {options.programmes.map((group) => (
              <optgroup key={group.label} label={group.label}>
                {group.items.map((item) => (
                  <option key={item.value} value={item.value}>
                    {item.label}
                  </option>
                ))}
              </optgroup>
            ))}
          </FilterSelect>

          <FilterSelect
            id={`${uid}-level`}
            label={labels.filters.level}
            value={filters.level}
            allLabel={labels.filters.all}
            onChange={(value) => setFilter("level", value)}
          >
            {options.levels.map((item) => (
              <option key={item.value} value={item.value}>
                {item.label}
              </option>
            ))}
          </FilterSelect>

          <FilterSelect
            id={`${uid}-teacher`}
            label={labels.filters.teacher}
            value={filters.teacher}
            allLabel={labels.filters.all}
            onChange={(value) => setFilter("teacher", value)}
          >
            {options.teachers.map((item) => (
              <option key={item.value} value={item.value}>
                {item.label}
              </option>
            ))}
          </FilterSelect>

          <FilterSelect
            id={`${uid}-room`}
            label={labels.filters.room}
            value={filters.room}
            allLabel={labels.filters.all}
            onChange={(value) => setFilter("room", value)}
          >
            {options.rooms.map((item) => (
              <option key={item.value} value={item.value}>
                {item.label}
              </option>
            ))}
          </FilterSelect>

          <FilterSelect
            id={`${uid}-day`}
            label={labels.filters.day}
            value={filters.day}
            allLabel={labels.filters.all}
            onChange={(value) => setFilter("day", value)}
          >
            {options.days.map((item) => (
              <option key={item.value} value={item.value}>
                {item.label}
              </option>
            ))}
          </FilterSelect>
        </div>

        <div className="mt-5 flex flex-wrap items-center justify-between gap-x-6 gap-y-4 border-t border-line pt-4">
          <div className="flex items-center gap-4">
            <p
              role="status"
              aria-live="polite"
              className="text-[0.8125rem] text-slate-600 tabular-nums"
            >
              {format(labels.filters.resultCount, { count, total: slots.length })}
            </p>
            <Button
              variant="outline"
              size="sm"
              onClick={reset}
              aria-hidden={hasFilters ? undefined : true}
              tabIndex={hasFilters ? undefined : -1}
              className={cn(
                "h-8 px-3",
                // Opacity has to join the button's own transition list, or the
                // control appears and disappears in a single frame while every
                // other appearance on the site eases. `press` is gone with it:
                // its `transition: transform` shorthand fought this one, and the
                // button already presses through active:scale.
                "transition-[transform,background-color,border-color,color,box-shadow,opacity]",
                hasFilters ? "opacity-100" : "pointer-events-none opacity-0",
              )}
              leading={
                <svg
                  viewBox="0 0 12 12"
                  fill="none"
                  aria-hidden="true"
                  className="size-3"
                >
                  <path
                    d="m2.5 2.5 7 7m0-7-7 7"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              }
            >
              {labels.filters.reset}
            </Button>
          </div>

          <div className="flex items-center gap-3">
            <span
              id={viewLabelId}
              className="eyebrow hidden text-slate-500 sm:inline"
            >
              {labels.views.label}
            </span>
            <div
              role="radiogroup"
              aria-labelledby={viewLabelId}
              className="inline-flex rounded-full border border-line bg-white p-1"
            >
              {(["week", "list"] as const).map((value) => (
                <button
                  key={value}
                  type="button"
                  role="radio"
                  aria-checked={activeView === value}
                  onClick={() => setView(value)}
                  className={cn(
                    "press rounded-full px-4 py-1.5 text-[0.8125rem] font-semibold",
                    "transition-colors duration-200 ease-out-quint",
                    // Before the visitor chooses, the breakpoint decides — and
                    // it decides in CSS, so the pill is right on first paint.
                    view === "auto"
                      ? value === "week"
                        ? "text-slate-600 lg:bg-navy-800 lg:text-white"
                        : "bg-navy-800 text-white lg:bg-transparent lg:text-slate-600"
                      : activeView === value
                        ? "bg-navy-800 text-white"
                        : "text-slate-600 can-hover:hover:text-navy-900",
                  )}
                >
                  {labels.views[value]}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Empty state ───────────────────────────────────────────────────── */}
      {count === 0 ? (
        <div role="status">
          <NotePanel
            align="center"
            className="mt-8 sm:p-9"
            title={labels.filters.empty}
            actions={
              <Button size="sm" onClick={reset}>
                {labels.filters.reset}
              </Button>
            }
          >
            {labels.filters.emptyHint}
          </NotePanel>
        </div>
      ) : null}

      {/* ── Week ──────────────────────────────────────────────────────────── */}
      <div
        className={cn(
          "mt-8",
          view === "auto" ? "hidden lg:block" : activeView === "week" ? "block" : "hidden",
        )}
      >
        <WeekGrid
          slots={slots}
          days={days}
          bounds={bounds}
          layout={layout}
          visibleIds={visibleIds}
          labels={labels}
          groupIds={groupIds}
        />
      </div>

      {/* ── List ──────────────────────────────────────────────────────────── */}
      <div
        className={cn(
          "mt-8",
          view === "auto" ? "lg:hidden" : activeView === "list" ? "block" : "hidden",
        )}
      >
        <DayList slots={slots} days={days} visibleIds={visibleIds} labels={labels} />
      </div>
    </div>
  );
}

/* ── Week grid ───────────────────────────────────────────────────────────── */

function WeekGrid({
  slots,
  days,
  bounds,
  layout,
  visibleIds,
  labels,
  groupIds,
}: {
  slots: TimetableSlot[];
  days: { id: DayId; long: string; short: string }[];
  bounds: { start: number; end: number };
  layout: Layout;
  visibleIds: Set<string>;
  labels: TimetableLabels;
  groupIds: ProgrammeGroupId[];
}) {
  const totalRows = Math.max(1, (bounds.end - bounds.start) / ROW_MINUTES);
  const hours: number[] = [];
  for (let minute = bounds.start; minute < bounds.end; minute += 60) hours.push(minute);

  const laneTotal = days.reduce((sum, day) => sum + layout.lanes[day.id]!, 0);
  const template = [
    "3.5rem",
    ...days.map((day) => {
      const lanes = layout.lanes[day.id]!;
      return `minmax(${lanes * 5.5}rem, ${lanes}fr)`;
    }),
  ].join(" ");
  const minWidth = `calc(3.5rem + ${laneTotal} * 5.25rem)`;
  const rows = `repeat(${totalRows}, var(--tt-row))`;

  return (
    <div className="overflow-hidden rounded-2xl border border-line bg-white">
      {/*
        The grid is wider than the column between roughly 1024px and 1244px, and
        every class block is a plain div, so there is nothing inside for Tab to
        land on. Firefox and Safari do not focus a childless scroller by
        themselves; without this the last day or two of the week are unreachable
        without a pointer. The ring is drawn inside the box because the rounded
        parent clips anything painted outside it.
      */}
      <div
        tabIndex={0}
        role="group"
        aria-label={labels.views.week}
        className="overflow-x-auto focus-visible:-outline-offset-2 focus-visible:outline-2 focus-visible:outline-navy-700"
      >
        <div style={{ minWidth }}>
          {/* Day headings */}
          <div
            className="grid border-b border-line bg-chalk"
            style={{ gridTemplateColumns: template, minWidth }}
          >
            <div className="sticky left-0 z-20 bg-chalk shadow-[1px_0_0_0_var(--color-line)]" />
            {days.map((day) => (
              <div
                key={day.id}
                className="border-l border-line px-3 py-3"
              >
                <p className="text-[0.875rem] font-semibold text-navy-900">
                  <span className="hidden xl:inline">{day.long}</span>
                  <span className="xl:hidden">{day.short}</span>
                </p>
              </div>
            ))}
          </div>

          {/* Body */}
          <div
            className="grid"
            style={
              {
                gridTemplateColumns: template,
                minWidth,
                "--tt-row": "1.35rem",
              } as React.CSSProperties
            }
          >
            {/* Hour gutter */}
            <div
              className="sticky left-0 z-20 grid bg-white shadow-[1px_0_0_0_var(--color-line)]"
              style={{ gridTemplateRows: rows }}
            >
              {/* slate-500, not 400: this is the only labelling of the time
                  axis, and slate-400 is 2.76:1 on white. */}
              {hours.map((minute) => (
                <span
                  key={minute}
                  style={{
                    gridRow: `${(minute - bounds.start) / ROW_MINUTES + 1} / span 4`,
                  }}
                  className="pt-1 pr-2.5 text-right text-2xs leading-none font-medium text-slate-500 tabular-nums"
                >
                  {formatHour(minute)}
                </span>
              ))}
            </div>

            {days.map((day) => {
              const lanes = layout.lanes[day.id]!;
              const daySlots = slots.filter((slot) => slot.day === day.id);

              return (
                <div
                  key={day.id}
                  className="relative grid border-l border-line"
                  style={{
                    gridTemplateRows: rows,
                    gridTemplateColumns: `repeat(${lanes}, minmax(0, 1fr))`,
                  }}
                >
                  <span className="sr-only">{day.long}</span>
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0"
                    style={{
                      backgroundImage:
                        "repeating-linear-gradient(to bottom, var(--color-line) 0, var(--color-line) 1px, transparent 1px, transparent calc(var(--tt-row) * 4))",
                    }}
                  />

                  {daySlots.map((slot) => {
                    const place = layout.placement[slot.id]!;
                    const styles = groupStyles[slot.programmeGroupId];
                    const shown = visibleIds.has(slot.id);
                    const startIndex = clamp(
                      Math.floor((slot.startMin - bounds.start) / ROW_MINUTES),
                      0,
                      totalRows - 1,
                    );
                    const endIndex = clamp(
                      Math.ceil((slot.endMin - bounds.start) / ROW_MINUTES),
                      startIndex + 1,
                      totalRows,
                    );
                    const startRow = startIndex + 1;
                    const endRow = endIndex + 1;
                    const span = Math.max(1, Math.floor(lanes / place.lanes));
                    const colStart = place.lane * span + 1;
                    const colSpan =
                      place.lane === place.lanes - 1 ? lanes - colStart + 1 : span;

                    return (
                      <div
                        key={slot.id}
                        aria-hidden={shown ? undefined : true}
                        tabIndex={shown ? undefined : -1}
                        style={{
                          gridRow: `${startRow} / ${endRow}`,
                          gridColumn: `${colStart} / span ${Math.max(1, colSpan)}`,
                        }}
                        className={cn(
                          "relative z-10 m-[0.1875rem] flex min-h-0 flex-col overflow-hidden rounded-lg border py-1.5 pr-1.5 pl-2",
                          "transition-[opacity,border-color] duration-200 ease-out-quint",
                          styles.block,
                          shown
                            ? "can-hover:hover:border-navy-400"
                            : "pointer-events-none opacity-[0.12]",
                        )}
                      >
                        <span
                          aria-hidden="true"
                          className={cn("absolute inset-y-0 left-0 w-[3px]", styles.rule)}
                        />
                        {/* text-2xs is the floor: 10px was the smallest type on
                            the site, and the teacher line at slate-500 was 3.95:1
                            on the navy-100 ground these blocks use. */}
                        <p className="text-2xs leading-[0.95rem] font-medium text-navy-700 tabular-nums">
                          {slot.start}–{slot.end}
                        </p>
                        <p className="truncate text-[0.75rem] leading-5 font-semibold text-navy-900 tabular-nums">
                          {slot.group}
                        </p>
                        <p className="mt-0.5 line-clamp-2 text-2xs leading-[0.95rem] text-slate-600">
                          {slot.programmeName}
                        </p>
                        <div className="mt-1 flex flex-wrap items-center gap-1">
                          <MiniChip tone="navy">{slot.levelShort}</MiniChip>
                          <MiniChip tone="muted">{slot.roomShort}</MiniChip>
                        </div>
                        <p className="mt-auto truncate pt-1 text-2xs leading-[0.95rem] text-slate-600">
                          {slot.teacherName}
                        </p>
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Colour legend — the key to the three grounds above. */}
      <ul className="flex flex-wrap items-center gap-x-7 gap-y-2 border-t border-line bg-chalk px-4 py-3 sm:px-5">
        {groupIds.map((id) => (
          <li key={id} className="flex items-center gap-2.5">
            <span
              aria-hidden="true"
              className={cn(
                "relative block h-4 w-7 overflow-hidden rounded border",
                groupStyles[id].swatch,
              )}
            >
              <span
                className={cn("absolute inset-y-0 left-0 w-[3px]", groupStyles[id].rule)}
              />
            </span>
            <span className="text-[0.8125rem] text-slate-600">{labels.groups[id]}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ── List ────────────────────────────────────────────────────────────────── */

function DayList({
  slots,
  days,
  visibleIds,
  labels,
}: {
  slots: TimetableSlot[];
  days: { id: DayId; long: string; short: string }[];
  visibleIds: Set<string>;
  labels: TimetableLabels;
}) {
  const columns = labels.columns;

  return (
    <div className="flex flex-col gap-12">
      {days.map((day) => {
        const daySlots = slots.filter((slot) => slot.day === day.id);
        const rows = daySlots.filter((slot) => visibleIds.has(slot.id));
        if (rows.length === 0) return null;

        return (
          <section key={day.id} aria-labelledby={`timetable-${day.id}`}>
            <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-b-2 border-navy-800 pb-3">
              <h3
                id={`timetable-${day.id}`}
                className="font-display text-[1.25rem] font-semibold tracking-[-0.01em] text-navy-900"
              >
                {day.long}
              </h3>
              <p className="text-[0.8125rem] text-slate-500 tabular-nums">
                {format(labels.filters.resultCount, {
                  count: rows.length,
                  total: daySlots.length,
                })}
              </p>
            </div>

            {/*
              Columns from md, not sm. A twelfth of a 640px viewport is 33px, and
              six columns of Cyrillic — "Преподаватель" alone is about 126px set
              as an eyebrow — need more than that between them, so at 640px the
              headings ran over each other. Below md the stacked dt/dd pairs are
              the layout, and every cell carries its own label there. Teacher
              takes the third track it needs; programme gives it up, being the one
              column whose content wraps happily.
            */}
            <div
              aria-hidden="true"
              className="hidden gap-x-4 border-b border-line py-2.5 md:grid md:grid-cols-12"
            >
              <HeadCell className="md:col-span-2">{columns.time}</HeadCell>
              <HeadCell className="md:col-span-2">{columns.group}</HeadCell>
              <HeadCell className="md:col-span-2">{columns.programme}</HeadCell>
              <HeadCell className="md:col-span-2">{columns.level}</HeadCell>
              <HeadCell className="md:col-span-3">{columns.teacher}</HeadCell>
              <HeadCell className="md:col-span-1">{columns.room}</HeadCell>
            </div>

            <ul>
              {rows.map((slot) => {
                const styles = groupStyles[slot.programmeGroupId];
                return (
                  <li
                    key={slot.id}
                    className="relative border-b border-line transition-colors duration-200 ease-out-quint can-hover:hover:bg-chalk"
                  >
                    <span
                      aria-hidden="true"
                      className={cn("absolute inset-y-0 left-0 w-[3px]", styles.rule)}
                    />
                    <dl className="grid grid-cols-2 gap-x-4 gap-y-3.5 py-4 pr-1 pl-4 md:grid-cols-12 md:items-baseline md:gap-y-0 md:py-3.5">
                      <Cell
                        label={columns.time}
                        className="col-span-1 md:col-span-2"
                        valueClassName="font-semibold tabular-nums"
                      >
                        {slot.start}–{slot.end}
                      </Cell>
                      <Cell
                        label={columns.group}
                        className="col-span-1 md:col-span-2"
                        valueClassName="font-semibold tracking-[0.01em] tabular-nums"
                      >
                        {slot.group}
                      </Cell>
                      <Cell label={columns.programme} className="col-span-2 md:col-span-2">
                        {slot.programmeName}
                      </Cell>
                      <Cell label={columns.level} className="col-span-1 md:col-span-2">
                        <Tag>{slot.levelShort}</Tag>
                      </Cell>
                      <Cell
                        label={columns.teacher}
                        className="col-span-1 md:col-span-3"
                        valueClassName="text-slate-600"
                      >
                        {slot.teacherName}
                      </Cell>
                      <Cell
                        label={columns.room}
                        className="col-span-2 md:col-span-1"
                        valueClassName="text-slate-600"
                      >
                        {slot.roomName}
                      </Cell>
                    </dl>
                  </li>
                );
              })}
            </ul>
          </section>
        );
      })}
    </div>
  );
}

/* ── Pieces ──────────────────────────────────────────────────────────────── */

function FilterSelect({
  id,
  label,
  value,
  allLabel,
  onChange,
  children,
}: {
  id: string;
  label: string;
  value: string;
  allLabel: string;
  onChange: (value: string) => void;
  children: ReactNode;
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-2 block text-[0.8125rem] font-semibold text-navy-900"
      >
        {label}
      </label>
      <div className="relative">
        <select
          id={id}
          value={value}
          onChange={(event) => onChange(event.currentTarget.value)}
          className={cn(
            "w-full appearance-none rounded-xl border border-slate-200 bg-white py-2.5 pr-10 pl-3.5",
            "text-[0.875rem] text-navy-900",
            "transition-[border-color,box-shadow] duration-200 ease-out-quint",
            // Let the global two-tone focus ring in globals.css do the work; a 12%
            // navy ring on white is 1.3:1 and effectively invisible.
            "focus-visible:border-navy-600",
            "can-hover:hover:border-slate-300",
            value !== NO_FILTER && "border-navy-300 bg-navy-50/60 font-medium",
          )}
        >
          <option value={NO_FILTER}>{allLabel}</option>
          {children}
        </select>
        <svg
          viewBox="0 0 12 12"
          fill="none"
          aria-hidden="true"
          className="pointer-events-none absolute top-1/2 right-3.5 size-3 -translate-y-1/2 text-slate-500"
        >
          <path
            d="m3 4.5 3 3 3-3"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </div>
  );
}

function MiniChip({
  children,
  tone = "navy",
}: {
  children: ReactNode;
  tone?: "navy" | "muted";
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded border px-1.5 py-px text-[0.625rem] font-semibold tracking-[0.06em] uppercase tabular-nums",
        tone === "navy"
          ? "border-navy-300 bg-white/70 text-navy-700"
          : "border-slate-300 bg-white/70 text-slate-500",
      )}
    >
      {children}
    </span>
  );
}

function HeadCell({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  // min-w-0 and break-words so a single long word — Romanian "PROFESOR",
  // Russian "ПРЕПОДАВАТЕЛЬ" — wraps inside its track instead of running over the
  // heading beside it. A grid-cols-12 track never grows past its share.
  return (
    <p className={cn("eyebrow min-w-0 break-words text-slate-500", className)}>
      {children}
    </p>
  );
}

function Cell({
  label,
  children,
  className,
  valueClassName,
}: {
  label: string;
  children: ReactNode;
  className?: string;
  valueClassName?: string;
}) {
  return (
    <div className={cn("min-w-0", className)}>
      {/* slate-500: below md this is the only label the row carries. */}
      <dt className="eyebrow break-words text-slate-500 md:sr-only">{label}</dt>
      <dd className={cn("mt-1 text-[0.875rem] text-navy-900 md:mt-0", valueClassName)}>
        {children}
      </dd>
    </div>
  );
}

/* ── Layout maths ────────────────────────────────────────────────────────── */

interface Placement {
  lane: number;
  /** Lanes in this slot's overlap cluster, not in the whole day. */
  lanes: number;
}

interface Layout {
  placement: Record<string, Placement>;
  lanes: Record<string, number>;
}

/**
 * Packs each day into lanes the way a calendar does: overlapping classes sit
 * side by side, and a class with nothing beside it keeps the full column.
 * Computed from every slot, never from the filtered set, so filtering can
 * never reflow the week.
 */
function buildLayout(
  slots: TimetableSlot[],
  days: { id: DayId }[],
): Layout {
  const placement: Record<string, Placement> = {};
  const lanes: Record<string, number> = {};

  for (const day of days) {
    const daySlots = slots
      .filter((slot) => slot.day === day.id)
      .sort((a, b) => a.startMin - b.startMin || a.endMin - b.endMin);

    let dayLanes = 1;
    let cluster: TimetableSlot[] = [];
    let clusterEnd = -1;

    const flush = () => {
      if (cluster.length === 0) return;
      const laneEnds: number[] = [];
      const laneOf = new Map<string, number>();

      for (const slot of cluster) {
        let index = laneEnds.findIndex((end) => end <= slot.startMin);
        if (index === -1) {
          laneEnds.push(slot.endMin);
          index = laneEnds.length - 1;
        } else {
          laneEnds[index] = slot.endMin;
        }
        laneOf.set(slot.id, index);
      }

      dayLanes = Math.max(dayLanes, laneEnds.length);
      for (const slot of cluster) {
        placement[slot.id] = {
          lane: laneOf.get(slot.id) ?? 0,
          lanes: laneEnds.length,
        };
      }
      cluster = [];
      clusterEnd = -1;
    };

    for (const slot of daySlots) {
      if (cluster.length > 0 && slot.startMin >= clusterEnd) flush();
      cluster.push(slot);
      clusterEnd = Math.max(clusterEnd, slot.endMin);
    }
    flush();

    lanes[day.id] = dayLanes;
  }

  return { placement, lanes };
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

function formatHour(minutes: number): string {
  const hour = Math.floor(minutes / 60);
  const rest = minutes % 60;
  return `${String(hour).padStart(2, "0")}:${String(rest).padStart(2, "0")}`;
}
