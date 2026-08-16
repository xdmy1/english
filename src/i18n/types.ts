import type {
  LevelId,
  ProgrammeGroupId,
  ProgrammeId,
  RoomId,
  StatId,
} from "@/data/catalogue";
import type { DayId } from "@/data/schedule";
import type { TeamMemberId } from "@/data/team";
import type { RouteKey } from "./routes";

/* ─────────────────────────────────────────────────────────────────────────────
 *  CONTENT SCHEMA
 *
 *  This file is the contract between the design and the three translations.
 *  Every locale must satisfy it exactly, so a missing or renamed string is a
 *  TypeScript error rather than a hole on the page.
 *
 *  Conventions
 *  ───────────
 *  • {token} placeholders are substituted at render time by format() in
 *    src/i18n/format.ts. Keep the tokens; translate everything around them.
 *  • Sentence case for headings, no trailing full stop on headings.
 *  • Never invent a fact. Numbers come from src/data, not from prose.
 * ────────────────────────────────────────────────────────────────────────── */

export interface Seo {
  title: string;
  description: string;
}

export interface SectionHeader {
  /** Small letterspaced label above the heading. */
  eyebrow: string;
  title: string;
  /** One or two sentences under the heading. */
  lead: string;
}

export interface Item {
  title: string;
  body: string;
}

export interface Qa {
  q: string;
  a: string;
}

export interface Cta {
  title: string;
  body: string;
  primary: string;
  secondary: string;
}

/* ── common ──────────────────────────────────────────────────────────────── */

export interface CommonDict {
  brand: {
    /** Never translated — kept here so the markup reads from one place. */
    name: string;
    tagline: string;
  };
  nav: Record<RouteKey, string>;
  /** Accessible names for the three <nav> landmarks. Never rendered visually. */
  navLabel: {
    main: string;
    footer: string;
    legal: string;
  };
  actions: {
    apply: string;
    applyShort: string;
    contact: string;
    learnMore: string;
    viewAll: string;
    back: string;
    close: string;
    openMenu: string;
    closeMenu: string;
    next: string;
    previous: string;
    /** "Go to slide {n}" */
    goToSlide: string;
    skipToContent: string;
    call: string;
    email: string;
    directions: string;
  };
  language: {
    label: string;
    /** "Switch to {language}" */
    switchTo: string;
  };
  /** Seven entries, Sunday first, to match Date.getDay(). */
  weekdays: string[];
  footer: {
    tagline: string;
    exploreTitle: string;
    programmesTitle: string;
    contactTitle: string;
    legalTitle: string;
    addressLabel: string;
    hoursLabel: string;
    /** "© {year} {name}. All rights reserved." */
    rights: string;
    credit: string;
  };
  ctaBand: {
    eyebrow: string;
    title: string;
    body: string;
    primary: string;
    secondary: string;
    note: string;
  };
  cookieBanner: {
    title: string;
    body: string;
    acceptAll: string;
    rejectAll: string;
    customise: string;
    save: string;
    readMore: string;
    settingsLabel: string;
    alwaysOn: string;
    categories: {
      necessary: Item;
      analytics: Item;
      maps: Item;
    };
  };
  notFound: {
    title: string;
    body: string;
    cta: string;
  };
  errorPage: {
    title: string;
    body: string;
    retry: string;
  };
  /** Shown on cards whose real content has not been supplied yet. */
  placeholder: {
    badge: string;
    photo: string;
  };
}

/* ── home ────────────────────────────────────────────────────────────────── */

export interface HomeDict {
  seo: Seo;
  hero: {
    badge: string;
    /** First line of the headline. */
    title: string;
    /** Second line, rendered with the red brand underline. */
    titleAccent: string;
    lead: string;
    primary: string;
    secondary: string;
    note: string;
    /** Three short proof points under the buttons. */
    marks: string[];
  };
  stats: {
    header: SectionHeader;
    labels: Record<StatId, { label: string; caption: string }>;
    cta: string;
  };
  pillars: {
    header: SectionHeader;
    items: Item[];
  };
  programmes: {
    header: SectionHeader;
    cta: string;
  };
  simulation: {
    eyebrow: string;
    title: string;
    lead: string;
    /** "Opening 1 December 2026" — the date itself comes from src/data/site. */
    dateLabel: string;
    points: string[];
    cta: string;
    disclaimer: string;
  };
  method: {
    header: SectionHeader;
    steps: Item[];
    cta: string;
  };
  life: {
    header: SectionHeader;
    items: Item[];
  };
  enrol: {
    header: SectionHeader;
    steps: Item[];
    cta: string;
  };
  faq: {
    header: SectionHeader;
    items: Qa[];
    cta: string;
  };
  visit: {
    header: SectionHeader;
    primary: string;
    secondary: string;
  };
}

/* ── about ───────────────────────────────────────────────────────────────── */

export interface AboutDict {
  seo: Seo;
  hero: {
    eyebrow: string;
    title: string;
    lead: string;
  };
  story: {
    header: SectionHeader;
    paragraphs: string[];
    quote: string;
    quoteAttribution: string;
  };
  numbers: {
    header: SectionHeader;
    labels: Record<StatId, { label: string; caption: string }>;
  };
  principles: {
    header: SectionHeader;
    items: Item[];
  };
  simulation: {
    header: SectionHeader;
    badge: string;
    paragraphs: string[];
    points: Item[];
    disclaimer: string;
  };
  method: {
    header: SectionHeader;
    paragraphs: string[];
    pillars: Item[];
  };
  results: {
    header: SectionHeader;
    lead: string;
    notes: string[];
  };
  partnership: {
    header: SectionHeader;
    paragraphs: string[];
    disclaimer: string;
  };
  facilities: {
    header: SectionHeader;
    rooms: Record<RoomId, { name: string; body: string }>;
    /** Exactly four, matching /public/facilities/*.svg */
    gallery: { alt: string; caption: string }[];
    galleryNote: string;
  };
  beyond: {
    header: SectionHeader;
    items: Item[];
  };
  cta: Cta;
}

/* ── programmes ──────────────────────────────────────────────────────────── */

export interface ProgrammesDict {
  seo: Seo;
  hero: {
    eyebrow: string;
    title: string;
    lead: string;
  };
  groups: Record<ProgrammeGroupId, { title: string; lead: string }>;
  items: Record<
    ProgrammeId,
    {
      name: string;
      tagline: string;
      body: string;
      highlights: string[];
      outcome: string;
    }
  >;
  /** Labels for the small fact rows on each programme card. */
  facts: {
    ages: string;
    /** "{n} academic hours" */
    hours: string;
    /** "{n}× per week" */
    perWeek: string;
    /** "{n} min" */
    minutes: string;
    levels: string;
    anyAge: string;
    outcomeLabel: string;
  };
  levelNames: Record<LevelId, string>;
  ladder: {
    header: SectionHeader;
    columns: {
      exam: string;
      legacy: string;
      cefr: string;
      duration: string;
      scale: string;
    };
    note: string;
  };
  placement: {
    header: SectionHeader;
    steps: Item[];
    note: string;
  };
  faq: {
    header: SectionHeader;
    items: Qa[];
  };
  cta: Cta;
}

/* ── team ────────────────────────────────────────────────────────────────── */

export interface TeamDict {
  seo: Seo;
  hero: {
    eyebrow: string;
    title: string;
    lead: string;
  };
  founder: {
    eyebrow: string;
    role: string;
    paragraphs: string[];
    quote: string;
  };
  teachers: {
    header: SectionHeader;
    /** Explains that everyone listed is on a formal employment contract. */
    employmentNote: string;
    sinceLabel: string;
  };
  members: Record<TeamMemberId, { role: string; bio: string }>;
  standards: {
    header: SectionHeader;
    items: Item[];
  };
  join: {
    title: string;
    body: string;
    cta: string;
  };
  cta: Cta;
}

/* ── schedule ────────────────────────────────────────────────────────────── */

export interface ScheduleDict {
  seo: Seo;
  hero: {
    eyebrow: string;
    title: string;
    lead: string;
  };
  sampleNotice: {
    title: string;
    body: string;
  };
  term: {
    /** "Autumn term · {start} – {end}" */
    label: string;
    autumn: string;
    spring: string;
    summer: string;
  };
  filters: {
    title: string;
    all: string;
    programme: string;
    level: string;
    teacher: string;
    room: string;
    day: string;
    reset: string;
    /** "{count} of {total} classes" */
    resultCount: string;
    empty: string;
    emptyHint: string;
  };
  views: {
    label: string;
    week: string;
    list: string;
  };
  days: Record<DayId, { long: string; short: string }>;
  rooms: Record<RoomId, { name: string; short: string }>;
  columns: {
    time: string;
    group: string;
    programme: string;
    level: string;
    teacher: string;
    room: string;
  };
  legend: {
    title: string;
    items: Item[];
  };
  notes: string[];
  cta: Cta;
}

/* ── contact ─────────────────────────────────────────────────────────────── */

export interface ContactDict {
  seo: Seo;
  hero: {
    eyebrow: string;
    title: string;
    lead: string;
  };
  cards: {
    phone: { label: string; note: string };
    email: { label: string; note: string };
    address: { label: string; note: string };
    hours: { label: string; note: string };
  };
  closed: string;
  map: {
    title: string;
    /** Consent gate copy — the iframe loads only after this is accepted. */
    body: string;
    accept: string;
    open: string;
    provider: string;
  };
  form: {
    header: SectionHeader;
  };
  faq: {
    header: SectionHeader;
    items: Qa[];
  };
}

/* ── apply ───────────────────────────────────────────────────────────────── */

export type ApplyFieldId =
  | "learnerType"
  | "studentName"
  | "studentAge"
  | "parentName"
  | "phone"
  | "email"
  | "programme"
  | "level"
  | "preferredSchedule"
  | "message";

export interface ApplyDict {
  seo: Seo;
  hero: {
    eyebrow: string;
    title: string;
    lead: string;
  };
  form: {
    sections: {
      learner: string;
      contact: string;
      course: string;
    };
    fields: Record<
      ApplyFieldId,
      { label: string; placeholder?: string; hint?: string }
    >;
    learnerType: {
      self: string;
      child: string;
    };
    levelUnknown: string;
    schedulePreference: {
      weekdayAfternoon: string;
      weekdayEvening: string;
      weekend: string;
      flexible: string;
    };
    required: string;
    optional: string;
    /** Contains {privacy} — replaced with a link to the privacy notice. */
    consent: string;
    marketing: string;
    submit: string;
    submitting: string;
  };
  validation: {
    required: string;
    email: string;
    phone: string;
    consent: string;
    /** "At least {n} characters" */
    minLength: string;
    age: string;
    summary: string;
  };
  success: {
    title: string;
    body: string;
    again: string;
  };
  failure: {
    title: string;
    body: string;
    retry: string;
  };
  aside: {
    title: string;
    steps: Item[];
    responseTime: string;
    privacyTitle: string;
    privacyBody: string;
    callTitle: string;
    callBody: string;
  };
}

/* ── legal ───────────────────────────────────────────────────────────────── */

export interface LegalSection {
  heading: string;
  paragraphs?: string[];
  bullets?: string[];
  table?: {
    columns: string[];
    rows: string[][];
  };
}

export interface LegalPage {
  seo: Seo;
  title: string;
  lead: string;
  sections: LegalSection[];
}

export interface LegalDict {
  /** "Last updated {date}" */
  updatedLabel: string;
  updatedDate: string;
  tocTitle: string;
  privacy: LegalPage;
  cookies: LegalPage;
  terms: LegalPage;
}

/* ── root ────────────────────────────────────────────────────────────────── */

export interface Dictionary {
  common: CommonDict;
  home: HomeDict;
  about: AboutDict;
  programmes: ProgrammesDict;
  team: TeamDict;
  schedule: ScheduleDict;
  contact: ContactDict;
  apply: ApplyDict;
  legal: LegalDict;
}
