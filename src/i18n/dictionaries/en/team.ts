import type { TeamDict } from "../../types";

export const team: TeamDict = {
  seo: {
    title: "Our teachers",
    description:
      "The teaching staff of The Best Indeed English Centre in Chișinău: who teaches which programmes, and what the centre requires of a teacher before a class begins.",
  },

  hero: {
    eyebrow: "Our team",
    title: "The people who teach here",
    lead: "Every group is taught by a member of our own staff, working to one curriculum and to the same standards.",
  },

  founder: {
    eyebrow: "Founder",
    role: "Founder and academic director",
    paragraphs: [
      "The centre is directed by its founder, who also carries the academic responsibility for it. Every programme, every appointment and every set of course materials is approved before it reaches a classroom, and nothing goes on the timetable that she has not read.",
      "How the centre is run follows from that. Teachers work to one shared plan rather than to private preference. Lessons are observed on a fixed cycle. A teacher who takes over a group inherits the same materials and the same record of what each student has already covered.",
      "Parents deal with the centre, not with one individual. An enrolment request sent from this site arrives in the founder's inbox. Questions about a child's progress, a change of group or a difficulty in class are answered by the office rather than left between parent and teacher.",
    ],
    // Attributed on the page to the founder. Must be signed off by her before launch.
    quote:
      "A centre is judged by what its students can do when no teacher is in the room. Every decision we take here is measured against that.",
  },

  teachers: {
    header: {
      eyebrow: "Teaching staff",
      title: "The teachers",
      lead: "Each teacher works with a defined set of programmes and levels, so a group stays with someone who knows the syllabus it is on.",
    },
    employmentNote:
      "Everyone listed here is employed by the centre on a formal contract, with the registration and the paperwork that go with it. We do not fill the timetable with visiting tutors who divide the week between several schools.",
    sinceLabel: "Teaching here since",
  },

  // PLACEHOLDER CONTENT. Roles and bios describe the post, not the person.
  // Replace each entry once the founder supplies real names and biographies.
  members: {
    founder: {
      role: "Founder and academic director",
      bio: "Directs the academic side of the centre, from the course plans and the appointment of teachers to the placement of each new student.",
    },
    teacher1: {
      role: "Teacher, Juniors",
      bio: "Teaches the Juniors groups from Pre A1 to A2, on both the weekday and the weekend timetable.",
    },
    teacher2: {
      role: "Teacher, Juniors and Teens",
      bio: "Teaches Juniors and Teens groups at the lower levels, together with the A2 Cambridge preparation class.",
    },
    teacher3: {
      role: "Senior teacher, Teens and Adults",
      bio: "Teaches Teens at B1 and the upper-level Adults and Cambridge preparation groups.",
    },
    teacher4: {
      role: "Senior teacher, Cambridge and TOEFL preparation",
      bio: "Teaches the B2 and C1 Cambridge preparation groups and the TOEFL iBT course, and runs the mock papers in the computer lab.",
    },
    teacher5: {
      role: "Teacher, Adults",
      bio: "Teaches the Adults groups, from beginners to the levels used at work and in interviews.",
    },
    teacher6: {
      role: "Teacher, BAC preparation",
      bio: "Teaches the BAC curriculum and the BAC examination course for upper-secondary students.",
    },
  },

  standards: {
    header: {
      eyebrow: "Standards",
      title: "What we require before a teacher takes a class",
      lead: "The same conditions apply to everyone on the staff list, whatever the age group or the level they teach.",
    },
    items: [
      {
        title: "A qualification we have seen",
        body: "No one teaches here without a recognised qualification in English language teaching, and we see the certificate before an offer is made. Qualifications are held individually by each teacher, not by the centre, and they are not an endorsement of our courses by any examination board.",
      },
      {
        title: "Observation before appointment",
        body: "A candidate teaches a full lesson to a real group, with the academic director present, before anything is signed. Observation continues afterwards on a fixed cycle, and the notes are discussed with the teacher the same week.",
      },
      {
        title: "One curriculum, shared",
        body: "Teachers work from the centre's own course plans and materials rather than improvising a syllabus of their own. A student moving between groups finds the same sequence of content and the same way of recording progress.",
      },
      {
        title: "Training that continues",
        body: "Staff meet through the year to review materials, exam formats and the papers their candidates have sat. When Cambridge English or ETS changes a format, the change is worked through as a staff group before it reaches a classroom.",
      },
    ],
  },

  join: {
    title: "If you teach English",
    body: "We appoint teachers when a new group opens rather than in an annual round, so applications are read all year. Write to us with your qualification, the ages and levels you have taught, and the hours you can cover.",
    cta: "Write to us",
  },

  cta: {
    title: "Meet the teacher before you enrol",
    body: "Ask to speak to whoever would take the group. We find a slot outside their teaching hours, you ask what you like, and you decide afterwards.",
    primary: "Send an enrolment request",
    secondary: "Contact the centre",
  },
};
