import type { ProgrammesDict } from "../../types";

export const programmes: ProgrammesDict = {
  seo: {
    title: "Programmes and courses",
    description:
      "Cambridge and baccalaureate curricula, courses for children, teenagers and adults, and preparation for Cambridge English, TOEFL iBT and the BAC paper.",
  },

  hero: {
    eyebrow: "What we teach",
    title: "Programmes",
    lead: "Curricula set the route from first words to C2. Courses group students by age; examination programmes prepare a candidate for one specific paper.",
  },

  groups: {
    curricula: {
      title: "Curricula",
      lead: "A curriculum is the long route: it runs level by level and carries a student from one CEFR band to the next.",
    },
    courses: {
      title: "Courses by age",
      lead: "The same teaching, grouped so that a child of 9 and an adult of 30 are never asked to learn in the same way.",
    },
    exams: {
      title: "Examination preparation",
      lead: "Short, targeted programmes for candidates who already have the level and now need the paper itself.",
    },
  },

  items: {
    cambridgeCurriculum: {
      name: "Cambridge curriculum",
      tagline: "Pre A1 to C2, one continuous route",
      body: "This is the spine of the school. Each level works the skills a Cambridge examination reports separately and closes with a full mock paper sat under exam conditions. Students move up when the level's work is secure, not when the calendar says so.",
      highlights: [
        "Reading, writing, listening and speaking every week",
        "Written work marked to published Cambridge criteria",
        "A full mock paper closes each level",
      ],
      outcome:
        "At the end of a level the student has covered what the corresponding Cambridge examination tests and can be entered for it through an authorised exam centre.",
    },

    // Translator note: keep "Limba străină I" in Romanian in all three locales —
    // it is the official name of the baccalaureate paper.
    bacCurriculum: {
      name: "BAC curriculum",
      tagline: "The obligatory baccalaureate paper, prepared properly",
      body: "Limba străină I is obligatory at the baccalaureate for every profile, and the national programme sets the paper at B1. We teach to that programme: one unseen reading text, a structured essay and a culture piece, each marked to the national scheme. There is no separate grammar section, so grammar and spelling are scored inside the writing.",
      highlights: [
        "Taught to the national programme, item by item",
        "Official practice tests and past sessions",
        "The exemption route explained to every family",
      ],
      outcome:
        "The candidate sits the June paper having worked every item type in it, or applies to be exempted from it with a qualifying international certificate.",
    },

    juniorsFull: {
      name: "Juniors, full course",
      tagline: "The complete junior programme, on weekday afternoons",
      body: "For children in primary school. Lessons are spoken and physical before they are written: songs, games, drawing and speaking tasks, with reading and writing introduced at the pace the level allows. Meeting more often in the week suits children who tire quickly and who need frequent contact with the language.",
      highlights: [
        "Short lessons, midweek after school",
        "Speaking and listening before reading and writing",
        "Themed celebrations, cooking and team tasks",
      ],
      outcome:
        "The child finishes the level able to talk about it in English and, if the family wishes, to sit Pre A1 Starters, A1 Movers or A2 Flyers.",
    },

    juniorsWeekend: {
      name: "Juniors, weekend course",
      tagline: "One longer lesson, on Saturday morning",
      body: "The same levels as the full course, taught in a single longer Saturday session. It suits families whose weekday afternoons are already committed, and children who settle better into one long block than into frequent short ones. The session is broken by a change of activity and a break.",
      highlights: [
        "One Saturday morning session each week",
        "The same levels and materials as the full course",
        "Fewer hours spread across the year",
      ],
      outcome:
        "The child covers the same level as the full course at a slower pace and can be entered for Pre A1 Starters, A1 Movers or A2 Flyers.",
    },

    teens: {
      name: "Teens",
      tagline: "Secondary-school English, grouped by level",
      body: "A teen group is built from a placement test rather than from a school register, so everyone in the room can genuinely work together. The syllabus runs alongside school English and spends its time differently: argument, opinion, writing at length and speaking without a script. Most groups work towards a Cambridge examination at their level; a student may also take the course on its own.",
      highlights: [
        "Placed by level, not by school year",
        "Writing and speaking practised every lesson",
        "Prepares for B1 Preliminary and B2 First for Schools",
      ],
      outcome:
        "The student leaves the level able to argue a case in writing and in speech, and can be entered for the Cambridge examination at that level.",
    },

    adults: {
      name: "Adults",
      tagline: "Evening groups for people who work",
      body: "Adult groups start where the student actually is, which is rarely where a textbook assumes. Lessons are built around the English an adult uses: meetings, email, travel, interviews and reading at speed. Complete beginners are placed with other beginners, never dropped into a class that has already moved on.",
      highlights: [
        "Evening groups, planned around a working week",
        "Meetings, email, interviews and travel English",
        "Placed by test, not by self-assessment",
      ],
      outcome:
        "The student can hold their side of a working conversation in English and, where it is useful, sit B2 First or C1 Advanced.",
    },

    cambridgeExams: {
      name: "Cambridge exam preparation",
      tagline: "A2 Key to C2 Proficiency",
      body: "A short course for a candidate who already has the level and now needs the paper. Every part of every paper is worked through, timed and marked, and the course is built around full mock sittings rather than loose exercises. We prepare candidates for Cambridge English examinations and enter them through an authorised exam centre, where the examination is sat and marked.",
      highlights: [
        "Timed mock sittings from the first week",
        "Mock results read as diagnosis, not prediction",
        "Entry arranged through an authorised exam centre",
      ],
      outcome:
        "The candidate arrives at the examination having already sat the whole paper under time, and knowing where the marks in it are.",
    },

    toefl: {
      name: "TOEFL iBT preparation",
      tagline: "The 2026 test, worked task by task",
      body: "Most TOEFL preparation material on sale describes a test that no longer exists. This course works only the format introduced on 21 January 2026: the current task types, the adaptive routing in reading and listening, and a score report to be read in bands rather than out of a total.",
      highlights: [
        "Current 2026 task types only",
        "Adaptive reading and listening practised under time",
        "Sat at an ETS-authorised test centre",
      ],
      outcome:
        "The candidate sits the current test knowing every task type in it; each institution sets the score it requires.",
    },

    bacExam: {
      name: "BAC exam preparation",
      tagline: "Intensive practice on the paper itself",
      body: "A final-year course for candidates who have the language and need the paper. We work the three subjects in order and to the clock: the reading items, the 180–200 word essay and the 100–110 word culture piece, each marked to the national scheme. Two of the rules in that scheme are eliminatory, and every candidate leaves knowing them.",
      highlights: [
        "Whole papers sat to the clock",
        "Marked to the national scheme, point by point",
        "The eliminatory rules taught explicitly",
      ],
      outcome:
        "The candidate walks into the June session having sat complete papers from earlier sessions under exam conditions, and knowing where each of the 100 points is won.",
    },
  },

  facts: {
    ages: "Ages",
    hours: "{n} academic hours",
    perWeek: "{n}× per week",
    minutes: "{n} min",
    levels: "Levels",
    anyAge: "Any age",
    outcomeLabel: "At the end",
  },

  levelNames: {
    preA1: "Pre A1 — First contact",
    a1: "A1 — Beginner",
    a2: "A2 — Elementary",
    b1: "B1 — Intermediate",
    b2: "B2 — Upper intermediate",
    c1: "C1 — Advanced",
    c2: "C2 — Mastery",
  },

  ladder: {
    header: {
      eyebrow: "Reference",
      title: "The Cambridge exam ladder",
      lead: "One scale, from a child's first certificate to C2. The table gives each examination's current name, its former abbreviation and its length.",
    },
    columns: {
      exam: "Examination",
      legacy: "Former abbreviation",
      cefr: "CEFR",
      duration: "Approximate length",
      scale: "Cambridge English Scale",
    },
    durationHm: "{h}h {m}",
    durationH: "{h}h",
    note: "Where a row gives two names, they are two versions of one qualification: the for Schools paper sits at the same level and follows the same format, with topics chosen for teenagers, and the certificate carries the same weight. Cambridge publishes guided learning hours as a guideline only, counted cumulatively from a standing start; a learner may need more time, or less. Cambridge English certificates do not expire, although universities and employers commonly ask for a result from the last 2 years. Pre A1 Starters, A1 Movers and A2 Flyers are not passed or failed: every child receives a certificate showing the shields awarded.",
  },

  placement: {
    header: {
      eyebrow: "Before you enrol",
      title: "How a student is placed",
      lead: "Nobody is placed by age or by school year alone. The level is decided on evidence, and the evidence is gathered before the first lesson.",
    },
    steps: [
      {
        title: "A written test",
        body: "The student sits a short written paper covering grammar, reading and a piece of writing. A teacher marks it and keeps the script on file.",
      },
      {
        title: "A conversation",
        body: "A teacher talks with the student in English for as long as it takes to hear how they cope. Speaking is where a written test is least reliable.",
      },
      {
        title: "A written recommendation",
        body: "The family receives a level, the groups that match it and the reasoning behind both. If the fit turns out to be wrong in the first lessons, the student moves.",
      },
    ],
    note: "There is no charge for the placement test and no obligation to enrol after it. Bring any school report or Cambridge result you already hold; it shortens the conversation.",
  },

  faq: {
    header: {
      eyebrow: "Questions",
      title: "Before you choose",
      lead: "The questions parents and candidates ask most often, answered without hedging.",
    },
    // Translator note: "Limba străină I" and "10 din oficiu" are official
    // Moldovan terms — keep them in Romanian in every locale.
    items: [
      {
        q: "Does a Cambridge certificate help with the baccalaureate?",
        a: "Yes, and the mechanism is exact. A qualifying international certificate at B2 or above exempts the candidate from the Limba străină I paper, which is then awarded the mark of 10 without being sat — in Moldovan practice, 10 din oficiu — and that 10 enters the average of the baccalaureate examinations. The recognised list covers B2 First and B2 First for Schools, C1 Advanced, C2 Proficiency, IELTS, TOEFL iBT, the Oxford Test of English and Oxford Test of English Advanced, each with its own minimum overall, reading and writing scores, and the dossier is filed at the school secretariat by 10 April. The list and the thresholds are set by ministerial order and are amended from time to time, so we check the current annex with each family rather than quoting last year's.",
      },
      {
        q: "Do you run the Cambridge examinations yourselves?",
        a: "No. We are a preparation centre: we teach the courses, run the mock sittings and enter candidates through an authorised exam centre, where the examination is sat and marked. Cambridge sets the papers, awards the grades and issues the certificates.",
      },
      {
        q: "How long does it take to reach B2?",
        a: "Cambridge publishes a guideline for each level, in guided learning hours counted cumulatively from a standing start. It is a guideline and not a schedule: how much a student reads outside the lesson, how much English they hear at home and how regularly they attend all move the figure. We will tell you the level a student is at now and what the next one demands. We will not put a date on it.",
      },
      {
        q: "What is the difference between the full and the weekend junior course?",
        a: "Frequency and length. The full course meets on weekday afternoons in shorter lessons; the weekend course meets once, on Saturday morning, for a longer session and fewer hours across the year. The levels and the materials are the same, so a child can move between the two at the end of a level.",
      },
      {
        q: "What changed in the TOEFL iBT?",
        a: "Since 21 January 2026 the test is adaptive in reading and listening, runs about 1h25 of test time, and reports each section and the overall result on a scale of 1 to 6 in half bands. The overall band is the average of the four sections, not a sum. There is no pass mark: each institution sets the score it requires, and scores remain valid for 2 years. Until January 2028 a report also carries a comparable figure on the old total out of 120, for institutions that have not yet moved their requirements across; the band is the current result.",
      },
      {
        q: "Is this a repetition of school English?",
        a: "No, because the grouping is different. A school class is built from a year group; ours is built from a placement test, so everyone in the room is working at the same level. Lesson time then goes on speaking, writing and being corrected, which is where time is scarcest in a large class.",
      },
    ],
  },

  cta: {
    title: "Start with the placement test",
    body: "Every programme above begins in the same place. Ask for a test date and we will book one; it takes about an hour, it costs nothing, and it settles the question of level before anybody signs anything.",
    primary: "Send an enrolment request",
    secondary: "Speak to the centre",
  },
};
