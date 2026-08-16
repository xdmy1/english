import type { TeamDict } from "../../types";

export const team: TeamDict = {
  seo: {
    title: "Profesorii noștri",
    description:
      "Corpul profesoral al The Best Indeed English Centre din Chișinău: cine predă fiecare program și ce cere centrul unui profesor înainte de a intra la grupă.",
  },

  hero: {
    eyebrow: "Echipa noastră",
    title: "Oamenii care predau aici",
    lead: "Fiecare grupă este predată de un angajat al centrului, care lucrează după un singur curriculum și după aceleași standarde.",
  },

  founder: {
    eyebrow: "Fondatoare",
    role: "Fondatoare și director academic",
    paragraphs: [
      "Centrul este condus de fondatoarea sa, care poartă și răspunderea academică pentru el. Fiecare program, fiecare angajare și fiecare set de materiale de curs sunt aprobate înainte de a ajunge într-o sală de clasă, iar în orar nu intră nimic din ceea ce nu a citit ea.",
      "Modul în care este condus centrul decurge de aici. Profesorii lucrează după un plan comun, nu după preferințe personale. Lecțiile sunt asistate după un ciclu fix. Profesorul care preia o grupă moștenește aceleași materiale și aceeași evidență a materiei parcurse de fiecare cursant.",
      "Părinții au de-a face cu centrul, nu cu o singură persoană. Cererea de înscriere trimisă de pe acest site ajunge în căsuța poștală a fondatoarei. Întrebările privind progresul unui copil, schimbarea grupei sau o dificultate la ore primesc răspuns din partea secretariatului, în loc să rămână doar între părinte și profesor.",
    ],
    // Attributed on the page to the founder. Must be signed off by her before launch.
    quote:
      "Un centru se judecă după ceea ce pot face cursanții săi atunci când niciun profesor nu este în sală. Fiecare decizie pe care o luăm aici se măsoară după acest criteriu.",
  },

  teachers: {
    header: {
      eyebrow: "Corp profesoral",
      title: "Profesorii",
      lead: "Fiecare profesor lucrează cu un set bine definit de programe și niveluri, astfel încât o grupă rămâne cu cineva care cunoaște programa pe care o parcurge.",
    },
    employmentNote:
      "Toți cei enumerați aici sunt angajați ai centrului, cu contract în formă legală și cu înregistrarea și actele care decurg din el. Nu completăm orarul cu profesori colaboratori care își împart săptămâna între mai multe școli.",
    sinceLabel: "Predă aici din",
  },

  // PLACEHOLDER CONTENT. Roles and bios describe the post, not the person.
  // Replace each entry once the founder supplies real names and biographies.
  members: {
    founder: {
      role: "Fondatoare și director academic",
      bio: "Conduce latura academică a centrului, de la planurile de curs și angajarea profesorilor până la repartizarea fiecărui cursant nou.",
    },
    teacher1: {
      role: "Profesor, Juniori",
      bio: "Predă la grupele de Juniori, de la Pre A1 la A2, atât în orarul din timpul săptămânii, cât și în cel de weekend.",
    },
    teacher2: {
      role: "Profesor, Juniori și Adolescenți",
      bio: "Predă la grupele de Juniori și de Adolescenți de la nivelurile inferioare, precum și la grupa de pregătire Cambridge pentru A2.",
    },
    teacher3: {
      role: "Profesor senior, Adolescenți și Adulți",
      bio: "Predă la grupele de Adolescenți de nivel B1 și la grupele de Adulți și de pregătire Cambridge de la nivelurile superioare.",
    },
    teacher4: {
      role: "Profesor senior, pregătire Cambridge și TOEFL",
      bio: "Predă la grupele de pregătire Cambridge de nivel B2 și C1 și la cursul TOEFL iBT și organizează simulările în laboratorul de calculatoare.",
    },
    teacher5: {
      role: "Profesor, Adulți",
      bio: "Predă la grupele de Adulți, de la începători până la nivelurile folosite la locul de muncă și la interviuri.",
    },
    teacher6: {
      role: "Profesor, pregătire pentru BAC",
      bio: "Predă curriculumul de BAC și cursul de pregătire pentru proba de BAC, destinate elevilor de liceu.",
    },
  },

  standards: {
    header: {
      eyebrow: "Standarde",
      title: "Ce cerem înainte ca un profesor să intre la grupă",
      lead: "Aceleași condiții se aplică tuturor celor din statul de personal, indiferent de grupa de vârstă sau de nivelul la care predau.",
    },
    items: [
      {
        title: "O calificare pe care am văzut-o",
        body: "Nimeni nu predă aici fără o calificare recunoscută în predarea limbii engleze, iar certificatul îl vedem înainte de a face o ofertă. Calificările aparțin fiecărui profesor în parte, nu centrului, și nu reprezintă o recunoaștere a cursurilor noastre din partea vreunei instituții de examinare.",
      },
      {
        title: "Asistență la lecție înainte de angajare",
        body: "Candidatul predă o lecție întreagă unei grupe reale, în prezența directorului academic, înainte de a se semna ceva. Asistențele continuă și după aceea, după un ciclu fix, iar observațiile se discută cu profesorul în aceeași săptămână.",
      },
      {
        title: "Un singur curriculum, comun",
        body: "Profesorii lucrează după planurile de curs și materialele proprii ale centrului, în loc să improvizeze o programă a lor. Cursantul care trece de la o grupă la alta găsește aceeași succesiune de conținuturi și același mod de a consemna progresul.",
      },
      {
        title: "Formare care continuă",
        body: "Cadrele didactice se întâlnesc pe parcursul anului pentru a analiza materialele, formatele de examen și probele susținute de candidații lor. Când Cambridge English sau ETS schimbă un format, modificarea este parcursă în colectiv înainte de a ajunge într-o sală de clasă.",
      },
    ],
  },

  join: {
    title: "Dacă predați limba engleză",
    body: "Angajăm profesori atunci când se deschide o grupă nouă, nu într-o sesiune anuală, așa că citim candidaturile pe tot parcursul anului. Scrieți-ne despre calificarea dumneavoastră, vârstele și nivelurile la care ați predat și orele pe care le puteți acoperi.",
    cta: "Scrieți-ne",
  },

  cta: {
    title: "Cunoașteți profesorul înainte de înscriere",
    body: "Cereți să stați de vorbă cu cel care ar prelua grupa. Găsim un interval în afara orelor sale de predare, întrebați ce doriți, iar decizia o luați după aceea.",
    primary: "Trimiteți o cerere de înscriere",
    secondary: "Contactați centrul",
  },
};
