export interface TranslationSet {
  nav: {
    about: string;
    services: string;
    whyUs: string;
    contact: string;
  };
  hero: {
    badge: string;
    title: string;
    subtitle: string;
    ctaPrimary: string;
    ctaSecondary: string;
  };
  stats: {
    stat1Val: string;
    stat1Lbl: string;
    stat2Val: string;
    stat2Lbl: string;
    stat3Val: string;
    stat3Lbl: string;
    stat4Val: string;
    stat4Lbl: string;
  };
  about: {
    header: string;
    title: string;
    p1: string;
    p2: string;
    precision: string;
    precisionDesc: string;
    safety: string;
    safetyDesc: string;
  };
  services: {
    header: string;
    title: string;
    subtitle: string;
    serv1Title: string;
    serv1Desc: string;
    serv2Title: string;
    serv2Desc: string;
    serv3Title: string;
    serv3Desc: string;
    serv4Title: string;
    serv4Desc: string;
  };
  whyUs: {
    header: string;
    title: string;
    point1Title: string;
    point1Desc: string;
    point2Title: string;
    point2Desc: string;
    point3Title: string;
    point3Desc: string;
    point4Title: string;
    point4Desc: string;
    projectsTitle: string;
    projectsDesc: string;
    realizationsTitle: string;
    realizationsSubtitle: string;
    realization1Title: string;
    realization1Desc: string;
    realization2Title: string;
    realization2Desc: string;
    realization3Title: string;
    realization3Desc: string;
    realization4Title: string;
    realization4Desc: string;
  };
  contact: {
    header: string;
    title: string;
    subtitle: string;
    formName: string;
    formEmail: string;
    formAddress: string;
    formMessage: string;
    formSubmit: string;
    formSubmitting: string;
    formSuccess: string;
    infoPhone: string;
    infoEmail: string;
    infoArea: string;
    infoAreaDesc: string;
    infoCompanyDetails: string;
    infoWojtek: string;
  };
  footer: {
    copyright: string;
    rights: string;
  };
}

export type Language = 'PL' | 'EN' | 'DE';

export const TRANSLATIONS: Record<Language, TranslationSet> = {
  PL: {
    nav: {
      about: 'O nas',
      services: 'Usługi',
      whyUs: 'Dlaczego my',
      contact: 'Kontakt',
    },
    hero: {
      badge: 'RODZINNA FIRMA INŻYNIERYJNA',
      title: 'Infrastruktura telekomunikacyjna na najwyższym poziomie',
      subtitle: 'Kompleksowe usługi dla obiektów telekomunikacyjnych – od profesjonalnego projektu, przez precyzyjne wykonawstwo, aż po niezawodne utrzymanie krytyczne.',
      ctaPrimary: 'Skontaktuj się z nami',
      ctaSecondary: 'Poznaj nasze usługi',
    },
    stats: {
      stat1Val: '100%',
      stat1Lbl: 'Niezawodność działania',
      stat2Val: '24/7',
      stat2Lbl: 'Wsparcie awaryjne',
      stat3Val: 'PL & DE',
      stat3Lbl: 'Obszar realizacji',
      stat4Val: 'Hager & Vertiv',
      stat4Lbl: 'Certyfikowane marki',
    },
    about: {
      header: 'KIM JESTEŚMY',
      title: 'Niezawodny partner w świecie infrastruktury krytycznej',
      p1: 'Eminstall to rodzinna firma inżynieryjna, która powstała z pasji do nowoczesnych technologii i precyzyjnego wykonawstwa. Specjalizujemy się w obsłudze technicznej oraz budowie zaawansowanej infrastruktury dla obiektów telekomunikacyjnych.',
      p2: 'Dla nas liczy się każdy szczegół. Rozumiemy, jak kluczowe znaczenie ma ciągłość działania sieci komórkowych, radiowych oraz światłowodowych. Dlatego łączymy rzetelną wiedzę inżynieryjną z szybkim czasem reakcji, dostarczając rozwiązania, na których można polegać w każdych warunkach.',
      precision: 'Inżynieryjna precyzja',
      precisionDesc: 'Dbamy o każdy milimetr instalacji, eliminując ryzyko awarii zanim się pojawi.',
      safety: 'Bezpieczeństwo i pewność',
      safetyDesc: 'Działamy zgodnie z najwyższymi standardami BHP i normami technicznymi UE.',
    },
    services: {
      header: 'NASZA OFERTA',
      title: 'Kompleksowe usługi inżynieryjne',
      subtitle: 'Zapewniamy profesjonalizm na każdym etapie cyklu życia obiektu telekomunikacyjnego.',
      serv1Title: 'Kontenery telekomunikacyjne',
      serv1Desc: 'Kompleksowe wykonawstwo, modernizacja, konserwacja oraz okresowe przeglądy techniczne kontenerów telekomunikacyjnych (shelterów). Dbamy o szczelność, izolację i optymalne warunki pracy wrażliwych urządzeń nadawczych.',
      serv2Title: 'Klimatyzacja (HVAC)',
      serv2Desc: 'Montaż, serwis oraz drobiazgowe przeglądy systemów chłodzenia – w tym specjalistycznej klimatyzacji precyzyjnej. Gwarantujemy stałą temperaturę i wilgotność powietrza, chroniąc krytyczną elektronikę przed przegrzaniem.',
      serv3Title: 'Zasilanie gwarantowane',
      serv3Desc: 'Instalacja i konserwacja niezawodnych systemów UPS oraz układów zasilania awaryjnego (agregatów prądotwórczych). Zabezpieczamy obiekty przed niekontrolowanymi spadkami i zanikami napięcia w sieci.',
      serv4Title: 'Szafy elektryczne',
      serv4Desc: 'Prefabrykacja, montaż i podłączanie dedykowanych rozdzielnic elektrycznych oraz szaf automatyki. Pracujemy wyłącznie na sprawdzonych, certyfikowanych komponentach wiodących marek, takich jak Hager, Socomec oraz Vertiv.',
    },
    whyUs: {
      header: 'DLACZEGO MY',
      title: 'Fundament, na którym budujemy zaufanie',
      point1Title: 'Rodzinne wartości i zaangażowanie',
      point1Desc: 'Jako firma rodzinna bierzemy pełną osobistą odpowiedzialność za każdy projekt. Nasze nazwisko to gwarancja uczciwości.',
      point2Title: 'Wiedza inżynieryjna i uprawnienia',
      point2Desc: 'Nasz zespół posiada pełne certyfikacje, specjalistyczne uprawnienia SEP i wieloletnie doświadczenie w branży telekomunikacyjnej.',
      point3Title: 'Ekspresowy czas reakcji',
      point3Desc: 'Wiemy, że każda minuta przestoju infrastruktury generuje straty. Jesteśmy gotowi do szybkiego podjęcia działań.',
      point4Title: 'Zgodność z normami PL & DE',
      point4Desc: 'Znamy specyfikę rynków w Polsce i Niemczech. Wszystkie nasze prace spełniają restrykcyjne normy lokalne i europejskie.',
      projectsTitle: 'Nasze Realizacje',
      projectsDesc: 'Z sukcesem zrealizowaliśmy modernizacje systemów zasilania i chłodzenia dla kluczowych węzłów sieci komórkowych w Polsce oraz Niemczech. Specjalizujemy się w pracach na obiektach o najwyższym rygorze bezpieczeństwa i ciągłości pracy. Prefabrykowane przez nas szafy elektryczne oraz rozdzielnice niezawodnie zasilają infrastrukturę przesyłową, a regularna konserwacja kontenerów telekomunikacyjnych eliminuje ryzyko nieplanowanych przestojów dla naszych partnerów biznesowych.',
      realizationsTitle: 'Przykładowe Realizacje',
      realizationsSubtitle: 'Zobacz efekty naszych profesjonalnych prac inżynieryjnych na obiektach telekomunikacyjnych.',
      realization1Title: 'Modernizacja Kontenera Nadawczego',
      realization1Desc: 'Pełna regeneracja uszczelnień termicznych, rekonfiguracja okablowania oraz serwis techniczny osłony zewnętrznej.',
      realization2Title: 'Instalacja Klimatyzacji Precyzyjnej',
      realization2Desc: 'Montaż specjalistycznych układów chłodzenia precyzyjnego marki Vertiv zintegrowanych z systemem automatyki.',
      realization3Title: 'Systemy Zasilania Gwarantowanego UPS',
      realization3Desc: 'Wdrożenie modułowych systemów UPS oraz układu przełączania zasilania awaryjnego (SZR) dla stacji bazowych.',
      realization4Title: 'Prefabrykacja Szaf Rozdzielczych',
      realization4Desc: 'Zaprojektowanie i montaż rozdzielnic elektrycznych opartych na niezawodnych komponentach Hager i Socomec.',
    },
    contact: {
      header: 'KONTAKT',
      title: 'Rozpocznijmy współpracę',
      subtitle: 'Chcesz zapytać o ofertę, zlecić serwis lub nawiązać stałą współpracę? Napisz do nas lub zadzwoń. Odpowiemy niezwłocznie.',
      formName: 'Imię i nazwisko',
      formEmail: 'Adres e-mail',
      formAddress: 'Lokalizacja obiektu / Adres',
      formMessage: 'Treść wiadomości',
      formSubmit: 'Wyślij wiadomość',
      formSubmitting: 'Wysyłanie wiadomości...',
      formSuccess: 'Wiadomość została wysłana! Dziękujemy za kontakt. Skontaktujemy się z Państwem najszybciej, jak to możliwe.',
      infoPhone: 'Telefon bezpośredni',
      infoEmail: 'Adres e-mail',
      infoArea: 'Obszar działalności',
      infoAreaDesc: 'Polska i Niemcy (Mobilne ekipy serwisowe)',
      infoCompanyDetails: 'Dane firmy',
      infoWojtek: 'Wojciech Miga — Właściciel',
    },
    footer: {
      copyright: 'Eminstall',
      rights: 'Wszelkie prawa zastrzeżone.',
    },
  },
  EN: {
    nav: {
      about: 'About Us',
      services: 'Services',
      whyUs: 'Why Us',
      contact: 'Contact',
    },
    hero: {
      badge: 'FAMILY-OWNED ENGINEERING COMPANY',
      title: 'Telecommunication Infrastructure at its Finest',
      subtitle: 'Comprehensive services for telecom facilities – from professional design and precise construction to reliable critical maintenance.',
      ctaPrimary: 'Get in Touch',
      ctaSecondary: 'Our Services',
    },
    stats: {
      stat1Val: '100%',
      stat1Lbl: 'Operational Reliability',
      stat2Val: '24/7',
      stat2Lbl: 'Emergency Support',
      stat3Val: 'PL & DE',
      stat3Lbl: 'Area of Operation',
      stat4Val: 'Hager & Vertiv',
      stat4Lbl: 'Certified Equipment',
    },
    about: {
      header: 'WHO WE ARE',
      title: 'A Reliable Partner in Critical Infrastructure',
      p1: 'Eminstall is a family-owned engineering business born from a genuine passion for modern technologies and high-precision execution. We specialize in the technical maintenance and development of advanced infrastructure for telecommunications facilities.',
      p2: 'For us, every single detail counts. We deeply understand how crucial network continuity is for mobile, radio, and fiber-optic operations. That is why we combine sound engineering expertise with fast response times, delivering solutions you can completely rely on under any circumstances.',
      precision: 'Engineering Precision',
      precisionDesc: 'We take care of every millimeter of the installation, eliminating faults before they even occur.',
      safety: 'Safety & Certitude',
      safetyDesc: 'We operate in strict accordance with the highest HSE standards and EU technical regulations.',
    },
    services: {
      header: 'OUR SERVICES',
      title: 'Comprehensive Engineering Solutions',
      subtitle: 'We guarantee absolute professionalism at every phase of a telecom facility\'s lifecycle.',
      serv1Title: 'Telecom Containers',
      serv1Desc: 'Comprehensive build, modernization, maintenance, and periodic technical audits of telecom shelters. We ensure complete structural sealing, insulation, and optimal operating conditions for sensitive broadcasting hardware.',
      serv2Title: 'Air Conditioning (HVAC)',
      serv2Desc: 'Installation, professional servicing, and detailed inspections of cooling systems – including highly specialized precision climate systems. We guarantee stable temperature and humidity levels, safeguarding critical electronics.',
      serv3Title: 'Uninterruptible Power Supply',
      serv3Desc: 'Installation and maintenance of fail-safe UPS systems and backup generators. We secure critical facilities against sudden voltage fluctuations and power grid blackouts.',
      serv4Title: 'Electrical Cabinets',
      serv4Desc: 'Prefabrication, assembly, and integration of dedicated electrical distribution and automation cabinets. We build exclusively using certified, high-grade components from renowned brands like Hager, Socomec, and Vertiv.',
    },
    whyUs: {
      header: 'WHY CHOOSE US',
      title: 'The Foundation We Build Trust Upon',
      point1Title: 'Family Values & Dedication',
      point1Desc: 'As a family business, we take full personal responsibility for every project. Our name is our absolute pledge of integrity.',
      point2Title: 'Engineering Expertise & Licensing',
      point2Desc: 'Our technical team holds full industry certifications, specialized electrical permits (SEP), and extensive telecom experience.',
      point3Title: 'Rapid Response Times',
      point3Desc: 'We know that every minute of network downtime means commercial losses. We are structured to mobilize and react instantly.',
      point4Title: 'Compliance in Poland & Germany',
      point4Desc: 'We understand the regulatory specifics of both Polish and German markets. All works satisfy local and European standards.',
      projectsTitle: 'Featured Projects',
      projectsDesc: 'We have successfully completed power supply and cooling system upgrades for major telecom hubs in both Poland and Germany. We specialize in works at sites requiring maximum security and zero downtime. Our custom-prefabricated electrical distribution cabinets reliably power transmission systems, while our preventative container maintenance services eliminate unplanned downtime for our corporate clients.',
      realizationsTitle: 'Featured Work & Projects',
      realizationsSubtitle: 'Explore some of our professional engineering achievements on telecom sites.',
      realization1Title: 'Broadcasting Shelter Retrofit',
      realization1Desc: 'Complete thermal insulation upgrade, rewiring, and external mechanical structure maintenance.',
      realization2Title: 'Precision Air Conditioning Setup',
      realization2Desc: 'Installation of specialized Vertiv precision cooling units integrated with automatic alert systems.',
      realization3Title: 'Critical UPS Backup Systems',
      realization3Desc: 'Deployment of modular UPS blocks and Automatic Transfer Switch (ATS) systems for base stations.',
      realization4Title: 'Custom Electrical Distribution Cabinets',
      realization4Desc: 'Design and assembly of custom electrical switchboards using certified components from Hager and Socomec.',
    },
    contact: {
      header: 'CONTACT US',
      title: 'Let\'s Discuss Your Next Project',
      subtitle: 'Need a price estimation, scheduled servicing, or long-term cooperation? Write us or call directly. We will get back to you promptly.',
      formName: 'Full name',
      formEmail: 'Email address',
      formAddress: 'Site Location / Address',
      formMessage: 'Message details',
      formSubmit: 'Send Message',
      formSubmitting: 'Sending message...',
      formSuccess: 'Your message has been successfully sent! Thank you. We will get in touch with you as soon as possible.',
      infoPhone: 'Direct Phone',
      infoEmail: 'Email Address',
      infoArea: 'Operational Area',
      infoAreaDesc: 'Poland & Germany (Fully mobile field crews)',
      infoCompanyDetails: 'Company Info',
      infoWojtek: 'Wojciech Miga — Owner',
    },
    footer: {
      copyright: 'Eminstall',
      rights: 'All rights reserved.',
    },
  },
  DE: {
    nav: {
      about: 'Über uns',
      services: 'Leistungen',
      whyUs: 'Warum wir',
      contact: 'Kontakt',
    },
    hero: {
      badge: 'FAMILIENGEFÜHRTES INGENIEURUNTERNEHMEN',
      title: 'Telekommunikations-Infrastruktur auf höchstem Niveau',
      subtitle: 'Umfassende Leistungen für Mobilfunk- und Telekommunikationsanlagen – von der professionellen Planung über den präzisen Bau bis zur zuverlässigen kritischen Wartung.',
      ctaPrimary: 'Kontaktieren Sie uns',
      ctaSecondary: 'Unsere Leistungen',
    },
    stats: {
      stat1Val: '100%',
      stat1Lbl: 'Betriebszuverlässigkeit',
      stat2Val: '24/7',
      stat2Lbl: 'Notfall-Support',
      stat3Val: 'PL & DE',
      stat3Lbl: 'Einsatzgebiet',
      stat4Val: 'Hager & Vertiv',
      stat4Lbl: 'Zertifizierte Marken',
    },
    about: {
      header: 'ÜBER UNS',
      title: 'Ihr verlässlicher Partner für kritische Infrastruktur',
      p1: 'Eminstall ist ein familiengeführtes Ingenieurunternehmen, entstanden aus echter Leidenschaft für moderne Technologien und hochpräzise Ausführung. Wir sind spezialisiert auf den technischen Service und den Ausbau anspruchsvoller Telekommunikationsinfrastruktur.',
      p2: 'Für uns kommt es auf jedes Detail an. Wir wissen, wie entscheidend eine unterbrechungsfreie Netzverfügbarkeit für Mobilfunk-, Richtfunk- und Glasfasernetze ist. Deshalb verbinden wir fundiertes Ingenieurwissen mit extrem schnellen Reaktionszeiten und liefern Lösungen, auf die unter allen Bedingungen Verlass ist.',
      precision: 'Ingenieurmäßige Präzision',
      precisionDesc: 'Wir planen und montieren millimetergenau, um Fehlerquellen präventiv auszuschließen.',
      safety: 'Sicherheit & Konformität',
      safetyDesc: 'Wir arbeiten nach strengsten Arbeitsschutzbestimmungen und europäischen Industrienormen.',
    },
    services: {
      header: 'UNSERE LEISTUNGEN',
      title: 'Ganzheitliche Engineering-Lösungen',
      subtitle: 'Wir gewährleisten höchste Professionalität in jeder Phase des Lebenszyklus einer Telekommunikationsanlage.',
      serv1Title: 'Telekom-Container',
      serv1Desc: 'Komplettbau, Modernisierung, Sanierung und wiederkehrende technische Prüfungen von Technikcontainern (Sheltern). Wir sichern die Dichtigkeit, thermische Isolation und optimale Betriebsbedingungen für Sendetechnik.',
      serv2Title: 'Klimatisierung (HVAC)',
      serv2Desc: 'Montage, Service und Wartung komplexer Klimasysteme – einschließlich hocheffizienter Präzisionsklimatisierung. Wir sichern konstante Raumtemperaturen und Feuchtigkeitswerte zum Schutz kritischer Elektronik.',
      serv3Title: 'Unterbrechungsfreie Stromversorgung',
      serv3Desc: 'Installation, Inbetriebnahme und Wartung ausfallsicherer USV-Anlagen und Netzersatzanlagen (Stromaggregate). Wir schützen die Stationen vor unerwarteten Netzstörungen und Blackouts.',
      serv4Title: 'Schaltschränke',
      serv4Desc: 'Vorfertigung, Montage und fachgerechter Anschluss von Energieverteilern und Automatisierungsschränken. Wir verbauen ausschließlich zertifizierte Qualitätskomponenten führender Hersteller wie Hager, Socomec und Vertiv.',
    },
    whyUs: {
      header: 'WARUM WIR',
      title: 'Das Fundament für starkes Vertrauen',
      point1Title: 'Familienwerte & volles Engagement',
      point1Desc: 'Als Familienunternehmen übernehmen wir für jedes Projekt persönliche Verantwortung. Unser Name steht für absolute Handschlagqualität.',
      point2Title: 'Ingenieurkompetenz & Zulassungen',
      point2Desc: 'Unser Team verfügt über umfassende Fachzertifikate, spezialisierte Elektro-Zulassungen (SEP) und langjährige Branchenerfahrung.',
      point3Title: 'Sehr kurze Reaktionszeit',
      point3Desc: 'Wir verstehen, dass jede Minute Netzausfall gravierende Folgen hat. Wir sind personell und logistisch auf Soforteinsätze eingestellt.',
      point4Title: 'Standard-Konformität in PL & DE',
      point4Desc: 'Wir beherrschen die gesetzlichen und technischen Vorgaben in Polen und Deutschland. Alle Arbeiten erfolgen normgerecht.',
      projectsTitle: 'Unsere Referenzen',
      projectsDesc: 'Wir haben erfolgreich Stromversorgungs- und Klimatechnik-Upgrades für wichtige Mobilfunkknotenpunkte in Polen und Deutschland durchgeführt. Wir sind spezialisiert auf Arbeiten in Hochsicherheitsbereichen ohne Betriebsunterbrechung. Unsere maßgeschneiderten, vorgefertigten Schaltschränke versorgen Sendesysteme zuverlässig, während die regelmäßige Wartung der Telekommunikationscontainer unvorhergesehene Ausfälle für unsere Geschäftspartner verhindert.',
      realizationsTitle: 'Beispielhafte Realisierungen',
      realizationsSubtitle: 'Sehen Sie sich die Ergebnisse unserer professionellen Ingenieurarbeiten an Telekommunikationsanlagen an.',
      realization1Title: 'Sanierung von Funk-Containern',
      realization1Desc: 'Vollständige Regeneration der thermischen Dichtungen, Kabelneuordnung und technische Wartung der Außenhülle.',
      realization2Title: 'Präzisions-Klimaanlagen Installation',
      realization2Desc: 'Montage von Vertiv Präzisions-Kühlsystemen, voll integriert in das bestehende Alarm- und Steuerungssystem.',
      realization3Title: 'Unterbrechungsfreie USV-Systeme',
      realization3Desc: 'Implementierung modularer USV-Anlagen und automatischer Netzumschalter (ATS) für Mobilfunkstationen.',
      realization4Title: 'Schaltschrankbau & Prefabrikation',
      realization4Desc: 'Planung und präzise Montage von Energieverteilern basierend auf hochwertigen Komponenten von Hager und Socomec.',
    },
    contact: {
      header: 'KONTAKT',
      title: 'Lassen Sie uns Ihr Projekt planen',
      subtitle: 'Haben Sie Fragen, wünschen Sie ein Angebot oder planen Sie ein Service-Intervall? Schreiben Sie uns oder rufen Sie uns direkt an. Wir reagieren unverzüglich.',
      formName: 'Vor- und Nachname',
      formEmail: 'E-Mail-Adresse',
      formAddress: 'Objektstandort / Adresse',
      formMessage: 'Ihre Nachricht',
      formSubmit: 'Nachricht senden',
      formSubmitting: 'Nachricht wird gesendet...',
      formSuccess: 'Ihre Nachricht wurde erfolgreich übermittelt! Vielen Dank für Ihr Vertrauen. Wir werden uns schnellstmöglich bei Ihnen melden.',
      infoPhone: 'Direktrufnummer',
      infoEmail: 'E-Mail-Adresse',
      infoArea: 'Einsatzgebiet',
      infoAreaDesc: 'Polen & Deutschland (Mobile Serviceteams im Dauereinsatz)',
      infoCompanyDetails: 'Unternehmensdaten',
      infoWojtek: 'Wojciech Miga — Inhaber',
    },
    footer: {
      copyright: 'Eminstall',
      rights: 'Alle Rechte vorbehalten.',
    },
  },
};
