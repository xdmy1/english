import type { LevelId, ProgrammeId, RoomId } from "./catalogue";
import type { TeamMemberId } from "./team";

/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  TIMETABLE
 *
 *  `isSample` is true while the rows below are illustrative. The schedule page
 *  shows a clear notice for as long as it stays true — flip it to false once
 *  the real term timetable is entered so the notice disappears.
 *
 *  Times are 24h "HH:MM" in Europe/Chisinau. Slots may not overlap within the
 *  same room or the same teacher; `npm run check:content` verifies this.
 * ─────────────────────────────────────────────────────────────────────────────
 */

export const isSample = true;

/** Term the timetable applies to. Shown above the grid. */
export const term = {
  labelKey: "autumn" as const,
  startDate: "2026-09-15",
  endDate: "2026-12-20",
};

export const dayIds = ["mon", "tue", "wed", "thu", "fri", "sat"] as const;
export type DayId = (typeof dayIds)[number];

export interface ScheduleSlot {
  id: string;
  day: DayId;
  /** "HH:MM" */
  start: string;
  end: string;
  /** Short human code printed on the row, e.g. "J-A2-01". */
  group: string;
  programmeId: ProgrammeId;
  levelId: LevelId;
  teacherId: TeamMemberId;
  roomId: RoomId;
}

export const slots: ScheduleSlot[] = [
  // ── Monday ──────────────────────────────────────────────────────────────
  { id: "m1", day: "mon", start: "14:30", end: "16:00", group: "J-A1-01", programmeId: "juniorsFull", levelId: "a1", teacherId: "teacher1", roomId: "r1" },
  { id: "m2", day: "mon", start: "16:15", end: "17:45", group: "J-A2-02", programmeId: "juniorsFull", levelId: "a2", teacherId: "teacher2", roomId: "r2" },
  { id: "m3", day: "mon", start: "16:15", end: "17:45", group: "T-B1-01", programmeId: "teens", levelId: "b1", teacherId: "teacher3", roomId: "r3" },
  { id: "m4", day: "mon", start: "18:00", end: "19:30", group: "C-B2-01", programmeId: "cambridgeExams", levelId: "b2", teacherId: "teacher4", roomId: "lab" },
  { id: "m5", day: "mon", start: "18:00", end: "19:30", group: "A-B1-01", programmeId: "adults", levelId: "b1", teacherId: "teacher5", roomId: "r1" },

  // ── Tuesday ─────────────────────────────────────────────────────────────
  { id: "t1", day: "tue", start: "14:30", end: "16:00", group: "J-PA1-01", programmeId: "juniorsFull", levelId: "preA1", teacherId: "teacher1", roomId: "r1" },
  { id: "t2", day: "tue", start: "16:15", end: "17:45", group: "T-A2-03", programmeId: "teens", levelId: "a2", teacherId: "teacher2", roomId: "r2" },
  { id: "t3", day: "tue", start: "16:15", end: "18:15", group: "B-B2-01", programmeId: "bacExam", levelId: "b2", teacherId: "teacher6", roomId: "r4" },
  { id: "t4", day: "tue", start: "18:00", end: "19:30", group: "C-C1-01", programmeId: "cambridgeExams", levelId: "c1", teacherId: "teacher3", roomId: "library" },
  { id: "t5", day: "tue", start: "18:30", end: "20:00", group: "TF-B2-01", programmeId: "toefl", levelId: "b2", teacherId: "teacher4", roomId: "lab" },

  // ── Wednesday ───────────────────────────────────────────────────────────
  { id: "w1", day: "wed", start: "14:30", end: "16:00", group: "J-A1-01", programmeId: "juniorsFull", levelId: "a1", teacherId: "teacher1", roomId: "r1" },
  { id: "w2", day: "wed", start: "16:15", end: "17:45", group: "J-A2-02", programmeId: "juniorsFull", levelId: "a2", teacherId: "teacher2", roomId: "r2" },
  { id: "w3", day: "wed", start: "16:15", end: "17:45", group: "T-B1-01", programmeId: "teens", levelId: "b1", teacherId: "teacher3", roomId: "r3" },
  { id: "w4", day: "wed", start: "18:00", end: "19:30", group: "C-B2-01", programmeId: "cambridgeExams", levelId: "b2", teacherId: "teacher4", roomId: "lab" },
  { id: "w5", day: "wed", start: "18:00", end: "19:30", group: "A-B1-01", programmeId: "adults", levelId: "b1", teacherId: "teacher5", roomId: "r1" },

  // ── Thursday ────────────────────────────────────────────────────────────
  { id: "h1", day: "thu", start: "14:30", end: "16:00", group: "J-PA1-01", programmeId: "juniorsFull", levelId: "preA1", teacherId: "teacher1", roomId: "r1" },
  { id: "h2", day: "thu", start: "16:15", end: "17:45", group: "T-A2-03", programmeId: "teens", levelId: "a2", teacherId: "teacher2", roomId: "r2" },
  { id: "h3", day: "thu", start: "16:15", end: "18:15", group: "B-B2-01", programmeId: "bacExam", levelId: "b2", teacherId: "teacher6", roomId: "r4" },
  { id: "h4", day: "thu", start: "18:00", end: "19:30", group: "C-C1-01", programmeId: "cambridgeExams", levelId: "c1", teacherId: "teacher3", roomId: "library" },
  { id: "h5", day: "thu", start: "18:30", end: "20:00", group: "TF-B2-01", programmeId: "toefl", levelId: "b2", teacherId: "teacher4", roomId: "lab" },

  // ── Friday ──────────────────────────────────────────────────────────────
  { id: "f1", day: "fri", start: "15:00", end: "16:30", group: "A-A2-02", programmeId: "adults", levelId: "a2", teacherId: "teacher5", roomId: "r3" },
  { id: "f2", day: "fri", start: "16:45", end: "18:15", group: "C-A2-04", programmeId: "cambridgeExams", levelId: "a2", teacherId: "teacher2", roomId: "r2" },
  { id: "f3", day: "fri", start: "17:00", end: "18:30", group: "BAC-B1-02", programmeId: "bacCurriculum", levelId: "b1", teacherId: "teacher6", roomId: "r4" },
  { id: "f4", day: "fri", start: "18:30", end: "20:00", group: "A-C1-01", programmeId: "adults", levelId: "c1", teacherId: "teacher3", roomId: "library" },

  // ── Saturday ────────────────────────────────────────────────────────────
  { id: "s1", day: "sat", start: "09:00", end: "11:30", group: "JW-A1-01", programmeId: "juniorsWeekend", levelId: "a1", teacherId: "teacher1", roomId: "r1" },
  { id: "s2", day: "sat", start: "09:00", end: "11:30", group: "JW-PA1-02", programmeId: "juniorsWeekend", levelId: "preA1", teacherId: "teacher2", roomId: "r2" },
  { id: "s3", day: "sat", start: "11:45", end: "14:15", group: "JW-A2-03", programmeId: "juniorsWeekend", levelId: "a2", teacherId: "teacher1", roomId: "r1" },
  { id: "s4", day: "sat", start: "10:00", end: "12:00", group: "SIM-B2", programmeId: "cambridgeExams", levelId: "b2", teacherId: "teacher4", roomId: "lab" },
  { id: "s5", day: "sat", start: "12:30", end: "14:30", group: "SIM-C1", programmeId: "cambridgeExams", levelId: "c1", teacherId: "teacher4", roomId: "lab" },
];

/* ── Helpers ─────────────────────────────────────────────────────────────── */

export function toMinutes(time: string): number {
  const [h, m] = time.split(":").map(Number);
  return (h ?? 0) * 60 + (m ?? 0);
}

/** Earliest start and latest end across the week, snapped to the hour. */
export function scheduleBounds(rows: ScheduleSlot[] = slots): { start: number; end: number } {
  if (rows.length === 0) return { start: 9 * 60, end: 20 * 60 };
  const start = Math.min(...rows.map((s) => toMinutes(s.start)));
  const end = Math.max(...rows.map((s) => toMinutes(s.end)));
  return { start: Math.floor(start / 60) * 60, end: Math.ceil(end / 60) * 60 };
}

export const teacherIdsInUse = Array.from(new Set(slots.map((s) => s.teacherId)));
export const roomIdsInUse = Array.from(new Set(slots.map((s) => s.roomId)));
export const levelIdsInUse = Array.from(new Set(slots.map((s) => s.levelId)));
