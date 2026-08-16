import type { ScheduleDict } from "../../types";

export const schedule: ScheduleDict = {
  seo: {
    title: "Orar",
    description:
      "Orarul săptămânal al orelor la The Best Indeed English Centre din Chișinău. Fiecare grupă, cu nivelul, profesorul și sala ei, cu filtrare după zi, program sau profesor.",
  },

  hero: {
    eyebrow: "Orar",
    title: "Săptămâna de curs",
    lead: "Un singur tabel pentru tot centrul: fiecare grupă, profesorul și sala ei. Cursanții își planifică săptămâna după el, iar profesorii își planifică trimestrul.",
  },

  sampleNotice: {
    title: "Aceasta este o săptămână orientativă",
    body: "Rândurile de mai jos au caracter ilustrativ. Ele arată cum este structurat orarul, nu grupele care se desfășoară acum; orarul pentru trimestrul următor este publicat pe această pagină înainte de începerea trimestrului.",
  },

  term: {
    // Rendered after the term name: "Autumn term · 15 September 2026 – 20 December 2026".
    label: "{start} – {end}",
    autumn: "Trimestrul de toamnă",
    spring: "Trimestrul de primăvară",
    summer: "Trimestrul de vară",
  },

  filters: {
    title: "Filtrați orarul",
    all: "Toate",
    programme: "Program",
    level: "Nivel",
    teacher: "Profesor",
    room: "Sală",
    day: "Zi",
    reset: "Ștergeți filtrele",
    resultCount: "Se afișează {count} din {total} ore",
    empty: "Nicio oră nu corespunde acestor filtre.",
    emptyHint:
      "Eliminați un filtru pentru a lărgi căutarea sau întrebați-ne despre o grupă la acel nivel.",
  },

  views: {
    label: "Vizualizare",
    week: "Săptămână",
    list: "Listă",
  },

  days: {
    mon: { long: "Luni", short: "Lun" },
    tue: { long: "Marți", short: "Mar" },
    wed: { long: "Miercuri", short: "Mie" },
    thu: { long: "Joi", short: "Joi" },
    fri: { long: "Vineri", short: "Vin" },
    sat: { long: "Sâmbătă", short: "Sâm" },
  },

  rooms: {
    r1: { name: "Sala 1", short: "S1" },
    r2: { name: "Sala 2", short: "S2" },
    r3: { name: "Sala 3", short: "S3" },
    r4: { name: "Sala 4", short: "S4" },
    lab: { name: "Laborator de calculatoare", short: "Lab" },
    library: { name: "Bibliotecă", short: "Bibl." },
  },

  columns: {
    time: "Ora",
    group: "Grupa",
    programme: "Program",
    level: "Nivel",
    teacher: "Profesor",
    room: "Sala",
  },

  legend: {
    title: "Cum se citește un rând",
    items: [
      {
        title: "Codul grupei",
        body: "Literele indică programul, partea din mijloc nivelul CEFR (CECRL), iar cifrele numărul grupei. J-A2-02 este a doua grupă de nivel A2 din programul pentru juniori.",
      },
      {
        title: "Eticheta de nivel",
        body: "Fiecare grupă lucrează la un singur nivel CEFR, de la Pre A1 la C2. Dacă nu știți sigur la ce nivel să vă înscrieți, cereți-ne un test de nivel.",
      },
      {
        title: "Sala",
        body: "Sălile 1–4 sunt săli de curs. Laboratorul de calculatoare este folosit pentru exerciții digitale și simulări de examen, iar biblioteca pentru grupele mai mici.",
      },
    ],
  },

  notes: [
    "Orarul este confirmat înainte de începerea fiecărui trimestru, după ce grupele sunt formate.",
    "Orice modificare a orei unei lecții sau a sălii este comunicată direct părinților și cursanților adulți, nu doar prin această pagină.",
    "Întrebați-ne despre lecțiile de recuperare și despre regulile pentru o oră pierdută înainte de a vă înscrie.",
  ],

  cta: {
    title: "Găsiți grupa care se potrivește săptămânii dumneavoastră",
    body: "Dacă un rând de mai sus vi se pare potrivit, menționați-l când ne scrieți. Dacă niciunul nu se potrivește, spuneți-ne care după-amiezi sau seri sunt libere și vă anunțăm când se deschide următoarea grupă la acel nivel.",
    primary: "Trimiteți o solicitare",
    secondary: "Contactați centrul",
  },
};
