import type { ContactDict } from "../../types";

export const contact: ContactDict = {
  seo: {
    title: "Contact",
    description:
      "Cum ne puteți contacta la The Best Indeed English Centre din Chișinău: telefon, e-mail, program de lucru, o hartă pe care o încărcați doar dacă doriți, precum și formularul de solicitare a înscrierii.",
  },

  hero: {
    eyebrow: "Contact",
    title: "Cum ne găsiți",
    lead: "Sunați, scrieți-ne sau trimiteți o solicitare din această pagină. Tot ce ajunge la noi este citit de un membru al echipei, iar întrebările despre înscriere ajung la fondatoare.",
  },

  cards: {
    phone: {
      label: "Telefon",
      note: "Răspunde secretariatul în timpul programului de lucru. Dacă suntem la oră, lăsați un mesaj și vă sunăm înapoi în aceeași zi.",
    },
    email: {
      label: "E-mail",
      note: "Îl citim în fiecare zi lucrătoare. La o întrebare despre niveluri sau despre datele examenelor răspunsul poate întârzia mai mult decât la una despre orele de curs, pentru că verificăm înainte de a scrie.",
    },
    address: {
      label: "Adresă",
      note: "Spuneți-ne când doriți să veniți și vă confirmăm intrarea și o oră la care cineva vă poate întâmpina acolo.",
    },
    hours: {
      label: "Program de lucru",
      note: "Secretariatul este deschis și în afara orelor de curs, așa că puteți veni dimineața pentru a vă înscrie sau pentru a discuta opțiunile.",
    },
  },

  closed: "Închis",

  map: {
    title: "Cum ajungeți la centru",
    // The provider named here must match the embed used in ConsentMap.tsx.
    body: "Harta este încorporată de la OpenStreetMap. Încărcarea ei conectează browserul dumneavoastră la un serviciu terț, care primește adresa dumneavoastră IP și detalii despre dispozitiv. Puteți, în schimb, să deschideți locația într-o filă nouă și să lăsați harta dezactivată.",
    accept: "Încărcați harta",
    open: "Deschideți în Google Maps",
    provider: "OpenStreetMap",
  },

  form: {
    header: {
      eyebrow: "Înscriere",
      title: "Trimiteți o solicitare",
      lead: "Este același formular ca pe pagina de înscriere, ca să nu fie nevoie să părăsiți această pagină. Durează aproximativ două minute și nu vă obligă la nimic.",
    },
  },

  faq: {
    header: {
      eyebrow: "Întrebări frecvente",
      title: "Înainte de a ne contacta",
      lead: "Întrebările pe care părinții și cursanții adulți ni le adresează cel mai des atunci când ne scriu prima dată.",
    },
    items: [
      {
        q: "Pot vizita centrul înainte de înscriere?",
        a: "Da, și chiar preferăm să o faceți. Stabiliți o oră prin telefon sau e-mail, iar noi vă arătăm sălile, vă explicăm cum se formează grupele și răspundem la întrebări. În ziua vizitei nu se semnează nimic.",
      },
      {
        q: "Răspundeți la mesaje în weekend?",
        a: "Sâmbăta, da, în timpul programului de lucru. Un mesaj care ajunge cât timp centrul este închis este citit la începutul următoarei zile lucrătoare.",
      },
      {
        q: "În ce limbă ne veți răspunde?",
        a: "Scrieți-ne în engleză, română sau rusă și vă răspundem în aceeași limbă. Acest site este publicat în toate trei.",
      },
      {
        q: "Pot discuta cu un profesor, nu cu secretariatul?",
        a: "Da. Menționați acest lucru când ne scrieți și organizăm un apel sau o scurtă întâlnire cu profesorul care ar prelua grupa, la o oră în afara orelor sale de curs.",
      },
    ],
  },
};
