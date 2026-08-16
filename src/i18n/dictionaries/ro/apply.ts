import type { ApplyDict } from "../../types";

export const apply: ApplyDict = {
  seo: {
    title: "Solicitați un loc",
    description:
      "Trimiteți o cerere de înscriere către The Best Indeed English Centre din Chișinău. Un formular scurt, citit de un profesor, cu răspuns prin telefon.",
  },

  hero: {
    eyebrow: "Înscrieri",
    title: "Solicitați un loc",
    lead: "Nimic din această pagină nu rezervă un loc și nu cere bani. Formularul deschide o discuție: dumneavoastră descrieți cursantul, iar noi răspundem cu ceea ce credem că i se potrivește și cu ce ar presupune.",
  },

  form: {
    sections: {
      learner: "Pentru cine este cursul",
      contact: "Cum vă contactăm",
      course: "Ce căutați",
    },

    fields: {
      learnerType: {
        label: "Cine completează acest formular",
      },
      studentName: {
        label: "Numele cursantului",
        placeholder: "Nume și prenume",
        // Shown only when the visitor has chosen "I am enrolling a child".
        hint: "Indicați aici numele copilului. Numele dumneavoastră se trece în câmpul de mai jos.",
      },
      studentAge: {
        label: "Vârsta",
        placeholder: "De exemplu, 11",
        hint: "Este suficientă vârsta în ani. Nu avem nevoie de data nașterii.",
      },
      parentName: {
        label: "Părinte sau reprezentant legal",
        placeholder: "Nume și prenume",
        hint: "Persoana cu care vom discuta despre înscriere.",
      },
      phone: {
        label: "Telefon",
        placeholder: "+373 XX XXX XXX",
        hint: "Format moldovenesc sau internațional, cu prefixul de țară. De obicei sunăm, nu scriem, așa că vă rugăm să verificați cifrele.",
      },
      email: {
        label: "E-mail",
        placeholder: "name@example.com",
        hint: "Confirmările scrise și orarul ajung la această adresă.",
      },
      programme: {
        label: "Program",
        // Doubles as the first option in the select: the "not sure yet" answer.
        placeholder: "Încă nu știu sigur",
        hint: "Alegeți varianta cea mai apropiată. O confirmăm împreună cu dumneavoastră înainte de prima lecție.",
      },
      level: {
        label: "Nivelul actual",
        hint: "Un test de nivel scurt, scris și oral, stabilește nivelul, așa că o estimare este suficientă.",
      },
      preferredSchedule: {
        label: "Intervale preferate",
        hint: "Spuneți-ne ce vă convine de obicei. Comparăm cu grupele care funcționează în acest trimestru.",
      },
      message: {
        label: "Altceva ce ar trebui să știm",
        placeholder:
          "Întrebări despre grupe, orar sau examene. Vă rugăm să nu includeți aici informații despre sănătate, date medicale sau nevoi speciale. Vom întreba despre sprijinul de care are nevoie cursantul atunci când vom sta de vorbă.",
      },
    },

    learnerType: {
      self: "Sunt cursantul",
      child: "Înscriu un copil",
    },

    levelUnknown: "Încă nu îmi cunosc nivelul",

    schedulePreference: {
      weekdayAfternoon: "După-amiezi (luni–vineri)",
      weekdayEvening: "Seri (luni–vineri)",
      weekend: "Weekend",
      flexible: "Flexibil, propuneți o oră",
    },

    required: "Obligatoriu",
    optional: "Opțional",

    // {privacy} is replaced with a link to the privacy notice.
    consent:
      "Am citit {privacy} și înțeleg cum prelucrează centrul datele din acest formular. Cererea privind un copil trebuie completată de un părinte sau de un reprezentant legal.",

    marketing:
      "Doresc să primesc ocazional noutăți despre grupe noi, zile ale porților deschise și sesiuni de examen. Aceasta este separată de cererea de mai sus, iar dacă nu bifați, nu se schimbă nimic în felul în care vă răspundem.",

    submit: "Trimiteți cererea",
    submitting: "Se trimite",
  },

  validation: {
    required: "Vă rugăm să completați acest câmp.",
    email: "Vă rugăm să introduceți o adresă de e-mail de forma name@example.com.",
    phone: "Vă rugăm să introduceți un număr de telefon la care vă putem suna, cu prefixul de țară.",
    consent: "Vă rugăm să confirmați că ați citit politica de confidențialitate.",
    minLength: "Vă rugăm să scrieți cel puțin {n} caractere.",
    age: "Vă rugăm să introduceți vârsta în ani întregi, cu cifre.",
    summary:
      "Cererea nu a fost trimisă. Vă rugăm să verificați câmpurile marcate mai jos și să încercați din nou.",
  },

  success: {
    title: "Cererea dumneavoastră a fost trimisă",
    body: "A ajuns în căsuța poștală pentru înscrieri, unde o citește un profesor. De regulă sunăm mai întâi, iar dacă nu vă găsim la numărul indicat, vă scriem la adresa de e-mail.",
    again: "Trimiteți o altă cerere",
  },

  failure: {
    title: "Cererea nu a putut fi trimisă",
    body: "Ceva nu a funcționat între această pagină și căsuța noastră poștală, așa că nu a ajuns nimic la noi. Încercați din nou peste un moment sau sunați-ne la numărul afișat în partea de sus a paginii, iar noi preluăm datele prin telefon.",
    retry: "Încercați din nou",
  },

  aside: {
    title: "Ce urmează",
    steps: [
      {
        title: "O citim",
        body: "Fiecare cerere ajunge în căsuța poștală pentru înscrieri și este citită de un om. Nimic de aici nu primește răspuns automat.",
      },
      {
        title: "Vă sunăm",
        body: "Parcurgem împreună vârsta, nivelul și intervalele care vă convin și vă spunem care grupe mai au locuri.",
      },
      {
        title: "Întâi nivelul, apoi locul",
        body: "Un test de nivel scurt confirmă nivelul. După ce grupa este stabilită de comun acord, rezervăm locul și trimitem actele de înscriere.",
      },
    ],
    responseTime: "Ne propunem să dăm primul răspuns în termen de o zi lucrătoare.",
    privacyTitle: "Ce facem cu aceste date",
    privacyBody:
      "Datele ajung în căsuța poștală pentru înscrieri a centrului și sunt prelucrate exclusiv pentru a răspunde la această cerere, a programa un test de nivel și a pregăti o înscriere. Cererile care nu se finalizează cu un loc se șterg în termen de 12 luni; politica de confidențialitate prezintă detaliile complete și drepturile dumneavoastră.",
    callTitle: "Preferați să vorbiți cu cineva",
    callBody:
      "Secretariatul răspunde la telefon în timpul programului, iar întrebările despre niveluri, orar și datele examenelor se lămuresc deseori mai repede prin viu grai. Numărul și programul de lucru se află în partea de sus a paginii și în subsolul ei.",
  },
};
