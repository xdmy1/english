import { PLACEHOLDER } from "./site";

/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  Only officially employed teachers belong here.
 *
 *  To add a real person:
 *    1. drop a portrait in /public/team/<id>.jpg  (square, ≥ 800×800, ~faces
 *       centred in the upper third — the card crops from the top)
 *    2. set `photo: "/team/<id>.jpg"`
 *    3. replace the placeholder `name`
 *    4. write `role` and `bio` in all three dictionaries (src/i18n/dictionaries)
 *
 *  Members whose name still contains PLACEHOLDER render as a monogram tile
 *  instead of a photo, so the grid never looks broken.
 * ─────────────────────────────────────────────────────────────────────────────
 */

export const teamMemberIds = [
  "founder",
  "teacher1",
  "teacher2",
  "teacher3",
  "teacher4",
  "teacher5",
  "teacher6",
] as const;

export type TeamMemberId = (typeof teamMemberIds)[number];

export interface TeamMember {
  id: TeamMemberId;
  name: string;
  /** Path under /public, or null to render the monogram tile. */
  photo: string | null;
  /** Proper nouns — certificates, degrees. Not translated. */
  credentials: string[];
  /** Years teaching. Null hides the line. */
  since: number | null;
  /** Shown on the team page only; the founder gets her own feature block. */
  isFounder?: boolean;
}

export const team: TeamMember[] = [
  {
    id: "founder",
    name: `${PLACEHOLDER} — founder`,
    photo: null,
    credentials: [],
    since: null,
    isFounder: true,
  },
  { id: "teacher1", name: `${PLACEHOLDER} 1`, photo: null, credentials: [], since: null },
  { id: "teacher2", name: `${PLACEHOLDER} 2`, photo: null, credentials: [], since: null },
  { id: "teacher3", name: `${PLACEHOLDER} 3`, photo: null, credentials: [], since: null },
  { id: "teacher4", name: `${PLACEHOLDER} 4`, photo: null, credentials: [], since: null },
  { id: "teacher5", name: `${PLACEHOLDER} 5`, photo: null, credentials: [], since: null },
  { id: "teacher6", name: `${PLACEHOLDER} 6`, photo: null, credentials: [], since: null },
];

export const founder = team.find((m) => m.isFounder)!;
export const teachers = team.filter((m) => !m.isFounder);

export function isPlaceholderName(name: string): boolean {
  return name.includes(PLACEHOLDER);
}

/** "Ana Maria Popescu" -> "AP". Falls back to the id for placeholders. */
export function monogram(member: TeamMember): string {
  if (isPlaceholderName(member.name)) return member.isFounder ? "F" : member.id.slice(-1);
  const parts = member.name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "?";
  if (parts.length === 1) return parts[0]!.slice(0, 2).toUpperCase();
  return (parts[0]![0]! + parts[parts.length - 1]![0]!).toUpperCase();
}
