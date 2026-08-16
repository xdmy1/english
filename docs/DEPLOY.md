# Putting the site live

The site is a standard Next.js app with no database and no server state, so any host that runs Node
will serve it. Vercel is the least work.

## Vercel

1. Push the repository to GitHub (already done: `github.com/xdmy1/english`).
2. At <https://vercel.com/new>, import the repository. Everything is auto-detected — framework
   Next.js, build `next build`, no root directory to set.
3. Add the environment variables from `.env.example` under **Settings → Environment Variables**.
   At minimum, one of the two form options in [`FORM-SETUP.md`](FORM-SETUP.md).
4. Deploy.

## The domain

1. Add the domain under **Settings → Domains** and point the DNS records Vercel gives you.
2. **Change `site.url` in `src/data/site.ts` to the real origin, no trailing slash.** It is what
   `sitemap.xml`, the canonical tags, the `hreflang` alternates and the social card URLs are built
   from. Leave it wrong and search engines will be told the canonical page lives somewhere else.
3. Submit `https://your-domain.md/sitemap.xml` to Google Search Console.

## Before you announce it

Run through this in order:

```bash
npm run check:content    # lists every placeholder still in the code
npm run typecheck
npm run lint
npm run build
```

Then, on the deployed site:

- [ ] Send a real enrolment request from `/en/apply` and confirm it arrives in the founder's inbox.
      Do it again from `/ro/apply` — the form language is included in the email.
- [ ] Reply to that email and check the reply-to address is the sender's, not the site's.
- [ ] Open the cookie banner, press **Reject all**, and confirm the map on `/contact` stays closed.
      Then press **Cookie settings** in the footer and accept, and confirm it loads.
- [ ] Check the site in Romanian and Russian on a phone, especially the timetable.
- [ ] Paste the home page URL into a WhatsApp or Facebook message and check the preview card.
- [ ] Confirm the phone number in the header dials correctly from a phone.

## Things that will need a redeploy

Content lives in the repository, not a CMS. Changing the timetable, a price, a teacher or any text
means editing a file and pushing — Vercel rebuilds automatically. The files worth knowing:

| To change | Edit |
| --- | --- |
| Phone, email, address, hours | `src/data/site.ts` |
| The timetable | `src/data/schedule.ts` |
| Teachers | `src/data/team.ts` + `team.ts` in each of the three dictionaries |
| Course hours, ages, levels | `src/data/catalogue.ts` |
| Any wording | `src/i18n/dictionaries/{en,ro,ru}/` |

An admin panel and Supabase were deliberately left out of this build, as agreed. When they are added,
the dictionaries and `src/data` are the natural seam: both are plain typed objects, so a CMS can
replace either one without touching a single component.
