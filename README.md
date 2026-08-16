# The Best Indeed English Centre

The website of an English-language centre in Chișinău, Republic of Moldova. Trilingual — English,
Romanian and Russian — with English as the primary language.

**Start here if you are taking this over:** [`CONTENT-TODO.md`](CONTENT-TODO.md) lists everything the
centre still has to supply, and [`docs/FORM-SETUP.md`](docs/FORM-SETUP.md) makes the enrolment form
deliver mail.

```bash
npm install
cp .env.example .env.local     # optional; the form logs to the terminal without it
npm run dev                    # http://localhost:3000 → redirects to /en
```

| Command | |
| --- | --- |
| `npm run dev` | Development server |
| `npm run build` | Production build |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run lint` | ESLint |
| `npm run check:content` | Lists unfilled placeholders and timetable clashes |
| `npm run placeholders` | Regenerates the branded placeholder artwork |

---

## Stack

Next.js 16 (App Router, React Server Components) · React 19 · TypeScript · Tailwind CSS v4 ·
Embla for the carousel · Zod for form validation. No CSS-in-JS, no component library, no analytics.

---

## How it is put together

### Content is separated from layout

Every visible word lives in a dictionary; no component contains a hard-coded string.

```
src/i18n/
  types.ts                 The content schema. This is the contract.
  config.ts                Locales, the default, formatting metadata
  routes.ts                Route keys → paths. Links never hard-code a URL.
  format.ts                {token} substitution, Intl number/date formatting
  get-dictionary.ts        Lazily loads one locale's dictionary
  dictionaries/
    en/  ro/  ru/          One file per page, plus an index barrel
```

`types.ts` is what keeps three languages honest: a missing key, a renamed key or a mistyped `{token}`
is a TypeScript error, not a hole on the page. To add a field, add it to `types.ts` first and the
compiler will tell you which nine files need updating.

### Facts are separated from prose

Numbers, dates, room names, exam formats and the timetable live in `src/data/`, keyed by stable ids.
The dictionaries hold only the words. That is why the same figure can never disagree between the
English and the Russian page, and why "years teaching" is computed from `foundedYear` rather than
typed into a sentence.

```
src/data/
  site.ts        Contact details, address, hours, the map — one file to edit
  catalogue.ts   Levels, programmes, Cambridge exam ladder, headline numbers
  team.ts        People (placeholders until the centre supplies them)
  schedule.ts    The timetable
```

### Routing

Everything lives under `/[locale]/`. `src/proxy.ts` (Next 16's replacement for `middleware.ts`)
redirects a bare path to the visitor's remembered choice, then their `Accept-Language`, then English.
It maps the `mo` language tag to Romanian, which Moldovan browsers still send.

The root layout is `src/app/[locale]/layout.tsx` — there is deliberately no `src/app/layout.tsx`, so
`<html lang>` can be correct for the locale being rendered.

All three locales share English URL paths (`/ro/about`, not `/ro/despre-noi`), with correct
`hreflang` and canonical tags. Localised paths would be an improvement for Romanian search; see
`CONTENT-TODO.md`.

### The design system

`src/app/globals.css` holds the whole visual language as Tailwind v4 theme tokens: the navy and red
scales sampled from the printed logo, navy-tinted neutrals, two typefaces, three easing curves, and a
handful of custom utilities (`eyebrow`, `ruled`, `grid-paper`, `grain`, `brand-rule`,
`link-underline`, `press`).

Components in `src/components/ui/` are the vocabulary — `Section`, `SectionHeading`, `PageHero`,
`Card`, `Button`, `Reveal`, `CountUp`, `Carousel`, `Accordion`, `StatBlock`, `Prose`. Pages compose
them; they do not invent their own.

Two rules hold the look together:

- **Navy is the voice, red is punctuation.** Red appears in rules, section numerals, one underline
  and the owl's eyes. There is no red button anywhere.
- **Depth comes from hairlines and ground changes**, not shadows or gradients.

Motion follows one standard: transform and opacity only, named properties (never `transition-all`),
150–250 ms, a strong ease-out curve, hover effects behind `can-hover:`, and `prefers-reduced-motion`
respected globally. Scroll reveals are plain CSS transitions so they keep running off the main thread
while the page is still loading, and a `<noscript>` rule un-hides everything if JavaScript fails.

### The form

`src/lib/enquiry.ts` holds one Zod schema used by the browser and the server.
`src/lib/submit-enquiry.ts` picks a delivery path: Web3Forms direct from the browser when an access
key is configured (their WAF blocks server-side calls on the free plan), otherwise `/api/enquiry`,
which validates again, rate-limits by IP and sends through Resend. See `docs/FORM-SETUP.md`.

### Data protection

Built to **Legea nr. 195/2024**, in force 23 August 2026, which transposes the GDPR into Moldovan law.
The enrolment form runs on pre-contractual measures rather than consent; the consent banner offers
refusal at equal prominence with nothing pre-ticked; the map does not mount its iframe until asked;
Moldova's age threshold of 14 and the term *reprezentantul legal* are reflected in the notice.
`docs/RESEARCH-BRIEF.md` records the sources for every claim, and `CONTENT-TODO.md` lists what still
needs a lawyer's signature.

---

## Adding a page

1. Add the route key to `src/i18n/routes.ts` (and to `primaryNav` if it belongs in the header).
2. Add its interface to `src/i18n/types.ts` and the field to `Dictionary`.
3. Write `src/i18n/dictionaries/{en,ro,ru}/<page>.ts` — the compiler will tell you what is missing.
4. Create `src/app/[locale]/<path>/page.tsx` with `generateMetadata` using `pageMetadata()`.
5. Compose from `src/components/ui/`, and end with a `CtaBand`.

`sitemap.ts` and the language switcher pick the page up automatically.
