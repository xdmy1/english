# What still has to come from you

The site is complete and working. Everything below is a real fact about the centre that we did not
have, so it is sitting in the code as a clearly-marked placeholder. Run `npm run check:content` at any
time to get this list from the code itself.

Almost all of it lives in **two files**.

---

## 1. `src/data/site.ts` — contact details and org facts

| Field | What to put |
| --- | --- |
| `legalName` | The registered company name, e.g. `"Best Indeed SRL"` — used in the privacy notice and terms |
| `url` | The real domain, no trailing slash |
| `foundedYear` | The year the centre opened. **The "years teaching" figure on the home page is calculated from this**, so it can never go stale |
| `phone.display` / `phone.e164` | The public number, twice: once as you want it printed, once as digits for `tel:` links |
| `email.general` | The public inbox |
| `email.admissions` | Where enrolment requests are delivered (the founder's inbox) |
| `email.privacy` | The address for data-protection requests. Required by the privacy notice |
| `address.*` | Street, number, postcode |
| `map.lat` / `map.lng` | Coordinates of the entrance. Currently the centre of Chișinău |
| `social.*` | Facebook / Instagram / TikTok / YouTube URLs. **Leave a string empty and that icon disappears** — no broken links |
| `openingHours` | Currently Mon–Fri 09:00–20:00, Sat 09:00–15:00, Sun closed. Correct if wrong |
| `simulationCentreOpens` | Set to `2026-12-01`. Confirm |

## 2. `src/data/team.ts` — the teachers

Six teacher slots and the founder, all placeholders. For each person:

1. Put a square portrait in `public/team/` — at least 800×800, face in the upper third (the card crops
   from the top). JPG is fine.
2. Set `photo: "/team/her-name.jpg"` and replace `name`.
3. Add `credentials: ["CELTA", "…"]` — only certificates that person actually holds.
4. Set `since: 2019` (or leave `null` to hide the line).
5. Write `role` and `bio` for that id in **all three** dictionaries:
   `src/i18n/dictionaries/{en,ro,ru}/team.ts`.

Delete any slots you do not need — the grid reflows. The current bios are deliberately generic and say
nothing about a person; **they must be replaced or removed before launch.**

The founder's quote on the team page is a statement of principle we drafted. She should approve it or
replace it with her own words.

## 3. `src/data/schedule.ts` — the timetable

The page currently shows a **sample week** and says so, loudly, because `isSample = true`.

1. Replace the `slots` array with the real timetable.
2. Set `term.startDate`, `term.endDate` and `term.labelKey` (`"autumn" | "spring" | "summer"`).
3. Set `isSample = false`. The notice disappears on its own.

`npm run check:content` will tell you if two classes need the same room or the same teacher at the same
time.

## 4. Photographs

Six branded placeholders are in place. Replace them with real photographs of the premises, keeping the
same filenames (or update the `src` where they are used):

| File | Where it appears | Ratio |
| --- | --- | --- |
| `public/hero.svg` | Home page hero | portrait, 4:5 |
| `public/simulation.svg` | Exam-simulation section, home + about | landscape, 3:2 |
| `public/facilities/classroom.svg` | About, carousel slide 1 | 3:2 |
| `public/facilities/computer-lab.svg` | About, carousel slide 2 | 3:2 |
| `public/facilities/library.svg` | About, carousel slide 3 | 3:2 |
| `public/facilities/reception.svg` | About, carousel slide 4 | 3:2 |

Swap in `.jpg` files and change the extension where they are referenced. Update the `alt` and
`caption` for each slide in `about.facilities.gallery`, in all three languages.

## 5. Make the form deliver mail

Five minutes. See **`docs/FORM-SETUP.md`**. Until you do this, the form validates and looks right but
nothing is sent (in development it prints to the terminal instead).

---

# Claims that need confirming before launch

These are in the copy because you asked for them. Each one is checkable, and each one carries real
risk if it turns out to be wrong. Cambridge's own regulations say persistent misuse of their status
terms is grounds for terminating a centre.

1. **"Official Cambridge partner"** — what exactly is the relationship, in writing? The copy is
   written for a **preparation centre**: a school that prepares candidates and enters them through an
   authorised exam centre. That is almost certainly what you are, and it is a perfectly good thing to
   be. But if you hold something different, the wording changes.
   **You may not** call yourself an authorised exam centre, a Platinum centre, or a "Gold/Silver
   partner" (no such Cambridge tier exists), and as a preparation centre **you may not reproduce the
   Cambridge English logo or the University of Cambridge shield at all**. None appear on the site.

2. **Which authorised exam centre do you enter candidates through?** Naming it is the accurate,
   safe phrasing — "we prepare and enter candidates through [Centre]". Tell us and we will add it.

3. **The 99.8% pass rate** — over what population and what period? The copy attributes it to your own
   candidates, which is the honest framing. Keep the underlying figures on file.

4. **"The first Cambridge exam-simulation centre in Moldova", opening 1 December** — written as your
   own announcement. Worth being sure of "first" before it is printed.

5. **Teacher qualifications** — CELTA, TKT, DELTA and the like are held by individuals. Only list what
   each teacher actually holds.

6. **The free placement test** — the copy says there is no charge for it. Confirm.

7. **The 132-hour course length** and the session pattern (2 × 90 min per week) in
   `src/data/catalogue.ts`. Correct any programme where that is wrong.

8. **Student numbers and teacher count** in `src/data/catalogue.ts` (`stats.students`, `stats.teachers`)
   are placeholders.

---

# Legal — read this before you launch

**Legea nr. 195/2024 privind protecția datelor cu caracter personal** comes into force on
**23 August 2026**. It transposes the EU GDPR and repeals Legea nr. 133/2011. The privacy notice,
cookie policy and the whole consent mechanism on this site are written to it.

What is already built:

- The enrolment form runs on **art. 6(1)(b)**, pre-contractual measures — not consent. That is the
  correct basis and it avoids the withdrawal problem consent would create.
- Moldova's threshold for a child's own consent is **14**, not 16, and the statutory term is
  *reprezentantul legal*. The form asks a parent to complete it and the notice says so.
- The message box steers people away from writing health or special-needs details, because that is
  art. 9 special-category data.
- Nothing non-essential loads before consent. The map is a third-party embed and does not mount its
  iframe until the visitor asks for it. Refusing is one click and the same size as accepting.
- No analytics are installed. If you add any, the cookie table in `legal.cookies` must be updated and
  the analytics category in the banner starts doing something.
- Breach notification to CNPDCP is 72 hours. There is no registration duty under the new law, and a
  data protection officer is not mandatory at your size — the notice does not claim you have one.

Still to do:

1. **Have a Moldovan lawyer read the privacy notice and terms.** We have written them accurately from
   the statute, but they contain decisions (retention periods, the legitimate-interest balancing) that
   should be signed off by someone who will stand behind them.
2. **Fill in the operator's legal name, address and the data-protection email** — the notice refers to
   them and they come from `src/data/site.ts`.
3. **Re-check <https://datepersonale.md> just before launch.** CNPDCP has to publish implementing acts
   before 23 August 2026 — an adequacy list, standard contractual clauses, and a mandatory-DPIA list.
   As of 16 August 2026 they were not all out.
4. **Decide the form back-end** (`docs/FORM-SETUP.md`). If you stay on Web3Forms, the privacy notice's
   international-transfers section is correct as written. If you move to an EEA provider, that section
   must be rewritten — it says so in the text itself.
5. **Terms of service**: wherever we did not have your rule (fees, missed lessons, cancellation), the
   text points to the signed course agreement rather than inventing a policy. Replace those pointers
   with your actual terms, or keep the pointer and make sure the course agreement really does cover it.

---

# Nice to have, not blocking

- **Testimonials.** There is no testimonials section, because inventing them would be dishonest.
  If you collect three or four real ones with permission to publish, they are worth adding.
- **A Romanian-language URL scheme.** Right now every language uses the same English paths
  (`/ro/about`). Localised paths (`/ro/despre-noi`) would help you rank for Romanian searches.
- **Analytics.** If you want them, a cookieless option (Plausible, Umami) avoids the consent banner
  question entirely.
