import type { LegalDict } from "../../types";

export const legal: LegalDict = {
  updatedLabel: "Last updated {date}",
  // Re-date this whenever any text on the three legal pages changes.
  updatedDate: "16 August 2026",
  tocTitle: "On this page",

  privacy: {
    seo: {
      title: "Privacy notice",
      description:
        "What personal data The Best Indeed English Centre collects through this website, the legal basis for each purpose, how long we keep it and how you exercise your rights under Legea nr. 195/2024.",
    },
    title: "Privacy notice",
    lead: "This notice explains what personal data we collect through this website, why we hold it, how long we keep it and what you can ask us to do with it.",
    sections: [
      {
        heading: "In short",
        paragraphs: [
          "The short version. Every line of it is repeated below, with the detail the law requires.",
        ],
        bullets: [
          "We ask for a name, a telephone number, an email address, the learner's age, the name of the parent where the learner is a child, the programme and the times you prefer, and whatever you choose to write in the message box. Your IP address and browser details travel with the request, as they do with any form on the internet.",
          "We use a request to answer you and to arrange a placement test. That is a step taken before a contract, not consent, so there is no consent to withdraw.",
          "We never sell personal data, and we send news about courses only to people who ticked the separate box for it.",
          "Nothing non-essential runs on this site unless you say so, and every page works the same whether you allow it or not.",
          "You can ask to see, correct or delete what we hold, and you can complain to the National Centre for Personal Data Protection.",
        ],
      },
      {
        heading: "Who we are, and the law that applies",
        paragraphs: [
          "The centre is the operator — the controller — of the personal data described here. Our legal name, registered address, telephone number and email address are in the contact details at the foot of every page. Requests about this notice should go to the email address published there.",
          "From 23 August 2026 this processing is governed by Legea nr. 195/2024 privind protecția datelor cu caracter personal, published in Monitorul Oficial nr. 367-369 of 23 August 2024. The law transposes Regulation (EU) 2016/679 (GDPR) and repeals Legea nr. 133/2011 on the same date. Article numbers in this notice are articles of Law 195/2024.",
          "We have not appointed a data protection officer. The law requires one only of public authorities and of organisations whose core activity is large-scale monitoring or large-scale processing of special categories of data, and a teaching centre of our size is none of those. A named member of staff handles data-protection requests instead, and the address above reaches them.",
          "There is no register of controllers in the Republic of Moldova and no duty to notify the authority before processing begins. That duty was abolished in 2022 and Law 195/2024 does not reintroduce it. We keep our own record of processing activities, as art. 30 requires.",
        ],
      },
      {
        heading: "What personal data we collect",
        paragraphs: [
          "We collect what a request for a place actually needs, and stop there.",
        ],
        bullets: [
          "Enrolment and contact requests: the learner's name, the learner's age, the name of the parent or legal representative where the learner is a child, a telephone number, an email address, the programme and the times you prefer, and the text of your message.",
          "News about courses: your email address, if you ticked the separate box asking for it.",
          "Technical data that travels with a request: your IP address, your browser and device type, the page you sent the request from, and the time you sent it. The provider that carries the form records these alongside the message.",
          "Cookies: the two small files described in the cookie policy. An online identifier, an IP address included, is personal data under art. 4.",
        ],
      },
      {
        heading: "Why we use your data, and our legal basis",
        paragraphs: [
          "The law requires a legal basis for each purpose rather than one blanket consent. Ours are set out in the table on this page.",
          "Your telephone number and email address are not required by any statute, but without them we cannot offer a place or arrange a placement test. The message, the preferred times and the tick for course news are optional, and leaving them empty changes nothing about how we treat your request.",
          "Where the basis is legitimate interests, those interests are named in the table: keeping an accurate record of what was agreed, defending legal claims, and protecting the website. You may object to any of them at any time.",
          "We do not turn an enquiry into marketing. If you did not ask for news, you will not receive it.",
        ],
        table: {
          columns: ["Purpose", "Data", "Legal basis", "Retention"],
          rows: [
            [
              "Answering an enrolment request and arranging a placement test",
              "Name, age, contact details, programme and schedule preferences, message",
              "Art. 6(1)(b) — steps taken at your request before a contract",
              "12 months from our last exchange if no course follows",
            ],
            [
              "Keeping a record of enquiries and of what was agreed",
              "The request and the correspondence about it",
              "Art. 6(1)(f) — our legitimate interest in accurate records and in defending legal claims",
              "12 months, or the term of the course agreement plus 3 years once a place is taken",
            ],
            [
              "Teaching the course and managing the student's place",
              "Enrolment file, attendance, progress and assessment records",
              "Art. 6(1)(b) — performance of the course agreement",
              "Term of the agreement plus 3 years",
            ],
            [
              "Invoicing, accounting and tax",
              "Payer's details, invoices, payment records",
              "Art. 6(1)(c) — a legal obligation",
              "The period set by accounting and tax law",
            ],
            [
              "Sending news about courses and exam dates",
              "Name and email address",
              "Art. 6(1)(a) — your consent, given by a separate tick",
              "Until you withdraw it",
            ],
            [
              "Loading the map embedded on the contact page",
              "IP address, browser and device data",
              "Art. 6(1)(a) — your consent, given in the cookie banner",
              "12 months for the record of your choice",
            ],
            [
              "Keeping the site available and the inbox free of automated spam",
              "IP address, browser data, timestamps",
              "Art. 6(1)(f) — our legitimate interest in a working site and a usable inbox",
              "The short period our providers keep server and filter logs",
            ],
          ],
        },
      },
      {
        heading: "Children's data and the legal representative",
        paragraphs: [
          "Most of our students are children, so this section matters more than most.",
          "Art. 8 sets Moldova's threshold at 14. Where processing rests on consent and the service is offered directly to a child, the child must be at least 14; below that age the processing is lawful only if the consent is given or authorised by the child's legal representative — reprezentantul legal al copilului. The threshold in the European Union is set by each member state between 13 and 16, and Moldova's 14 does not travel abroad.",
          "The enrolment form does not run on consent. It runs on art. 6(1)(b), the steps we take at your request before a contract, so the age-14 rule does not apply to it. Instead we ask that a parent or legal representative completes the form for any learner under 18, and the form says so where you confirm you have read this notice.",
          "Consent is the basis in one place only: the separate tick that asks for news about courses. There we make reasonable efforts, with the means available to us, to establish that a legal representative gave or authorised it. A child under 14 may not subscribe alone.",
          "We ask for age, not a full date of birth, because age is all a placement decision needs. Please do not write health information, allergies or details of a learning-support need into the message box: that is special-category data under art. 9 and the form is not built to hold it. Tell us by telephone or in person before the course begins and we will record it properly, with your explicit consent and a retention limit.",
        ],
      },
      {
        heading: "Cookies, the map and embedded content",
        paragraphs: [
          "Two cookies run on this site and we set both: one remembers the language you chose, the other stores your cookie choice. Neither follows you to another website.",
          "There are no analytics cookies at present. If we add measurement later it will appear in the banner as its own category, switched off by default, and this notice and the cookie policy will be updated before any script loads.",
          "The map on the contact page comes from an outside provider and is not loaded until you press the control that loads it, because loading it sends your IP address and browser details to that provider. Until then the address is printed in full.",
          "The cookie policy lists every cookie by name, purpose and duration, and explains how to change or withdraw your choice. Withdrawing is as easy as giving.",
        ],
      },
      {
        heading: "Who else handles your data",
        paragraphs: [
          "We do not sell personal data and we do not release it for anyone else's marketing.",
          "Some of the services we use process data on our instructions. The law calls them persoane împuternicite de operator — processors. Each works under a written contract required by art. 28, which limits them to our instructions and binds them to confidentiality, security and to telling us at once if anything goes wrong.",
        ],
        bullets: [
          "The company that hosts this website and serves its pages.",
          "The provider that carries the enrolment form and the email service that delivers it to us.",
          "The provider of the map on the contact page, once you have allowed it to load.",
          "Our accountants, and public authorities where we are legally obliged to respond to them.",
        ],
      },
      {
        // MAINTAINER: this section describes the Web3Forms delivery path
        // (docs/FORM-SETUP.md, option A). If the form is switched to the
        // server route with an EEA email provider (option B), rewrite the
        // second and fourth paragraphs on the day of the change — the
        // transfers to India and the United States stop happening and the
        // text below becomes untrue. Do not print this instruction.
        heading: "Data sent outside Moldova",
        paragraphs: [
          "Transfers to states of the European Economic Area need no special authorisation: art. 44(2) takes them outside the transfer rules altogether. Transfers anywhere else need a safeguard, and this is where ours stand.",
          "The enrolment form is at present delivered through Web3Forms, a service operated from India by Web3Creative. Submissions are processed on Amazon Web Services in the United States, US-East region. Its sub-processors include Cloudflare for edge protection and, for spam filtering, CleanTalk and Akismet, which both receive the sender's IP address and email address. Web3Forms states that submission data has a lifetime of up to 3 years on its systems.",
          "Our hosting provider may also store or serve the site from outside Moldova.",
          "Neither India nor the United States holds an adequacy decision from the Centre. Those transfers therefore rest on standard contractual clauses — clauze standard de protecție a datelor — adopted by the European Commission, which art. 46(2)(c) recognises directly and without further authorisation. Write to the email address in the contact details and we will tell you which safeguards cover which provider and how to obtain a copy.",
          "If we change the service that carries the form, this section is rewritten before the change takes effect and the date at the top of the page moves with it.",
        ],
      },
      {
        heading: "How long we keep your data",
        paragraphs: [
          "The law lets us give either a period or the criterion behind it. Both are given here.",
        ],
        bullets: [
          "Enquiries that lead to no course: 12 months from our last exchange, then deleted. The criterion is one full enrolment cycle, so that we still recognise you if you write again before the next term.",
          "Student records: the term of the course agreement plus 3 years. The criterion is the general limitation period for civil claims.",
          "Accounting and tax records: the period set by accounting and tax law, which is longer than 3 years and which we cannot shorten.",
          "News subscriptions: until you withdraw consent. We then delete the address and keep only the record that you unsubscribed, and when.",
          "The record of your cookie choice: 12 months, after which the banner asks again.",
          "Server logs and spam-filter records: the short period set by the provider holding them. Our current form provider states a lifetime of up to 3 years for submission data.",
        ],
      },
      {
        heading: "Your rights",
        paragraphs: [
          "Law 195/2024 gives you the following rights over your own data. The article numbers are the law's own.",
        ],
        bullets: [
          "Right of access (art. 15): a copy of the data we hold about you, and an account of what we do with it.",
          "Right to rectification (art. 16): correction of anything inaccurate and completion of anything incomplete.",
          "Right to erasure, the right to be forgotten (art. 17): deletion, where we no longer have a reason to hold the data.",
          "Right to restriction of processing (art. 18): we keep the data but stop using it while a dispute about it is settled.",
          "Notification of rectification or erasure (art. 19): we pass the change on to everyone we gave the data to, unless that proves impossible or disproportionate.",
          "Right to data portability (art. 20): the data you gave us, in a structured, commonly used, machine-readable form.",
          "Right to object (art. 21): you may object to processing based on legitimate interests, and to direct marketing at any time and without giving a reason.",
          "Automated individual decision-making, including profiling (art. 22): we take no such decisions, as the section below explains.",
          "Withdrawal of consent (art. 7(3)): where consent is the basis, you may withdraw it whenever you like, as easily as you gave it. Withdrawal does not affect what was lawful beforehand.",
        ],
      },
      {
        heading: "Making a request, and complaining to the Centre",
        paragraphs: [
          "Write to the email address in the contact details at the foot of this page. Say what you want and, if you know it, which right you are using. No particular form of words is needed.",
          "We may ask you to confirm your identity before we disclose anything, so that your data does not reach someone else. A request about a child should come from the parent or legal representative.",
          "We answer within one month. Where a request is complex, or where several arrive together, we may extend that by a further 2 months and will tell you within the first month that we have done so, and why. Every request and every answer is logged, and exercising a right costs you nothing.",
          "If you think we have handled your data badly, tell us first: most things are quicker to put right directly. You are not obliged to, and you may go to the supervisory authority at any point. That authority is the National Centre for Personal Data Protection of the Republic of Moldova — Centrul Național pentru Protecția Datelor cu Caracter Personal. After first mention the law calls it simply the Centre, and so do we.",
        ],
        bullets: [
          "Address: MD-2004, mun. Chișinău, str. Serghei Lazo nr. 48",
          "Telephone: (+373 22) 820 801",
          "Fax: (+373 22) 820 807",
          "Email: centru@datepersonale.md",
          "Website: https://datepersonale.md",
        ],
      },
      {
        heading: "How we keep your data safe",
        paragraphs: [
          "The site is served over an encrypted connection and enrolment requests travel over the same. Access to requests is limited to the staff who deal with them, each under their own account, and every member of staff is bound by a written confidentiality obligation. Paper records are kept locked.",
          "Our contracts with providers require security measures on their side too, and require them to notify us without delay if a breach occurs.",
          "No system is perfectly secure and we will not pretend otherwise. If a breach happens we notify the Centre without undue delay and, where feasible, within 72 hours of becoming aware of it. Where a breach is likely to put your rights at high risk we tell you as well, in plain language. We keep an internal log of every breach, including those that need no notification.",
        ],
      },
      {
        heading: "Automated decisions and profiling",
        paragraphs: [
          "We take no decisions about you by automated means and we build no profiles. A person reads every enrolment request, and a teacher decides placement after a short test and a conversation.",
          "If that ever changes, this section will say so, explain the logic involved and tell you how to ask for a human decision.",
        ],
      },
      {
        heading: "Changes to this notice, and how to reach us",
        paragraphs: [
          "We update this notice when our processing changes and when the law changes. The date at the top of the page is the date of the current version, and a substantial change is announced on the site before it takes effect.",
          "The notice is published in English, Romanian and Russian. Romanian is the state language of the Republic of Moldova, and if the versions differ the Romanian text prevails.",
          "For anything written here, use the email address in the contact details at the foot of this page, or telephone the centre during opening hours.",
        ],
      },
    ],
  },

  cookies: {
    seo: {
      title: "Cookie policy",
      description:
        "Every cookie this site sets, what it is for and how long it lasts. No analytics cookies, no advertising, and the map loads only once you allow it.",
    },
    title: "Cookie policy",
    lead: "This site runs on two cookies, both our own. This page names them, says what they do and explains how to change your choice.",
    sections: [
      {
        heading: "What this policy covers",
        paragraphs: [
          "A cookie is a small file a website asks your browser to keep, so that something can be remembered between pages or between visits. Similar techniques, such as data held in local storage, are covered by the same rules and by this page.",
          "The list below is complete. If it ever grows, this page changes before the new cookie is set, and the banner asks you again.",
          "Anything we do with the data behind these cookies is described in the privacy notice.",
        ],
      },
      {
        heading: "The cookies this site sets",
        table: {
          columns: ["Cookie", "Purpose", "Duration", "Set by"],
          rows: [
            [
              "tbi_locale",
              "Remembers the language you chose, so the site opens in it next time.",
              "12 months",
              "This site (first party)",
            ],
            [
              "tbi_consent",
              "Stores your cookie choice, a refusal included, together with the date you made it.",
              "12 months",
              "This site (first party)",
            ],
          ],
        },
        paragraphs: [
          "Both cookies are first-party, set by this site and read by nobody else. Both are strictly necessary in the sense of art. 116(6) of Legea nr. 72/2025: they do only what you asked the site to do. Neither is used to identify you or to track you anywhere.",
          "One consequence is worth stating plainly: if you refuse everything, tbi_consent still has to exist, because a refusal is only useful if the site remembers it.",
        ],
      },
      {
        heading: "What this site does not use",
        paragraphs: [
          "There are no analytics cookies here at present. We do not measure your visit, we set no advertising cookies, we run no social-media pixels, and nothing on these pages follows you to another website.",
          "If measurement is added later it will appear in the banner as its own category, switched off until you switch it on, and it will be named in the table on this page before the first script runs.",
          "No box in the banner is ticked in advance. Reject all sits beside Accept all, the same size, on the same screen, one click away.",
        ],
      },
      {
        heading: "The map on the contact page",
        paragraphs: [
          "The contact page can show a map. It is embedded from an outside provider, at present OpenStreetMap, and it stays unloaded until you press the control that loads it.",
          "Loading it sends your IP address and your browser details to that provider, which is the reason we ask first. The embed sets no cookie of its own on this site.",
          "Refusing it loses you nothing. The full address is printed on the page, and a link opens the same place in whichever map application you already use.",
        ],
      },
      {
        heading: "Changing or withdrawing your choice",
        paragraphs: [
          "Use the cookie settings link in the footer. It reopens the banner with your current choices shown, and you can change any of them there. Withdrawing consent is as easy as giving it, which is what art. 7(3) of Legea nr. 195/2024 requires.",
          "You can also delete or block cookies in your browser settings. Block these two and the site will not remember your language and will ask about cookies on every visit; nothing else changes.",
          "The date of your choice and the version of the banner shown to you are stored inside the tbi_consent cookie itself, on your own device. We keep no copy on our own systems, so clearing that cookie erases the record and the banner asks you again.",
        ],
      },
      {
        heading: "The law behind this page",
        paragraphs: [
          "Storing or reading information on your device is governed by art. 116 of Legea nr. 72/2025 privind comunicațiile electronice, in force since 1 January 2026, read together with Legea nr. 195/2024 privind protecția datelor cu caracter personal, in force from 23 August 2026.",
          "Where a cookie processes personal data — and an online identifier such as an IP address is personal data — a legal basis under art. 6 of Law 195/2024 is needed. For anything that is not strictly necessary, that basis is your consent, freely given and unambiguous.",
          "The privacy notice covers everything else: what we collect, how long we keep it, your rights, and how to complain to the National Centre for Personal Data Protection.",
        ],
      },
    ],
  },

  terms: {
    seo: {
      title: "Terms and conditions",
      description:
        "The terms on which you use this website and request a place at The Best Indeed English Centre, and how they sit alongside the signed course agreement.",
    },
    title: "Terms and conditions",
    lead: "These terms cover the use of this website and the request for a place. The course itself is governed by the agreement you sign before it starts.",
    sections: [
      {
        heading: "What these terms cover",
        paragraphs: [
          "By using this website you accept the terms on this page. If you do not accept them, please do not use the site.",
          "Enrolment is a separate matter. Every student, or the parent or legal representative of a student under 18, signs a course agreement with the centre before teaching begins. That agreement sets the fee, the schedule, the rules on attendance and the conditions for ending the course. Where anything on this website differs from the signed agreement, the agreement prevails.",
          "We keep the site accurate and current, and we correct mistakes when we find them. Even so, timetables, group sizes, levels and dates change during a term; the version confirmed to you in writing is the one that counts. Nothing on this site is an offer capable of acceptance on its own.",
        ],
      },
      {
        heading: "Requesting a place",
        paragraphs: [
          "The form on this site is a request, not a booking. Sending it puts you on our list to contact; it does not reserve a seat and it creates no obligation on either side.",
          "A request for a learner under 18 should be sent by a parent or legal representative.",
          "What normally follows is a telephone call, a short placement test and a written confirmation of the group, the level and the start date. A place is held once the course agreement is signed and the terms of payment in it are met.",
          "Groups have a limited size. Where a group is full we say so and offer the nearest alternative rather than adding places to a room that cannot take them.",
        ],
      },
      {
        heading: "Fees and payment",
        paragraphs: [
          "We do not publish prices on this site, because they depend on the programme, the number of hours and the format. Ask us and we will tell you the fee for the course you are considering, in writing, before you commit to anything.",
          "The fee, what it includes, the payment dates, any instalment arrangement, and the rules on refunds and cancellations are all set out in the course agreement. Read it before you sign it and ask us about anything that is unclear; we would rather answer a question twice than have a term start on a misunderstanding.",
          "Coursebooks and examination fees are separate items unless the agreement says otherwise. Examination fees are set by the authorised exam centre or the awarding organisation, not by us, and we pass them on unchanged.",
        ],
      },
      {
        heading: "Attendance and missed lessons",
        paragraphs: [
          "Teachers keep an attendance register for every group. It is how we notice that a student has fallen behind, and it is what a parent is shown when they ask.",
          "Tell us in advance when a student cannot attend, by telephone or by message to the centre. A teacher can then prepare the work to be caught up rather than improvise it at the next lesson.",
          "Whether a missed lesson can be made up, and on what terms, is set out in the course agreement. We do not apply a rule that is not written there.",
        ],
      },
      {
        heading: "Conduct at the centre",
        paragraphs: [
          "We expect courtesy towards teachers, staff and other students, care for the rooms and the equipment, and compliance with the safety instructions given by staff.",
          "Photography and filming inside the centre need permission, because other people's children are in the room.",
          "Where behaviour makes teaching impossible or puts somebody at risk, we speak to the student and, for a child, to the parent or legal representative first. The circumstances in which a place can be ended, and what happens to the fee if it is, are set out in the course agreement.",
        ],
      },
      {
        heading: "Course materials and copyright",
        paragraphs: [
          "The teaching materials our teachers write — worksheets, tests, lesson plans, the sequence of the course itself — belong to the centre. Students may use them for their own study for as long as they wish. Copying them for other people, publishing them, or using them in another school or for commercial purposes is not permitted without our written agreement.",
          "Published coursebooks, examination papers and practice tests belong to their publishers and to the organisations that set the exams. We use them under the licences that apply and ask students to do the same.",
          "The text, photographs, design and code of this website belong to the centre or to the people who made them for us. You may read the site, print a page for your own use and link to it. Anything beyond that needs our permission.",
        ],
      },
      {
        heading: "Changes to courses and the timetable",
        paragraphs: [
          "Groups sometimes move. A teacher may be replaced by another teacher of the centre through illness or a change in staff, a lesson may be moved to a different room, and a group may be merged or rescheduled where numbers make it necessary.",
          "We give as much notice as the situation allows and, where a change makes a group unworkable for a student, we look for a place in another group at the same level.",
          "Public holidays and the term dates for each programme are published on the timetable page. Any lesson lost to a holiday is handled as the course agreement provides.",
        ],
      },
      {
        heading: "What we can and cannot promise",
        paragraphs: [
          "We promise the teaching: qualified teachers, prepared lessons, small groups, honest reporting of progress, and rooms fit to study in.",
          "We cannot promise a result. No school can. We are a preparation centre: we prepare candidates for Cambridge English exams and enter them through an authorised exam centre, and that centre — not this one — sets the exam dates, the fees and the rules of the exam day. We do not set, mark, award or issue any certificate, and no member of our staff can guarantee a grade, a score, a pass, or a date by which a level will be reached. The same is true of the baccalaureate and of TOEFL.",
          "Results in a mock or practice test are a diagnostic tool. They show where a candidate is strong and where the work has to go; they are not a prediction of the mark on the day.",
          "We are liable for loss caused by our own failure to provide the teaching we agreed to provide. We are not liable for the decisions of examination boards, universities or public authorities, for personal property left at the centre, or for interruptions to this website. Nothing here limits liability that the law does not allow us to limit.",
        ],
      },
      {
        heading: "Governing law, complaints and contact",
        paragraphs: [
          "These terms are governed by the law of the Republic of Moldova, and any dispute that cannot be settled between us falls to the competent courts of the Republic of Moldova.",
          "If something has gone wrong, tell us. Write to the address in the contact details at the foot of this page, or ask to speak to the founder. We answer complaints in writing, and we would rather hear about a problem in week 2 than at the end of the course.",
          "How we handle personal data is set out separately in the privacy notice and the cookie policy.",
          "These terms are published in English, Romanian and Russian. Romanian is the state language of the Republic of Moldova, and if the versions differ the Romanian text prevails.",
        ],
      },
    ],
  },
};
