import type { HomeDict } from "../../types";

export const home: HomeDict = {
  seo: {
    title: "Cursuri de engleză în Chișinău",
    description:
      "Pregătire Cambridge English, BAC și TOEFL pentru copii, adolescenți și adulți în Chișinău. Grupe mici, profesori angajați prin contract și test de nivel înainte de înscriere.",
  },

  hero: {
    badge: "Centru de pregătire pentru examenele Cambridge English",
    title: "Engleză predată la",
    titleAccent: "standardul cerut de examen",
    lead: "Predăm engleza copiilor, adolescenților și adulților din Chișinău, de la primele cuvinte până la C2. Cursurile urmează programele Cambridge și programa de BAC, iar candidații sunt înscriși la examen printr-un centru de examinare autorizat.",
    primary: "Trimiteți o cerere",
    secondary: "Vedeți programele",
    note: "Cererile de înscriere ajung direct la fondatoarea centrului. Citim engleza, româna și rusa deopotrivă.",
    marks: [
      "Grupe mici, profesori cunoscuți",
      "Test de nivel înainte de înscriere",
      "Metodă proprie de predare",
    ],
  },

  stats: {
    header: {
      eyebrow: "Bilanțul",
      title: "Centrul în cifre",
      lead: "Patru cifre, numărate de noi și definite fiecare în rândul de dedesubt.",
    },
    labels: {
      years: {
        label: "Ani de predare",
        caption: "Numărați din anul în care centrul s-a deschis la Chișinău.",
      },
      students: {
        label: "Cursanți instruiți",
        caption: "Toți cei care au finalizat la noi cel puțin un curs complet, indiferent de vârstă.",
      },
      passRate: {
        label: "Rată de promovare",
        caption:
          "Candidații noștri, la examenele Cambridge English pentru care i-am pregătit și i-am înscris. Pagina despre centru arată cum se calculează și ce lasă în afară.",
      },
      teachers: {
        label: "Profesori",
        caption: "Corpul didactic al centrului, fiecare cu contract individual de muncă.",
      },
    },
    cta: "Despre centru",
  },

  pillars: {
    header: {
      eyebrow: "De ce acest centru",
      title: "Ce alege un părinte",
      lead: "Niciunul dintre aceste lucruri nu este ieșit din comun luat separat. Împreună, ele hotărăsc cu câtă engleză pleacă în realitate un elev de la curs.",
    },
    items: [
      {
        title: "Timpul de vorbire al fiecărui elev",
        body: "Măsura care decide un curs de limbă este numărul de minute în care fiecare elev produce efectiv engleză. O grupă mică este modul în care acest timp este protejat.",
      },
      {
        title: "Metoda noastră",
        body: "Planurile de curs ne aparțin: sunt scrise de profesorii care le folosesc și sunt rescrise atunci când rezultatele unei grupe arată că o unitate nu funcționează. Nimic de aici nu este o programă de editură urmată de la prima pagină.",
      },
      {
        title: "Pregătire pentru examene",
        body: "Pregătim candidați pentru Cambridge English, TOEFL iBT și proba de limbă străină de la BAC, iar candidații Cambridge sunt înscriși printr-un centru de examinare autorizat. Tehnica de examen se predă în interiorul cursului, nu se vinde separat la sfârșitul lui.",
      },
      {
        title: "Profesori pe care îi știți pe nume",
        body: "Pagina echipei prezintă profesorii și spune ce programe predă fiecare, iar orarul arată cine se află în ce sală. Știți cine va preda grupei înainte să luați decizia.",
      },
    ],
  },

  programmes: {
    header: {
      eyebrow: "Programe",
      title: "Cursuri după vârstă și după scop",
      lead: "Fiecare curs se așază pe scara CEFR (CECRL), de la Pre A1 la C2. Fiecare își declară nivelul, numărul de ore și ritmul săptămânal înainte de înscriere.",
    },
    cta: "Toate programele",
  },

  simulation: {
    eyebrow: "Spațiu nou",
    title: "Simulare de examen în condiții reale",
    lead: "Centrul deschide o sală folosită exclusiv pentru simulări complete de examen — prima de acest fel despre care avem cunoștință în Moldova. Candidații susțin probe integrale, cu cronometrarea, liniștea și supravegherea de la examenul real.",
    // "{date}" is replaced with site.simulationCentreOpens, formatted for the locale.
    dateLabel: "Se deschide la {date}",
    points: [
      "Probe integrale, susținute dintr-o singură ședință, cu telefoanele predate și cu un supraveghetor în sală, exact ca în ziua examenului.",
      "Interfața examenului digital, pe calculatoarele centrului, astfel încât ecranul să fie familiar cu mult înainte să conteze.",
      "Exersarea probei de vorbire în perechi, ca la examinare, cronometrată pe părțile testului real.",
      "Un raport individual de diagnostic care arată, probă cu probă, unde s-au câștigat puncte și unde s-au pierdut.",
    ],
    cta: "Anunțați-vă interesul",
    disclaimer:
      "Sala de simulare ne aparține; examenul, nu. Suntem centru de pregătire, nu centru de examinare: proba oficială se susține la un centru de examinare Cambridge autorizat, prin care ne înscriem candidații. Un scor obținut la simulare îi arată profesorului încotro se duc punctele și nu este o previziune a calificativului.",
  },

  method: {
    header: {
      eyebrow: "Cum predăm",
      title: "Metoda noastră, etapă cu etapă",
      lead: "Trei etape, în aceeași ordine, pentru fiecare cursant și pentru fiecare curs pe care îl ținem.",
    },
    steps: [
      {
        title: "Test de nivel și diagnostic",
        body: "Fiecare cursant susține un test de nivel, scris și oral, înainte de prima lecție. Rezultatul stabilește grupa, nivelul de pornire și competențele pe care profesorul le va solicita cel mai mult.",
      },
      {
        title: "Ciclul de predare",
        body: "Fiecare unitate merge de la material nou la exersare controlată și apoi la utilizare liberă, iar lucrările scrise sunt corectate după criteriile folosite la examen. Vorbirea se cronometrează din prima săptămână, astfel încât timpul de examen să nu vină niciodată ca o surpriză.",
      },
      {
        title: "Măsurare",
        body: "Niciun ciclu nu se încheie fără o simulare și un raport scris. Părinții primesc exact raportul cu care lucrează profesorul, competență cu competență, nu o singură notă.",
      },
    ],
    cta: "Citiți despre metodă",
  },

  life: {
    header: {
      eyebrow: "Dincolo de planul de lecție",
      title: "Cealaltă jumătate a unui curs",
      lead: "Orele predate sunt coloana vertebrală a unui curs. Acestea sunt părțile despre care elevii povestesc acasă.",
    },
    items: [
      {
        title: "Un calendar, nu un manual",
        body: "Câteva date din fiecare an sunt rezervate unei zile tematice, pregătite în engleză cu o săptămână înainte și conduse de elevi. Sunt lecții cu altă formă, nu timp liber.",
      },
      {
        title: "Engleză care se mănâncă",
        body: "O grupă gătește împreună în engleză, citind de două ori modul de preparare, contrazicându-se pe grame și mâncând dovada la final.",
      },
      {
        title: "Lucrări prezentate cu voce tare",
        body: "Proiectele se termină în fața unui public, nu într-un dosar. Este cel mai scurt drum pe care îl cunoaștem de la un elev tăcut la unul care vorbește.",
      },
      {
        title: "Recunoaștere concretă",
        body: "La finalul unui ciclu nu se împarte nimic la grămadă. Fiecărui elev i se spune ce s-a îmbunătățit și ce urmează, iar ceea ce însoțește acest lucru a fost ales anume pentru el.",
      },
      {
        title: "Cărți care ies pe ușă",
        body: "Cărțile de lectură gradată merg acasă între lecții și în vacanțe, la nivelul la care elevul citește cu adevărat, nu la cel la care și-ar dori să fie.",
      },
      {
        title: "Ecrane folosite cu rost",
        body: "Laboratorul de calculatoare este rezervat pe tot parcursul trimestrului pentru exersarea examenului digital, pentru ascultare și pentru scriere la tastatură, nu deschis abia în cele două săptămâni dinaintea examenului.",
      },
    ],
  },

  enrol: {
    header: {
      eyebrow: "Înscriere",
      title: "De la cerere la prima lecție",
      lead: "Înscrierea decurge la fel pentru fiecare curs și pentru fiecare vârstă. Nimic nu se decide înainte de a-l fi auzit pe cursant vorbind.",
    },
    steps: [
      {
        title: "Trimiteți o cerere",
        body: "Completați formularul online cu vârsta cursantului și cu obiectivul pe care îl urmăriți. Cererea ajunge direct la fondatoarea centrului, iar noi răspundem pentru a stabili o oră.",
      },
      {
        title: "Test de nivel și o discuție",
        body: "Cursantul susține la centru un test scurt, scris și oral. Apoi parcurgem rezultatul împreună cu familia și spunem deschis ce curs i se potrivește și ce curs nu.",
      },
      {
        title: "Repartizarea în grupă și începutul",
        body: "Vă propunem o grupă potrivită cu nivelul, cu vârsta și cu orele pe care le puteți susține. Dumneavoastră confirmați locul, iar elevul intră în grupă la următoarea lecție din orar.",
      },
    ],
    cta: "Începeți cu primul pas",
  },

  faq: {
    header: {
      eyebrow: "Întrebări",
      title: "Ce ne întreabă familiile mai întâi",
      lead: "Răspunsurile de mai jos sunt cele pe care le dăm la sediu, în aceleași cuvinte.",
    },
    items: [
      {
        q: "Sunteți centru de examinare Cambridge autorizat?",
        a: "Nu, și nu am fi scris asta dacă nu am fi siguri. Statutul nostru este de centru de pregătire: predăm cursurile și înscriem candidații printr-un centru de examinare autorizat. Cambridge elaborează și corectează probele și eliberează certificatele.",
      },
      {
        q: "Cum decideți în ce grupă intră copilul meu?",
        a: "Fiecare cursant susține un test de nivel înainte de înscriere, scris și oral. Repartizăm întâi după nivel și abia apoi după vârstă, pentru că o grupă funcționează numai atunci când toți cei din ea pot urmări aceeași lecție. Când cele două intră în conflict, o spunem, în loc să ocupăm un loc.",
      },
      {
        q: "Există un termen pentru a ajunge la un nivel ca B2?",
        a: "Mai lung decât și-ar dori oricine și depinde de cursant. Cambridge publică orele de studiu ghidat cu titlu orientativ, cumulate de la zero, iar cifrele se află pe pagina de programe. Nu punem o dată în dreptul unui nivel; măsurăm la finalul fiecărui ciclu și vă spunem unde se află elevul.",
      },
      {
        q: "Poate un certificat Cambridge să înlocuiască proba de engleză de la BAC?",
        // The official term for the awarded mark is „nota 10 din oficiu” — kept verbatim.
        a: "Poate înlocui examenul cu totul. Un certificat aflat pe lista recunoscută, la nivelul B2 sau mai sus în ansamblu și la citire și scriere, scutește candidatul de proba de limbă străină, iar în locul ei se înregistrează „nota 10 din oficiu”. Pagina de programe arată ce certificate sunt pe listă și termenul din aprilie pentru depunerea dosarului. Lista și scorul pe care trebuie să îl atingă fiecare certificat se fixează prin ordin al ministrului și se revizuiesc de la an la an, așa că verificăm împreună cu dumneavoastră anexa în vigoare, în loc să cităm o cifră care s-ar putea să se fi schimbat.",
      },
      {
        // Translator note: "Limba străină I" is the official Moldovan name of the paper. Keep the Romanian form in every language.
        q: "Proba de limbă străină de la BAC este opțională?",
        a: "Nu. Limba străină I este o probă obligatorie la bacalaureat, pentru toate profilurile, iar testul scris durează 180 de minute. Programa națională o situează la nivelul B1, așa că am construit cursul de BAC pentru acel nivel și pentru acea probă.",
      },
      {
        q: "S-a schimbat examenul TOEFL?",
        a: "Substanțial, la 21 ianuarie 2026. Este mai scurt, se adaptează la candidat, iar rezultatul se raportează pe benzi de la 1 la 6. Rezervați-vă aproximativ două ore la centrul de testare. Noi predăm cursul de pregătire; testul propriu-zis se susține la centrele de testare autorizate ETS.",
      },
    ],
    cta: "Adresați-ne o întrebare",
  },

  visit: {
    header: {
      eyebrow: "Vizitați-ne",
      title: "Veniți să vedeți sălile",
      lead: "Adresa și programul de lucru se află pe pagina de contact. Treceți pe la noi în timpul lecțiilor sau stabiliți o oră și cineva vă va arăta centrul.",
    },
    primary: "Cum ajungeți",
    secondary: "Contactați centrul",
  },
};
