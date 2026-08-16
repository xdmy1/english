# Making the enrolment form deliver mail

The form on `/apply` and `/contact` validates in the browser, validates again where it can, and then
hands the request to one of two delivery paths. Choose one, add the environment variables, redeploy.

---

## Option A — Web3Forms (what the brief asked for)

**Setup, about five minutes**

1. Go to <https://web3forms.com>, enter the founder's email address, and they send an access key
   (a UUID) to that inbox.
2. Put it in `.env.local`:

   ```
   NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY=your-uuid-here
   ```

3. Add the same variable in your hosting provider's project settings and redeploy.

**Why the key is public.** Web3Forms' own documentation: *"Access key is public… Think of it as an
alias to your email. If someone else has access to your access_key, they can only send you emails."*
It cannot read past submissions or change any setting.

**Why the request is sent from the browser and not from our server.** Web3Forms block server-side
calls on the free plan. A `POST` from a server returns:

```
HTTP/2 403
{"success": false,
 "message": "This method is not allowed. Use our API in client side or contact support with
             server IP address (Pro plan is required)"}
```

Adding browser-like headers escalates to a Cloudflare challenge page, which a server cannot solve.
Their docs are explicit: *"Do not proxy it in another API or server side code."* Server-side use
needs a paid plan **and** a safelisted static egress IP, which serverless hosting cannot give you.
So `src/lib/submit-enquiry.ts` posts from the browser — the supported path.

**Free tier:** 250 submissions a month, one recipient address, 30 days of dashboard history.
Over quota, submissions are rejected until the next month.

**Spam:** the honeypot (`botcheck`) is already wired in. If spam becomes a problem, turn on hCaptcha
in the Web3Forms dashboard — the free plan includes it — and add their widget to `EnquiryForm.tsx`.

**One thing to check before launch:** `w3forms.com` and `web3forms.com` are two different companies.
This project is wired to **web3forms.com** (`api.web3forms.com`). If you sign up at the other one the
key will not work.

---

## Option B — server-side delivery through Resend (recommended)

Leave `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY` unset and the form posts to `/api/enquiry`, which validates
the payload with the same Zod schema, rate-limits by IP, and sends the mail itself.

```
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxxxxx
ENQUIRY_FROM=The Best Indeed <office@your-domain.md>
ENQUIRY_TO=founder@your-domain.md
```

`ENQUIRY_FROM` must be an address on a domain you have verified in Resend.

**Why this is the better option for a Moldovan school.** Web3Forms is operated from India, stores
submissions in AWS us-east with no EU region and a three-year physical retention, and routes every
submitter's IP address and email through CleanTalk and Akismet for spam filtering. All of that has to
be disclosed in the privacy notice under Legea nr. 195/2024, and every one of them is an
international transfer needing standard contractual clauses. Resend offers an EEA region, so the
transfer chapter mostly disappears — and you get server-side validation and rate limiting for free.

**If you switch, update the privacy notice.** The international-transfers section names the current
provider chain explicitly.

---

## Local development

With neither option configured, `npm run dev` prints the submission to the terminal and the form
shows its success state, so the whole flow is testable. This only happens when
`NODE_ENV === "development"`. In production a missing configuration is reported as a failure — the
form never claims to have sent something it did not send.

---

## Where the pieces live

| File | Role |
| --- | --- |
| `src/lib/enquiry.ts` | The Zod schema, shared by browser and server |
| `src/lib/submit-enquiry.ts` | Chooses the delivery path, handles both response shapes |
| `src/app/api/enquiry/route.ts` | Server path: validate, throttle, send via Resend |
| `src/components/forms/EnquiryForm.tsx` | The form itself, validation UI, success and error states |
