import { Language, TRANSLATIONS, COMPANY_DATA } from './data';

export interface ServiceRouteConfig {
  id: string;
  slugs: Record<Language, string>;
  seoKeywords: Record<Language, string>;
}

export const SERVICE_ROUTES: ServiceRouteConfig[] = [
  {
    id: 'power-systems',
    slugs: {
      PL: 'systemy-zasilania-ups-dc',
      EN: 'power-systems-ups-dc',
      DE: 'unterbrechungsfreie-stromversorgung-dc',
    },
    seoKeywords: {
      PL: 'siłownie dc 48v, baterie vrla agm, zasilanie gwarantowane ups, pomiary rezystancji baterii, stacje bazowe, szczecinek, zachodniopomorskie',
      EN: 'dc power plants 48v, vrla agm batteries, ups systems, battery resistance testing, telecom power backup, poland, germany',
      DE: 'dc stromversorgungsanlagen 48v, usv anlagen, vrla agm batterien, innenwiderstandsmessung, telekom stromversorgung, polen, deutschland',
    },
  },
  {
    id: 'freecooling-hvac',
    slugs: {
      PL: 'klimatyzacja-precyzyjna-freecooling',
      EN: 'precision-cooling-freecooling',
      DE: 'klimatisierung-freecooling',
    },
    seoKeywords: {
      PL: 'klimatyzacja precyzyjna szczecinek, freecooling, wentylacja swobodna, f-gazy szczecinek, montaż klimatyzacji vertiv, chłodzenie serwerowni, zachodniopomorskie',
      EN: 'precision air conditioning, freecooling systems, f-gas certification, vertiv hvac installation, server room cooling, data centers',
      DE: 'präzisionsklimaanlagen, freie kühlung freecooling, f-gase zertifizierung, vertiv klimageräte, serverraum kühlung, telekom container kühlung',
    },
  },
  {
    id: 'switchboards',
    slugs: {
      PL: 'prefabrykacja-rozdzielnic-pomiary-sep',
      EN: 'switchboards-sep-measurements',
      DE: 'schaltschrankbau-pruefungen',
    },
    seoKeywords: {
      PL: 'prefabrykacja rozdzielnic szczecinek, pomiary elektryczne sep szczecinek, szafy sterownicze nn, protokoły odbiorcze, hager, zachodniopomorskie',
      EN: 'switchboard prefabrication, electrical measurements, distribution boards, testing protocols, hager panels, ce conformity',
      DE: 'schaltschrankbau niederspannung, elektroprüfungen dguv v3, verteilerbau, prüfprotokolle, hager, ce konformität',
    },
  },
  {
    id: 'reactive-power',
    slugs: {
      PL: 'kompensatory-mocy-biernej',
      EN: 'reactive-power-compensation',
      DE: 'blindleistungskompensation',
    },
    seoKeywords: {
      PL: 'kompensatory mocy biernej, redukcja opłat za energię, baterie kondensatorów, dławiki kompensacyjne, szczecinek, pomorskie',
      EN: 'reactive power compensation, capacitor banks, harmonic detuning reactors, power factor correction, energy efficiency',
      DE: 'blindleistungskompensation, kondensatorbatterien, verdrosselte filterkreise, blindstromreduzierung, netzqualität',
    },
  },
  {
    id: 'telecom-containers',
    slugs: {
      PL: 'kontenery-technologiczne-pop',
      EN: 'telecom-containers-infrastructure',
      DE: 'telekom-container-infrastruktur',
    },
    seoKeywords: {
      PL: 'kontenery technologiczne, węzły pop, podłogi podniesione, podłogi techniczne, szafy rack 19, trasy kablowe, szczecinek',
      EN: 'telecom shelter containers, pop sites, raised access flooring, rack cabinets, cable tray installation, server shelters',
      DE: 'telekom container, pop knotenpunkte, doppelboden technik, 19 zoll racks, kabeltrassen montage, technikcontainer ausbau',
    },
  },
  {
    id: 'facility-maintenance',
    slugs: {
      PL: 'utrzymanie-obiektow-facility-management',
      EN: 'facility-management-maintenance',
      DE: 'instandhaltung-facility-management',
    },
    seoKeywords: {
      PL: 'facility management szczecinek, utrzymanie infrastruktury krytycznej, przeglądy okresowe, serwis 24/7, nadzór techniczny',
      EN: 'critical facility management, preventive maintenance, 24/7 service, telecom site maintenance, emergency response',
      DE: 'facility management instandhaltung, wartung kritischer infrastrukturen, 24/7 service, funkstandorte wartung, sla bereitschaft',
    },
  },
  {
    id: 'industrial-lines',
    slugs: {
      PL: 'instalacje-przemyslowe-relokacje',
      EN: 'industrial-installations-relocation',
      DE: 'industrieanlagen-maschinenumzug',
    },
    seoKeywords: {
      PL: 'instalacje przemysłowe, okablowanie maszyn, relokacja linii produkcyjnych, montaż tras kablowych, przemysł, szczecinek',
      EN: 'industrial electrical installations, machine cabling, production line relocation, cable containment, factory machinery',
      DE: 'industrieinstallationen, maschinenverkabelung, produktionslinien umzug, kabeltragsysteme, industrieanlagen montage',
    },
  },
];

export const SERVICE_PATH_PREFIX: Record<Language, string> = {
  PL: '/uslugi/',
  EN: '/en/services/',
  DE: '/de/leistungen/',
};

export const HOME_PATHS: Record<Language, string> = {
  PL: '/',
  EN: '/en/',
  DE: '/de/',
};

export const BASE_URL = 'https://eminstall.pl';

export function getHomeUrl(lang: Language): string {
  return HOME_PATHS[lang];
}

export function getServiceUrl(serviceId: string, lang: Language): string {
  const service = SERVICE_ROUTES.find((s) => s.id === serviceId);
  if (!service) return getHomeUrl(lang);
  return `${SERVICE_PATH_PREFIX[lang]}${service.slugs[lang]}`;
}

export interface ParsedRoute {
  lang: Language;
  serviceId: string | null;
  isValid: boolean;
}

export function parsePath(rawPathname: string): ParsedRoute {
  // Normalize pathname (remove trailing slashes except root)
  const pathname = rawPathname.length > 1 && rawPathname.endsWith('/')
    ? rawPathname.slice(0, -1)
    : rawPathname;

  if (pathname === '' || pathname === '/') {
    return { lang: 'PL', serviceId: null, isValid: true };
  }
  if (pathname === '/en' || pathname === '/en/') {
    return { lang: 'EN', serviceId: null, isValid: true };
  }
  if (pathname === '/de' || pathname === '/de/') {
    return { lang: 'DE', serviceId: null, isValid: true };
  }

  // Check PL service paths
  if (pathname.startsWith('/uslugi/')) {
    const slug = pathname.replace('/uslugi/', '');
    const service = SERVICE_ROUTES.find((s) => s.slugs.PL === slug);
    if (service) {
      return { lang: 'PL', serviceId: service.id, isValid: true };
    }
  }

  // Check EN service paths
  if (pathname.startsWith('/en/services/')) {
    const slug = pathname.replace('/en/services/', '');
    const service = SERVICE_ROUTES.find((s) => s.slugs.EN === slug);
    if (service) {
      return { lang: 'EN', serviceId: service.id, isValid: true };
    }
  }

  // Check DE service paths
  if (pathname.startsWith('/de/leistungen/')) {
    const slug = pathname.replace('/de/leistungen/', '');
    const service = SERVICE_ROUTES.find((s) => s.slugs.DE === slug);
    if (service) {
      return { lang: 'DE', serviceId: service.id, isValid: true };
    }
  }

  return { lang: 'PL', serviceId: null, isValid: false };
}

export interface HreflangMap {
  pl: string;
  en: string;
  de: string;
  'x-default': string;
}

export function getHreflangs(serviceId: string | null): HreflangMap {
  if (!serviceId) {
    return {
      pl: `${BASE_URL}/`,
      en: `${BASE_URL}/en/`,
      de: `${BASE_URL}/de/`,
      'x-default': `${BASE_URL}/`,
    };
  }
  return {
    pl: `${BASE_URL}${getServiceUrl(serviceId, 'PL')}`,
    en: `${BASE_URL}${getServiceUrl(serviceId, 'EN')}`,
    de: `${BASE_URL}${getServiceUrl(serviceId, 'DE')}`,
    'x-default': `${BASE_URL}${getServiceUrl(serviceId, 'PL')}`,
  };
}

export interface RouteSeoMetadata {
  title: string;
  description: string;
  keywords: string;
  canonical: string;
  hreflangs: HreflangMap;
  lang: Language;
  htmlLang: string;
  ogLocale: string;
  serviceId: string | null;
  schemaJsonLd: object;
}

export function getRouteSeo(pathname: string): RouteSeoMetadata {
  const { lang, serviceId } = parsePath(pathname);
  const t = TRANSLATIONS[lang];
  const hreflangs = getHreflangs(serviceId);
  const htmlLang = lang.toLowerCase();
  const ogLocale = lang === 'PL' ? 'pl_PL' : lang === 'DE' ? 'de_DE' : 'en_US';

  if (!serviceId) {
    const canonical = `${BASE_URL}${getHomeUrl(lang)}`;
    const baseLocalBusiness = {
      '@context': 'https://schema.org',
      '@type': ['LocalBusiness', 'ProfessionalService', 'HVACBusiness'],
      name: COMPANY_DATA.name,
      alternateName: 'Eminstall',
      image: 'https://lh3.googleusercontent.com/pw/AP1GczNjDSsoC8JYlTw_s0i_cSsTsDtu6LNoIkz2gkXShhi8MdvZ8Jv6fRImOQxF0g7l3b3GOmxKcf6jV7lqXUNs57x9FPfbFvOuLpvyDx-kVvemFaLCr0k=w1000',
      url: canonical,
      telephone: COMPANY_DATA.contact.phone.raw,
      priceRange: '$$',
      email: COMPANY_DATA.contact.email,
      address: {
        '@type': 'PostalAddress',
        streetAddress: COMPANY_DATA.address.street,
        postalCode: COMPANY_DATA.address.postalCode,
        addressLocality: COMPANY_DATA.address.city,
        addressRegion: 'Zachodniopomorskie',
        addressCountry: 'PL',
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: 53.7075,
        longitude: 16.6994,
      },
      areaServed: [
        { '@type': 'City', name: 'Szczecinek' },
        { '@type': 'AdministrativeArea', name: 'Województwo zachodniopomorskie' },
        { '@type': 'AdministrativeArea', name: 'Województwo pomorskie' },
        { '@type': 'City', name: 'Koszalin' },
        { '@type': 'Country', name: 'Polska' },
        { '@type': 'Country', name: 'Niemcy' },
      ],
      description: t.seo.description,
    };

    return {
      title: t.seo.title,
      description: t.seo.description,
      keywords: 'klimatyzacja szczecinek, klimatyzacje zachodniopomorskie, pomiary elektryczne sep, montaż klimatyzacji szczecinek, prefabrykacja rozdzielnic, szafy elektryczne, zasilanie gwarantowane ups, siłownie dc, eminstall tomasz miga',
      canonical,
      hreflangs,
      lang,
      htmlLang,
      ogLocale,
      serviceId: null,
      schemaJsonLd: baseLocalBusiness,
    };
  }

  // Specific service route
  const service = SERVICE_ROUTES.find((s) => s.id === serviceId)!;
  const itemTrans = t.workScope.items[serviceId as keyof typeof t.workScope.items];
  const canonical = `${BASE_URL}${getServiceUrl(serviceId, lang)}`;

  const serviceTitle = `${itemTrans.title} | ${COMPANY_DATA.name} Szczecinek`;
  const serviceDesc = itemTrans.shortDesc;

  const breadcrumbsList = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: lang === 'PL' ? 'Strona główna' : lang === 'DE' ? 'Startseite' : 'Home',
        item: `${BASE_URL}${getHomeUrl(lang)}`,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: t.nav.scopeAndRealizations,
        item: `${BASE_URL}${getHomeUrl(lang)}#zakres-prac`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: itemTrans.title,
        item: canonical,
      },
    ],
  };

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: itemTrans.title,
    description: itemTrans.fullDesc,
    provider: {
      '@type': ['LocalBusiness', 'ProfessionalService'],
      name: COMPANY_DATA.name,
      telephone: COMPANY_DATA.contact.phone.raw,
      url: BASE_URL,
    },
    areaServed: [
      { '@type': 'Country', name: 'Polska' },
      { '@type': 'Country', name: 'Niemcy' },
    ],
    serviceType: itemTrans.badge,
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: itemTrans.title,
      itemListElement: itemTrans.scopeList.map((step) => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: step,
        },
      })),
    },
  };

  return {
    title: serviceTitle,
    description: serviceDesc,
    keywords: service.seoKeywords[lang],
    canonical,
    hreflangs,
    lang,
    htmlLang,
    ogLocale,
    serviceId,
    schemaJsonLd: {
      '@context': 'https://schema.org',
      '@graph': [breadcrumbsList, serviceSchema],
    },
  };
}

/**
 * Returns all static paths to pre-render for SSG
 */
export function getAllStaticRoutes(): string[] {
  const routes: string[] = [
    '/',
    '/en/',
    '/de/',
  ];

  SERVICE_ROUTES.forEach((service) => {
    routes.push(getServiceUrl(service.id, 'PL'));
    routes.push(getServiceUrl(service.id, 'EN'));
    routes.push(getServiceUrl(service.id, 'DE'));
  });

  return routes;
}
