import type { ContactDict } from "../../types";

export const contact: ContactDict = {
  seo: {
    title: "Contact",
    description:
      "How to reach The Best Indeed English Centre in Chișinău: telephone, email, opening hours, a map you load only if you want it, and the enrolment request form.",
  },

  hero: {
    eyebrow: "Contact",
    title: "How to reach us",
    lead: "Call, write, or send a request from this page. A member of staff reads everything that arrives, and enrolment questions go to the founder.",
  },

  cards: {
    phone: {
      label: "Telephone",
      note: "Answered by the office during opening hours. If we are in a lesson, leave a message and we will ring back the same day.",
    },
    email: {
      label: "Email",
      note: "Read every working day. A question about levels or exam dates may take longer to answer than one about times, because we check before we write.",
    },
    address: {
      label: "Address",
      note: "Tell us when you would like to come and we will confirm the entrance and a time when somebody can meet you at it.",
    },
    hours: {
      label: "Opening hours",
      note: "The office is open outside lesson times as well, so you can come in the morning to enrol or to talk through the options.",
    },
  },

  closed: "Closed",

  map: {
    title: "Finding the centre",
    // The provider named here must match the embed used in ConsentMap.tsx.
    body: "The map is embedded from OpenStreetMap. Loading it connects your browser to a third-party service, which receives your IP address and device details. You can open the location in a new tab instead and leave the map switched off.",
    accept: "Load the map",
    open: "Open in Google Maps",
    provider: "OpenStreetMap",
  },

  form: {
    header: {
      eyebrow: "Enrolment",
      title: "Send a request",
      lead: "The same form as on the admissions page, so you do not have to leave this one. It takes about two minutes and commits you to nothing.",
    },
  },

  faq: {
    header: {
      eyebrow: "Common questions",
      title: "Before you get in touch",
      lead: "The questions parents and adult students ask most often when they first write to us.",
    },
    items: [
      {
        q: "Can I visit before enrolling?",
        a: "Yes, and we would rather you did. Arrange a time by telephone or email and we will show you the rooms, explain how the groups are formed and answer questions. Nothing is signed on the day.",
      },
      {
        q: "Do you answer messages at weekends?",
        a: "On Saturday, yes, during office hours. A message that arrives while the centre is closed is read at the start of the next working day.",
      },
      {
        q: "Which language will you reply in?",
        a: "Write in English, Romanian or Russian and we reply in the same language. This site is published in all three.",
      },
      {
        q: "Can I speak to a teacher rather than the office?",
        a: "Yes. Say so when you write and we will arrange a call or a short meeting with the teacher who would take the group, at a time outside their lessons.",
      },
    ],
  },
};
