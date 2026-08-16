/**
 * Language-neutral facts about what the centre teaches.
 * All prose lives in src/i18n/dictionaries — these are the stable ids that
 * join the two together, so a missing translation is a compile error.
 */

/* ── CEFR levels ─────────────────────────────────────────────────────────── */

export const levelIds = ["preA1", "a1", "a2", "b1", "b2", "c1", "c2"] as const;
export type LevelId = (typeof levelIds)[number];

export interface LevelFacts {
  cefr: string;
  /** Band on the Cambridge English Scale. Null below A1, which is unscaled. */
  scale: string | null;
  /**
   * Cambridge's published guided-learning-hours guidance, CUMULATIVE from
   * zero. Always present it as a guideline — never as a promise.
   * https://support.cambridgeenglish.org/hc/en-gb/articles/202838506
   */
  guidedHours: string | null;
}

export const levels: Record<LevelId, LevelFacts> = {
  preA1: { cefr: "Pre A1", scale: null, guidedHours: null },
  a1: { cefr: "A1", scale: "100–119", guidedHours: null },
  a2: { cefr: "A2", scale: "120–139", guidedHours: "180–200" },
  b1: { cefr: "B1", scale: "140–159", guidedHours: "350–400" },
  b2: { cefr: "B2", scale: "160–179", guidedHours: "500–600" },
  c1: { cefr: "C1", scale: "180–199", guidedHours: "700–800" },
  c2: { cefr: "C2", scale: "200–230", guidedHours: "1000–1200" },
};

/* ── Programmes ──────────────────────────────────────────────────────────── */

export const programmeGroupIds = ["curricula", "courses", "exams"] as const;
export type ProgrammeGroupId = (typeof programmeGroupIds)[number];

export const programmeIds = [
  "cambridgeCurriculum",
  "bacCurriculum",
  "juniorsFull",
  "juniorsWeekend",
  "teens",
  "adults",
  "cambridgeExams",
  "toefl",
  "bacExam",
] as const;
export type ProgrammeId = (typeof programmeIds)[number];

export interface ProgrammeFacts {
  group: ProgrammeGroupId;
  /** Age band, rendered as "7–11". Null when it does not apply. */
  ages: [number, number] | null;
  /** Academic hours per level/year. */
  hours: number | null;
  sessionsPerWeek: number | null;
  minutesPerSession: number | null;
  levels: LevelId[];
  /** Rendered as a small accent tag on the card. */
  featured?: boolean;
}

export const programmes: Record<ProgrammeId, ProgrammeFacts> = {
  cambridgeCurriculum: {
    group: "curricula",
    ages: [7, 18],
    hours: 132,
    sessionsPerWeek: 2,
    minutesPerSession: 90,
    levels: ["preA1", "a1", "a2", "b1", "b2", "c1", "c2"],
    featured: true,
  },
  bacCurriculum: {
    group: "curricula",
    ages: [15, 19],
    hours: 132,
    sessionsPerWeek: 2,
    minutesPerSession: 90,
    levels: ["b1", "b2"],
  },
  juniorsFull: {
    group: "courses",
    ages: [7, 11],
    hours: 132,
    sessionsPerWeek: 2,
    minutesPerSession: 90,
    levels: ["preA1", "a1", "a2"],
  },
  juniorsWeekend: {
    group: "courses",
    ages: [7, 11],
    hours: 96,
    sessionsPerWeek: 1,
    minutesPerSession: 150,
    levels: ["preA1", "a1", "a2"],
  },
  teens: {
    group: "courses",
    ages: [12, 17],
    hours: 132,
    sessionsPerWeek: 2,
    minutesPerSession: 90,
    levels: ["a2", "b1", "b2"],
  },
  adults: {
    group: "courses",
    ages: [18, 99],
    hours: 132,
    sessionsPerWeek: 2,
    minutesPerSession: 90,
    levels: ["a1", "a2", "b1", "b2", "c1"],
  },
  cambridgeExams: {
    group: "exams",
    ages: null,
    hours: 60,
    sessionsPerWeek: 2,
    minutesPerSession: 90,
    levels: ["a2", "b1", "b2", "c1", "c2"],
    featured: true,
  },
  toefl: {
    group: "exams",
    ages: [16, 99],
    hours: 60,
    sessionsPerWeek: 2,
    minutesPerSession: 90,
    levels: ["b1", "b2", "c1"],
  },
  bacExam: {
    group: "exams",
    ages: [16, 19],
    hours: 60,
    sessionsPerWeek: 1,
    minutesPerSession: 120,
    levels: ["b1", "b2"],
  },
};

export const programmesByGroup: Record<ProgrammeGroupId, ProgrammeId[]> = {
  curricula: ["cambridgeCurriculum", "bacCurriculum"],
  courses: ["juniorsFull", "juniorsWeekend", "teens", "adults"],
  exams: ["cambridgeExams", "toefl", "bacExam"],
};

/* ── Cambridge exam ladder (facts, not claims) ───────────────────────────── */

export const cambridgeExamIds = [
  "starters",
  "movers",
  "flyers",
  "key",
  "preliminary",
  "first",
  "advanced",
  "proficiency",
] as const;
export type CambridgeExamId = (typeof cambridgeExamIds)[number];

export interface CambridgeExamFacts {
  /**
   * Current official name. Cambridge renamed the suite in 2018 — these are the
   * only names that may be used as the primary label.
   */
  name: string;
  /** Pre-2018 abbreviation. Secondary aid only, always in brackets. */
  legacy: string | null;
  cefr: string;
  /** Approximate total exam time, in minutes. */
  minutes: number;
  /** Reported range on the Cambridge English Scale. */
  scale: string;
  /** Grades that award a certificate at the target level. */
  grades: string;
}

/**
 * Verified against cambridgeenglish.org exam-format pages and the official
 * grade-boundary chart (210434-converting-practice-test-scores…pdf), Aug 2026.
 * The Young Learners exams are not graded — they award shields.
 */
export const cambridgeExams: Record<CambridgeExamId, CambridgeExamFacts> = {
  starters: { name: "Pre A1 Starters", legacy: "YLE Starters", cefr: "Pre A1", minutes: 45, scale: "up to 15 shields", grades: "—" },
  movers: { name: "A1 Movers", legacy: "YLE Movers", cefr: "A1", minutes: 60, scale: "up to 15 shields", grades: "—" },
  flyers: { name: "A2 Flyers", legacy: "YLE Flyers", cefr: "A2", minutes: 75, scale: "up to 15 shields", grades: "—" },
  key: { name: "A2 Key for Schools", legacy: "KET", cefr: "A2", minutes: 110, scale: "82–150", grades: "A / B / C" },
  preliminary: { name: "B1 Preliminary for Schools", legacy: "PET", cefr: "B1", minutes: 140, scale: "102–170", grades: "A / B / C" },
  first: { name: "B2 First for Schools", legacy: "FCE", cefr: "B2", minutes: 210, scale: "122–190", grades: "A / B / C" },
  advanced: { name: "C1 Advanced", legacy: "CAE", cefr: "C1", minutes: 240, scale: "142–210", grades: "A / B / C" },
  proficiency: { name: "C2 Proficiency", legacy: "CPE", cefr: "C2", minutes: 240, scale: "162–230", grades: "A / B / C" },
};

/**
 * Certificates that exempt a candidate from the BAC foreign-language paper,
 * awarding „nota 10 din oficiu" — Ordinul nr. 157/20.03.2015 as amended by
 * Ordinul nr. 206/03.02.2026. Thresholds change by ministerial order: check
 * the current annex before quoting these to a parent.
 */
export const bacExemptions = [
  { exam: "B2 First / B2 First for Schools", requirement: "Pass · Reading ≥ 160 · Writing ≥ 160" },
  { exam: "C1 Advanced", requirement: "Pass · Reading ≥ 160 · Writing ≥ 160" },
  { exam: "C2 Proficiency", requirement: "Pass · Reading ≥ 180 · Writing ≥ 180" },
  { exam: "IELTS", requirement: "Overall ≥ 6 · Reading ≥ 6 · Writing ≥ 6" },
  { exam: "TOEFL iBT", requirement: "Total ≥ 86 · Reading ≥ 20 · Writing ≥ 20" },
  { exam: "Oxford Test of English", requirement: "Overall B2 · Reading B2 · Writing B2" },
] as const;

/* ── Rooms (used by the timetable) ───────────────────────────────────────── */

export const roomIds = ["r1", "r2", "r3", "r4", "lab", "library"] as const;
export type RoomId = (typeof roomIds)[number];

/** Seats per room — shown in the facilities section and the timetable legend. */
export const rooms: Record<RoomId, { seats: number }> = {
  r1: { seats: 12 },
  r2: { seats: 12 },
  r3: { seats: 10 },
  r4: { seats: 10 },
  lab: { seats: 14 },
  library: { seats: 16 },
};

/* ── Headline numbers ────────────────────────────────────────────────────── */

export const statIds = ["years", "students", "passRate", "teachers"] as const;
export type StatId = (typeof statIds)[number];

export interface StatFacts {
  value: number;
  /** Decimal places to animate and render. */
  decimals?: number;
  prefix?: string;
  suffix?: string;
}

export const stats: Record<StatId, StatFacts> = {
  /** Derived from site.foundedYear at render time — see statValue(). */
  years: { value: 0, suffix: "+" },
  students: { value: 1200, suffix: "+" }, // PLACEHOLDER — confirm
  passRate: { value: 99.8, decimals: 1, suffix: "%" },
  /** Derived from the length of the team list — see statValue(). */
  teachers: { value: 0, suffix: "" },
};
