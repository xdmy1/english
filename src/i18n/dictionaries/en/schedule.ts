import type { ScheduleDict } from "../../types";

export const schedule: ScheduleDict = {
  seo: {
    title: "Timetable",
    description:
      "The weekly teaching timetable of The Best Indeed English Centre in Chișinău. Every group with its level, teacher and room, filtered by day, programme or teacher.",
  },

  hero: {
    eyebrow: "Timetable",
    title: "The teaching week",
    lead: "One grid for the whole centre: every group, its teacher and its room. Students plan their week from it; teachers plan their term.",
  },

  sampleNotice: {
    title: "This is a sample week",
    body: "The rows below are illustrative. They show how the timetable is laid out, not the groups running now; the timetable for the coming term is published on this page before the term begins.",
  },

  term: {
    // Rendered after the term name: "Autumn term · 15 September 2026 – 20 December 2026".
    label: "{start} – {end}",
    autumn: "Autumn term",
    spring: "Spring term",
    summer: "Summer term",
  },

  filters: {
    title: "Filter the timetable",
    all: "All",
    programme: "Programme",
    level: "Level",
    teacher: "Teacher",
    room: "Room",
    day: "Day",
    reset: "Clear filters",
    resultCount: "Showing {count} of {total} classes",
    empty: "No classes match these filters.",
    emptyHint:
      "Remove one filter to widen the search, or ask us about a group at that level.",
  },

  views: {
    label: "View",
    week: "Week",
    list: "List",
  },

  days: {
    mon: { long: "Monday", short: "Mon" },
    tue: { long: "Tuesday", short: "Tue" },
    wed: { long: "Wednesday", short: "Wed" },
    thu: { long: "Thursday", short: "Thu" },
    fri: { long: "Friday", short: "Fri" },
    sat: { long: "Saturday", short: "Sat" },
  },

  rooms: {
    r1: { name: "Room 1", short: "R1" },
    r2: { name: "Room 2", short: "R2" },
    r3: { name: "Room 3", short: "R3" },
    r4: { name: "Room 4", short: "R4" },
    lab: { name: "Computer lab", short: "Lab" },
    library: { name: "Library", short: "Lib" },
  },

  columns: {
    time: "Time",
    group: "Group",
    programme: "Programme",
    level: "Level",
    teacher: "Teacher",
    room: "Room",
  },

  legend: {
    title: "How to read a row",
    items: [
      {
        title: "Group code",
        body: "The letters give the programme, the middle part the CEFR level and the digits the group number. J-A2-02 is the second A2 group in the juniors programme.",
      },
      {
        title: "Level chip",
        body: "Each group is taught at one CEFR level, from Pre A1 to C2. If you are unsure which level to join, ask us for a placement test.",
      },
      {
        title: "Room",
        body: "Rooms 1 to 4 are teaching rooms. The computer lab is used for digital practice and exam simulations, the library for smaller groups.",
      },
    ],
  },

  notes: [
    "The timetable is confirmed before each term begins, once the groups are formed.",
    "Any change to a lesson time or a room is communicated to parents and adult students directly, not only through this page.",
    "Ask us about make-up lessons and the arrangements for a missed class before you enrol.",
  ],

  cta: {
    title: "Find the group that fits your week",
    body: "If a row above looks right, name it when you write. If none of them does, say which afternoons or evenings are free and we will tell you when the next group at that level opens.",
    primary: "Send an enquiry",
    secondary: "Contact the centre",
  },
};
