import type { ProgrammesDict } from "../../types";

export const programmes: ProgrammesDict = {
  seo: {
    title: "Programe și cursuri",
    description:
      "Curriculumul Cambridge și cel de bacalaureat, cursuri pentru copii, adolescenți și adulți și pregătire pentru examenele Cambridge English, TOEFL iBT și proba de la BAC.",
  },

  hero: {
    eyebrow: "Ce predăm",
    title: "Programe",
    lead: "Curriculumurile stabilesc traseul de la primele cuvinte până la C2. Cursurile grupează cursanții după vârstă, iar programele de examen pregătesc candidatul pentru o singură probă anume.",
  },

  groups: {
    curricula: {
      title: "Curriculumuri",
      lead: "Un curriculum este traseul lung: parcurge nivel după nivel și duce cursantul de la o treaptă CEFR (CECRL) la următoarea.",
    },
    courses: {
      title: "Cursuri după vârstă",
      lead: "Aceeași predare, organizată astfel încât unui copil de 9 ani și unui adult de 30 să nu li se ceară niciodată să învețe la fel.",
    },
    exams: {
      title: "Pregătire pentru examene",
      lead: "Programe scurte și țintite, pentru candidații care au deja nivelul și cărora le mai rămâne doar proba în sine.",
    },
  },

  items: {
    cambridgeCurriculum: {
      name: "Curriculumul Cambridge",
      tagline: "De la Pre A1 la C2, un singur traseu continuu",
      body: "Aceasta este coloana vertebrală a centrului. Fiecare nivel lucrează competențele pe care un examen Cambridge le raportează separat și se încheie cu o simulare completă, susținută în condiții de examen. Cursanții trec mai departe atunci când materia nivelului este stăpânită, nu când o cere calendarul.",
      highlights: [
        "Citit, scris, ascultat și vorbit în fiecare săptămână",
        "Lucrările scrise, evaluate după criteriile Cambridge publicate",
        "Fiecare nivel se încheie cu o simulare completă",
      ],
      outcome:
        "La finalul unui nivel, cursantul a parcurs tot ceea ce evaluează examenul Cambridge corespunzător și poate fi înscris la acesta printr-un centru de examinare autorizat.",
    },

    // Translator note: keep "Limba străină I" in Romanian in all three locales —
    // it is the official name of the baccalaureate paper.
    bacCurriculum: {
      name: "Curriculumul de BAC",
      tagline: "Proba obligatorie de la bacalaureat, pregătită temeinic",
      body: "Limba străină I este disciplină obligatorie la bacalaureat la toate profilurile, iar programa națională situează proba la nivelul B1. Predăm după acea programă: un text la prima vedere, un eseu structurat și un subiect de cultură, fiecare evaluat conform baremului național de corectare. Nu există o secțiune separată de gramatică, prin urmare gramatica și ortografia se punctează în interiorul părții scrise.",
      highlights: [
        "Predare după programa națională, item cu item",
        "Teste oficiale pentru exersare și subiecte din sesiunile anterioare",
        "Procedura de scutire, explicată fiecărei familii",
      ],
      outcome:
        "Candidatul susține proba din iunie după ce a lucrat fiecare tip de item din ea sau depune cerere de scutire pe baza unui certificat internațional care întrunește condițiile.",
    },

    juniorsFull: {
      name: "Juniori, curs complet",
      tagline: "Programul complet pentru juniori, după-amiaza, în timpul săptămânii",
      body: "Pentru copiii din clasele primare. Lecțiile sunt mai întâi vorbite și fizice, abia apoi scrise: cântece, jocuri, desen și sarcini de vorbire, cititul și scrisul fiind introduse în ritmul pe care îl permite nivelul. Întâlnirile mai dese în cursul săptămânii li se potrivesc copiilor care obosesc repede și care au nevoie de contact frecvent cu limba.",
      highlights: [
        "Lecții scurte, în timpul săptămânii, după ore",
        "Vorbit și ascultat înaintea cititului și scrisului",
        "Sărbători tematice, gătit și sarcini de echipă",
      ],
      outcome:
        "Copilul încheie nivelul putând vorbi despre el în engleză și, dacă familia dorește, poate susține Pre A1 Starters, A1 Movers sau A2 Flyers.",
    },

    juniorsWeekend: {
      name: "Juniori, curs de weekend",
      tagline: "O singură lecție, mai lungă, sâmbătă dimineața",
      body: "Aceleași niveluri ca la cursul complet, predate într-o singură ședință mai lungă, sâmbăta. Se potrivește familiilor care au după-amiezile din timpul săptămânii deja ocupate și copiilor care se acomodează mai bine cu un singur bloc lung decât cu întâlniri scurte și dese. Ședința este întreruptă de o schimbare de activitate și de o pauză.",
      highlights: [
        "O ședință în fiecare sâmbătă dimineața",
        "Aceleași niveluri și materiale ca la cursul complet",
        "Mai puține ore repartizate pe parcursul anului",
      ],
      outcome:
        "Copilul parcurge același nivel ca la cursul complet, într-un ritm mai lent, și poate fi înscris la Pre A1 Starters, A1 Movers sau A2 Flyers.",
    },

    teens: {
      name: "Adolescenți",
      tagline: "Engleza de gimnaziu și de liceu, pe grupe de nivel",
      body: "O grupă de adolescenți se formează pe baza unui test de nivel, nu a catalogului școlar, astfel încât toți cei din sală pot lucra cu adevărat împreună. Programa merge în paralel cu engleza de la școală și își folosește timpul altfel: argumentare, opinie, redactare de texte ample și vorbire fără text pregătit dinainte. Majoritatea grupelor lucrează pentru un examen Cambridge la nivelul lor, iar un elev poate urma cursul și de sine stătător.",
      highlights: [
        "Repartizare după nivel, nu după clasa de la școală",
        "Scris și vorbit exersate la fiecare lecție",
        "Pregătire pentru B1 Preliminary și B2 First for Schools",
      ],
      outcome:
        "Elevul termină nivelul capabil să susțină o argumentare în scris și oral și poate fi înscris la examenul Cambridge de la acel nivel.",
    },

    adults: {
      name: "Adulți",
      tagline: "Grupe de seară pentru cei care lucrează",
      body: "Grupele de adulți pornesc de acolo unde se află cu adevărat cursantul, ceea ce rareori coincide cu punctul presupus de un manual. Lecțiile sunt construite în jurul englezei pe care o folosește un adult: ședințe, corespondență prin e-mail, călătorii, interviuri și citire rapidă. Începătorii absoluți sunt repartizați împreună cu alți începători, niciodată aruncați într-o grupă care a avansat deja.",
      highlights: [
        "Grupe de seară, gândite pentru o săptămână de lucru",
        "Engleza pentru ședințe, e-mail, interviuri și călătorii",
        "Repartizare prin test, nu prin autoevaluare",
      ],
      outcome:
        "Cursantul își poate susține partea într-o conversație de lucru în engleză și, acolo unde îi este de folos, poate susține B2 First sau C1 Advanced.",
    },

    cambridgeExams: {
      name: "Pregătire pentru examenele Cambridge",
      tagline: "De la A2 Key la C2 Proficiency",
      body: "Un curs scurt pentru candidatul care are deja nivelul și căruia îi mai rămâne proba. Fiecare parte a fiecărei probe este parcursă, cronometrată și evaluată, iar cursul este construit în jurul simulărilor complete, nu al unor exerciții disparate. Pregătim candidați pentru examenele Cambridge English și îi înscriem printr-un centru de examinare autorizat, unde examenul se susține și se evaluează.",
      highlights: [
        "Simulări cronometrate încă din prima săptămână",
        "Rezultatele simulărilor, citite ca diagnostic, nu ca predicție",
        "Înscriere printr-un centru de examinare autorizat",
      ],
      outcome:
        "Candidatul ajunge la examen după ce a susținut deja proba integrală contra cronometru și știind unde se află punctele în ea.",
    },

    toefl: {
      name: "Pregătire pentru TOEFL iBT",
      tagline: "Testul din 2026, lucrat sarcină cu sarcină",
      body: "Majoritatea materialelor de pregătire pentru TOEFL aflate în vânzare descriu un test care nu mai există. Acest curs lucrează exclusiv formatul introdus la 21 ianuarie 2026: tipurile actuale de sarcini, parcursul adaptiv la citire și ascultare și un raport de rezultate care se citește pe benzi, nu ca punctaj dintr-un total.",
      highlights: [
        "Doar tipurile de sarcini actuale, din 2026",
        "Citire și ascultare adaptive, exersate contra cronometru",
        "Se susține la un centru de testare autorizat ETS",
      ],
      outcome:
        "Candidatul susține testul actual cunoscând fiecare tip de sarcină din el; fiecare instituție își stabilește singură scorul pe care îl cere.",
    },

    bacExam: {
      name: "Pregătire pentru proba de BAC",
      tagline: "Exersare intensivă pe proba propriu-zisă",
      body: "Un curs pentru anul terminal, destinat candidaților care stăpânesc limba și cărora le mai rămâne proba. Lucrăm cele trei subiecte în ordine și contra cronometru: itemii de înțelegere a textului, eseul de 180–200 de cuvinte și subiectul de cultură de 100–110 cuvinte, fiecare evaluat conform baremului național. Două dintre regulile din acest barem sunt eliminatorii, iar fiecare candidat pleacă de aici știindu-le.",
      highlights: [
        "Probe întregi susținute contra cronometru",
        "Evaluare conform baremului național, punct cu punct",
        "Regulile eliminatorii, predate explicit",
      ],
      outcome:
        "Candidatul intră în sesiunea din iunie după ce a susținut probe complete din sesiunile anterioare în condiții de examen și știind unde se câștigă fiecare dintre cele 100 de puncte.",
    },
  },

  facts: {
    ages: "Vârste",
    hours: "{n} ore academice",
    perWeek: "{n}× pe săptămână",
    minutes: "{n} min",
    levels: "Niveluri",
    anyAge: "Orice vârstă",
    outcomeLabel: "La final",
  },

  levelNames: {
    preA1: "Pre A1 — Primul contact",
    a1: "A1 — Începător",
    a2: "A2 — Elementar",
    b1: "B1 — Intermediar",
    b2: "B2 — Intermediar superior",
    c1: "C1 — Avansat",
    c2: "C2 — Măiestrie",
  },

  ladder: {
    header: {
      eyebrow: "Referință",
      title: "Scara examenelor Cambridge",
      lead: "O singură scară, de la primul certificat al unui copil până la C2. Tabelul indică denumirea actuală a fiecărui examen, abrevierea sa anterioară și durata.",
    },
    columns: {
      exam: "Examen",
      legacy: "Abreviere veche",
      cefr: "CECRL",
      duration: "Durată aproximativă",
      scale: "Scala Cambridge English",
    },
    durationHm: "{h}h {m}",
    durationH: "{h}h",
    note: "Acolo unde un rând indică două denumiri, este vorba de două variante ale aceleiași calificări: proba for Schools este la același nivel și are același format, cu subiecte alese pentru adolescenți, iar certificatul are aceeași valoare. Cambridge publică orele de studiu ghidat doar cu titlu orientativ, numărate cumulativ de la nivel zero; un cursant poate avea nevoie de mai mult timp sau de mai puțin. Certificatele Cambridge English nu expiră, deși universitățile și angajatorii cer în mod obișnuit un rezultat din ultimii 2 ani. La Pre A1 Starters, A1 Movers și A2 Flyers nu există promovare sau nepromovare: fiecare copil primește un certificat pe care sunt indicate scuturile obținute.",
  },

  placement: {
    header: {
      eyebrow: "Înainte de înscriere",
      title: "Cum este repartizat un cursant",
      lead: "Nimeni nu este repartizat doar după vârstă sau după clasa de la școală. Nivelul se stabilește pe bază de dovezi, iar dovezile se adună înainte de prima lecție.",
    },
    steps: [
      {
        title: "Un test scris",
        body: "Cursantul susține o probă scrisă scurtă, care acoperă gramatica, înțelegerea textului și o compunere. Un profesor o evaluează și păstrează lucrarea la dosar.",
      },
      {
        title: "O conversație",
        body: "Un profesor discută cu cursantul în engleză atât cât este nevoie pentru a auzi cum se descurcă. Vorbirea este exact zona în care un test scris este cel mai puțin fiabil.",
      },
      {
        title: "O recomandare scrisă",
        body: "Familia primește un nivel, grupele care îi corespund și motivele din spatele ambelor. Dacă în primele lecții se dovedește că potrivirea nu este cea bună, cursantul este mutat.",
      },
    ],
    note: "Testul de nivel nu se taxează și nu obligă la înscriere. Aduceți orice situație școlară sau rezultat Cambridge pe care îl aveți deja; scurtează discuția.",
  },

  faq: {
    header: {
      eyebrow: "Întrebări",
      title: "Înainte de a alege",
      lead: "Întrebările pe care le pun cel mai des părinții și candidații, cu răspunsuri fără ocolișuri.",
    },
    // Translator note: "Limba străină I" and "10 din oficiu" are official
    // Moldovan terms — keep them in Romanian in every locale.
    items: [
      {
        q: "Un certificat Cambridge ajută la bacalaureat?",
        a: "Da, iar mecanismul este precis. Un certificat internațional recunoscut, la nivelul B2 sau superior, scutește candidatul de proba la Limba străină I, care primește atunci nota 10 fără a fi susținută — în practica din Moldova, „nota 10 din oficiu” — iar acest 10 intră în media examenelor de bacalaureat. Lista recunoscută cuprinde B2 First și B2 First for Schools, C1 Advanced, C2 Proficiency, IELTS, TOEFL iBT, Oxford Test of English și Oxford Test of English Advanced, fiecare cu propriile scoruri minime la general, la citire și la scriere, iar dosarul se depune la secretariatul instituției până la 10 aprilie. Lista și pragurile se stabilesc prin ordin al ministrului și se modifică din când în când, așa că verificăm anexa în vigoare împreună cu fiecare familie, în loc să cităm varianta de anul trecut.",
      },
      {
        q: "Organizați dumneavoastră examenele Cambridge?",
        a: "Nu. Suntem un centru de pregătire: predăm cursurile, organizăm simulările și înscriem candidații printr-un centru de examinare autorizat, unde examenul se susține și se evaluează. Cambridge elaborează probele, acordă calificativele și eliberează certificatele.",
      },
      {
        q: "Cât durează până la nivelul B2?",
        a: "Cambridge publică o valoare orientativă pentru fiecare nivel, în ore de studiu ghidat, numărate cumulativ de la nivel zero. Este o valoare orientativă, nu un grafic: cât citește cursantul în afara lecției, câtă engleză aude acasă și cât de regulat vine la ore — toate acestea schimbă cifra. Vă vom spune la ce nivel se află acum cursantul și ce cere nivelul următor. Nu îi vom fixa o dată.",
      },
      {
        q: "Care este diferența dintre cursul complet și cel de weekend pentru juniori?",
        a: "Frecvența și durata. Cursul complet se desfășoară după-amiaza, în timpul săptămânii, în lecții mai scurte; cursul de weekend are loc o singură dată, sâmbătă dimineața, într-o ședință mai lungă și cu mai puține ore pe parcursul anului. Nivelurile și materialele sunt aceleași, astfel încât un copil poate trece de la unul la celălalt la finalul unui nivel.",
      },
      {
        q: "Ce s-a schimbat la TOEFL iBT?",
        a: "De la 21 ianuarie 2026, testul este adaptiv la citire și ascultare, durează aproximativ 1h25 de timp efectiv și raportează fiecare secțiune și rezultatul general pe o scară de la 1 la 6, în jumătăți de bandă. Banda generală este media celor patru secțiuni, nu o sumă. Nu există prag de promovare: fiecare instituție își stabilește scorul pe care îl cere, iar scorurile rămân valabile 2 ani. Până în ianuarie 2028, raportul include și o cifră comparabilă pe vechiul total din 120, pentru instituțiile care nu și-au mutat încă cerințele pe noua scară; rezultatul actual este banda.",
      },
      {
        q: "Este o repetare a englezei de la școală?",
        a: "Nu, pentru că gruparea este diferită. O clasă de la școală se formează dintr-un an de studiu, în timp ce grupa noastră se formează pe baza unui test de nivel, astfel încât toți cei din sală lucrează la același nivel. Timpul lecției se duce apoi pe vorbit, pe scris și pe corectare, adică exact acolo unde timpul lipsește cel mai mult într-o clasă numeroasă.",
      },
    ],
  },

  cta: {
    title: "Începeți cu testul de nivel",
    body: "Toate programele de mai sus încep din același punct. Cereți o dată pentru test și o programăm; durează aproximativ o oră, nu costă nimic și lămurește chestiunea nivelului înainte ca cineva să semneze ceva.",
    primary: "Trimiteți o cerere",
    secondary: "Contactați centrul",
  },
};
