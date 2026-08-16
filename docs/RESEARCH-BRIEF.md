# BUILD BRIEF — The Best Indeed English Centre (Chișinău, Moldova)
### Next.js marketing site · Romanian-language · merged research brief
**Compiled 16 August 2026** from four verified research briefs (Moldovan data-protection law; Web3Forms integration; Cambridge English + TOEFL; Moldova BAC).
Tags used below: `[VERIFIED-LIVE]` tested against a live API from this machine · `[DOCS]` official documentation · `[ARCHIVE]` Wayback capture of a Cloudflare-blocked page · `[UNVERIFIED]` could not confirm — see §11.

---

## 1. LEGAL / GDPR (MOLDOVA) — WHAT THE SITE MUST IMPLEMENT

### 1.1 The governing law

| Item | Verified value |
|---|---|
| **Number** | **Legea nr. 195/2024** (NOT 2025) |
| **Official Romanian title** | **Lege privind protecția datelor cu caracter personal** |
| **Adopted** | 25 iulie 2024 (*lege organică*) |
| **Promulgated** | Decret nr. 1592-IX, **21 august 2024** (Maia Sandu) |
| **Published** | **Monitorul Oficial nr. 367-369 (9305-9307), art. 574, 23 august 2024** |
| **Entry into force** | **23 AUGUST 2026** — i.e. **7 days from the research date** |
| **Transposes** | Regulation (EU) 2016/679 (GDPR), CELEX 32016R0679 — stated in the law's own preamble |

Verbatim, **Art. 89 alin. (1)**:

> „Prezenta lege intră în vigoare la expirarea a **24 de luni** de la data publicării în Monitorul Oficial al Republicii Moldova."

24 months from 23.08.2024 → **23.08.2026**. CNPDCP's own guidance document is titled *"Legea nr. 195/2024 privind protecția datelor cu caracter personal (în vigoare din 23 august 2026)"*, which settles it. **The "21 August" date is real but is a different event** — 21 August **2024**, the presidential promulgation decree nr. 1592-IX. No amendment postponing entry into force was found.

**Repeals** (Art. 89 alin. (3), effective 23.08.2026):
- a) Legea nr. 182/2008 (CNPDCP Regulation);
- b) **Legea nr. 133/2011 privind protecția datelor cu caracter personal**;
- c) art. 74¹–74³ și art. 423⁴ din Codul contravențional nr. 218/2008.

Law 133/2011 is **replaced, not run alongside**. Until **22.08.2026 inclusive**, 133/2011 still governs.

**Grandfathered consent** — Art. 90 alin. (8): consents validly collected under 133/2011 **do not need to be re-collected** if the way they were given already meets Law 195/2024's conditions. A properly built opt-in today survives the transition.

**Phased fines** — Art. 90 alin. (4): year 1 → **10%** of the assessed fine; year 2 → **40%**; year 3 onward → **100%**. This is a taper on the *amount*, **not** a grace period on the obligations — every duty binds from day one.

**Fine ceilings** — Art. 88:
- up to **1,000,000 MDL or 1% of total annual turnover** (whichever is greater) — controller/processor duties (arts. 8, 11, 25–39, 42, 43);
- up to **2,000,000 MDL or 2%** — breaches of principles / legal bases / consent (arts. 5, 6, 7, 9), data-subject rights (arts. 12–22), international transfers (arts. 44–49).

### 1.2 Territorial scope — both laws apply

Art. 3 replicates GDPR Art. 3: establishment-based (alin. 1) **plus** targeting/monitoring of people located in Moldova by a controller without a Moldovan establishment (alin. 2). A centre established in Moldova is squarely in scope. Separately, if the site knowingly offers services to, or monitors, people **in the EU**, GDPR Art. 3(2) applies too. For a local language school EU exposure is realistically limited to EU-resident enquirers — but the compliance build is identical, so treat it as in scope. Build once to GDPR and you satisfy both, with three Moldova-specific divergences (age 14; the Centre issues adequacy decisions; the ePrivacy analogue is Law 72/2025).

The law mirrors GDPR article-for-article: art. 5 principles · art. 6 legal bases · art. 12 transparency · arts. 13–22 rights · art. 28 processors · art. 30 records · art. 32 security · arts. 33–34 breach · arts. 37–39 DPO · arts. 44–49 transfers.

**Art. 27** requires a representative for controllers **without an establishment** in Moldova who fall under art. 3(2) — but alin. (2)(c)/(d) exempt controllers established in, or represented in, an **EEA member state**. Not applicable to a Moldova-established centre.

### 1.3 Lawful basis (`temei juridic`) — per purpose, never one blanket consent

Art. 6 alin. (1) lists exactly the GDPR six: a) consimțământ; b) executarea unui contract / măsuri precontractuale; c) obligație legală; d) interese vitale; e) interes public; f) interese legitime.

| Purpose | Basis | Notes |
|---|---|---|
| Contact / enrolment form (name, phone, email, child's age, message) | **art. 6(1)(b)** — *măsuri precontractuale la cererea persoanei vizate* | Do **not** use consent here — wrong basis, creates a withdrawal problem |
| Keeping the enquiry after it closes (records, disputes) | **art. 6(1)(f)** legitimate interests | Needs a documented balancing test |
| Statutory accounting/tax records once enrolled | **art. 6(1)(c)** | |
| Analytics cookies | **art. 6(1)(a)** consent | See §3 |
| Marketing email / newsletter | **art. 6(1)(a)** + Law 72/2025 art. 124 | Prior opt-in |
| Google Maps embed (loads remote assets, exposes IP) | **art. 6(1)(a)** consent | Consent-gate it |

**Art. 6 alin. (5)** governs compatible further processing — do not silently repurpose enquiry data into marketing.
**Art. 6(1)(f)** carries an explicit caveat that legitimate interests are weaker *"în special atunci când persoana vizată este un copil."*

### 1.4 Children's data — THE key Moldovan divergence: the threshold is 14, not 16

Verbatim, **Art. 8 alin. (1)**:

> „(1) În cazul în care se aplică art. 6 alin. (1) lit. a), în ceea ce privește oferirea de servicii ale societății informaționale direct unui copil, prelucrarea datelor cu caracter personal ale unui copil este legală dacă copilul are cel puțin vârsta de **14 ani**. În cazul copilului cu vârsta sub 14 ani, respectiva prelucrare este legală numai dacă și în măsura în care consimțământul respectiv este acordat sau autorizat de **reprezentantul legal al copilului**."

Two drafting details:
- Moldova says **`reprezentantul legal`** (legal representative) where GDPR says *holder of parental responsibility*. Use the Moldovan phrase in a Romanian policy.
- **Art. 8 alin. (2)**: the controller must make **reasonable efforts** to verify that the legal representative gave/authorised consent, *"ținând cont de tehnologiile disponibile."*

**Critical scoping point most templates get wrong:** Art. 8 is triggered **only when the basis is art. 6(1)(a) consent** ("În cazul în care se aplică art. 6 alin. (1) lit. a)"). An enrolment form running on **art. 6(1)(b)** pre-contractual measures does **not** trigger the age-14 parental-consent machinery. Clean design:

1. State plainly that the form is **to be completed by a parent / legal representative**.
2. Run the form on **art. 6(1)(b)**, not consent.
3. Collect the child's **age or age band**, not full date of birth, unless DOB is genuinely needed (art. 5 data minimisation — *reducerea la minim a datelor*).
4. Keep the marketing opt-in a **separate, unticked** checkbox; do not let a child under 14 self-subscribe.

**Special categories.** Child's age is **not** special-category data. Art. 9 list: racial/ethnic origin, political opinions, religion, philosophical beliefs, trade-union membership, genetic, biometric-for-identification, health, sex life/orientation. But **health notes, allergies, or special-educational-needs free text in a "message" box would be art. 9 health data** — either block that or add explicit consent (art. 9(2)(a)) plus a retention limit. Put an explicit warning line under the message field.

For **EU-resident children** the applicable member-state threshold (13–16) governs instead — Moldova's 14 does not travel.

### 1.5 Privacy notice contents — Art. 13 is the checklist

**Art. 13 alin. (1):** a) identity and contact details of the operator (and representative if any); b) contact details of the DPO if one exists; c) **purposes and the legal basis**; d) where art. 6(1)(f) is used, **the legitimate interests pursued**; e) recipients or categories of recipients; f) intention to transfer abroad, whether or not a **Centre adequacy decision** exists, and reference to the art. 46/47/49(2) safeguards plus how to obtain a copy.

**Art. 13 alin. (2):** a) **retention period or the criteria** used to set it; b) rights of access, rectification, erasure, restriction, objection, portability; c) where consent is the basis, the **right to withdraw at any time** without affecting prior lawfulness; d) **the right to lodge a complaint with the Centre**; e) whether providing the data is a statutory/contractual requirement, whether the person is obliged to provide it, and the **consequences of not providing it**; f) existence of automated decision-making/profiling and meaningful information about the logic.

**Art. 12 alin. (1)** requires all of this *"într-o formă concisă, transparentă, inteligibilă și ușor accesibilă, utilizând un limbaj clar și simplu, **în special pentru orice informații adresate în mod specific unui copil**."* Audience includes children and parents → use a **layered notice** (short summary + full policy). CNPDCP guidance: *"Nu este necesară informarea prin texte juridice ample. Este suficient un mesaj clar, direct și formulat cu bună-credință."*

### 1.6 Data-subject rights — statutory headings to reuse verbatim

- Art. 15 — Dreptul de acces al persoanei vizate
- Art. 16 — Dreptul la rectificare
- Art. 17 — Dreptul la ștergerea datelor („dreptul de a fi uitat")
- Art. 18 — Dreptul la restricționarea prelucrării
- Art. 19 — Obligația de notificare privind rectificarea sau ștergerea datelor
- Art. 20 — Dreptul la portabilitatea datelor
- Art. 21 — Dreptul la opoziție
- Art. 22 — Procesul decizional individual automatizat, inclusiv crearea de profiluri

**Deadline: one month**, extendable by **two further months** where justified (art. 12). CNPDCP guidance: *"Operatorul nu poate ignora această cerere. El trebuie să o înregistreze și să răspundă la ea în termen legal. Acest termen este de cel mult o lună de la primirea cererii."*
Implementation: publish **one dedicated email address** for requests, verify identity before disclosing, and **log every request and response**.

### 1.7 Retention (`limitările legate de stocare`)

No statutory table exists for enquiry data — art. 5 requires you to set and justify your own. Defensible defaults for a language centre:
- unsuccessful enquiries **6–12 months**;
- enrolled-student records for the contract term **+ 3 years** (general limitation period) **or** + the accounting-law retention period, whichever is longer;
- marketing consent until withdrawn, with periodic re-confirmation.

State the period **or the criteria** in the notice (art. 13(2)(a)) — "as long as necessary" alone is **non-compliant**.

### 1.8 Registration with the authority — NONE

There is **no** registration or prior-notification duty, and Law 195/2024 introduces none. The old duty under art. 28 of Law 133/2011 was **abolished by Legea nr. 175/2021, in force 10 January 2022**, and the *Registrul de evidență al operatorilor de date cu caracter personal* (RODCAP) was liquidated by **HG nr. 282/2022**. Anyone advising this client to "register with CNPDCP" is working from pre-2022 information.

What replaces it is **self-documentation**: the art. 30 processing register, art. 35 DPIAs where required, art. 25 privacy-by-design/default.

**Art. 30 register — the 250-employee exemption will NOT save this client.** Art. 30 alin. (5) exempts organisations with fewer than 250 employees *"cu excepția cazului în care prelucrarea pe care o efectuează este susceptibilă să genereze un risc..., **prelucrarea nu este ocazională**, sau prelucrarea include categorii speciale de date."* Routine enrolment processing is by definition **not occasional**, and it concerns children. Keep the register. Art. 30 requires: controller name and contact details; purposes; categories of data subjects and of personal data; categories of recipients; international transfers; retention periods; a general description of security measures.

A full **DPIA (evaluarea impactului asupra protecției datelor, art. 35)** is unlikely to be mandatory for a simple contact form, but CNPDCP maintains a list of processing operations requiring one — check it before launch. Children's data raises the risk profile.

### 1.9 DPO (`responsabil cu protecția datelor`) — not mandatory here

**Art. 37 alin. (1)** makes designation mandatory only where: a) processing is by a **public authority or institution** (excluding courts acting judicially); b) core activities require **regular and systematic monitoring of data subjects on a large scale**; c) core activities consist of **large-scale** processing of art. 9 special categories or art. 10 criminal-conviction data.

A small private education centre meets none of these — its core activity is teaching, not monitoring, and the scale is not large. **No DPO required.** Art. 37 alin. (4) permits voluntary designation and CNPDCP recommends it, but **art. 37 alin. (7)** then requires you to **publish the contact details and communicate them to the Centre** — a voluntary appointment creates a real obligation. For a small centre, name an internal **"persoană de contact pentru protecția datelor"** instead and avoid the DPO label with its independence/reporting requirements (arts. 38–39).

### 1.10 Breach notification

- **Art. 33**: notify the Centre *"fără întârzieri nejustificate și, dacă este posibil, în termen de cel mult **72 de ore**"* of becoming aware, unless the breach is unlikely to result in a risk. Late notification must carry a reasoned explanation. **Art. 33(3)** content: nature of the breach, approximate numbers of data subjects and records, DPO/contact point, likely consequences, measures taken or proposed.
- **Art. 33(5)**: maintain an **internal breach log of all breaches**, including those not notified — mandatory, and the first thing an inspector will ask for.
- **Art. 34**: inform affected individuals without undue delay where the breach is likely to result in a **high risk** to their rights and freedoms.
- **Art. 33(2)**: processors must notify **you** without undue delay — put this in the contract.

### 1.11 International transfers — hosting and the form backend

Chapter V (arts. 44–49) mirrors GDPR. Two findings make this much easier:

**(a) EEA transfers are entirely exempt.** Art. 44 alin. (2), verbatim:

> „(2) Prezentul capitol nu se aplică transferurilor de date cu caracter personal către statele membre ale Spațiului Economic European. În cazul acestor transferuri nu sunt necesare autorizări speciale."

**Consequence: host in the EEA and the Moldovan transfer chapter simply does not engage.** This is the single highest-leverage architectural decision available — choose an EU/EEA region for hosting and for any form backend.

**(b) European Commission SCCs are recognised directly.** Art. 46 alin. (2) lit. c) permits *"clauze standard de protecție a datelor aprobate de **Centru** sau adoptate de **Comisia Europeană**"* — with **no** authorisation from the Centre required (art. 46(2) chapeau). The standard EU SCC pack you would sign for GDPR also discharges the Moldovan requirement.

Applied to the named vendors:
- **Web3Forms** — operated from **India** (Web3Creative, Kerala); DPA published at `web3forms.com/dpa`; processes submissions as your **processor**. India has **no** Moldovan adequacy decision and no EU adequacy decision. You therefore need art. 46(2)(c) SCCs or an art. 49 derogation. **Recommendation: replace the third-party form endpoint with a self-hosted API route posting to an EEA-hosted backend / EEA mailbox.** For a form carrying children's names and ages this removes an entire transfer analysis, an entire processor relationship, and a paragraph from the privacy policy. If Web3Forms must stay: execute the DPA + SCCs and disclose India as a recipient country under art. 13(1)(f). See §4 for the full spec and the naming collision.
- **Google Maps embed** — sends visitor IP and user-agent to Google before any interaction. Load **only after consent**, behind a static placeholder image with a "click to load the map" control. This also solves the cookie problem for it.
- **Analytics** — prefer a **cookieless, EEA-hosted** analytics product. Removes the consent-banner dependency for measurement and shrinks the notice.
- Do **not** rely on **art. 49(1)(a)** explicit consent as the routine transfer mechanism — it is a derogation for occasional transfers, not an architecture, and it is revocable.
- **Art. 49(7)**: record the transfer assessment and safeguards in your art. 30 register.

### 1.12 Supervisory authority

| Field | Value |
|---|---|
| **Romanian** | **Centrul Național pentru Protecția Datelor cu Caracter Personal** (**CNPDCP**) |
| **English** | National Center for Personal Data Protection (NCPDP) |
| **Address** | MD-2004, mun. Chișinău, str. Serghei Lazo nr. 48 |
| **Phone** | (+373 22) 820 801 · **Fax** (+373 22) 820 807 |
| **Email** | centru@datepersonale.md |
| **Website** | https://datepersonale.md |

**The name does not change** under Law 195/2024 — art. 55 keeps *Centrul Național pentru Protecția Datelor cu Caracter Personal*. What changes:
- **Art. 55**: restated as an autonomous public authority, a single national structure, **independent** of other public authorities, legal persons and natural persons; a public-law legal person. **Art. 56**: financed from the state budget, audited by the Court of Accounts. **Art. 57**: structure and staff ceiling set by **Parliament decision**.
- **Governance (arts. 62–66)**: director and deputy directors appointed by **Parliament**; dismissal requires a Parliament vote. Sitting director/deputies continue their mandates (art. 90(1)).
- **New inspectorate (arts. 68–71)**: a corps of **`inspector de protecție a datelor`**.
- **Direct enforcement — the biggest practical change.** Under 133/2011 sanctions ran through the Contravention Code. Law 195/2024 repeals arts. 74¹–74³ and 423⁴ of the Contravention Code and empowers the Centre to **impose administrative fines itself** (arts. 86–88), following its own procedure (arts. 72–85: plângere → examinare preliminară → investigație → decizie → executare). Fines go to the state budget.
- **Art. 60**: full GDPR-style investigative, corrective, authorisation and advisory powers, including temporary or definitive limitation/ban on processing and suspension of data flows.
- **Art. 45**: the Centre — not the European Commission — issues **adequacy decisions** for Moldova and publishes them on its official website.
- Acts issued by the Centre under art. 32(3) and 32(5)(f)/(i) of Law 133/2011 **remain in force** after 23.08.2026 (art. 90(5)).

### 1.13 Action list for this build

1. **Host in the EEA** (site + any form backend). Art. 44(2) then removes the entire transfer chapter. Highest-value single decision.
2. **Drop the third-party form endpoint** if you can; post to your own EEA-hosted API route. Otherwise sign the DPA **and** EU SCCs and disclose the recipient country. Verify whether the integration is `w3forms.com` or `web3forms.com` first (§4.0).
3. **Consent-gate the Google Map** behind a static placeholder; consent-gate all analytics. Reject must be as easy as Accept.
4. Prefer **cookieless EEA analytics** — shrinks both the banner and the policy.
5. Run the enrolment form on **art. 6(1)(b)**, label it **to be completed by a parent/legal representative**, collect **age band not DOB**, and warn against entering health information in the free-text box.
6. Keep the **marketing opt-in separate and unticked** (art. 124(1) of Law 72/2025); log consent with timestamp and the exact wording shown.
7. Publish the **Politica de confidențialitate** to the art. 13 checklist and the headings in §2, in **RO / RU / EN**, with **RO authoritative** (state language) plus a clause stating which language prevails on divergence.
8. Write the **art. 30 register** — you do not qualify for the <250 exemption because the processing is not occasional.
9. Sign **art. 28 processor contracts** with hosting, email, forms, analytics.
10. Write a one-page **breach procedure** (72h to CNPDCP) and start the **breach log** required by art. 33(5).
11. Name a **contact person** for data protection; do **not** call them a DPO unless you intend to publish and notify the Centre (art. 37(7)).
12. **Set retention periods** and state them in the notice.
13. **Re-check `datepersonale.md`** in the days before 23.08.2026 for CNPDCP implementing acts, the adequacy list, and any cookie guidance.

### 1.14 Art. 5 — the seven principles (CNPDCP's own wording)

(1) legalitatea, echitatea și transparența; (2) limitarea scopului; (3) reducerea la minim a datelor; (4) exactitatea; (5) limitările legate de stocare; (6) integritate și confidențialitate; (7) responsabilitate.

### 1.15 Primary sources

- Law 195/2024, authentic text, *MO* nr. 367-369, art. 574, 23.08.2024 — https://monitorul.gov.md/ro/monitor/2950 (PDF: `https://monitorul.gov.md/flow/services/view.php?doc=PBAWVlpv09OjO8QGnTMx&format=pdf&subfolder=August2024/`)
- Law 72/2025 (electronic communications), authentic text, *MO* nr. 226-228, 13.05.2025 — https://monitorul.gov.md/ro/monitor/3080 (PDF: `https://monitorul.gov.md/flow/services/view.php?doc=lGzkmgwPbF38y2rEFDRk&format=pdf&subfolder=May2025/`)
- CNPDCP guidance PDF — https://datepersonale.md/wp-content/uploads/2026/03/Legea-nr.1952024.pdf
- Ministry of Justice draft law + EU concordance table — https://www.justice.gov.md/sites/default/files/document/attachments/proiectul_de_lege_privind_protectia_datelor_cu_caracter_personal_impreuna_cu_materialele_insotitoare.pdf
- Legis.md record LP195/2024 — https://www.legis.md/cautare/getResults?doc_id=144681&lang=ro (403s to automated fetch; used via search metadata only)
- CNPDCP — https://datepersonale.md · https://datepersonale.md/legea-privind-protectia-datelor-cu-caracter-personal-publicata-in-monitorul-oficial/
- MoJ press release — https://justice.gov.md/ro/content/noua-lege-privind-protectia-datelor-cu-caracter-personal-reprezinta-un-pas-esential
- MoJ cookie policy (Moldovan practice) — https://justice.gov.md/ro/politica-cookie
- MDED on Law 72/2025 — https://mded.gov.md/legea-comunicatiilor-electronice-transparenta-si-corectitudine-intre-furnizori-si-utilizatori/
- Secondary corroboration: DLA Piper Moldova https://www.dlapiperdataprotection.com/?t=law&c=MD · Juridice Moldova https://juridicemoldova.md/21009/ · Monitorul Fiscal https://monitorul.fisc.md/din-anul-2026-va-fi-pusa-in-aplicare-o-noua-lege-privind-protectia-datelor-cu-caracter-personal/ · ACI https://aci.md/legal-expert-review-noua-lege-privind-protectia-datelor-cu-caracter-personal/ · Colenco https://colenco.legal/en/blog/personal-data-moldova-2026 · ECOM.md https://ecom.md/en/blog/protectia-datelor-lege-195-2024 · Bizlaw https://www.bizlaw.md/astazi-intra-in-vigoare-mai-multe-modificari-legislative-privind-protectia-datelor-cu-caracter-personal · https://juridicemoldova.md/12263/
- Extracted local working files: `/private/tmp/claude-501/-Users-bobernagadamian-Desktop-TheEnglishCenter/57eb5b27-ab12-42a9-a8a8-d2936cc69f42/scratchpad/l195_mo.txt` (Law 195/2024 authentic MO text) · `.../lce72.txt` (Law 72/2025 authentic MO text) · `.../proiect.txt` (MoJ draft + EU concordance) · `.../lege195.txt` (CNPDCP guidance)

---

## 2. PRIVACY POLICY OUTLINE — Romanian section headings and what each must say

Document title: **`Politica de confidențialitate`**. Companion documents: **`Politica de cookie-uri`** and **`Termeni și condiții`**. Publish in **RO / RU / EN**; Romanian is the **state language** and is the authoritative version — include a clause stating which language prevails on divergence. Use a **layered** presentation (short plain-language summary at top, full text below) because art. 12(1) demands clarity especially for information addressed to a child.

| # | Romanian heading | What it must say |
|---|---|---|
| 1 | **Cine suntem / Identitatea și datele de contact ale operatorului** | Art. 13(1)(a): legal name of the centre, registered address in Chișinău, email, phone. Use the term **`operator`** (never *„controlor"*). Name the **`persoană de contact pentru protecția datelor`** here if one is appointed — do NOT label them `responsabil cu protecția datelor` (DPO) unless you intend to publish and notify the Centre under art. 37(7). |
| 2 | **Ce date cu caracter personal colectăm** *(categorii de date; date ale copiilor)* | Categories collected per channel: contact/enrolment form (nume, telefon, e-mail, vârsta copilului / grupa de vârstă, mesaj), newsletter (e-mail), technical data from cookies/analytics (inclusiv **identificatori online** — an online identifier is personal data under art. 4). State explicitly that you ask for **age or age band, not full date of birth**. Warn that the free-text message field must **not** be used for health, allergy or special-educational-needs information (that would be art. 9 health data). |
| 3 | **Scopurile prelucrării și temeiul juridic** | Art. 13(1)(c). Present as a **table: scop → temei juridic**, using the mapping in §1.3. Where art. 6(1)(f) is used, state **the legitimate interests pursued** (art. 13(1)(d)) — record-keeping and defence of legal claims. Art. 13(2)(e): say whether providing the data is a contractual/statutory requirement, whether the person is obliged to provide it, and the **consequences of not providing it** (e.g. "fără telefon nu vă putem contacta pentru programare"). |
| 4 | **Datele copiilor și consimțământul reprezentantului legal** | State the **age-14 threshold** of art. 8 alin. (1) and quote/paraphrase the requirement that below 14 the processing is lawful only if consent is given or authorised by the **`reprezentantul legal al copilului`**. State that the enrolment form is **to be completed by a parent / legal representative** and that it runs on **art. 6(1)(b) măsuri precontractuale**, not consent — so art. 8 is not engaged for it. Describe the **reasonable efforts** (art. 8(2)) you make to verify representative consent where consent *is* the basis. Note that a child under 14 may not self-subscribe to marketing. |
| 5 | **Cookie-uri și tehnologii similare** *(or a standalone `Politica de cookie-uri`)* | Cross-reference or inline the full cookie table (§3): each cookie, its purpose, duration, provider, category. State the consent basis for non-essential cookies and how to withdraw. |
| 6 | **Destinatarii datelor cu caracter personal** *(incl. persoanele împuternicite de operator)* | Art. 13(1)(e). Name categories and, where useful, actual processors: hosting provider, email provider, form backend, analytics. Distinguish **`persoană împuternicită de operator`** (processor) from **`parte terță`** (third party). If Web3Forms stays, disclose it here and in §7 below (see §4.6 for the exact disclosure list). |
| 7 | **Transferul datelor către alte state** | Art. 13(1)(f). If everything is EEA-hosted, say so and cite that transfers to EEA states require no special authorisation (art. 44(2)). If any processor is outside the EEA, name the **country**, state whether a **Centre adequacy decision** exists, name the safeguard (**clauze standard de protecție a datelor** / EU SCCs under art. 46(2)(c)), and say how to obtain a copy. |
| 8 | **Perioada de stocare a datelor** | Art. 13(2)(a): the **period or the criteria**. Use the §1.7 defaults. "Atât timp cât este necesar" alone is non-compliant. |
| 9 | **Drepturile persoanei vizate** | List arts. 15–22 **by their statutory Romanian names** exactly as in §1.6. Include art. 7(3) right to withdraw consent at any time, withdrawal being **as easy as giving** it, without affecting prior lawfulness (art. 13(2)(c)). |
| 10 | **Cum vă exercitați drepturile** | One dedicated email address for requests; identity verification before disclosure; the **one-month deadline**, extendable by **two further months** where justified; note that every request is logged. |
| 11 | **Dreptul de a depune o plângere la Centrul Național pentru Protecția Datelor cu Caracter Personal** | Art. 13(2)(d). Give full CNPDCP contact block from §1.12: MD-2004, mun. Chișinău, str. Serghei Lazo nr. 48 · tel. (+373 22) 820 801 · fax (+373 22) 820 807 · centru@datepersonale.md · https://datepersonale.md. After first mention the law itself calls it simply **„Centrul"** — mirror that house style. |
| 12 | **Securitatea datelor cu caracter personal** | Art. 32: general description of technical and organisational measures (TLS, access control, pseudonymisation where applicable, staff confidentiality, backups). Optionally reference the breach procedure. |
| 13 | **Procesul decizional automatizat și crearea de profiluri** | Art. 13(2)(f) / art. 22. State **„nu utilizăm"** if true. |
| 14 | **Modificări ale prezentei politici** | How changes are communicated + a visible **`Data ultimei actualizări`** field. |
| 15 | **Date de contact** | Repeat operator contact channel and the data-protection contact address. |

---

## 3. COOKIE & CONSENT RULES → CONCRETE UI REQUIREMENTS

### 3.1 What Moldovan law actually says

**There is no cookie-banner statute in Law 195/2024** — the word "cookie" does not appear in it.

The e-privacy equivalent is the **Legea comunicațiilor electronice nr. 72 din 10 aprilie 2025**, published in **MO nr. 226-228 (9736-9738) of 13 May 2025**, **in force 1 January 2026**, which repealed **Legea nr. 241/2007**. It partially transposes **Directive 2002/58/EC**. The old Law 241/2007 contained **no** terminal-equipment provision at all (text checked).

**Art. 116 alin. (5)** of Law 72/2025 is Moldova's ePrivacy Art. 5(3) analogue, verbatim:

> „(5) Folosirea rețelelor de comunicații electronice pentru a stoca sau a accesa informații stocate în echipamentul terminal al unui abonat sau utilizator este permisă doar cu condiția ca abonatul sau utilizatorul în cauză să fi primit **informații clare și complete**, în conformitate cu **Legea nr. 195/2024** privind protecția datelor cu caracter personal, cu privire la scopurile prelucrării efectuate de către operatorul de date."

> „(6) Prevederile alin. (5) nu împiedică stocarea informației sau accesul tehnic la aceasta cu unicul scop de a efectua sau a facilita transmisia comunicației printr-o rețea de comunicații electronice sau în cazul în care acest lucru este **strict necesar în vederea furnizării unui serviciu al societății informaționale cerut în mod expres** de către abonat sau utilizator."

**Direct answer: the Moldovan statute does NOT expressly impose prior opt-in consent for cookies.** Art. 116(5) tracks the **original 2002/58/EC wording (information-based)**, not the 2009/136/EC amendment that introduced "has given his or her consent"; it even omits the original's explicit "right to refuse" limb. Alin. (6) carries the standard strictly-necessary exemption.

**But prior opt-in is still the correct build, for three independent reasons:**

1. **Art. 116(5) routes you straight back to Law 195/2024.** Analytics and marketing cookies process personal data because art. 4 defines `date cu caracter personal` to include *"un identificator online"*. You therefore need an art. 6 legal basis; for non-essential third-party analytics/advertising cookies, consent (art. 6(1)(a)) is the only realistic one. Art. 4's `consimțământ` definition requires *"manifestare de voință liberă, specifică, informată și lipsită de ambiguitate ... printr-o declarație sau printr-o acțiune fără echivoc"* — **no pre-ticked boxes, no implied consent from continued browsing**. Art. 7(3): withdrawal must be **as easy as giving** consent.
2. **EU visitors.** GDPR + the member state's ePrivacy transposition require unambiguous **prior opt-in**. The stricter standard governs the design.
3. **Moldovan practice already assumes consent.** The Ministry of Justice's own cookie policy states *"tuturor vizitatorilor website-ului li se cere consimțământul înaintea transmiterii de cookies."*

### 3.2 Concrete UI requirements

- **Default state: essential cookies only.** No analytics, no maps, no marketing scripts load before an affirmative click.
- **No pre-ticked boxes.** No "by continuing to browse you agree" pattern.
- **Equally prominent "Accept" and "Reject" buttons** — same size, same visual weight, same level (no "Reject" hidden behind a second screen).
- **Granular categories** (e.g. `Strict necesare` / `Analitice` / `Hărți și conținut încorporat` / `Marketing`) with per-category toggles.
- **Persistent re-entry point** — a footer link or floating control ("Setări cookie-uri") that lets the visitor change or withdraw the choice at any time, as easily as it was given (art. 7(3)).
- **Consent logging** — store timestamp, categories accepted/refused, policy version, and the exact wording shown. Art. 7(1): *"operatorul trebuie să poată demonstra"*.
- **`Politica de cookie-uri`** page listing **each cookie: name, purpose, duration, provider, category**.
- **Google Maps**: render a **static placeholder image** with a "Încărcați harta" control; the real embed mounts only after consent, because the embed sends IP and user-agent to Google before any interaction.
- **Third-party script warning**: if you embed `https://web3forms.com/client/script.js` (needed for zero-config hCaptcha or the advanced uploader), that is a third-party script on your pages with its own cookie/consent implications — it must sit behind consent or be justified as strictly necessary for a service the user expressly requested. Whether it pulls Microsoft Clarity onto *your* site is `[UNVERIFIED]`.
- Prefer **cookieless, EEA-hosted analytics** — this can remove the analytics category from the banner entirely and shrink the policy.

### 3.3 Direct marketing — this one IS strict opt-in

**Legea nr. 72/2025, art. 124 („Comunicările nesolicitate"):**
- **alin. (1)**: automated calling systems, faxes or **e-mail** for direct marketing are permitted **only** for subscribers *"care și-au dat în prealabil consimțământul"* — **prior opt-in**.
- **alin. (2)**: soft opt-in — where you obtained e-mail contact details **from your own customers in the context of selling a product or service**, you may market **your own similar products or services**, provided customers are given a clear, explicit, **simple and free** means to object **at the moment of collection and in every subsequent message**.
- **alin. (3)**: all other unsolicited direct-marketing communications require consent; refusal must not cost the subscriber anything.
- **alin. (4)**: never conceal the sender's identity, use a false identity, or omit a valid opt-out address.
- **alin. (5)**: applies to **both natural and legal persons**.

UI consequence: the newsletter signup must be a **separate, unticked, affirmative opt-in** (never bundled into the enquiry form's submit action), with a working unsubscribe link in every message.

---

## 4. W3FORMS / WEB3FORMS INTEGRATION SPEC

### 4.0 Name collision — read first

`w3forms.com` and `web3forms.com` are **two different companies**. The briefs conflated them.

| | **Web3Forms** | **W3Forms** |
|---|---|---|
| Domain | `web3forms.com`, API `api.web3forms.com` | `w3forms.com` |
| Operator | Web3Creative, Kerala, **India** (Udyam UDYAM-KL-10-0039115) | unnamed entity; sub-processors incl. Railway, Neon, Upstash, Cloudflare R2 |
| Model | access-key → email forwarder for static sites | drag-and-drop form builder, "unlimited submissions" free |
| Free tier | **250 submissions/mo** | claims unlimited |
| EU option | **none** | Neon DB has an EU option; DPA + SCCs for Pro |

Everything below is **Web3Forms** (`api.web3forms.com`), which is what the endpoint reference points at. If the EU-residency question is decisive, **W3Forms is the closer fit** — but it was only lightly verified (`https://w3forms.com/privacy`). **Confirm which service is actually wired into the site before relying on either DPA.**

### 4.1 Endpoints, methods, content types `[DOCS]`

```
POST https://api.web3forms.com/submit                  # access_key in body
POST https://api.web3forms.com/submit/{FORM_ID}        # FORM_ID === the access key UUID
```
The form ID and the access key are the **same UUID**. With the path form, no `access_key` body field is needed.

| Content-Type | Use | Behaviour |
|---|---|---|
| `application/json` | **required** for fetch/JS/framework use | returns JSON |
| `multipart/form-data` | file attachments (Pro) — send a bare `FormData`, do **not** set `Content-Type` manually | returns JSON |
| `application/x-www-form-urlencoded` | native `<form method="POST">` only | returns **301/303 redirect** → causes a CORS error if issued from `fetch` |

Docs verbatim: *"You should never use `x-www-form-urlencoded` while sending data through Web3Forms as it returns a 301 redirect after form submission."* Also send `Accept: application/json`. **Never combine a `redirect` field with a JS submit** — redirect client-side in the success callback instead.

**Required fields:** `access_key` (string, UUID) is the only required field. Every input must carry a `name` attribute or its value is **silently dropped**.

### 4.2 Response shape — the published docs are WRONG

`https://docs.web3forms.com/getting-started/api-reference` documents a **nested** shape:
```json
{ "success": true, "body": { "data": { }, "message": "Email sent successfully!" } }
```
The **live API returns a flat shape.** Two independent confirmations:
1. `[VERIFIED-LIVE]` a real 403 from `api.web3forms.com/submit`:
   `{"success":false,"message":"This method is not allowed. Use our API in client side or contact support with server IP address (Pro plan is required)"}`
2. First-party npm package `@web3forms/react@1.1.3` — `dist/index.d.ts` types it flat, `dist/index.modern.js` reads `e.success` / `e.message` at top level:
   `interface Response<T> { success: boolean; message: string; data: T }`
   Every official JS example reads `json.message`, never `json.body.message`.

**Code against the flat shape**, and defensively read `body?.message` as a fallback.

**Status codes** `[DOCS]` + `[VERIFIED-LIVE]`:

| Code | Meaning | Body |
|---|---|---|
| `200` | success | `{"success":true,"message":"Email sent successfully!","data":{…}}` |
| `303` | success redirect (non-JS form flow) | → `https://api.web3forms.com/submit/success` or your `redirect` URL |
| `400` | client error | `{"success":false,"message":"Error Description",…}` |
| `403` | **server-side call blocked** | flat JSON (§4.5) — **or `text/html`** Cloudflare challenge page on repeat |
| `429` | rate limited | `{"success":false,"message":"Too may requests. Please try later!"}` (typo is theirs) |
| `500` | server error | `{"statusCode":500,"error":"Something went wrong on server."}` — **different shape, no `success` key** |

The 403, 500 and 200 shapes all differ. **Do not assume `success` always exists.**

### 4.3 Reserved / special field names (exact spellings)

| Exact name | Type | Plan | Notes |
|---|---|---|---|
| `access_key` | string | free | **required**. Underscore, not `accessKey`. |
| `email` | string | free | sets Reply-To. Also the trigger field for the Pro autoresponder (`email` or `Email`). |
| `subject` | string | free | hidden (prefilled) or text (user-supplied). |
| `from_name` | string | free | default is `"Notifications"`. Underscore. |
| `replyto` | string | free | **one word, all lowercase** — not `reply_to` / `replyTo`. Overrides `email`. |
| `ccemail` | string | **PRO** | **one word** — there is **no `cc` field**. Multiple addresses separated by **semicolons**: `"a@x.com; b@x.com"`. |
| `redirect` | string | free* | must be an absolute `https://` URL. Cross-domain redirect requires a paid plan. |
| `botcheck` | checkbox | free | honeypot — §4.4. |
| `attachment` | file | **PRO** | needs `enctype="multipart/form-data"` (or the advanced uploader, which does not). |
| `webhook` | string | **PRO** | hidden field; also configurable in the dashboard. |
| `h-captcha-response` | string | free | posted automatically by the hCaptcha widget (a `<textarea>`). |
| `recaptcha_response` | string | **PRO** | hidden input you populate with the reCAPTCHA **v3** token. Underscore. |
| `cf-turnstile-response` | string | **PRO** | `[UNVERIFIED]` — Turnstile's native field name; the Web3Forms Turnstile page never names the POST field. |
| `apikey` | string | — | **legacy**, undocumented; still stripped from webhook payloads. Avoid. |

**Everything else is free-form** and forwarded to the email verbatim. Field names may contain spaces (`name="First Name"`).

**HTML attributes (not POST fields):** `data-captcha="true"` (hCaptcha), `data-advanced="true"` / `data-fileupload="true"`, `data-form-id`, `data-max-files`, `data-max-file-size`, `data-content`.

**Webhook payload** (Pro) strips `access_key`, `apikey`, `attachment`, `botcheck`, `recaptcha_response` and adds `submittedAt` (ISO 8601).

### 4.4 Spam protection

**Honeypot — `botcheck`** `[DOCS]`. Exact markup required (type must be `checkbox`, name must be `botcheck`):
```html
<input type="checkbox" name="botcheck" class="hidden" style="display: none;">
```
Hidden via `display: none`; the docs' own example uses both a class and an inline style. Docs carry a deprecation-flavoured warning: honeypot is *"less effective … recommending hCaptcha or reCaptcha instead."*

**hCaptcha — free plan, zero-config** `[DOCS]`:
```html
<div class="h-captcha" data-captcha="true"></div>
<script src="https://web3forms.com/client/script.js" async defer></script>
```
- Shared free-plan sitekey: **`50b2fe65-b00b-4b9e-ad62-3ba471098be2`**. Custom sitekey/secret on paid plans only.
- Posted field: **`h-captcha-response`**.
- **Must be enabled in the dashboard** (`app.web3forms.com` → form → spam option) or the token is not enforced server-side.
- React/Next: `npm i @hcaptcha/react-hcaptcha`, set `reCaptchaCompat={false}`, and `setValue("h-captcha-response", token)` in `onVerify`.
- Config passthrough via `data-lang`, `data-theme`, `data-size`, `data-render`, `data-onload`.

**reCAPTCHA — Pro only, v3 only** `[DOCS]`. v2 is **not** supported. Add `<input type="hidden" name="recaptcha_response" id="recaptchaResponse">`, populate with the v3 token, put your **secret key** in the dashboard.

**Cloudflare Turnstile — Pro only** `[DOCS]`:
```html
<script src="https://challenges.cloudflare.com/turnstile/v0/api.js" async defer></script>
<div class="cf-turnstile" data-sitekey="YOUR_SITE_KEY_HERE" data-theme="light"></div>
```
Your own sitekey + secret (secret in dashboard). POST field name not documented.

**Other layers:**
- **Restrict to Domain** (Pro): allow-list root/sub-domains, comma-separated, no protocol. Breaks localhost, so enable only after testing. This is the only real mitigation against access-key abuse.
- **Server-side filtering**: Web3Forms sends every submitter's **IP address and email address** to **CleanTalk** and **Akismet (Automattic)** — a GDPR/195-2024 disclosure item.
- Free sub-domains (`*.vercel.app` etc.) and some TLDs are blocked by default; a custom domain or paid plan is needed.

### 4.5 Plans, limits, and the access key

`[ARCHIVE]` https://web.archive.org/web/20260731182749/https://web3forms.com/pricing (live page is Cloudflare-gated)

| | Free | Starter | Pro | Agency |
|---|---|---|---|---|
| Submissions / month | **250** | 5k | 10k | 20k |
| Forms / access keys | unlimited | unlimited | unlimited | unlimited |
| Domains | unlimited | unlimited | unlimited | unlimited |
| Dashboard submission history | **30 days** | 3 months | 1 year | 1 year |
| Email recipients per form | 1 | ≤3 | ≤5 | ≤10 |
| Linked email addresses | 2 | 5 | 10 | 20 |
| File upload / attachments | no | no | yes | yes |
| File storage | — | — | 30 days | 30 days |
| Webhooks / Submissions API | no | no | yes | yes |
| Autoresponder | no | no | yes | yes |
| CC emails | no | no | yes | yes |
| Restrict to domains | no | no | yes | yes |
| reCAPTCHA v3 / Turnstile | no | no | yes | yes |
| hCaptcha + honeypot | yes | yes | yes | yes |
| Custom redirect / subject / from-name / reply-to | yes | yes | yes | yes |
| **Physical data retention** | **up to 3 years** | 3 yr | 3 yr | 3 yr |

- **Over quota:** warning emails at 90% and 100%, then submissions are **rejected until the next month**.
- **Attachments:** default HTML5 uploader = **single file, max 5 MB**. Larger/multiple needs the advanced (FilePond) uploader. Pro only.
- **Rate limits:** no published numeric limit for `/submit`. A 429 is a **per-IP temporary block that auto-clears after one hour**. The separate Pro **Submissions API** (`https://api.web3forms.com/v1`, Bearer `w3f_live_…`) is throttled at **20 req/s, burst 50**, max 10 active API keys.
- Pricing ~$12/mo Pro billed yearly `[UNVERIFIED — third-party comparison pages, not the archived page]`.

**Is the access key safe client-side? Yes, by design** `[DOCS]`:
> *"No. You do not need to hide the access key. Access key is public. No need to confuse it with secret API key… Think of it as an alias to your email."*
> *"If someone else has access to your access_key, they can only send you emails."*

It is not a bearer credential — it cannot read submissions or change settings. The only exposure is inbound spam, mitigated by hCaptcha + (Pro) domain restriction. It is **not** `NEXT_PUBLIC_`-hostile. The Pro **Submissions API key** (`w3f_live_…`) is the opposite — a real secret, server-only, shown once.

### 4.6 Data processing, transfers, retention — what the Moldovan notice must disclose

Primary source: **DPA v1.0, last updated 13 Jul 2026** — `[ARCHIVE]` https://web.archive.org/web/20260731182921/https://web3forms.com/dpa (live URL 403s to non-browsers).

**Parties:** You = **Controller**; Web3Creative = **Processor**, operating from **India**, registered in Kerala. DPA is click-accepted (no signature needed; signed counterpart on request via support). Named applicable laws: **GDPR**, UK GDPR/DPA 2018, and **India's DPDP Act 2023**. **Moldovan law is not named.**

**Annex 3 sub-processors:**

| Sub-processor | Purpose | Region |
|---|---|---|
| **AWS** | hosting, compute, **SES** email, SQS, **DynamoDB**, **S3** attachments | "AWS regions as configured" |
| **Cloudflare** | CDN, DNS, edge WAF on submission endpoints | global edge |
| **Hetzner Online GmbH** | self-hosted application infrastructure | **EU (Germany / Finland)** |
| **CleanTalk** | spam prevention — **receives submitter IP + email** | US / global |
| **Automattic (Akismet)** | spam filtering — **receives submitter IP + email** | US / global |
| **SparrowDesk** | support helpdesk | per provider |
| **Microsoft (Clarity)** | product analytics + **session replay** | US / global |

Paddle = merchant of record, an **independent controller** for billing (not a sub-processor). Customer-enabled integrations (Sheets/Telegram/Discord/Slack) are **your** processors, not theirs.

**EU region? No.** There is **no EU data-residency option**. FAQ verbatim: *"Our servers are located in the United States US-East Region. We are not based on Europe."* Hetzner EU appears for app infrastructure, but the DPA offers no residency election and the primary submission/storage path is **AWS US-East**. Transfers rely on **SCCs (EU 2021/914) + UK Addendum**, incorporated by reference, with Web3Creative as data importer (DPA §10).

**Retention:**
- Submission data: **physical time-to-live of 3 years** on every plan. Dashboard *visibility* is what your plan caps (Free: 30 days) — **visibility ≠ deletion**.
- On termination: delete or return at your choice, effective **within 90 days**, subject to backup-cycle overwrite.
- Server logs with PII: **deleted every 2 months** (FAQ). Privacy policy says "on a regular basis".
- Attachments (Pro): 30 days.

**Contradiction you must not repeat in a privacy notice.** The FAQ still claims *"**We do not store any form submissions of our users.** We process them and forward to your email."* This is **false as written**, contradicted by (a) DPA §8's 3-year TTL, (b) the pricing table's "Form Submission History" and "Export to CSV" rows, and (c) the Pro Submissions API, which returns stored `fields`, **`ip_address`**, **`user_agent`** and **`site_url`** per submission. **Write the notice against the DPA, not the FAQ.**

**If Web3Forms stays, the notice must disclose:**
1. Recipient/processor: **Web3Creative (Web3Forms), India** — a third country with no Moldovan and no EU adequacy decision.
2. Onward transfers to the **USA** (AWS, CleanTalk, Akismet, Microsoft) and global edge (Cloudflare).
3. Categories: your form fields **plus** technical metadata explicitly listed in DPA Annex 1 — **IP address, timestamp, referrer** — and (per the Submissions API) **user agent and page URL**.
4. IP + email shared with **two US spam vendors** as a separate disclosure.
5. Retention: **up to 3 years** at the processor.
6. Transfer safeguard: **SCCs** (art. 46(2)(c) of Law 195/2024 recognises European Commission SCCs directly, no Centre authorisation required).
7. DPA Annex 1 **forbids you from configuring forms to collect special categories** (health, biometric, financial account data) without your own legal basis and safeguards — directly relevant if an enrolment form ever asks about learning-support needs.
8. The `https://web3forms.com/client/script.js` embed is a **third-party script on your pages** with its own cookie/consent implications.

### 4.7 Architecture — DECIDED: you cannot proxy Web3Forms server-side on the free plan

`[VERIFIED-LIVE]` A plain `POST` to `https://api.web3forms.com/submit` from this machine (`Content-Type: application/json`, no browser headers):
```
HTTP/2 403
content-type: application/json

{"success": false,
 "message": "This method is not allowed. Use our API in client side or contact support with server IP address (Pro plan is required)"}
```
`[VERIFIED-LIVE]` Adding a real Chrome `User-Agent`, `Origin`, `Referer` and `Sec-Fetch-*` headers does **not** get through — it escalates to a **Cloudflare managed challenge**: `HTTP/2 403`, `cf-mitigated: challenge`, `content-type: text/html`, an interstitial JS page. Unsolvable from a server. `OPTIONS` preflight returns the same JSON 403.

Docs verbatim:
> **API Reference:** *"It is recommend that you use the API client/browser side, not server side. Server side usage requires paid plan + server IP whitelisting."*
> **Troubleshooting → 403:** *"Web3Forms API is expected to run on client side for spam prevention… **Do not proxy it in another API or server side code.** The access key can be public and safe to add in client side code. If your use-case require you to use server side code, then you must add your server IP address to our Safelist + you must have an active Paid subscription."*

**The Pro escape hatch does not work on Vercel**: IP safelisting requires **static egress IPs**; Vercel serverless/edge functions have dynamic egress IPs. You would need Vercel's static-IP/secure-compute tier, a fixed-IP VPS, or an egress proxy — all disproportionate for a contact form.

| | Browser POST (direct) | Route Handler / Server Action proxy |
|---|---|---|
| **Does it work?** | **Yes** — the supported path | **No — 403 on free plan.** Pro + static IP safelist only |
| Access key exposure | Public — explicitly fine, it's an email alias | Hidden — but hiding it buys nothing |
| Spam protection | hCaptcha (free) + `botcheck` + Pro domain restriction | You'd add your own — but their WAF blocks you anyway |
| Server-side validation | none — client validation is advisory only | Full Zod validation, sanitisation, field allow-listing |
| Rate limiting | Web3Forms' per-IP 429 (real submitter IP → correct behaviour) | Your own limiter; **and Web3Forms sees one IP for all users**, so their 429 fires on your whole site |
| Secrets | none needed | none needed either |
| Bot/JS-off users | form fails silently without JS | progressive enhancement possible |
| Failure surface | CORS, Cloudflare from the user's network | 403 + HTML challenge bodies that crash `res.json()` |

**Recommendation A — if you stay on Web3Forms (free/Pro): POST from the browser.** A `"use client"` component `fetch`ing `api.web3forms.com/submit` with `Content-Type: application/json`. Put `NEXT_PUBLIC_WEB3FORMS_KEY` in env for hygiene, not secrecy. Add `botcheck` + hCaptcha (free, dashboard-enforced) + client-side validation. **Do not build a proxy — you will ship a route that 403s in production.**

**Recommendation B (preferred for this project) — do not use Web3Forms at all.** Given the constraints (Moldovan privacy notice covering children's data, production Next.js 15, wanting server-side validation and rate limiting), the architecture fights you on all three axes: no EU region, an India-based processor with US sub-processors and a 3-year TTL, a docs/FAQ pair that contradict each other on storage, and a hard prohibition on the server-side pattern you would normally want. A **Route Handler + a server-first, EEA-resident email API** is the better fit: **Resend** (EU region available), **Postmark**, **Brevo** (France), or **AWS SES in `eu-central-1`**. You keep Zod validation, your own rate limiting, no third-party script on your pages, **one processor instead of seven**, a DPA you can point a Moldovan notice at — and, via art. 44(2), **no transfer chapter at all**. Cost is comparable to Web3Forms Pro.

### 4.8 TypeScript example — Route Handler (correct code; will 403 on the free plan)

Included for completeness. Every failure mode above is handled, including the Cloudflare HTML challenge that crashes a naive `res.json()`.

```ts
// app/api/contact/route.ts
import { NextResponse } from "next/server";
import { z } from "zod";

export const runtime = "nodejs";

const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";

const ContactSchema = z.object({
  name: z.string().trim().min(1).max(120),
  email: z.string().trim().email().max(254),
  message: z.string().trim().min(1).max(5000),
  botcheck: z.union([z.literal(""), z.undefined(), z.literal(false)]).optional(),
});

/** Live API returns a FLAT shape; api-reference docs' nested `body` form is stale. */
type Web3FormsResponse = {
  success?: boolean;
  message?: string;
  data?: unknown;
  body?: { message?: string; data?: unknown }; // legacy fallback
  statusCode?: number;                          // 500 responses use this shape
  error?: string;
};

export async function POST(request: Request) {
  const accessKey = process.env.WEB3FORMS_ACCESS_KEY;
  if (!accessKey) {
    console.error("WEB3FORMS_ACCESS_KEY is not configured");
    return NextResponse.json({ ok: false, error: "Server misconfigured" }, { status: 500 });
  }

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Malformed JSON" }, { status: 400 });
  }

  const parsed = ContactSchema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: "Validation failed", issues: parsed.error.flatten().fieldErrors },
      { status: 400 },
    );
  }

  // Honeypot filled => silently accept, never forward.
  if (parsed.data.botcheck) return NextResponse.json({ ok: true }, { status: 200 });

  const { name, email, message } = parsed.data;

  let upstream: Response;
  try {
    upstream = await fetch(WEB3FORMS_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        access_key: accessKey,
        subject: `New enquiry from ${name}`,
        from_name: "The English Center website",
        replyto: email,
        name,
        email,
        message,
      }),
      signal: AbortSignal.timeout(10_000),
      cache: "no-store",
      redirect: "manual", // never follow a 301/303 into a CORS/HTML dead end
    });
  } catch (err) {
    const timedOut = err instanceof DOMException && err.name === "TimeoutError";
    console.error("Web3Forms network error", err);
    return NextResponse.json(
      { ok: false, error: timedOut ? "Upstream timed out" : "Upstream unreachable" },
      { status: 504 },
    );
  }

  // Cloudflare's server-side block returns text/html — parsing it as JSON throws.
  const contentType = upstream.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) {
    console.error(
      `Web3Forms returned non-JSON (${upstream.status}, ${contentType}). ` +
        "Server-side calls are blocked unless you are on a paid plan with your egress IP safelisted.",
    );
    return NextResponse.json({ ok: false, error: "Upstream rejected the request" }, { status: 502 });
  }

  const result = (await upstream.json()) as Web3FormsResponse;
  const upstreamMessage = result.message ?? result.body?.message ?? result.error ?? "Unknown error";

  if (!upstream.ok || result.success !== true) {
    console.error(`Web3Forms ${upstream.status}: ${upstreamMessage}`);
    if (upstream.status === 429) {
      return NextResponse.json(
        { ok: false, error: "Too many requests. Please try again later." },
        { status: 429, headers: { "Retry-After": "3600" } },
      );
    }
    // 403 => "This method is not allowed. Use our API in client side ..."
    return NextResponse.json({ ok: false, error: "Could not send your message" }, { status: 502 });
  }

  return NextResponse.json({ ok: true, message: upstreamMessage }, { status: 200 });
}
```
Env: `WEB3FORMS_ACCESS_KEY=<uuid>` — server-only naming is a fiction here (the key is public by design); it matters only if you later swap in a real secret.

### 4.9 TypeScript example — the pattern that actually works (client component)

```tsx
"use client";
import { useState } from "react";

type Web3FormsResponse = { success: boolean; message: string; data?: unknown };
type Status = { state: "idle" | "sending" | "ok" | "error"; message?: string };

export function ContactForm() {
  const [status, setStatus] = useState<Status>({ state: "idle" });

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus({ state: "sending" });

    const form = event.currentTarget;
    const payload = Object.fromEntries(new FormData(form));

    if (payload.botcheck) { setStatus({ state: "ok" }); form.reset(); return; }

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: process.env.NEXT_PUBLIC_WEB3FORMS_KEY,
          from_name: "The English Center website",
          subject: `New enquiry from ${payload.name ?? "website"}`,
          replyto: payload.email,
          ...payload,
        }),
      });

      const json = (await res.json()) as Web3FormsResponse; // flat shape
      if (res.ok && json.success) {
        setStatus({ state: "ok", message: json.message });
        form.reset();
      } else {
        setStatus({ state: "error", message: json.message ?? "Could not send your message." });
      }
    } catch {
      setStatus({ state: "error", message: "Network error. Please try again." });
    }
  }

  return (
    <form onSubmit={onSubmit} noValidate>
      <input type="checkbox" name="botcheck" tabIndex={-1} autoComplete="off"
             aria-hidden="true" style={{ display: "none" }} />
      <input type="text" name="name" required maxLength={120} />
      <input type="email" name="email" required maxLength={254} />
      <textarea name="message" required maxLength={5000} />
      {/* free-plan hCaptcha: <div className="h-captcha" data-captcha="true" /> + web3forms client script */}
      <button type="submit" disabled={status.state === "sending"}>
        {status.state === "sending" ? "Sending…" : "Send"}
      </button>
      <p role="status" aria-live="polite">{status.message}</p>
    </form>
  );
}
```
Notes: no `redirect` field (it would 301 and trigger CORS); for attachments send a bare `FormData` and **omit** the `Content-Type` header entirely so the browser sets the multipart boundary.

**Moldova-specific additions to whichever form you ship:** label it *„Formularul se completează de către părinte/reprezentantul legal."* · collect **age band, not DOB** · add a warning under the message box against entering health/allergy/SEN information · keep the newsletter opt-in a **separate unticked checkbox** · log consent wording + timestamp for the marketing opt-in.

### 4.10 Web3Forms sources

API reference https://docs.web3forms.com/getting-started/api-reference (raw: https://raw.githubusercontent.com/surjithctly/web3forms-docs/main/getting-started/api-reference.md) · all-options example https://docs.web3forms.com/getting-started/examples/advanced-all-options · troubleshooting https://docs.web3forms.com/getting-started/troubleshooting · FAQ https://docs.web3forms.com/getting-started/faq · honeypot https://docs.web3forms.com/getting-started/customizations/spam-protection/spam-protection · hCaptcha https://docs.web3forms.com/getting-started/customizations/spam-protection/hcaptcha · reCAPTCHA https://docs.web3forms.com/getting-started/pro-features/recaptcha-integration · Turnstile https://docs.web3forms.com/getting-started/pro-features/cloudflare-turnstile-captcha · attachments https://docs.web3forms.com/getting-started/pro-features/file-attachments · advanced uploader https://docs.web3forms.com/getting-started/pro-features/advanced-file-uploader · webhooks https://docs.web3forms.com/getting-started/pro-features/webhooks · restrict-to-domain https://docs.web3forms.com/getting-started/pro-features/restrict-to-domain · Submissions API https://docs.web3forms.com/getting-started/submissions-api · Next.js guide https://docs.web3forms.com/how-to-guides/static-site-generators/next.js · docs index https://docs.web3forms.com/llms.txt · repo https://github.com/surjithctly/web3forms-docs · DPA (archived) https://web.archive.org/web/20260731182921/https://web3forms.com/dpa · pricing (archived) https://web.archive.org/web/20260731182749/https://web3forms.com/pricing · privacy (archived) https://web.archive.org/web/20251230212413/https://web3forms.com/privacy · `@web3forms/react` 1.1.3 https://registry.npmjs.org/@web3forms/react · different service https://w3forms.com/ · https://w3forms.com/privacy

---

## 5. CAMBRIDGE EXAM LADDER

Cambridge renamed the suite in **2018**. The umbrella brand is **Cambridge English Qualifications**; owner is **Cambridge University Press & Assessment**. The old entity name "Cambridge Assessment English" is **legacy and must not be used as primary**. Legacy abbreviations (KET/PET/FCE/CAE/CPE) may appear **in brackets as a secondary aid only** — they are not the qualification names.

### 5.1 Master table

| Official current name | Legacy abbr (secondary only) | CEFR | Who it's for | Duration | Scoring |
|---|---|---|---|---|---|
| **Pre A1 Starters** | YLE Starters | Pre A1 | Children ~6–8 (Young Learners suite, ages 6–12) | ~45 min total: Listening ~20 min (4 parts, 20 Q) · Reading & Writing 20 min (5 parts, 25 Q) · Speaking 3–5 min (4 parts, 1:1) | **No pass/fail, no grades.** Shields: max **5 per paper**, **15 total**. Every child receives a certificate. Shield numbers aligned across the three YL exams and mapped to CEFR |
| **A1 Movers** | YLE Movers | A1 | Children ~8–11 | ~60 min total: Listening ~25 min (5 parts, 25 Q) · Reading & Writing 30 min (6 parts, 35 Q) · Speaking 5–7 min (4 parts, 1:1) | Shields, max 5 per paper / 15 total; no pass/fail |
| **A2 Flyers** | YLE Flyers | A2 | Children ~9–12 | ~75 min total: Listening ~25 min (5 parts, 25 Q) · Reading & Writing 40 min (7 parts, 44 Q) · Speaking 7–9 min (4 parts, 1:1) | Shields, max 5 per paper / 15 total; no pass/fail |
| **A2 Key** / **A2 Key for Schools** | KET / KET for Schools | A2 | Adults / school-age (same level and format; "for Schools" uses topics relevant to teens) | **3 papers, ~1h40–2h**: Reading and Writing 60 min (7 parts, 32 Q, 50% of marks) · Listening ~30 min incl. 6 min transfer (5 parts, 25 Q, 25%) · Speaking 8–10 min pairs / 13–15 min threes (2 parts, 25%) | **4 skill scores** (Reading, Writing, Listening, Speaking), equally weighted; overall = sum ÷ 4. **Reported range 82–150.** No minimum required in any single paper. Grades **A / B / C** |
| **B1 Preliminary** / **B1 Preliminary for Schools** | PET / PET for Schools | B1 | Adults / school-age | **4 papers, ~2h20**: Reading 45 min (6 parts, 32 Q, 25%) · Writing 45 min (2 parts, 2 Q, 25%) · Listening ~30 min incl. 6 min transfer (4 parts, 25 Q, 25%) · Speaking 10–12 min pairs / 15–17 min threes (4 parts, 25%) | 4 skills equally weighted; overall = sum ÷ 4. **Reported range 102–170.** Grades **A / B / C** |
| **B2 First** / **B2 First for Schools** | FCE / FCE for Schools | B2 | Adults / school-age | **4 papers, ~3h30**: Reading and Use of English 1h15 (7 parts, 52 Q, 40% of marks) · Writing 1h20 (2 parts, 2 × 140–190 words, 20%) · Listening ~40 min (4 parts, 30 Q, 20%) · Speaking ~14 min per pair (4 parts, 20%) | **Nuance:** the *paper* is worth 40%, but the *reported* scores are **five equally weighted components** — Reading, Use of English, Writing, Listening, Speaking; overall = sum ÷ 5. **Reported range 122–190.** Grades **A / B / C** |
| **C1 Advanced** | CAE | C1 | University entry, professional. **No "for Schools" version** | **4 papers, ~4h**: Reading and Use of English 1h30 (8 parts, 56 Q) · Writing 1h30 (2 parts: 1 compulsory + 1 of 3) · Listening ~40 min (4 parts, 30 Q) · Speaking 15 min per pair / 23 min per three (4 parts) | Five equally weighted reported components; overall = sum ÷ 5. **Reported range 142–210.** Grades **A / B / C** |
| **C2 Proficiency** | CPE | C2 | Postgraduate, senior professional. **No "for Schools" version** | **4 papers, ~4h**: Reading and Use of English 1h30 (7 parts, 53 Q) · Writing 1h30 (2 parts: 1 compulsory + 1 of 3) · Listening ~40 min (4 parts, 30 Q) · Speaking 16 min per pair / 24 min per three (3 parts) | Five equally weighted reported components; overall = sum ÷ 5. **Reported range 162–230.** Grades **A / B / C** |

Sources: https://www.cambridgeenglish.org/exams-and-tests/qualifications/ · /young-learners/ · /starters/test-format/ · /movers/test-format/ · /flyers/test-format/ · /key/exam-format/ · /preliminary/exam-format/ · /first/exam-format/ · /advanced/exam-format/ · /proficiency/exam-format/

### 5.2 Grade boundaries on the Cambridge English Scale (authoritative)

Source PDF (grade-band chart, p.1): https://www.cambridgeenglish.org/images/210434-converting-practice-test-scores-to-cambridge-english-scale-scores.pdf

| Exam | Grade A | Grade B | Grade C | Level below | Reported range | Below → no level / no certificate |
|---|---|---|---|---|---|---|
| **A2 Key (+Schools)** | 140–150 → cert. at **B1** | 133–139 → A2 | 120–132 → **A2** | Level A1: 100–119 | 82–150 | 82–99 |
| **B1 Preliminary (+Schools)** | 160–170 → cert. at **B2** | 153–159 → B1 | 140–152 → **B1** | Level A2: 120–139 | 102–170 | 102–119 |
| **B2 First (+Schools)** | 180–190 → cert. at **C1** | 173–179 → B2 | 160–172 → **B2** | Level B1: 140–159 | 122–190 | 122–139 |
| **C1 Advanced** | 200–210 → cert. at **C2** | 193–199 → C1 | 180–192 → **C1** | Level B2: 160–179 | 142–210 | 142–159 |
| **C2 Proficiency** | 220–230 → C2 | 213–219 → C2 | 200–212 → **C2** | Level C1: 180–199 | 162–230 | 162–179 |

**CEFR bands on the Cambridge English Scale:** A1 100–119 · A2 120–139 · B1 140–159 · B2 160–179 · C1 180–199 · C2 200–230.

**What counts as a "pass":** Grades **A, B or C** = a certificate at the exam's target CEFR level (Grade A = certificate stating ability at the **next level up**). A result in the "Level X" band below = certificate at the **lower** level (still a certificate, but not a pass at the target level). Below that = statement of results only, no CEFR level, **no certificate**.

**CORRECTION FOR COPY:** "Pass with Distinction / Pass with Merit / Pass" is **OUTDATED** for A2 Key and B1 Preliminary. Since the 2020 revision they use **Grade A / B / C**, like the higher exams. Do not use the old labels.

**Validity:** Cambridge English Qualifications certificates **do not expire** — there is no expiry date on the certificate. However, individual universities/employers/immigration bodies commonly ask for results from the last **2 years**. Say *„certificatul nu expiră"*, never *„valabil pentru totdeauna la orice universitate"*. https://support.cambridgeenglish.org/hc/en-gb/articles/202838296-How-long-are-my-results-certificate-valid-for

**Results turnaround:** digital exams — results release window normally starts ~**5 working days** after the exam; paper-based — ~**4–6 weeks**. Certificates reach the centre **2–4 weeks after results release**. The release window itself is typically ~2 weeks long.

### 5.3 2026 delivery notes (important for copy)

- **Digital (computer-based) versions available throughout the year**: Pre A1 Starters Digital, A1 Movers Digital, A2 Flyers-tier products, A2 Key (+for Schools) Digital, B1 Preliminary (+for Schools) Digital, B2 First (+for Schools) Digital, C1 Advanced Digital, C2 Proficiency Digital.
- **Paper-based A2 Key is being withdrawn after 3 December 2026** (A2 Key Digital continues).
- Paper-based with fixed set dates in 2026: A2 Key, B1 Preliminary, B2 First, B2 First for Schools, C1 Advanced, C2 Proficiency.
- Source PDF: https://www.cambridgeenglish.org/Images/721911-examination-dates-2026.pdf
- "CB exam" = **computer-based**, branded by Cambridge as **Digital exams** / "Cambridge Digital English Qualifications". **Same qualification, same certificate, same Cambridge English Scale score** as paper — only delivery differs. **Speaking is still face-to-face with live examiners** (one examiner may assess remotely at some levels). Advantages: more session dates (year-round for most digital products), faster results (~5 working days to window open vs 4–6 weeks). https://www.cambridgeenglish.org/exams-and-tests/what-to-expect-on-exam-day/digital-exams/

### 5.4 Other current Cambridge products

- **BEC is dead outside China.** B1 Business Preliminary, B2 Business Vantage, C1 Business Higher were withdrawn in all countries **except China**. Do **not** market "BEC" courses. https://www.cambridgeenglish.org/exams-and-tests/business-certificates/
- **Linguaskill** — online, on-demand, computer-adaptive, modular. Two versions: **Linguaskill General** and **Linguaskill Business** (the de-facto BEC successor). Not a graded pass/fail qualification; produces a score report + certificate.
  - **Reading and Listening** — single adaptive module, ~40 min typical, max ~59 min (or split).
  - **Writing** — 55 min. Part 1 email ≥50 words (25%); Part 2 essay/report ≥250 words (75%).
  - **Speaking** — 16 min, 5 sections. Hybrid marking (AI + human).
  - **Historic reporting:** Cambridge English Scale **82–180+**, "below A1 to C1 or above".
  - **FLAG:** current cambridgeenglish.org Linguaskill pages state the test "certifies a learner's level of English from **B1 to C2**". This conflicts with the legacy 82–180+ range and indicates a product refresh. **Verify the current range with the authorised centre before printing it.** https://www.cambridgeenglish.org/exams-and-tests/linguaskill/information-about-the-exam/
- **Cambridge English Skills Test (CEST)** — newer online modular test, three versions (Schools / General / Workplace), **A1–C1**, results in **48h**. Positioned as an *institutional testing tool*, **not** a public qualification. https://www.cambridgeenglish.org/exams-and-tests/cambridge-english-skills-test/
- **IELTS** — co-owned; delivered by **British Council / IDP**, **not** by Cambridge exam centres.
- Teaching qualifications: **CELTA, DELTA, TKT** (separate "Teaching Qualification Centre" authorisation).

---

## 6. GUIDED LEARNING HOURS PER CEFR LEVEL

Cambridge's published table (Support Site article "Guided learning hours"):

| CEFR level reached | Guided learning hours (**cumulative from zero**) | Typical exam |
|---|---|---|
| A2 | **180–200** | A2 Key |
| B1 | **350–400** | B1 Preliminary |
| B2 | **500–600** | B2 First |
| C1 | **700–800** | C1 Advanced |
| C2 | **1,000–1,200** | C2 Proficiency |

**Cambridge's own caveats — reproduce them, they protect you:**
1. The figures are **cumulative**, not level-to-level increments.
2. They are "intended as a **guideline only**; you may require more or less time and support depending on your own needs."
3. Cambridge separately states a candidate who has passed B2 First at B2 might need **~200 hours** of further lessons and supervised study to prepare for C1 Advanced.

**Derived level-to-level deltas** (safe to present as *„aproximativ"*): 0→A2 ≈ **180–200 h** · A2→B1 ≈ **170–200 h** · B1→B2 ≈ **150–200 h** · B2→C1 ≈ **200 h** · C1→C2 ≈ **300–400 h**.

Source: https://support.cambridgeenglish.org/hc/en-gb/articles/202838506-Guided-learning-hours (page 403s to automated fetch; figures corroborated across Cambridge-derived secondary sources).

**Never** advertise *„atingi B2 în X luni garantat"*. Frame as Cambridge's guideline plus individual variation. Ready-to-use safe sentence: *„Cambridge estimează aproximativ 500–600 de ore de studiu ghidat, cumulativ, pentru atingerea nivelului B2. Cifrele sunt orientative și variază de la un cursant la altul."*

---

## 7. WHAT THE CENTRE MAY / MAY NOT CLAIM ABOUT CAMBRIDGE AFFILIATION

**This section is the highest legal-risk area of the marketing copy. Read it in full before writing any headline, footer badge, or logo strip.**

### 7.1 The four distinct statuses — know which one you actually hold

**(a) Authorised Exam Centre** (*Centru de examinare autorizat*)
- Has signed a **legal centre agreement** with Cambridge; pays an application fee; approved against local business need, financial soundness, a 3-year business plan, and IT facilities for computer-based testing.
- **Administers** the exams: registration, secure materials handling, invigilator/examiner training, ID checks, test-day photos for the Results Verification Service, seating plans, results distribution.
- Subject to **Cambridge inspections/audits without prior notice**; must comply with the Handbook for Centres.
- **Only an Authorised Exam Centre may use the Cambridge English Authorised Centre logo**, under written guidance supplied on signing the agreement.
- **Moldova reality check:** authorised Cambridge exam centres in Chișinău include **Alliance Française de Moldavie** (authorised since 2013, the first in RM — https://english.alfr.md/) and others such as **ILTC**. Most schools operate *through* one of these.
- https://www.cambridgeenglish.org/find-a-centre/exam-centres/how-to-become-a-centre/ · https://www.cambridgeenglish.org/find-a-centre/exam-centres/different-types-of-centre/

**(b) Preparation Centre** (*Centru de pregătire*) — **this is almost certainly what The Best Indeed English Centre is**
- A school or language institute that "**prepares and enters students for Cambridge English exams through an authorised exam centre**." 52,000+ registered worldwide.
- Gets: preparation-centre newsletter, teacher training material, planning resources, marketing support material, and (via its exam centre) student entry.
- **Does NOT** run, mark, or issue anything. It is a **teaching status, not an awarding status**.
- https://www.cambridgeenglish.org/information-for-preparation-centres/

**(c) Platinum Centre**
- A **top tier of Authorised Exam Centre** — **not** a separate tier for schools. Awarded to exam centres meeting criteria for "excellence in customer service, high quality exam delivery and a willingness to work in partnership" with Cambridge.
- Benefits: extra staff development, Cambridge office visits, consultation on procedural changes, new-product trials.
- ~3,000 exam centres worldwide; only a small subset (~100 listed) are Platinum. Has its own **Platinum Centre logo**.
- https://www.cambridgeenglish.org/find-a-centre/exam-centres/different-types-of-centre/platinum-centres/

**(d) Exam Venue** (*Locație de examinare*)
- A school/institution where exams are physically held, whose suitability is checked and supervised **by an Authorised Exam Centre**. It is **not** a centre. Requirements (Cambridge leaflet, April 2026):
  - Desks **≥1.25 m apart in all directions** (dividers allowed instead for digital exams); paper exams need desks fitting two A4 sheets side by side.
  - Secure storage (safe) for materials; secure storage or constant supervision of phones/watches.
  - Tidy, lit, comfortable rooms; break area; toilets; a photo area if required; a **separate smaller room + waiting area for the Speaking test**.
  - Advance bookings; open on exam day; other events restricted; accessible to all candidates; **Cambridge auditors must be able to access without prior notice**.
  - **Digital exam requirements:** stable internet throughout; **devices supplied by the venue — candidates may not use their own devices**.
- A school can host digital exams **as an Exam Venue under an Authorised Exam Centre** — that does **not** make the school a centre.
- https://www.cambridgeenglish.org/Images/561517-information-about-becoming-an-exam-venue.pdf

### 7.2 "Gold / Silver partner" — DO NOT USE

There is **no official Cambridge English Gold or Silver exam-centre tier.** The only Cambridge-published tier above standard authorisation is **Platinum**. Gold/Silver/Bronze tiers exist in *other* schemes (e.g. British Council IELTS Partnership Programme) and in *country-specific* Cambridge partner-school programmes (notably Cambridge España). **Do not print "Gold partner" / "Silver partner" in Moldovan copy unless Cambridge or the regional office has issued that status in writing.**

### 7.3 MUST NOT claim or use without written authorisation — hard flags

1. **The University of Cambridge shield** — protected by international law; may **never** be reproduced by a centre except as an integral part of the supplied Authorised Centre or Platinum Centre logo. **Preparation centres may not reproduce it at all.**
2. **The Cambridge English logo** — may not be reproduced in any form without specific written permission. **Preparation centres may not reproduce it.**
3. **Altering any supplied logo** — text must appear exactly as supplied and must not be retyped.
4. Calling yourself an **"Authorised Exam Centre" / „centru autorizat de examinare"** without a signed centre agreement.
5. Calling yourself **"Platinum Centre"** without that award.
6. Implying you **award, issue, mark or set** Cambridge certificates, or that **Cambridge endorses/accredits your courses, teachers or methodology**.
7. Implying **IELTS** is administered by you (it is delivered by British Council / IDP).
8. Presenting **Linguaskill / CEST** as equivalent to a graded Cambridge English Qualification certificate.
9. Marketing **BEC** ("Business Preliminary / Vantage / Higher") — withdrawn outside China.
10. Using outdated names as primary labels (**KET, PET, FCE, CAE, CPE**), or **"Pass with Distinction/Merit"** for A2 Key / B1 Preliminary.

Cambridge states that "persistent or wilful failure to comply with these principles constitutes grounds for the **summary termination of a centre**, and may lead to **civil or criminal prosecution**."
https://support.cambridgeenglish.org/hc/en-gb/articles/360000705766-Marketing-and-growth · https://support.cambridgeenglish.org/hc/en-gb/articles/11821760782610-Cambridge-English-Regulations

### 7.4 SAFE to claim if literally true — recommended Romanian phrasings

- *„Cursuri de pregătire pentru examenele Cambridge English"* — always safe.
- *„Pregătim și înscriem candidații la examenele Cambridge English prin [Numele Centrului Autorizat]"* — safe, and the accurate description of a preparation centre.
- *„Folosim materiale oficiale Cambridge"* (if true; a **textual mention** of the brand is different from reproducing the logo).
- *„Profesori formați / cu certificare CELTA / TKT"* (if true and individually held).
- *„Simulări de examen (mock tests) în condiții reale"* — safe; see §7.6.
- *„Nivelurile cursurilor sunt raportate la CEFR (A1–C2)"* / *„Cursurile noastre sunt structurate pe niveluri CECRL, de la A1 la C2."* — safe; CEFR/CECRL is a Council of Europe public framework, free to reference.
- *„Certificatele Cambridge English nu au termen de expirare."* — safe (see §5.2 validity).
- *„Curs de pregătire pentru TOEFL iBT. Examenul se susține la un centru de testare autorizat ETS."* — safe.

### 7.5 Centre-status terms — exact Romanian phrasings and when each is permitted

| Status | Romanian | Safe to use if… |
|---|---|---|
| Preparation Centre | **centru de pregătire pentru examenele Cambridge English** | you actually prepare and enter candidates via an authorised centre |
| Authorised Exam Centre | **centru autorizat de examinare Cambridge English** / **Centru Autorizat Cambridge English** | ONLY with a signed Cambridge centre agreement |
| Platinum Centre | **Centru Platinum Cambridge English** | ONLY if awarded |
| Exam venue | **locație de examinare autorizată** | only if approved by your exam centre |
| "Cambridge-type exam" | **examen de tip Cambridge** | Use with care — implies "similar to but not actually a Cambridge exam". Fine for an internal school test; **misleading** if the student will sit a real Cambridge exam. Prefer *„examen Cambridge English"* when it is the real thing. |

### 7.6 "Mock / simulated exam" in the Cambridge ecosystem

Cambridge uses **"mock test"** as the official term. Its **free Mock Test Toolkit** for teachers exists in two versions (Young Learners: Starters/Movers/Flyers; and A2 Key for Schools → C2 Proficiency) and contains: guidance on running/administering a mock, giving effective feedback, judging exam readiness, and confidence-building activities. Cambridge's rationale: "Running a mock test gives your learners a true exam day experience, helps you understand their progress and decide if they are ready for their exam." https://www.cambridgeenglish.org/educators-organisations/resources-for-teachers/mock-test-toolkit/

Official practice/prep products a centre may legitimately reference:

| Tool | What it is | Cost |
|---|---|---|
| **Sample papers / past papers** | Free downloadable full papers + audio + answer keys, per exam | Free |
| **Authentic / Digital Practice Tests** | Official practice tests in the real digital exam interface; can be set as mock tests, automarked, results in <5 min, up to 3 attempts | Paid |
| **Test & Train** | Short "workout" practice sessions, hundreds of questions, all devices, automatic feedback, for autonomous home practice | Paid |
| **Write & Improve** | Free automated writing feedback (spelling, vocabulary, grammar, style), hundreds of tasks at all levels, result linked to CEFR. Now at writeandimprove.com | Free (Plus tier paid) |
| **Exam Lift** | Free app; ~10 min/day skill activities for **A2 Key for Schools, B1 Preliminary for Schools, B2 First for Schools**; content based on the Cambridge Learner Corpus & CEFR; progress tracking | Free |
| **Test your English** | Free quick online placement/level indicator | Free |

**Important framing:** mock/practice-test scores **converted** to Cambridge English Scale scores are a **diagnostic indicator only**. Cambridge's own wording: they "should not be used to try to predict precise scores in the live exam, but can be a useful diagnostic tool, indicating areas of relative strength and weakness"; scores near CEFR boundaries need care (**≈±3 scale points**, e.g. 157–163 around B2). **Never advertise a predicted exam score or a guaranteed grade.**

### 7.7 Consolidated "DO NOT PRINT" checklist

1. "Gold / Silver Cambridge partner" — no such Cambridge tier.
2. "Centru autorizat de examinare" without a signed centre agreement.
3. Any use of the University of Cambridge shield or the Cambridge English logo by a preparation centre.
4. "KET / PET / FCE / CAE / CPE" as primary names.
5. "Pass with Distinction / Merit" for A2 Key or B1 Preliminary (now Grade A/B/C).
6. "BEC / Business Vantage / Business Higher" — withdrawn outside China.
7. TOEFL "0–120, patru secțiuni din 30 de puncte" as the current scale — since 21 Jan 2026 it is **1–6**.
8. TOEFL "aproximativ 4 ore" / "sub 2 ore de testare" — actual test time is **1h23–1h29**, ≈2h at the centre.
9. Guaranteed scores, guaranteed pass rates, guaranteed time-to-level.
10. Implying Cambridge accredits/endorses your teachers, methodology or courses.
11. Implying you deliver IELTS or administer TOEFL.
12. Predicting an exam grade from a mock/practice test score.
13. (BAC copy) "B2" as the level of the BAC English exam — the programme says **B1** (see §9).
14. (BAC copy) "opțional" for the foreign-language BAC exam — it is **obligatorie** for all four profiles.

---

## 8. TOEFL iBT 2026 FACTS

**As of 21 January 2026 the TOEFL iBT was redesigned: adaptive, shorter, and reported on a NEW 1–6 scale.** Anything stating "0–120, four sections of 30, about 2 hours of testing, 4 hours total" is **outdated**.

### 8.1 Format (ETS 2026 Test Blueprint)

| Section | Task types | Items | Format | Estimated time |
|---|---|---|---|---|
| **Reading** | Complete the Words; Read in Daily Life; Read an Academic Passage | 50 | **Two-stage adaptive** (router + lower/upper module) | Router 18–21 min + module 9 min |
| **Listening** | Listen and Choose a Response; Listen to a Conversation; Listen to an Announcement; Listen to an Academic Talk | 47 | **Two-stage adaptive** | Router 18 min + module 7 min (lower) / 11 min (upper) |
| **Writing** | Build a Sentence; Write an Email; Write for an Academic Discussion | 12 | Linear | 23 min |
| **Speaking** | Listen and Repeat; Take an Interview | 11 | Linear | 8 min |
| **TOTAL** | | **120 items** | | **Min 1h23 / Max 1h29 of test time** — allow **≈2 hours** at the centre including directions |

Reading/Listening are machine-scored; Writing (2 constructed items) and Speaking (11 items) are **AI-scored** using NLP/ML. The test is designed to cover the **full A1–C2 CEFR range**.
https://www.eu.ets.org/pdfs/toefl/toefl-ibt-test-specifications-2026.pdf · https://www.ets.org/toefl/test-takers/ibt/about/content.html

### 8.2 Scoring

- **Four section scores + one overall score, all on a 1–6 scale in half-band increments** (1, 1.5, 2 … 6).
- **Overall = the AVERAGE of the four section scores, rounded to the nearest half band** (not a sum). 5.125 → 5.0; 5.25 → 5.5.
- **Transition:** for **two years after January 2026 (i.e. to Jan 2028)** score reports also show a **comparable overall 0–120 score** (the midpoint of the equivalent range) plus the CEFR level.
- **There is no pass/fail.** ETS sets no passing score; each institution sets its own requirement.
- **Scores are valid for 2 years.**

**CEFR alignment (ETS official):** 6 = **C2** · 5–5.5 = **C1** · 4–4.5 = **B2** · 3–3.5 = **B1** · 2–2.5 = **A2** · 1–1.5 = **A1**. Applies identically to each section and to the total.

**Total-score concordance (new 1–6 → old 0–120):**

| New | Old 0–120 |
|---|---|
| 6 | 114+ |
| 5.5 | 107+ |
| 5 | 95+ |
| 4.5 | 86+ |
| 4 | 72+ |
| 3.5 | 58+ |
| 3 | 44+ |
| 2.5 | 34+ |
| 2 | 24+ |
| 1.5 | 12+ |
| 1 | 0+ |

**IELTS concordance (total):** 9 → 6 · 8–8.5 → 6 · 7.5 → 5.5 · 7 → 5 · 6.5 → 4.5 · 6 → 4 · 5.5 → 3.5 · 5 → 2.5 · 4.5 → 2 · 4 → 1.5.
https://www.ets.org/toefl/institutions/ibt/score-scale-update.html

### 8.3 Typical university requirements (frame as indicative, never as a promise)

- ETS's own institutional guidance: an institution that previously required **100** should now set a minimum of **5** (old 100 sits inside the 95–106 band mapping to 5).
- Selective / top-ranked universities: **5 to 5.5** (≈ 90–100+).
- Mid-tier universities: **4 to 5** (≈ 80–90).
- Many programmes also set **section minimums** (commonly Speaking/Writing ≥ 4–4.5 under the new scale).
- Always add: *„fiecare universitate își stabilește propriul prag — verificați cerințele instituției."*
https://www.ets.org/toefl/institutions/ibt/set-score-requirements.html · https://www.ets.org/toefl/test-takers/ibt/scores/understand-scores.html

### 8.4 Delivery options

Two only: **at a test centre** (170+ dates/year worldwide) and **TOEFL iBT Home Edition** (same test, human online proctor). The **TOEFL iBT Paper Edition was discontinued after 20 January 2024**. https://www.ets.org/toefl/test-takers/ibt/about/testing-options.html

TOEFL is administered **by ETS-authorised test centres only**. A language school in Moldova may advertise **„curs de pregătire pentru TOEFL iBT"** but must **not** imply it registers, administers, or scores TOEFL, and must **not** use ETS/TOEFL logos without authorisation.

**Note the tension with §9.6:** the Moldovan BAC exemption annex still expresses the TOEFL iBT threshold on the **old 0–120 scale** (Total ≥ 86, Reading ≥ 20, Writing ≥ 20). During the 2026–2028 transition, score reports still carry the comparable 0–120 figure — but do not print an equivalence between the new 1–6 bands and the BAC threshold without the current annex in hand.

---

## 9. MOLDOVA BAC — ENGLISH (LIMBA STRĂINĂ I)

All figures below come from official ANCE / MEC documents (PDFs downloaded and read in full), not secondary sources, except where flagged.

### 9.1 Status: obligatory, all profiles

**Limba străină I is an OBLIGATORY exam** at the national baccalaureate — it is not a *disciplină la solicitare*.

- The official programme (2021) states: *„În cadrul examenului național de bacalaureat, LS are statut de **disciplină obligatorie pentru ambele profiluri (real și umanist)**."*
- **Current operational documents explicitly extend this to 4 profiles.** The header of ANCE 2026 tests reads literally: *„CICLUL LICEAL / **Profil real, umanist, arte, sport**"*.
- The BAC 2026 timetable (ANCE) confirms: "Limba străină I" = **Examenul 3**, sat by profiles **Real, Umanist, Arte, Sport** (all on the same day).
- The conversion scheme (Ordinul ANCE 164/12.06.2024) lists the row „Limba engleză **(U.R.A.S.T)**" at Examenul 3 — U=umanist, R=real, A=arte, S=sport, T=tehnologic. `[The reading of "T" = tehnologic is UNVERIFIED; the 2026 timetable no longer lists a distinct technological profile.]`

**Structure of the obligatory exams (4) + 1 on request:**

| # | Probă | Who |
|---|---|---|
| Ex. 1 | Limba și literatura română (alolingvi) | alolingvi only |
| Ex. 2 | Limba de instruire | all |
| **Ex. 3** | **Limba străină I** | **all (R, U, A, S)** |
| Ex. 4 | Disciplina de profil: Matematica (R) / Istoria românilor și universală (U) / Arte (A) / Pregătirea sportivă (S) | all |
| Ex. 5 | **Proba la solicitare** (geografie, fizică, chimie, biologie, matematică, istorie, informatică) | all |
| Ex. 6 | Limba și literatura bulgară / găgăuză / ucraineană | where applicable |

**Vocational-technical education (colegii / centre de excelență):**
- Art. 2 of the Regulament: the right to sit the BAC belongs to persons who completed the lycée programme „în instituţiile de învăţământ general, **profesional tehnic** sau superior". So students in colleges / centres of excellence with an integrated lycée programme may sit the national BAC, with the same exams.
- Separately there is the **„bacalaureatul profesional"** (MEC), concluding with a *Diplomă de studii profesionale*, which includes exams in **English and French**. It is a distinct exam from the national BAC with its own regulation. `[Details of the English exam at the bacalaureat profesional — structure, marks — NOT verified.]`
- The diploma de bacalaureat confers the right of admission „în învățământul superior **și în învățământul profesional tehnic postsecundar nonterțiar**".

### 9.2 Structure of the written English exam

**Duration: 180 minutes.** A single written test. Materials: blue ink pen. Exams start at **09:00** (2026 main session).

**Total: 100 points**, in 3 subjects.

**Subiectul I — Comprehensiunea scrisă (Reading) — 30 p.**
`COMMUNICATIVE DOMAIN — Assessment of Communicative Language Competences. Reading Comprehension`
One unseen **non-literary / functional text, 400–450 words**, followed by **7 items**:

| Item | Type | Points |
|---|---|---|
| I | Multiple choice — sentence completion (4 items × 1 p.) | 4 |
| II | Vocabulary in context — meaning of 2 words from the text (2 × 1 p.) | 2 |
| III | Short answers based on the text (4 × 1 p.) | 4 |
| IV | Matching — joining sentence halves, 1 extra option (4 × 1 p.) | 4 |
| V | True/False **+ justification by quotation from the text** (3 × 2 p.) | 6 |
| VI | Ordering the main ideas of the text (4 × 2 p.) | 8 |
| VII | Main idea of the text (1 × 2 p.) | 2 |

> **N.B. important for copy:** there is **NO separate grammar/vocabulary ("use of English") section**. Grammar and lexis are assessed (a) in item II contextual vocabulary and (b) **in the writing mark schemes**, as „componenta lexicală și ortografică" and „componenta gramaticală și ortografică".
> **N.B.** In item V, if the True/False answer is missing, the justification is not validated.

**Subiectul II — Producerea scrisă, temă actuală (Essay) — 40 p.**
`Written Production` — **structured essay of 180–200 words** (introduction, body, conclusion), on a theme from the personal / family / school / natural / social-and-informational environments.

Mark scheme (fixed nationally):

| Component | Points |
|---|---|
| Correctness at the level of **pragmatic** competence (theme identification 1 p.; description 4 p.; advantages/disadvantages 6 p.; 2 examples 4 p.; own opinion 2 p.; justification of opinion 3 p.) | **20** |
| Linguistic competence — **semantic component** (coherence, ≥4 logical connectors = 3 p.; paragraphing = 1 p.) | **4** |
| Linguistic competence — **lexical and orthographic component** (−1 p. per 4 errors; beyond 24 no further deduction) | **6** |
| Linguistic competence — **grammatical and orthographic component** (−1 p. per 5 errors; beyond 30 no further deduction) | **6** |
| Linguistic competence — **lexical volume component** (180–200 words = 4 p.; 160–179 = 3; 140–159 = 2; 120–139 = 1; **<120 words = 0**) | **4** |

**Subiectul III — Producerea scrisă, temă de cultură — 30 p.**
`CULTURAL DOMAIN — Assessment of Pluri/Intercultural and Communicative Language Competences`
**Press article / personal letter**, on a theme of the culture/civilisation of the target-language country (e.g. a building, an anglophone country, a tourist attraction).

- **Volume: 90–100 words** per the 2021 programme and the 2025 mark scheme;
- **From the 2026 session the volume increased to 100–110 words** (official MEC/ANCE announcement, following the national test-solving exercise of 29.11.2025).

Mark scheme: cultural + pragmatic competence **16 p.** · semantic component **2 p.** · lexical/orthographic **5 p.** · grammatical/orthographic **4 p.** · lexical volume **3 p.**

> **N.B. eliminatory:** *„Neidentificarea temei de cultură/civilizație conform sarcinii indicate **anulează evaluarea Subiectului III**."*
> **N.B. eliminatory:** *„Răspunsul în altă limbă decât cea indicată pe test **anulează itemul, proba sau testul**."*
> A repeated error is counted once. Exceeding the maximum volume brings no extra points.

**Conversion of points into a mark (10-point scale).** The scheme is **identical for all subjects** and stable in 2022, 2023, 2024 (verified across 3 orders):

| Nota | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 |
|---|---|---|---|---|---|---|---|---|---|---|
| **Puncte (din 100)** | 0 | 1–8 | 9–16 | 17–24 | **25–41** | 42–57 | 58–73 | 74–89 | 90–95 | **96–100** |

- **Pass threshold: 25 points = nota 5.** Nota 10 requires **96+ out of 100**.
- The exam is passed if **the mark in each probă** is ≥ 5.
- `[UNVERIFIED: no published schemes found for the 2025 and 2026 sessions; the last published is Ordinul ANCE 164/12.06.2024. No indication of change.]`

**Extra time.** Regulament pct. 106: time may be extended by at most 60 min and/or **by 120 minutes for the foreign-language exam**, for pupils with serious motor, neuro-motor or visual impairments.

### 9.3 CEFR level targeted: B1 (not B2)

Verified, quoted literally from the programme:
> *„Finalitatea de bază presupune că elevii pot dovedi cunoaşterea LS la **nivelul B1** conform grilei nivelurilor de competență ale CECRL (2018)."*

and, in the test-examples chapter:
> *„formatul și **nivelul B1 de complexitate** ale acestora conform CECRL (2018)"*

- **B1 is uniform across all profiles** — the programme does not differentiate level by real/umanist/arte/sport. There is **no B2 variant** of the English test.
- Bilingual classes (B2/C1) exist **only for French** („Limba franceză, clase bilingve" — a separate test in the ANCE catalogue). There are **no bilingual English classes with a distinct BAC test**.
- Legal basis for the level: Curriculumul la Limba străină cl. X–XII, approved by **Ordinul MECC nr. 906 din 17.07.2019**, aligned to CECRL 2018; Cadrul de referință al Curriculumului Național (Ordin MECC nr. 432/2017).

> **Copy implication:** promising „pregătire BAC = nivel B2" is incorrect against the programme. Correct formulation: the exam targets **B1**, while a candidate with a **certified B2** international certificate can be exempted with nota 10 (§9.6).

### 9.4 Sessions and registration

**Sesiunea de bază** — held **in June** (Regulament pct. 108).
- **2026: 2–19 June.** Foreign language: **Tuesday, 9 June 2026**, 09:00. (17,141 candidates in total at LS: **English 14,572**, French 2,430, German 77, Italian 27, Spanish 22, Turkish 13.)
- 2025: the main session began on 3 June.
- At least two days' break between exams (pct. 103).

**Sesiunea suplimentară** — in July; for (a) those with justified absence and (b) those who **received insufficient marks** in the main session and request a re-sit.
- **2026: 13–17 July**; foreign language **Wednesday, 15 July 2026** (≈835 candidates); 15 baccalaureate centres.
- 2025: 14–21 July (Ordinul MEC nr. 1073 din 30.06.2025); foreign language **16 July 2025**; exams began at 10:00.
- Application for admission to the supplementary session (justified absence): within max. 3 days of the event, with supporting documents, to the Comisia Raională/Municipală de Examene.

**Registration** (Regulament pct. 89):
> *„Înscrierea candidaţilor la examenul național de bacalaureat se face la secretariatul instituţiei în care îşi face studiile candidatul (…) în perioada **10 ianuarie – 15 februarie a anului în curs**."*
- On registration the candidate **confirms in writing the language of instruction, the foreign language and the choice of proba la solicitare, according to profile** (pct. 91).
- Admission to the exam is decided by the institution's **Consiliul profesoral**.
- On failure: the exam may be re-sat free of charge **at most twice within the following 3 years** (Regulament 47/2018, pct. 8). `[A 2024 school extract indicates "three times"; UNVERIFIED which version is currently in force — subsequent amendments to the Regulament were not consulted in full.]`
- Those who do not pass but have fully completed the lycée course receive a **certificat de studii liceale**.

### 9.5 Programme document and test sources

**Exact official name:**
> **„LIMBA STRĂINĂ — Programă pentru examenul național de bacalaureat"**
> Ministerul Educaţiei și Cercetării al Republicii Moldova / Agenţia Naţională pentru Curriculum şi Evaluare, Chişinău, **2021**.
> Approved at the sitting of the **Comisia Națională de Examene, proces-verbal nr. 1 din 04 noiembrie 2021**, **Ordinul MEC nr. 1499 din 04 noiembrie 2021**.
> A single document for all languages (English, French, German, Italian, Spanish), with linguistic contents separated per language.
> PDF: https://ance.gov.md/sites/default/files/programa_bac_limba_straina_4.pdf

Contents: Preliminarii · Competențe specifice · Unități de competență/conținut/rezultate ale învățării · **Exemple de itemi** · **Conținuturi evaluate** (linguistic per language + thematic) · **Exemple de teste și barem comun de corectare**.

**ANCE terminology for "past papers" — there are TWO distinct categories:**

| Official ANCE term | What it is |
|---|---|
| **„Teste pentru exersare"** | practice tests published annually (e.g. February 2026), 2 per language, with mark scheme |
| **„Modele de teste"** | the wording used on the BAC page for tests from previous sessions |
| **„Sesiunea de bază, bac, [an]"** / **„Sesiunea suplimentară, bac, [an]"** | the real exam tests, with mark scheme |
| **„Barem de corectare"** | the marking scheme (NOT „barem de notare") |
| **„Test de examen"**, **„subiect"**, **„item"**, **„punctaj"** | the units of the test |

> The phrase **„teste de antrenament" is NOT used by ANCE** — the official term is **„teste pentru exersare"**. `[„Matrice de specificații" does not appear in the foreign-language programme — UNVERIFIED whether one exists for this subject.]`

**Verified URLs:**
- Programme index: https://ance.gov.md/content/programe-de-examene
- Class 12 index (all sessions): https://ance.gov.md/clasa-sesiunea-examen/clasa-12
- Practice tests, lycée 2026: https://ance.gov.md/content/limba-străină-teste-pentru-exersare-liceu-2026 — files `12_len_test1_es26.pdf`, `12_len_barem1_es26.pdf`, `12_len_test2_es26.pdf`, `12_len_barem2_es26.pdf`
- Main session BAC 2025: https://ance.gov.md/content/limba-străină-sesiunea-de-bază-bac-2025 — https://ance.gov.md/sites/default/files/12_len_test_sb25.pdf · https://ance.gov.md/sites/default/files/12_len_barem_sb25.pdf
- Supplementary session BAC 2025: https://ance.gov.md/content/limba-străină-sesiunea-suplimentară-bac-2025
- Earlier years: `.../limba-străină-sesiunea-de-bază-bac-2024`, `...-2021`, etc.
- **File-naming convention:** `12_len_test_sb25.pdf` = class 12 · English (`len`) · test · main session 2025. Codes: `len` English, `lfr` French, `lfrbil` French bilingual, `lger` German, `lit` Italian, `lsp` Spanish, `ltur` Turkish. Suffixes: `sb` = sesiunea de bază, `ss` = suplimentară, `es` = exersare.
- Candidate info + timetable: https://ance.gov.md/content/informații-utile-pentru-candidații-la-examenul-național-de-bacalaureat
- BAC Regulation (Ordinul nr. 47/2018, MO nr. 58-66, art. 256/2018): https://ance.gov.md/sites/default/files/reg_bac_rom_mo_2018.pdf
- Conversion schemes: https://ance.gov.md/content/schema-de-convertire-punctelor-în-note-sesiunea-2024 (PDF: `ordinul_ance_164_din_12.06.2024_schema_de_convertire_cl_12_ses_2024_anexa.pdf`)

### 9.6 International certificates → BAC: „nota 10 din oficiu" (VERIFIED)

Legal basis: **Ordinul nr. 157 din 20 martie 2015**, as amended (Ordinul nr. 1060/02.11.2015, Ordinul nr. 09/15.01.2020, **Ordinul nr. 206 din 03 februarie 2026**), read together with pct. 98 of the BAC Regulation.
Full PDF: https://ance.gov.md/sites/default/files/ordinul_nr157_din_20032015_lstr_certif_internationale_modificat.pdf
ANCE page: https://ance.gov.md/content/10-din-oficiu-la-proba-de-limbă-străină-examenului-de-bacalaureat
Administered by **ANACEC / ANCE**.

**General condition:** a certificate/diploma attesting a level **equal to or higher than B2** (**C1** for candidates from bilingual classes), **both as an overall level and for the specific writing and reading competences**.

**Anexa nr. 2 — the full English list, as updated by Ordinul 206/03.02.2026:**

| # | Exam | Level | Conditions for recognition | Issuer |
|---|---|---|---|---|
| 1 | **B2 First / B2 First for Schools (FCE)** | B2 | Passed · **Reading ≥ 160** · **Writing ≥ 160** | Cambridge |
| 2 | **C1 Advanced (CAE)** | B2–C1 | Passed · Reading ≥ 160 · Writing ≥ 160 | Cambridge |
| 3 | **C2 Proficiency (CPE)** | C1–C2 | Passed · **Reading ≥ 180** · **Writing ≥ 180** | Cambridge |
| 4 | **IELTS** | B2–C2 | **Overall Band ≥ 6** · Reading ≥ 6 · Writing ≥ 6 | www.ielts.org |
| 5 | **TOEFL iBT** | — | **Total ≥ 86** (86–109 = B2; 110–120 = C1) · Reading ≥ 20 · Writing ≥ 20 | ETS |
| 6 | **Oxford Test of English (OTE)** | B2 | Overall B2 · Reading B2 · Writing B2 | Oxford University Press |
| 7 | **Oxford Test of English Advanced** | B2–C1 | Overall B2 · Reading B2 · Writing B2 | Oxford University Press |

*(Positions 6–7 were added by Ordinul nr. 206 din 03.02.2026.)*

**Procedure and deadlines:**
- The certificate must be **within its validity period at the date the application is filed** and at the date of the exam.
- The certified language must have been **studied in classes X, XI and XII**, with annual marks, and must coincide with the language stated in the BAC registration application.
- **By 10 April**: the candidate files the dossier at the institution's secretariat — the certificate (original **or electronic version**, if the original is not held), the application, 2 copies of the ID card, 3 copies of the certificate.
- The school commission verifies and issues a proces-verbal; the institution notifies the candidate **within 5 days**.
- **By 15 April**: the institution sends the dossiers to ANCE (demers + certified copies).
- **TOEFL iBT: by 1 May** the candidate asks ETS to send the result directly to ANCE (**ANCE's ETS code: B017**).
- **By 25 May**: ANCE presents the list to the Comisia Națională de Examene; an order of the Minister of Education is issued.
- **By 2 June**: the institution presents the list to the Centrul de Bacalaureat.
- Approved candidates **do not sit the exam**; rejected candidates **must sit it**.
- Certificates obtained **through modular sittings / multiple examination sessions** are accepted, if they are for the same exam type and consolidated into a single official document (2026 novelty).
- **Announced change for the 2027 session:** candidates who sit the international exam **after 1 September 2026** will have to meet the minimum scores not only overall but also **separately for writing and reading**.

**Note:** the same "10 din oficiu" mechanism exists for **olympiad winners** (places I–II–III at the republican olympiad in the relevant subject in the graduation year, or individual medals at international olympiads in classes X–XII) and, separately, for informatics.

### 9.7 University admission: NO national recognition (VERIFIED NEGATIVE)

The **Regulamentul-cadru privind organizarea admiterii la studii superioare de licență, master și integrate pentru anul universitar 2026–2027** (Ordinul MEC nr. 965 din 18.05.2026) was read in full: https://mec.gov.md/ro/content/admiterea-2026

- **No mention whatsoever** of Cambridge, IELTS, TOEFL or a foreign-language competence certificate as an element of the admission competition.
- The **media de concurs** for holders of a baccalaureate diploma is calculated, by senate decision, from: BAC exam marks, the average of BAC exams, the average of the lycée years, marks in profile subjects from the diploma annex and, where applicable, aptitude testing — with the mandatory condition that **the weight of the BAC exam average be at least 50%**.
- Minimum competition average: **5.00**; for the field „Științe ale educației": **7.00**.
- The only language-certificate requirement concerns **foreign citizens** — and it is for **Romanian**, not English.
- Tie-break criteria at equal averages: olympiads, competitions, **the profile completed matching the speciality (real, umanist, arte, sport)**, volunteering — no reference to language certificates.

**Correct copy conclusion:** *„Certificatele Cambridge/IELTS/TOEFL nu se convertesc în puncte la admiterea în universitățile din Moldova; efectul lor legal direct este **scutirea de proba de limbă străină la BAC, cu nota 10 din oficiu** — iar acea notă 10 intră apoi în media examenelor de BAC, care are pondere de minimum 50% în media de concurs."* This is the real, demonstrable indirect effect.

`[UNVERIFIED: individual universities may require or reward certificates through their own senate regulations — especially for English-taught programmes. Institutional regulations (USM, ASEM, UTM, ULIM etc.) were not checked. Say nothing about specific universities without verification.]`

### 9.8 Assessed content (useful for course descriptions)

**Themes, Subiectele I–II (Domeniul Comunicare):**
- *Mediul personal*: Tinerii și societatea modernă · Stiluri de viață. Modul de viață sănătos · Profesia · Lectura · Voluntariatul
- *Mediul familial*: Familia · Valorile familiei · Generații și interese · Locuința
- *Mediul școlar*: Cultura școlară · Motivația și succesul școlar · Școala viitorului · Școala contemporană. Parteneriatele școlare
- *Mediul natural*: Schimbările climatice globale · Eco-cetățeanul · Eco-tehnologiile · Protecția mediului. Cultura ecologică
- *Mediul social și informațional*: Turismul și călătoriile · Lumea contemporană. Tehnologiile digitale · Rețelele de socializare. Cultura digitală · Diversitatea umană · Proiectele sociale · Mass-media

**Themes, Subiectul III (Domeniul Cultură — mediul cultural):** Țările din spațiul alofon · Sistemul educațional din țara alofonă · Patrimoniul istoric · Personalitățile ilustre · Evenimentele culturale · Experiențele culturale · Patrimoniul cultural · Orașele/obiectivele turistice și culturale

**Linguistic content for English** (Cap. V.1 of the programme) — 5 blocks:
- *Phonetics, Orthography and Orthoepy*: rhythm, intonation, stress, spelling and pronunciation rules
- *Lexis and Semantics*: synonyms, antonyms, homonyms/homophones/homographs, paronyms, word families, lexical fields, **strong collocations**, common set expressions, **word building**, proverbs and sayings, quotations
- *Morphology*: articles · nouns (compound, collective, countable/uncountable, irregular plurals, partitives, genitive) · adjectives (types, non-gradable, absolute, degrees, double comparatives) · numerals · pronouns (all types) · **verb: all 16 tenses (Simple/Continuous/Perfect/Perfect Continuous), stative verbs, active and passive voice, subjunctive after WISH, conditionals — all types, Participle I, gerund, infinitive, for-to-infinitive, modal verbs, phrasal verbs** · adverbs · prepositions · conjunctions
- *Syntax*: sentence types, word order, ellipsis, clauses, generic/impersonal subject, **cleft sentences (It-cleft, Wh-cleft)**, subject-verb agreement, **sequence of tenses**, **reported speech**, direct/indirect object
- *Text/Discourse Cohesion and Coherence*: discourse markers for addition, comparison, generalisation, cause-effect, contrast, sequencing, emphasis, exemplification, conclusion, condition

### 9.9 BAC copy risk summary

1. **Do not write "B2"** as the level of the exam — the programme says **B1**. B2 is the threshold for exemption with an international certificate.
2. **Do not write "opțional"** — the foreign language is **obligatorie**, at all four profiles.
3. **Do not write "secțiune de gramatică"** — there is none; grammar is scored inside the writing mark schemes.
4. **Subiectul III volume: 100–110 words from 2026** (not 90–100, as in the 2021 programme and older materials).
5. **Nota 10 requires 96/100** — useful and honest to mention.
6. **Cambridge certificates give no points at university admission**; the effect is at BAC (nota 10 din oficiu), with the **10 April** deadline.
7. Use **„teste pentru exersare"**, not „teste de antrenament".

### 9.10 Local downloaded/analysed files

- `/private/tmp/claude-501/-Users-bobernagadamian-Desktop-TheEnglishCenter/57eb5b27-ab12-42a9-a8a8-d2936cc69f42/scratchpad/programa.txt` — BAC foreign-language programme 2021, full text (59 pp.)
- `.../scratchpad/test1_len_2026.txt` — English practice test no. 1, February 2026
- `.../scratchpad/test_sb25.txt` and `.../scratchpad/barem_sb25.txt` — the real test and mark scheme, main session 2025
- `.../scratchpad/ordin157.txt` — Ordinul 157/2015 with Annexes 1 and 2 (certificate list), full text
- `.../scratchpad/reg_bac_official.txt` — BAC Regulation (Ordinul 47/2018), full text
- `.../scratchpad/adm2026ru.txt` — Framework regulation on admission 2026–2027 (RU version, with text layer)
- `.../scratchpad/conv2022.pdf`, `conv2023.pdf`, `conv2024.pdf` — conversion schemes (scanned, read visually)

---

## 10. ROMANIAN TERMINOLOGY GLOSSARY

### 10.1 Data-protection terms (from Legea nr. 195/2024, art. 4) — use these exactly

| Romanian | English / usage |
|---|---|
| **date cu caracter personal** | personal data (includes **un identificator online**) |
| **persoană vizată** | data subject |
| **prelucrare** | processing |
| **operator** | controller — **never** the calque *„controlor"* |
| **persoană împuternicită de operator** | processor |
| **destinatar** | recipient |
| **parte terță** | third party |
| **consimțământ** | consent — *„manifestare de voință liberă, specifică, informată și lipsită de ambiguitate … printr-o declarație sau printr-o acțiune fără echivoc"* |
| **temei juridic** / **temeiul juridic al prelucrării** | legal basis |
| **scopurile prelucrării** | purposes of processing |
| **restricționarea prelucrării** | restriction of processing |
| **creare de profiluri** | profiling |
| **pseudonimizare** | pseudonymisation |
| **sistem de evidență a datelor** | filing system |
| **încălcarea securității datelor cu caracter personal** | personal data breach |
| **categorii speciale de date cu caracter personal** | special categories of data (art. 9) |
| **responsabil cu protecția datelor** | Data Protection Officer — avoid this label unless you appoint and notify under art. 37(7); use **persoană de contact pentru protecția datelor** instead |
| **evidența activităților de prelucrare** | record of processing activities (art. 30) |
| **evaluarea impactului asupra protecției datelor** | DPIA (art. 35) |
| **reprezentantul legal al copilului** | child's legal representative (Moldovan wording; GDPR says "holder of parental responsibility") |
| **transfer către un alt stat** | international transfer |
| **clauze standard de protecție a datelor** | standard contractual clauses |
| **reguli corporatiste obligatorii** | binding corporate rules |
| **decizie privind caracterul adecvat al nivelului de protecție** | adequacy decision (issued by **the Centre**, art. 45) |
| **Centrul** | the Centre — the law's short form for CNPDCP after first mention; mirror this house style |
| **Politica de confidențialitate** · **Politica de cookie-uri** · **Termeni și condiții** | policy document titles |
| **Data ultimei actualizări** | "last updated" field on policy pages |
| Art. 5 principles | legalitatea, echitatea și transparența · limitarea scopului · **reducerea la minim a datelor** · exactitatea · **limitările legate de stocare** · integritate și confidențialitate · responsabilitate |

### 10.2 Cambridge / exam terms

| English | Romanian (recommended) | Usage note |
|---|---|---|
| Cambridge English Qualifications | **examenele Cambridge English** / **calificările Cambridge English** | keep the brand in English; do not translate "Cambridge English" |
| exam | **examen** (pl. *examene*) | |
| test | **test** | |
| certificate | **certificat** (pl. *certificate*) | **not** „diplomă" for Cambridge |
| level | **nivel** (pl. *niveluri*) | „nivelul B2" |
| CEFR | **CECRL** (*Cadrul European Comun de Referință pentru Limbi*) | „conform CECRL" / „aliniat la CECRL". **Do not write "CEFR" in Romanian body text** |
| Cambridge English Scale | **Scala Cambridge English** | „scor pe Scala Cambridge English" |
| score | **scor**; **punctaj** | |
| grade | **calificativ** / **nota (Grade A/B/C)** | keep "Grade A/B/C" in English — that is what appears on the certificate |
| pass | **promovare**; „a promova examenul" | |
| exam session | **sesiune de examen** / **sesiune de examinare** | |
| exam date | **data examenului** | |
| registration / to enrol | **înscriere**; „a se înscrie la examen" | |
| deadline for registration | **termen-limită de înscriere** | |
| exam fee | **taxa de examen** | |
| results | **rezultate**; Statement of Results → **Raportul de rezultate** | |
| candidate | **candidat / candidată** | |
| paper (exam component) | **probă** (pl. *probe*) | **not** „hârtie" |
| written paper(s) | **proba scrisă** / **probele scrise** | |
| oral / speaking test | **proba orală** / **proba de vorbire** | |
| Reading | **proba de citire** / *Reading (înțelegerea textului scris)* | |
| Writing | **proba de scriere** / *Writing (exprimare scrisă)* | |
| Listening | **proba de ascultare** / *Listening (înțelegere după auz)* | |
| Speaking | **proba de vorbire** / *Speaking (exprimare orală)* | |
| Use of English | **Use of English (utilizarea limbii)** | leave the English label — it is the paper's name |
| four skills | **cele patru competențe lingvistice** (citit, scris, ascultat, vorbit) | |
| invigilator | **supraveghetor** | |
| examiner | **examinator** | |
| mock exam / practice test | **examen de probă** / **simulare de examen** / **test de simulare** | Moldovan centres commonly write *„simulări de teste în condiții de examinare reale"* |
| sample papers | **modele de teste** / **teste model** | |
| paper-based exam | **examen pe hârtie** / **examen în format tipărit** | |
| computer-based / digital exam | **examen pe calculator** / **examen digital** | |
| exam venue | **locația de examinare** / **centrul de desfășurare a examenului** | |
| guided learning hours | **ore de studiu ghidat** / **ore de instruire ghidată** | |
| placement test | **test de plasare** / **test de nivel** | |
| preparation course | **curs de pregătire** | |

Centre-status terms and their permission conditions: see **§7.5** (do not duplicate them loosely elsewhere in the copy).

**Ready-to-use safe Romanian sentences:**
- *„Centru de pregătire pentru examenele Cambridge English. Înscrierea la examen se face prin [Centrul Autorizat X]."*
- *„Cursurile noastre sunt structurate pe niveluri CECRL, de la A1 la C2."*
- *„Organizăm simulări de examen în condiții cât mai apropiate de cele reale, pe baza modelelor oficiale de teste Cambridge."*
- *„Certificatele Cambridge English nu au termen de expirare."*
- *„Cambridge estimează aproximativ 500–600 de ore de studiu ghidat, cumulativ, pentru atingerea nivelului B2. Cifrele sunt orientative și variază de la un cursant la altul."*
- *„Curs de pregătire pentru TOEFL iBT. Examenul se susține la un centru de testare autorizat ETS."*

### 10.3 BAC / Moldovan education terms (RO-MD usage)

| Correct term (RO-MD) | Usage note / what NOT to use |
|---|---|
| **examenul național de bacalaureat** (BAC) | full official form |
| **proba de examen la limba străină** / **proba la limba străină** | use „proba", not „testul", when speaking of the exam as an event |
| **Limba străină I** | the name in the timetable; „II" is the second language, not examined at BAC |
| **disciplină obligatorie** vs. **proba la solicitare** | „la solicitare" = optional; NOT „opțional" / „la alegere" |
| **disciplina de profil** | Ex. 4 (matematica / istoria / arte / pregătirea sportivă) |
| **profil real, umanist, arte, sport** | NOT „filieră"/„specializare" (those are Romanian usage) |
| **test de examen** · **subiect** (I/II/III) · **item** · **punctaj** | „subiect" ≠ „temă"; items are numbered with Roman numerals |
| **barem de corectare** | NOT „barem de notare"; „schemă de notare" appears only in the Regulament |
| **teste pentru exersare** | the official ANCE term for practice tests |
| **modele de teste** | tests from previous sessions |
| **schema de convertire a punctelor în note** | the 100 p. → mark 1–10 conversion |
| **sesiunea de bază** / **sesiunea suplimentară** | NOT „sesiunea repetată"; a re-sit takes place *within* the supplementary session |
| **înscrierea candidaților** · **cerere de înscriere** | 10 January – 15 February |
| **nota „10" (zece), din oficiu** | the exact legal formula for the exemption |
| **examene cu recunoaștere internațională pentru certificarea competențelor lingvistice** | the legal formula for Cambridge/IELTS/TOEFL |
| **Cadrul European Comun de Referință pentru Limbi (CECRL)** | NOT „CEFR" in Romanian text |
| **Centru de Bacalaureat** · **Comisia Națională de Examene** · **Comisia Raională/Municipală de Examene** | official bodies |
| **ANCE — Agenția Națională pentru Curriculum și Evaluare** | formerly AEE; site ance.gov.md (aee.edu.md also redirects) |
| **MEC — Ministerul Educației și Cercetării** | mec.gov.md (old: mecc.gov.md) |
| **ANACEC** | administers the certificate-recognition mechanism alongside ANCE |
| **certificat de studii liceale** · **diplomă de bacalaureat** | study documents |
| **învățământ profesional tehnic postsecundar / postsecundar nonterțiar** · **colegii** · **centre de excelență** | NOT „licee tehnologice" |
| **competența de comunicare langajieră** (lingvistică, sociolingvistică, pragmatică) · **competența (pluri/inter)culturală** | programme terminology — useful for copy claiming „conform programei oficiale" |
| **Domeniul Comunicare** / **Domeniul Cultură** | the two domains of the test |
| **unități de competență** · **unități de conținut** · **rezultate ale învățării** · **acte comunicative** | the programme's structure |
| **Mediile tematice**: mediul personal / familial / școlar / natural / social și informațional / cultural | the themes examined |

---

## 11. UNVERIFIED / OPEN QUESTIONS THE HUMAN MUST CONFIRM

### 11.1 Blocking before launch (legal)

1. **CNPDCP implementing acts under Law 195/2024** — whether the Centre has published its **adequacy list**, its **own standard contractual clauses**, and its **mandatory-DPIA list**. Art. 89 alin. (3) obliges it to adopt implementing acts before entry into force (23.08.2026). **Re-check https://datepersonale.md immediately before launch** — this is 7 days out and the picture may change.
2. **Whether art. 116(5) of Law 72/2025 will be enforced against ordinary website operators** as opposed to electronic-communications providers. Art. 114 alin. (2) scopes that chapter to processing *"legate de furnizarea de servicii de comunicații electronice accesibile publicului prin intermediul rețelelor publice"*, which reads as aimed at telecom providers, whereas art. 116(5) is drafted generally and mirrors an ePrivacy article that does bind website operators. **No CNPDCP guidance or decided case found.** This ambiguity is itself a reason to implement the stricter consent model rather than litigate the point.
3. **Whether CNPDCP has issued cookie-specific guidance** under the new law.
4. **Article-numbering provenance.** Arts. 3, 6, 8, 13, 30, 33, 44, 46, 88, 89, 90 were cited from the **authentic published MO text**. Arts. 37, 49, 55, 87 were read from the **MoJ draft** and cross-checked against CNPDCP guidance, which cites the same numbering. Draft and adopted text are known to diverge on at least one point (**draft art. 89(1) said 12 months; adopted says 24**), so **re-verify any draft-sourced article against the MO text before quoting it in a published legal document**.

### 11.2 Blocking before launch (form backend)

5. **Which service is actually integrated — `w3forms.com` or `web3forms.com`.** They are different companies with different operators, different data locations and different DPAs. Confirm before writing a single word of the privacy notice.
6. **The current sub-processor list and data locations** of whichever vendor is used (the Annex 3 list in §4.6 is from the archived DPA v1.0 of 13 Jul 2026).
7. **Whether `https://web3forms.com/client/script.js` pulls Microsoft Clarity (session replay) onto your pages.** Not audited. Material for the cookie banner and the privacy notice if true.
8. `cf-turnstile-response` as the POST field name for Cloudflare Turnstile — inferred from Turnstile's native field name; the Web3Forms Turnstile page never names the POST field.
9. Web3Forms Pro pricing (~$12/mo billed yearly) — sourced from third-party comparison pages, not the archived pricing page.
10. The original Web3Forms brief flagged Moldova's data-protection statute and adequacy for India/USA as unresearched; that gap is now closed by §1 — **but a Moldovan-counsel sign-off on the transfer basis is still the sensible step if the India-based processor stays.**

### 11.3 Cambridge / TOEFL

11. **Linguaskill's current reported score range.** cambridgeenglish.org now says "B1 to C2", which conflicts with the legacy Cambridge English Scale **82–180+** ("below A1 to C1 or above"). Indicates a product refresh. **Verify with the authorised centre before printing.**
12. **The centre's actual Cambridge status in writing** — Preparation Centre vs Authorised Exam Centre vs Exam Venue vs Platinum. Every claim in §7 hangs on this. If a "Gold/Silver partner" claim is being considered, it must be backed by a written statement from Cambridge or the regional office; **no such Cambridge tier exists** in the published scheme.
13. **Which Authorised Exam Centre the school enters candidates through** (e.g. Alliance Française de Moldavie, ILTC) — needed for the safe phrasing *„…prin [Numele Centrului Autorizat]"*.
14. Whether the school holds current **CELTA/TKT-certified teachers** individually, before printing that claim.

### 11.4 Moldova BAC

15. **The currently accepted certificate list and minimum levels in the latest annex to Ordinul 157/2015.** The list in §9.6 reflects Ordinul nr. 206 din 03.02.2026, but the list and thresholds are updated by ministerial order and this is a claim parents will check. **Do not print a specific level (e.g. "B2 = nota 10") without the current annex in hand.**
16. **Conversion schemes for the 2025 and 2026 sessions** — not found published; the last published is Ordinul ANCE 164/12.06.2024. No indication of change, but unconfirmed.
17. **The re-sit allowance** — Regulament 47/2018 pct. 8 says the exam may be re-sat free of charge **at most twice within 3 years**; a 2024 school extract says "three times". Which is currently in force is unconfirmed; later amendments to the Regulament were not consulted in full.
18. **The meaning of "T" in „Limba engleză (U.R.A.S.T)"** in the ANCE conversion scheme — read as *tehnologic*, but the 2026 timetable no longer lists a distinct technological profile.
19. **The English exam at the „bacalaureatul profesional"** — structure and marks not verified. It is a distinct exam from the national BAC with its own regulation.
20. **Whether a „matrice de specificații" exists** for the foreign-language subject — the phrase does not appear in the programme.
21. **Individual universities' own senate regulations** on language certificates, especially for English-taught programmes (USM, ASEM, UTM, ULIM etc.) — not checked. **Say nothing about any named university without verification.**
22. **The 2027 change** — candidates sitting the international exam **after 1 September 2026** will need to meet the minimum scores separately for writing and reading, not only overall. Announced; confirm the implementing order before advising 2027 candidates.