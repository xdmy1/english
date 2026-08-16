import type { ApplyDict } from "../../types";

export const apply: ApplyDict = {
  seo: {
    title: "Request a place",
    description:
      "Send an enrolment request to The Best Indeed English Centre in Chișinău. One short form, read by a teacher, answered by telephone.",
  },

  hero: {
    eyebrow: "Admissions",
    title: "Request a place",
    lead: "Nothing on this page books a seat or asks for money. It opens a conversation: you describe the learner, we answer with what we think fits and what it would involve.",
  },

  form: {
    sections: {
      learner: "Who the course is for",
      contact: "How we reach you",
      course: "What you are looking for",
    },

    fields: {
      learnerType: {
        label: "Who is filling in this form",
      },
      studentName: {
        label: "Student's name",
        placeholder: "First and family name",
        // Shown only when the visitor has chosen "I am enrolling a child".
        hint: "Give the child's name here. Your own name goes in the field below.",
      },
      studentAge: {
        label: "Age",
        placeholder: "For example, 11",
        hint: "Age in years is enough. We do not need a date of birth.",
      },
      parentName: {
        label: "Parent or legal representative",
        placeholder: "First and family name",
        hint: "The person we will speak to about the enrolment.",
      },
      phone: {
        label: "Telephone",
        placeholder: "+373 XX XXX XXX",
        hint: "Moldovan or international format, with the country code. We usually call rather than write, so please check the digits.",
      },
      email: {
        label: "Email",
        placeholder: "name@example.com",
        hint: "Written confirmations and the timetable go to this address.",
      },
      programme: {
        label: "Programme",
        // Doubles as the first option in the select: the "not sure yet" answer.
        placeholder: "I am not sure yet",
        hint: "Choose the closest one. We will confirm it with you before the first lesson.",
      },
      level: {
        label: "Current level",
        hint: "A short written and spoken placement test settles the level, so an estimate is fine.",
      },
      preferredSchedule: {
        label: "Preferred times",
        hint: "Tell us what usually works. We match it against the groups running this term.",
      },
      message: {
        label: "Anything else we should know",
        placeholder:
          "Questions about the groups, the timetable or the exams. Please leave out health, medical and special-needs details here. We will ask about any support the student needs when we speak.",
      },
    },

    learnerType: {
      self: "I am the student",
      child: "I am enrolling a child",
    },

    levelUnknown: "I do not know my level yet",

    schedulePreference: {
      weekdayAfternoon: "Weekday afternoons",
      weekdayEvening: "Weekday evenings",
      weekend: "Weekends",
      flexible: "Flexible, suggest a time",
    },

    required: "Required",
    optional: "Optional",

    // {privacy} is replaced with a link to the privacy notice.
    consent:
      "I have read the {privacy} and understand how the centre handles the details in this form. A request concerning a child should be completed by a parent or legal representative.",

    marketing:
      "Send me occasional news about new groups, open days and exam sessions. This is separate from the request above, and leaving it unticked changes nothing about how we answer you.",

    submit: "Send the request",
    submitting: "Sending",
  },

  validation: {
    required: "Please fill in this field.",
    email: "Please enter an email address in the form name@example.com.",
    phone: "Please enter a telephone number we can call, with the country code.",
    consent: "Please confirm that you have read the privacy notice.",
    minLength: "Please write at least {n} characters.",
    age: "Please enter the age in whole years, using digits.",
    summary:
      "The request was not sent. Please check the fields marked below and try again.",
  },

  success: {
    title: "Your request has been sent",
    body: "It has arrived in the admissions inbox, where a teacher reads it. We normally telephone first, and if we cannot reach you on the number you gave, we write to the address instead.",
    again: "Send another request",
  },

  failure: {
    title: "The request did not send",
    body: "Something failed between this page and our inbox, so nothing reached us. Try again in a moment, or call us on the number in the header and we will take the details over the telephone.",
    retry: "Try again",
  },

  aside: {
    title: "What happens next",
    steps: [
      {
        title: "We read it",
        body: "Every request goes to the admissions inbox and is read by a person. Nothing here is answered automatically.",
      },
      {
        title: "We call you",
        body: "We go through the age, the level and the times that suit, and tell you which groups still have places.",
      },
      {
        title: "Placement, then a place",
        body: "A short placement test confirms the level. Once the group is agreed we hold the place and send the enrolment papers.",
      },
    ],
    responseTime: "One working day is the target for a first reply.",
    privacyTitle: "What we do with these details",
    privacyBody:
      "The details reach the centre's admissions inbox and are used only to answer this request, arrange a placement test and prepare an enrolment. Requests that do not lead to a place are deleted within 12 months; the privacy notice sets out the full detail and your rights.",
    callTitle: "Prefer to speak to someone",
    callBody:
      "The office answers the telephone during opening hours, and questions about levels, timetables and exam dates are often quicker by voice. The number and the opening hours are in the header and in the footer.",
  },
};
