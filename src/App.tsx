import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Shield,
  Zap,
  Wind,
  Layers,
  Globe,
  Clock,
  HardHat,
  Phone,
  Mail,
  MapPin,
  CheckCircle2,
  Menu,
  X,
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  Server,
  Building,
  Check,
  ExternalLink,
  Briefcase,
  Award,
  Sparkles
} from 'lucide-react';
import { TRANSLATIONS, Language } from './data';

import realization1Img from './Kontener-Eminstall1.jpg';
import realization2Img from './Kilma-Eminstall2.jpg';
import realization3Img from './battery_rack_1783491532019.jpg';
import realization4Img from './Rozdzielnia-Eminstall4.jpg';
import realization5Img from './Protokol-Eminstall5.png';

export default function App() {
  const [lang, setLang] = useState<Language>('PL');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<number | null>(null);
  const [visibleCount, setVisibleCount] = useState(4);
  const [startIndex, setStartIndex] = useState(0);

  const t = TRANSLATIONS[lang];

  // Dynamic responsive breakpoint observer for realizations carousel
  useEffect(() => {
    const updateCount = () => {
      if (window.innerWidth >= 1024) {
        setVisibleCount(4);
      } else if (window.innerWidth >= 640) {
        setVisibleCount(2);
      } else {
        setVisibleCount(1);
      }
    };
    updateCount();
    window.addEventListener('resize', updateCount);
    return () => window.removeEventListener('resize', updateCount);
  }, []);

  // Dynamic SEO & Accessibility Language Synchronization
  useEffect(() => {
    // Synchronize HTML lang attribute
    document.documentElement.lang = lang.toLowerCase();

    // Synchronize Dynamic Document Title based on selected locale
    document.title = lang === 'PL' 
      ? 'Eminstall | Szafy elektryczne, Klimatyzacja precyzyjna, Kontenery telekomunikacyjne' 
      : lang === 'EN' 
      ? 'Eminstall | Electrical Cabinets, Precision Cooling, Telecom Containers' 
      : 'Eminstall | Schaltschränke, Präzisionskühlung, Telekommunikationscontainer';

    // Update dynamic SEO Meta Description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', lang === 'PL' 
      ? 'Profesjonalne usługi inżynieryjne dla telekomunikacji w Polsce i Niemczech. Prefabrykacja szaf elektrycznych (Hager, Socomec), montaż klimatyzacji precyzyjnej Vertiv, zasilanie gwarantowane UPS, serwis kontenerów.'
      : lang === 'EN'
      ? 'Professional engineering services for telecommunications in Poland and Germany. Prefabrication of electrical cabinets, installation of Vertiv precision cooling, UPS power systems, shelter retrofits.'
      : 'Professionelle Ingenieurdienstleistungen für die Telekommunikation in Polen und Deutschland. Schaltschrankbau, Vertiv Präzisionskühlung, USV-Anlagen, Container-Sanierung.'
    );
  }, [lang]);

  // Accessibility: Handle Escape key press to dismiss modal dialog
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedProject(null);
      }
    };
    if (selectedProject !== null) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedProject]);

  const handleScrollTo = (id: string) => {
    setIsMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // height of sticky navbar
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  // Pre-configured list of sample projects with high quality Unsplash & Google Photos images
  const realizationsData = [
    {
      id: 1,
      image: realization1Img,
      category: lang === 'PL' ? 'KONTENERY TELEKOMUNIKACYJNE' : lang === 'EN' ? 'TELECOM SHELTERS' : 'TELEKOM-CONTAINER',
      title: t.whyUs.realization1Title,
      desc: t.whyUs.realization1Desc,
      stats: 'SEP Certified • 24h Audit • Poland / Germany',
    },
    {
      id: 2,
      image: realization2Img,
      category: lang === 'PL' ? 'KLIMATYZACJA HVAC' : lang === 'EN' ? 'PRECISION COOLING' : 'PRÄZISIONSKÜHLUNG',
      title: t.whyUs.realization2Title,
      desc: t.whyUs.realization2Desc,
      stats: 'Vertiv • Precision HVAC • Continuous Control',
    },
    {
      id: 3,
      image: realization3Img,
      category: lang === 'PL' ? 'ZASILANIE KRYTYCZNE' : lang === 'EN' ? 'POWER & UPS' : 'USV-ANLAGEN',
      title: t.whyUs.realization3Title,
      desc: t.whyUs.realization3Desc,
      stats: 'Modular UPS • ATS Systems • Emergency Generators',
    },
    {
      id: 4,
      image: realization4Img,
      category: lang === 'PL' ? 'PREFABRYKACJA ROZDZIELNIC' : lang === 'EN' ? 'ELECTRICAL CABINETS' : 'SCHALTSCHRÄNKE',
      title: t.whyUs.realization4Title,
      desc: t.whyUs.realization4Desc,
      stats: 'Hager • Socomec • CE Standard Prefabrication',
    },
    {
      id: 5,
      image: realization5Img,
      category: lang === 'PL' ? 'PROTOKOŁY PRZEGLĄDÓW' : lang === 'EN' ? 'INSPECTION PROTOCOLS' : 'PRÜFPROTOKOLLE',
      title: t.whyUs.realization5Title,
      desc: t.whyUs.realization5Desc,
      stats: 'ISO Compliant • Full Technical Diagnostics • Electric Measurements',
    }
  ];

  // Safeguard: make sure the start index doesn't exceed the max bounds when screen size changes
  useEffect(() => {
    setStartIndex((prev) => {
      const maxIdx = Math.max(0, realizationsData.length - visibleCount);
      return Math.min(Math.max(0, prev), maxIdx);
    });
  }, [visibleCount, realizationsData.length]);

  return (
    <div className="relative min-h-screen w-full bg-[#F8FAFC] text-slate-800 font-sans selection:bg-orange-500 selection:text-white overflow-x-hidden antialiased">
      {/* Skip to Content link for keyboard-only screen reader navigation */}
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:bg-orange-500 focus:text-white focus:px-4 focus:py-2.5 focus:rounded-lg focus:shadow-lg focus:font-bold focus:outline-hidden focus:ring-2 focus:ring-orange-600"
      >
        {lang === 'PL' ? 'Przejdź do treści' : lang === 'EN' ? 'Skip to content' : 'Zum Hauptinhalt springen'}
      </a>

      {/* Background patterns */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f080_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f080_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-sky-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-[600px] h-[600px] bg-orange-500/5 rounded-full blur-[140px] pointer-events-none" />

      {/* STICKY NAVBAR */}
      <header className="sticky top-0 z-50 w-full border-b border-slate-200/80 bg-white/90 backdrop-blur-md shadow-xs transition-all duration-300">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Logo */}
          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center space-x-2.5 text-left focus:outline-hidden focus-visible:ring-2 focus-visible:ring-orange-500 rounded-lg p-1 cursor-pointer"
            id="logo-container"
            aria-label="Eminstall - Home / Powrót na górę"
          >
            <div className="relative flex h-11 w-11 items-center justify-center rounded-lg bg-gradient-to-br from-orange-500 to-amber-600 shadow-md shadow-orange-500/25">
              <span className="font-display text-xl font-bold text-white tracking-wider">E</span>
              <div className="absolute -right-1 -bottom-1 h-3.5 w-3.5 rounded-full border-2 border-white bg-orange-500" />
            </div>
            <div className="flex flex-col">
              <span className="font-display text-2xl font-bold tracking-tight text-slate-900 leading-none">
                Eminstall
              </span>
              <span className="mt-1 font-mono text-[9px] uppercase tracking-[0.2em] text-orange-600">
                Engineering Group
              </span>
            </div>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => handleScrollTo('o-nas')}
              className="text-sm font-medium text-slate-600 hover:text-orange-600 transition-colors cursor-pointer"
              id="nav-link-about"
            >
              {t.nav.about}
            </button>
            <button
              onClick={() => handleScrollTo('uslugi')}
              className="text-sm font-medium text-slate-600 hover:text-orange-600 transition-colors cursor-pointer"
              id="nav-link-services"
            >
              {t.nav.services}
            </button>
            <button
              onClick={() => handleScrollTo('dlaczego-my')}
              className="text-sm font-medium text-slate-600 hover:text-orange-600 transition-colors cursor-pointer"
              id="nav-link-why-us"
            >
              {t.nav.whyUs}
            </button>
            <button
              onClick={() => handleScrollTo('realizacje')}
              className="text-sm font-medium text-slate-600 hover:text-orange-600 transition-colors cursor-pointer"
              id="nav-link-realizations"
            >
              {t.whyUs.projectsTitle}
            </button>
            <button
              onClick={() => handleScrollTo('kontakt')}
              className="text-sm font-medium text-slate-600 hover:text-orange-600 transition-colors cursor-pointer"
              id="nav-link-contact"
            >
              {t.nav.contact}
            </button>
          </nav>

          {/* Language Switcher & Call To Action */}
          <div className="hidden md:flex items-center space-x-6">
            {/* Language Selector */}
            <div className="flex items-center space-x-1 bg-slate-100 p-1 rounded-lg border border-slate-200">
              {(['PL', 'EN', 'DE'] as Language[]).map((l) => (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-all cursor-pointer ${
                    lang === l
                      ? 'bg-orange-500 text-white shadow-xs'
                      : 'text-slate-500 hover:text-slate-900 hover:bg-slate-200/50'
                  }`}
                  id={`lang-btn-${l}`}
                >
                  {l}
                </button>
              ))}
            </div>

            {/* Quick Contact phone header */}
            <a
              href="tel:517715585"
              className="inline-flex items-center justify-center rounded-lg bg-slate-900 hover:bg-orange-600 px-4 py-2 text-sm font-semibold text-white transition-all cursor-pointer shadow-xs"
              id="header-phone-cta"
            >
              <Phone className="mr-2 h-3.5 w-3.5" />
              517 715 585
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center space-x-3 md:hidden">
            {/* Quick Language Toggle */}
            <div className="flex items-center space-x-1 bg-slate-100 p-0.5 rounded-lg border border-slate-200">
              {(['PL', 'EN', 'DE'] as Language[]).map((l) => (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  className={`px-1.5 py-0.5 text-[10px] font-bold rounded-sm cursor-pointer ${
                    lang === l
                      ? 'bg-orange-500 text-white'
                      : 'text-slate-500'
                  }`}
                  id={`lang-btn-mob-${l}`}
                >
                  {l}
                </button>
              ))}
            </div>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="rounded-lg p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 focus:outline-hidden focus-visible:ring-2 focus-visible:ring-orange-500 transition-all cursor-pointer"
              aria-label="Toggle menu"
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-menu-drawer"
              id="mobile-menu-toggle"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" aria-hidden="true" /> : <Menu className="h-6 w-6" aria-hidden="true" />}
            </button>
          </div>
        </div>

        {/* Mobile menu drawer */}
        {isMobileMenuOpen && (
          <div 
            className="md:hidden border-b border-slate-200 bg-white px-4 py-6 space-y-4 shadow-md animate-in fade-in slide-in-from-top-5 duration-200" 
            id="mobile-menu-drawer"
            role="navigation"
            aria-label="Mobile navigation"
          >
            <div className="grid grid-cols-1 gap-1">
              <button
                onClick={() => handleScrollTo('o-nas')}
                className="flex w-full items-center py-2.5 px-3 text-base font-semibold rounded-lg text-slate-700 hover:bg-slate-50 hover:text-orange-600 transition-all cursor-pointer"
                id="mobile-link-about"
              >
                {t.nav.about}
              </button>
              <button
                onClick={() => handleScrollTo('uslugi')}
                className="flex w-full items-center py-2.5 px-3 text-base font-semibold rounded-lg text-slate-700 hover:bg-slate-50 hover:text-orange-600 transition-all cursor-pointer"
                id="mobile-link-services"
              >
                {t.nav.services}
              </button>
              <button
                onClick={() => handleScrollTo('dlaczego-my')}
                className="flex w-full items-center py-2.5 px-3 text-base font-semibold rounded-lg text-slate-700 hover:bg-slate-50 hover:text-orange-600 transition-all cursor-pointer"
                id="mobile-link-why"
              >
                {t.nav.whyUs}
              </button>
              <button
                onClick={() => handleScrollTo('realizacje')}
                className="flex w-full items-center py-2.5 px-3 text-base font-semibold rounded-lg text-slate-700 hover:bg-slate-50 hover:text-orange-600 transition-all cursor-pointer"
                id="mobile-link-realizations"
              >
                {t.whyUs.projectsTitle}
              </button>
              <button
                onClick={() => handleScrollTo('kontakt')}
                className="flex w-full items-center py-2.5 px-3 text-base font-semibold rounded-lg text-slate-700 hover:bg-slate-50 hover:text-orange-600 transition-all cursor-pointer"
                id="mobile-link-contact"
              >
                {t.nav.contact}
              </button>
            </div>

            <div className="pt-4 border-t border-slate-100">
              <a
                href="tel:517715585"
                className="flex items-center justify-center w-full rounded-lg bg-orange-500 py-3 text-center text-sm font-bold text-white shadow-xs hover:bg-orange-600 transition-all"
                id="mobile-phone-cta"
              >
                <Phone className="mr-2 h-4 w-4" />
                +48 517 715 585
              </a>
            </div>
          </div>
        )}
      </header>

      {/* MAIN CONTENT AREA */}
      <main id="main-content" className="outline-hidden" tabIndex={-1}>

      {/* HERO SECTION */}
      <section className="relative overflow-hidden pt-12 pb-20 md:pt-20 md:pb-32 bg-linear-to-b from-white to-slate-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Content */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-7 space-y-6 md:space-y-8 text-center lg:text-left"
              id="hero-left-content"
            >
              {/* Badge */}
              <div className="inline-flex items-center space-x-2 rounded-full border border-orange-500/20 bg-orange-500/5 px-3.5 py-1.5 text-xs font-semibold tracking-wider text-orange-700 uppercase">
                <span className="flex h-2 w-2 rounded-full bg-orange-500 animate-pulse" />
                <span>{t.hero.badge}</span>
              </div>

              {/* Title */}
              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 leading-[1.1]">
                {t.hero.title}
              </h1>

              {/* Subtitle */}
              <p className="mx-auto lg:mx-0 max-w-2xl text-lg text-slate-600 font-light leading-relaxed">
                {t.hero.subtitle}
              </p>

              {/* Call to Actions */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <button
                  onClick={() => handleScrollTo('kontakt')}
                  className="group inline-flex w-full sm:w-auto items-center justify-center rounded-lg bg-orange-500 px-7 py-3.5 text-base font-bold text-white shadow-md hover:bg-orange-600 hover:shadow-lg hover:scale-[1.02] transition-all cursor-pointer"
                  id="hero-primary-cta"
                >
                  {t.hero.ctaPrimary}
                  <ArrowUpRight className="ml-2.5 h-5 w-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </button>
                <button
                  onClick={() => handleScrollTo('uslugi')}
                  className="inline-flex w-full sm:w-auto items-center justify-center rounded-lg bg-white px-7 py-3.5 text-base font-semibold text-slate-700 border border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition-all cursor-pointer"
                  id="hero-secondary-cta"
                >
                  {t.hero.ctaSecondary}
                </button>
              </div>
            </motion.div>

            {/* Right Schematic / Visual Display */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:col-span-5 relative"
              id="hero-right-visual"
            >
              <div className="relative mx-auto max-w-[420px] lg:max-w-none">
                {/* Visual Glass Box */}
                <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 md:p-8 shadow-xl shadow-slate-100">
                  {/* Decorative corner elements */}
                  <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-orange-500/40" />
                  <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-orange-500/40" />
                  <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-orange-500/40" />
                  <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-orange-500/40" />

                  {/* Header Info */}
                  <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-6">
                    <div className="flex items-center space-x-2">
                      <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-500 animate-ping" />
                      <span className="flex h-2.5 w-2.5 absolute rounded-full bg-emerald-500" />
                      <span className="font-mono text-xs text-emerald-600 tracking-wider font-semibold uppercase">
                        {lang === 'PL' 
                          ? 'STATUS SYSTEMU: AKTYWNY' 
                          : lang === 'EN' 
                          ? 'SYSTEM STATUS: ACTIVE' 
                          : 'SYSTEMSTATUS: AKTIV'}
                      </span>
                    </div>
                    <span className="font-mono text-[10px] text-slate-400">EMIN_INFRA_2026</span>
                  </div>

                  {/* Visual Blueprint Flow */}
                  <div className="space-y-4">
                    {/* Step 1 */}
                    <div className="flex items-start space-x-3.5 p-3 rounded-lg bg-slate-50 border border-slate-100">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-orange-500/10 text-orange-600">
                        <Layers className="h-5 w-5" />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold tracking-wide uppercase text-slate-900">
                          {lang === 'PL' ? 'KONTENERY TELEKOMUNIKACYJNE' : lang === 'EN' ? 'TELECOM CONTAINERS' : 'TELEKOMUNIKATIONSCONTAINER'}
                        </h4>
                        <p className="text-[11px] text-slate-500 mt-0.5">
                          {lang === 'PL' ? 'Przeglądy okresowe i wykonawstwo' : lang === 'EN' ? 'Execution & periodic structure reviews' : 'Prüfungen & Ausführung'}
                        </p>
                      </div>
                    </div>

                    {/* Connector */}
                    <div className="w-0.5 h-3.5 bg-slate-200 ml-8" />

                    {/* Step 2 */}
                    <div className="flex items-start space-x-3.5 p-3 rounded-lg bg-slate-50 border border-slate-100">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-orange-500/10 text-orange-600">
                        <Wind className="h-5 w-5" />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold tracking-wide uppercase text-slate-900">
                          {lang === 'PL' ? 'SYSTEMY KLIMATYZACJI' : lang === 'EN' ? 'HVAC SYSTEMS' : 'KLIMAANLAGEN'}
                        </h4>
                        <p className="text-[11px] text-slate-500 mt-0.5">
                          {lang === 'PL' ? 'Precyzyjna kontrola klimatu i serwis' : lang === 'EN' ? 'Precision climate control & maintenance' : 'Präzisionsklimatisierung & Wartung'}
                        </p>
                      </div>
                    </div>

                    {/* Connector */}
                    <div className="w-0.5 h-3.5 bg-slate-200 ml-8" />

                    {/* Step 3 */}
                    <div className="flex items-start space-x-3.5 p-3 rounded-lg bg-slate-50 border border-slate-100">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-orange-500/10 text-orange-600">
                        <Zap className="h-5 w-5" />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold tracking-wide uppercase text-slate-900">
                          {lang === 'PL' ? 'ZASILANIE I SZAFY' : lang === 'EN' ? 'POWER & CABINETS' : 'STROM & SCHRÄNKE'}
                        </h4>
                        <p className="text-[11px] text-slate-500 mt-0.5">
                          {lang === 'PL' ? 'Montaż UPS, Hager, Socomec i Vertiv' : lang === 'EN' ? 'UPS, Hager, Socomec & Vertiv assembly' : 'Montage von USV, Hager, Socomec & Vertiv'}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Background glow beneath schematic */}
                <div className="absolute -inset-2 bg-gradient-to-r from-orange-500/5 to-sky-500/5 rounded-2xl blur-lg -z-10" />
              </div>
            </motion.div>
          </div>

          {/* Quick Stats Grid */}
          <div className="mt-16 md:mt-24 grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6" id="stats-grid">
            <motion.div 
              whileHover={{ y: -3 }}
              className="p-4 md:p-6 rounded-xl bg-white border border-slate-200 shadow-xs text-center lg:text-left"
            >
              <span className="block font-display text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">{t.stats.stat1Val}</span>
              <span className="block mt-1.5 font-mono text-xs uppercase tracking-wider text-slate-500">{t.stats.stat1Lbl}</span>
            </motion.div>
            <motion.div 
              whileHover={{ y: -3 }}
              className="p-4 md:p-6 rounded-xl bg-white border border-slate-200 shadow-xs text-center lg:text-left"
            >
              <span className="block font-display text-3xl md:text-4xl font-bold text-orange-600 tracking-tight">{t.stats.stat2Val}</span>
              <span className="block mt-1.5 font-mono text-xs uppercase tracking-wider text-slate-500">{t.stats.stat2Lbl}</span>
            </motion.div>
            <motion.div 
              whileHover={{ y: -3 }}
              className="p-4 md:p-6 rounded-xl bg-white border border-slate-200 shadow-xs text-center lg:text-left"
            >
              <span className="block font-display text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">{t.stats.stat3Val}</span>
              <span className="block mt-1.5 font-mono text-xs uppercase tracking-wider text-slate-500">{t.stats.stat3Lbl}</span>
            </motion.div>
            <motion.div 
              whileHover={{ y: -3 }}
              className="p-4 md:p-6 rounded-xl bg-white border border-slate-200 shadow-xs text-center lg:text-left"
            >
              <span className="block font-display text-xl md:text-2xl font-bold text-slate-800 tracking-tight mt-1 mb-1">{t.stats.stat4Val}</span>
              <span className="block mt-1.5 font-mono text-xs uppercase tracking-wider text-slate-500">{t.stats.stat4Lbl}</span>
            </motion.div>
          </div>
        </div>
      </section>

      {/* O NAS (ABOUT US) SECTION */}
      <section id="o-nas" className="relative py-20 md:py-28 border-t border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left Side: Illustration Box */}
            <div className="lg:col-span-5 order-2 lg:order-1">
              <div className="relative" id="about-graphic">
                {/* Structural Graphic Representation */}
                <div className="relative rounded-2xl border border-slate-200 bg-slate-50 p-8 overflow-hidden shadow-sm">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/5 rounded-full blur-2xl" />
                  
                  {/* Decorative blueprint Grid */}
                  <div className="absolute inset-0 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] bg-[size:1.5rem_1.5rem] opacity-40" />

                  <div className="relative space-y-6">
                    <div className="flex items-center space-x-3 border-b border-slate-200 pb-4">
                      <Building className="text-orange-500 h-6 w-6" />
                      <div>
                        <span className="block text-xs text-slate-400 uppercase tracking-widest font-mono">EMINSTALL ENGINEERING</span>
                        <span className="block text-sm font-bold text-slate-950 uppercase tracking-wide">Infrastructure Specialists</span>
                      </div>
                    </div>

                    <div className="space-y-4 text-sm text-slate-600">
                      <div className="flex items-start space-x-3">
                        <div className="mt-1 flex h-5 w-5 items-center justify-center rounded-full bg-orange-500/10 text-orange-600 shrink-0">
                          <Check className="h-3 w-3" />
                        </div>
                        <p><strong className="text-slate-900">{t.about.precision}:</strong> {t.about.precisionDesc}</p>
                      </div>

                      <div className="flex items-start space-x-3">
                        <div className="mt-1 flex h-5 w-5 items-center justify-center rounded-full bg-orange-500/10 text-orange-600 shrink-0">
                          <Check className="h-3 w-3" />
                        </div>
                        <p><strong className="text-slate-900">{t.about.safety}:</strong> {t.about.safetyDesc}</p>
                      </div>
                    </div>

                    {/* Family credentials badge */}
                    <div className="mt-6 pt-4 border-t border-slate-200 flex items-center space-x-3 bg-white p-3.5 rounded-lg border border-slate-100 shadow-xs">
                      <HardHat className="text-orange-600 h-5 w-5 shrink-0" />
                      <span className="text-xs text-slate-500 leading-normal">
                        {lang === 'PL' 
                          ? 'Dwuetapowa kontrola inżynieryjna nad każdym projektem.' 
                          : lang === 'EN' 
                          ? 'Two-stage engineering control over every single project.' 
                          : 'Zweistufige ingenieurtechnische Kontrolle über jedes Projekt.'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Outer offset frame */}
                <div className="absolute -bottom-3 -right-3 h-full w-full rounded-2xl border border-slate-200 -z-10" />
              </div>
            </div>

            {/* Right Side: Text Context */}
            <div className="lg:col-span-7 space-y-6 order-1 lg:order-2" id="about-text-content">
              <div className="space-y-2">
                <span className="text-xs font-bold tracking-widest text-orange-600 uppercase font-mono">{t.about.header}</span>
                <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-slate-900">{t.about.title}</h2>
              </div>

              <div className="space-y-4 text-slate-600 font-light leading-relaxed text-base">
                <p>{t.about.p1}</p>
                <p>{t.about.p2}</p>
              </div>

              {/* Core Values Highlight */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-100">
                <div className="p-4 rounded-lg bg-slate-50 border border-slate-100">
                  <div className="h-8 w-8 rounded bg-orange-500/10 flex items-center justify-center text-orange-600 mb-2.5">
                    <Shield className="h-4 w-4" />
                  </div>
                  <h4 className="font-bold text-slate-900 text-sm mb-1">{t.about.precision}</h4>
                  <p className="text-xs text-slate-500 leading-normal">{t.about.precisionDesc}</p>
                </div>

                <div className="p-4 rounded-lg bg-slate-50 border border-slate-100">
                  <div className="h-8 w-8 rounded bg-orange-500/10 flex items-center justify-center text-orange-600 mb-2.5">
                    <Globe className="h-4 w-4" />
                  </div>
                  <h4 className="font-bold text-slate-900 text-sm mb-1">{t.about.safety}</h4>
                  <p className="text-xs text-slate-500 leading-normal">{t.about.safetyDesc}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* NEW PORTFOLIO / REALIZATIONS PHOTOS GALLERY SECTION */}
      <section id="realizacje" className="relative py-20 md:py-28 border-t border-slate-200 bg-slate-50/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-10">
            <span className="text-xs font-bold tracking-widest text-orange-600 uppercase font-mono">{t.whyUs.projectsTitle}</span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-slate-900">{t.whyUs.realizationsTitle}</h2>
            <div className="h-0.5 w-12 bg-orange-500 mx-auto my-4" />
            <p className="text-slate-600 text-sm md:text-base font-light">{t.whyUs.realizationsSubtitle}</p>
          </div>

          {/* Slider Navigation Buttons */}
          <div className="flex justify-center items-center gap-4 mb-8">
            <button
              onClick={() => setStartIndex((prev) => Math.max(0, prev - 1))}
              disabled={startIndex === 0}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 shadow-2xs hover:border-orange-500 hover:text-orange-600 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:border-slate-200 disabled:hover:text-slate-600 transition-all cursor-pointer"
              aria-label={lang === 'PL' ? 'Poprzednia realizacja' : lang === 'EN' ? 'Previous realization' : 'Vorherige Realisierung'}
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <span className="text-xs font-mono font-bold text-slate-500 select-none bg-white border border-slate-200/60 px-3 py-1.5 rounded-full shadow-2xs">
              {startIndex + 1} - {Math.min(realizationsData.length, startIndex + visibleCount)} / {realizationsData.length}
            </span>
            <button
              onClick={() => setStartIndex((prev) => Math.min(realizationsData.length - visibleCount, prev + 1))}
              disabled={startIndex >= realizationsData.length - visibleCount}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 shadow-2xs hover:border-orange-500 hover:text-orange-600 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:border-slate-200 disabled:hover:text-slate-600 transition-all cursor-pointer"
              aria-label={lang === 'PL' ? 'Następna realizacja' : lang === 'EN' ? 'Next realization' : 'Nächste Realisierung'}
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>

          {/* Interactive Photo Gallery Grid (Filtered by startIndex and visibleCount) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6" id="realizations-gallery-grid">
            <AnimatePresence mode="popLayout">
              {realizationsData.slice(startIndex, startIndex + visibleCount).map((project) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.35 }}
                  onClick={() => setSelectedProject(project.id)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setSelectedProject(project.id);
                    }
                  }}
                  className="group cursor-pointer overflow-hidden rounded-xl border border-slate-200 bg-white p-2 shadow-xs transition-all hover:border-orange-500 hover:shadow-md focus:outline-hidden focus-visible:ring-2 focus-visible:ring-orange-500"
                  role="button"
                  tabIndex={0}
                  aria-haspopup="dialog"
                  aria-expanded={selectedProject === project.id}
                  aria-label={`${lang === 'PL' ? 'Szczegóły projektu' : lang === 'EN' ? 'Project details' : 'Projektdetails'}: ${project.title}`}
                >
                  {/* Image Container with Hover zoom */}
                  <div className="relative aspect-4/3 overflow-hidden rounded-lg bg-slate-100">
                    <img
                      src={project.image}
                      alt={project.title}
                      referrerPolicy="no-referrer"
                      className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                    />
                    {/* Subtle hover overlay */}
                    <div className="absolute inset-0 bg-slate-900/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <span className="bg-white/95 text-slate-900 text-xs font-bold px-3 py-1.5 rounded-full shadow-sm flex items-center gap-1.5">
                        <Sparkles className="h-3 w-3 text-orange-500" />
                        {lang === 'PL' ? 'Szczegóły' : lang === 'EN' ? 'Details' : 'Details'}
                      </span>
                    </div>
                  </div>

                  {/* Info Area */}
                  <div className="p-3.5 space-y-1.5">
                    <span className="block text-[9px] font-mono font-bold uppercase tracking-wider text-orange-600">
                      {project.category}
                    </span>
                    <h3 className="font-bold text-sm text-slate-900 group-hover:text-orange-600 transition-colors line-clamp-1">
                      {project.title}
                    </h3>
                    <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                      {project.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        {/* Gallery Lightbox Modal */}
        <AnimatePresence>
          {selectedProject !== null && (() => {
            const currentProj = realizationsData.find(p => p.id === selectedProject);
            if (!currentProj) return null;
            return (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedProject(null)}
                className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-xs"
                role="dialog"
                aria-modal="true"
                aria-labelledby="modal-title"
              >
                <motion.div
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.95, opacity: 0 }}
                  onClick={(e) => e.stopPropagation()}
                  className="relative w-full max-w-lg md:max-w-5xl max-h-[90vh] md:max-h-[85vh] overflow-y-auto rounded-2xl bg-white p-4 md:p-8 shadow-2xl"
                >
                  <button
                    onClick={() => setSelectedProject(null)}
                    className="absolute top-4 right-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-slate-900/85 text-white hover:bg-orange-600 transition-colors focus:outline-hidden focus-visible:ring-2 focus-visible:ring-orange-500 cursor-pointer shadow-md"
                    aria-label={lang === 'PL' ? 'Zamknij szczegóły' : lang === 'EN' ? 'Close details' : 'Details schließen'}
                  >
                    <X className="h-5 w-5" />
                  </button>

                  <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center pt-2">
                    <div className="md:col-span-7 rounded-xl overflow-hidden bg-slate-50 border border-slate-100/80 flex items-center justify-center p-1 md:p-2 max-h-[60vh] md:max-h-[70vh]">
                      <img
                        src={currentProj.image}
                        alt={currentProj.title}
                        referrerPolicy="no-referrer"
                        className="w-full h-auto max-h-[55vh] md:max-h-[68vh] object-contain rounded-lg shadow-2xs"
                      />
                    </div>
                    <div className="md:col-span-5 space-y-6 py-2">
                      <div className="space-y-1">
                        <span className="inline-block text-[9px] font-mono font-bold uppercase tracking-wider bg-orange-500/10 text-orange-700 px-2.5 py-0.5 rounded-full">
                          {currentProj.category}
                        </span>
                        <h3 id="modal-title" className="font-display text-xl font-bold text-slate-900 leading-tight">{currentProj.title}</h3>
                      </div>
                      
                      <p className="text-sm text-slate-600 leading-relaxed">
                        {currentProj.desc}
                      </p>

                      <div className="pt-4 border-t border-slate-100 space-y-1">
                        <span className="block text-[9px] font-mono uppercase tracking-widest text-slate-400">
                          {lang === 'PL' ? 'SPECYFIKACJA' : lang === 'EN' ? 'SPECIFICATION' : 'SPEZIFIKATION'}
                        </span>
                        <span className="block text-xs font-semibold text-slate-700">
                          {currentProj.stats}
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            );
          })()}
        </AnimatePresence>
      </section>

      {/* USŁUGI (SERVICES) SECTION */}
      <section id="uslugi" className="relative py-20 md:py-28 border-t border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-16" id="services-header">
            <span className="text-xs font-bold tracking-widest text-orange-600 uppercase font-mono">{t.services.header}</span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-slate-900">{t.services.title}</h2>
            <div className="h-0.5 w-12 bg-orange-500 mx-auto my-4" />
            <p className="text-slate-600 text-sm md:text-base font-light">{t.services.subtitle}</p>
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8" id="services-grid">
            {/* Service 1: Telecom Containers */}
            <motion.div 
              whileHover={{ y: -5 }}
              className="group relative rounded-xl border border-slate-200 bg-white p-6 md:p-8 transition-all hover:border-orange-500/50 hover:shadow-lg shadow-xs"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-orange-500/[0.01] rounded-bl-3xl group-hover:bg-orange-500/[0.02] transition-all" />
              
              <div className="flex items-center space-x-4 mb-5">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-orange-500/10 text-orange-600 group-hover:bg-orange-500 group-hover:text-white transition-all">
                  <Layers className="h-6 w-6" />
                </div>
                <h3 className="font-display text-xl font-bold text-slate-900 group-hover:text-orange-600 transition-colors">
                  {t.services.serv1Title}
                </h3>
              </div>
              <p className="text-slate-600 font-light text-sm leading-relaxed mb-6">
                {t.services.serv1Desc}
              </p>
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400">
                  {lang === 'PL' ? 'KATEGORIA: INFRASTRUKTURA' : lang === 'EN' ? 'CATEGORY: INFRASTRUCTURE' : 'KATEGORIE: INFRASTRUKTUR'}
                </span>
                <span className="text-xs font-semibold text-orange-600 flex items-center gap-1">
                  {lang === 'PL' ? 'Pełna konserwacja' : lang === 'EN' ? 'Full maintenance' : 'Komplette Wartung'} <ChevronRight className="h-3 w-3" />
                </span>
              </div>
            </motion.div>

            {/* Service 2: Klimatyzacja HVAC */}
            <motion.div 
              whileHover={{ y: -5 }}
              className="group relative rounded-xl border border-slate-200 bg-white p-6 md:p-8 transition-all hover:border-orange-500/50 hover:shadow-lg shadow-xs"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-orange-500/[0.01] rounded-bl-3xl group-hover:bg-orange-500/[0.02] transition-all" />

              <div className="flex items-center space-x-4 mb-5">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-orange-500/10 text-orange-600 group-hover:bg-orange-500 group-hover:text-white transition-all">
                  <Wind className="h-6 w-6" />
                </div>
                <h3 className="font-display text-xl font-bold text-slate-900 group-hover:text-orange-600 transition-colors">
                  {t.services.serv2Title}
                </h3>
              </div>
              <p className="text-slate-600 font-light text-sm leading-relaxed mb-6">
                {t.services.serv2Desc}
              </p>
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400">
                  {lang === 'PL' ? 'KATEGORIA: SYSTEMY CHŁODZENIA' : lang === 'EN' ? 'CATEGORY: COOLING SYSTEMS' : 'KATEGORIE: KÜHLSYSTEME'}
                </span>
                <span className="text-xs font-semibold text-orange-600 flex items-center gap-1">
                  {lang === 'PL' ? 'Klimatyzacja precyzyjna' : lang === 'EN' ? 'Precision cooling' : 'Präzisionskühlung'} <ChevronRight className="h-3 w-3" />
                </span>
              </div>
            </motion.div>

            {/* Service 3: Zasilanie gwarantowane */}
            <motion.div 
              whileHover={{ y: -5 }}
              className="group relative rounded-xl border border-slate-200 bg-white p-6 md:p-8 transition-all hover:border-orange-500/50 hover:shadow-lg shadow-xs"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-orange-500/[0.01] rounded-bl-3xl group-hover:bg-orange-500/[0.02] transition-all" />

              <div className="flex items-center space-x-4 mb-5">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-orange-500/10 text-orange-600 group-hover:bg-orange-500 group-hover:text-white transition-all">
                  <Zap className="h-6 w-6" />
                </div>
                <h3 className="font-display text-xl font-bold text-slate-900 group-hover:text-orange-600 transition-colors">
                  {t.services.serv3Title}
                </h3>
              </div>
              <p className="text-slate-600 font-light text-sm leading-relaxed mb-6">
                {t.services.serv3Desc}
              </p>
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400">
                  {lang === 'PL' ? 'KATEGORIA: ENERGETYKA' : lang === 'EN' ? 'CATEGORY: POWER' : 'KATEGORIE: ENERGIE'}
                </span>
                <span className="text-xs font-semibold text-orange-600 flex items-center gap-1">
                  {lang === 'PL' ? 'Systemy UPS & Agregaty' : lang === 'EN' ? 'UPS & Generators' : 'USV & Generatoren'} <ChevronRight className="h-3 w-3" />
                </span>
              </div>
            </motion.div>

            {/* Service 4: Szafy elektryczne */}
            <motion.div 
              whileHover={{ y: -5 }}
              className="group relative rounded-xl border border-slate-200 bg-white p-6 md:p-8 transition-all hover:border-orange-500/50 hover:shadow-lg shadow-xs"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-orange-500/[0.01] rounded-bl-3xl group-hover:bg-orange-500/[0.02] transition-all" />

              <div className="flex items-center space-x-4 mb-5">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-orange-500/10 text-orange-600 group-hover:bg-orange-500 group-hover:text-white transition-all">
                  <Server className="h-6 w-6" />
                </div>
                <h3 className="font-display text-xl font-bold text-slate-900 group-hover:text-orange-600 transition-colors">
                  {t.services.serv4Title}
                </h3>
              </div>
              <p className="text-slate-600 font-light text-sm leading-relaxed mb-4">
                {t.services.serv4Desc}
              </p>
              
              {/* Core Partner Badges */}
              <div className="mb-6 flex flex-wrap gap-2 items-center">
                <span className="text-[10px] font-mono text-slate-600 bg-slate-100 border border-slate-200 px-2.5 py-1 rounded">Hager</span>
                <span className="text-[10px] font-mono text-slate-600 bg-slate-100 border border-slate-200 px-2.5 py-1 rounded">Socomec</span>
                <span className="text-[10px] font-mono text-slate-600 bg-slate-100 border border-slate-200 px-2.5 py-1 rounded">Vertiv</span>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400">
                  {lang === 'PL' ? 'KATEGORIA: PREFABRYKACJA' : lang === 'EN' ? 'CATEGORY: PREFABRICATION' : 'KATEGORIE: VORFERTIGUNG'}
                </span>
                <span className="text-xs font-semibold text-orange-600 flex items-center gap-1">
                  {lang === 'PL' ? 'Certyfikowane komponenty' : lang === 'EN' ? 'Certified components' : 'Zertifizierte Bauteile'} <ChevronRight className="h-3 w-3" />
                </span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* WHY US & PROJECTS HIGHLIGHT */}
      <section id="dlaczego-my" className="relative py-20 md:py-28 border-t border-slate-200 bg-slate-50/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            {/* Left side: Why Us Pillars */}
            <div className="lg:col-span-7 space-y-8" id="why-us-pillars">
              <div className="space-y-2">
                <span className="text-xs font-bold tracking-widest text-orange-600 uppercase font-mono">{t.whyUs.header}</span>
                <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-slate-900">{t.whyUs.title}</h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Pillar 1 */}
                <div className="space-y-2">
                  <div className="flex items-center space-x-2.5">
                    <span className="flex h-5 w-5 items-center justify-center rounded bg-orange-500/10 text-orange-600 text-xs font-bold font-mono">01</span>
                    <h3 className="font-bold text-slate-900 text-base">{t.whyUs.point1Title}</h3>
                  </div>
                  <p className="text-slate-600 text-sm leading-relaxed pl-7">
                    {t.whyUs.point1Desc}
                  </p>
                </div>

                {/* Pillar 2 */}
                <div className="space-y-2">
                  <div className="flex items-center space-x-2.5">
                    <span className="flex h-5 w-5 items-center justify-center rounded bg-orange-500/10 text-orange-600 text-xs font-bold font-mono">02</span>
                    <h3 className="font-bold text-slate-900 text-base">{t.whyUs.point2Title}</h3>
                  </div>
                  <p className="text-slate-600 text-sm leading-relaxed pl-7">
                    {t.whyUs.point2Desc}
                  </p>
                </div>

                {/* Pillar 3 */}
                <div className="space-y-2">
                  <div className="flex items-center space-x-2.5">
                    <span className="flex h-5 w-5 items-center justify-center rounded bg-orange-500/10 text-orange-600 text-xs font-bold font-mono">03</span>
                    <h3 className="font-bold text-slate-900 text-base">{t.whyUs.point3Title}</h3>
                  </div>
                  <p className="text-slate-600 text-sm leading-relaxed pl-7">
                    {t.whyUs.point3Desc}
                  </p>
                </div>

                {/* Pillar 4 */}
                <div className="space-y-2">
                  <div className="flex items-center space-x-2.5">
                    <span className="flex h-5 w-5 items-center justify-center rounded bg-orange-500/10 text-orange-600 text-xs font-bold font-mono">04</span>
                    <h3 className="font-bold text-slate-900 text-base">{t.whyUs.point4Title}</h3>
                  </div>
                  <p className="text-slate-600 text-sm leading-relaxed pl-7">
                    {t.whyUs.point4Desc}
                  </p>
                </div>
              </div>
            </div>

            {/* Right side: Projects Highlight Description */}
            <div className="lg:col-span-5" id="why-us-highlight-card">
              <div className="relative rounded-2xl border border-slate-200 bg-slate-50 p-6 md:p-8 space-y-6 shadow-xs">
                <div className="flex items-center space-x-3 border-b border-slate-250 pb-4">
                  <CheckCircle2 className="text-orange-500 h-5.5 w-5.5 shrink-0" />
                  <h3 className="font-display text-lg font-bold text-slate-900 uppercase tracking-wide">
                    {t.whyUs.projectsTitle}
                  </h3>
                </div>

                <p className="text-slate-600 font-light text-sm leading-relaxed">
                  {t.whyUs.projectsDesc}
                </p>

                {/* Scope badges */}
                <div className="pt-4 border-t border-slate-200 space-y-3">
                  <span className="block text-[10px] font-mono uppercase tracking-widest text-slate-400">
                    {lang === 'PL' ? 'SPECYFIKACJA TECHNICZNA' : lang === 'EN' ? 'TECHNICAL SPECIFICATION' : 'TECHNISCHE DATEN'}
                  </span>
                  
                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div className="flex items-center space-x-2 text-slate-600">
                      <div className="h-1.5 w-1.5 rounded-full bg-orange-500" />
                      <span>{lang === 'PL' ? 'Uprawnienia SEP' : lang === 'EN' ? 'SEP Certified' : 'SEP-Zertifiziert'}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-slate-600">
                      <div className="h-1.5 w-1.5 rounded-full bg-orange-500" />
                      <span>{lang === 'PL' ? 'Przeglądy 24h' : lang === 'EN' ? '24h Audits' : '24h Prüfungen'}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-slate-600">
                      <div className="h-1.5 w-1.5 rounded-full bg-orange-500" />
                      <span>{lang === 'PL' ? 'Klimatyzacja precyzyjna' : lang === 'EN' ? 'Precision Cooling' : 'Präzisionskühlung'}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-slate-600">
                      <div className="h-1.5 w-1.5 rounded-full bg-orange-500" />
                      <span>Hager, Socomec, Vertiv</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>



      {/* KONTAKT & DIRECT DETAILS SECTION */}
      <section id="kontakt" className="relative py-20 md:py-28 border-t border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-16" id="contact-header">
            <span className="text-xs font-bold tracking-widest text-orange-600 uppercase font-mono">{t.contact.header}</span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-slate-900">{t.contact.title}</h2>
            <div className="h-0.5 w-12 bg-orange-500 mx-auto my-4" />
            <p className="text-slate-600 text-sm md:text-base font-light">{t.contact.subtitle}</p>
          </div>

          {/* Clean wide high-trust grid displaying direct contact methods & engineering credentials */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch" id="contact-info-grid">
            
            {/* Direct Channels Cards (7 Cols on large screen for rich presence) */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Channel: Phone */}
              <motion.a 
                whileHover={{ scale: 1.01 }}
                href="tel:696381123" 
                className="flex flex-col justify-between p-6 rounded-2xl border border-slate-200 bg-slate-50 hover:border-orange-500/50 hover:bg-slate-50/80 transition-all group shadow-xs"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-orange-500/10 text-orange-600 group-hover:bg-orange-500 group-hover:text-white transition-all mb-4">
                  <Phone className="h-5 w-5" />
                </div>
                <div>
                  <span className="block text-xs text-slate-400 font-mono uppercase tracking-wider">{t.contact.infoPhone}</span>
                  <span className="block text-xl font-bold text-slate-900 mt-1 group-hover:text-orange-600 transition-colors">+48 696 381 123</span>
                  <p className="text-xs text-slate-500 mt-2 font-light">
                    {lang === 'PL' ? 'Zadzwoń do nas, aby omówić szczegóły' : lang === 'EN' ? 'Call us to discuss details' : 'Rufen Sie uns an, um Details zu besprechen'}
                  </p>
                </div>
              </motion.a>

              {/* Channel: Email */}
              <motion.a 
                whileHover={{ scale: 1.01 }}
                href="mailto:biuro@eminstall.pl" 
                className="flex flex-col justify-between p-6 rounded-2xl border border-slate-200 bg-slate-50 hover:border-orange-500/50 hover:bg-slate-50/80 transition-all group shadow-xs"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-orange-500/10 text-orange-600 group-hover:bg-orange-500 group-hover:text-white transition-all mb-4">
                  <Mail className="h-5 w-5" />
                </div>
                <div className="overflow-hidden">
                  <span className="block text-xs text-slate-400 font-mono uppercase tracking-wider">{t.contact.infoEmail}</span>
                  <span className="block text-base sm:text-lg font-bold text-slate-900 mt-1 group-hover:text-orange-600 transition-colors truncate">biuro@eminstall.pl</span>
                  <p className="text-xs text-slate-500 mt-2 font-light">
                    {lang === 'PL' ? 'Odpowiadamy w ciągu kilku godzin' : lang === 'EN' ? 'We reply within a few hours' : 'Wir antworten innerhalb weniger Stunden'}
                  </p>
                </div>
              </motion.a>

              {/* Channel: Operational Area */}
              <div className="sm:col-span-2 flex items-start gap-4 p-6 rounded-2xl border border-slate-200 bg-slate-50 shadow-xs">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-orange-500/10 text-orange-600">
                  <Globe className="h-5 w-5" />
                </div>
                <div>
                  <span className="block text-xs text-slate-400 font-mono uppercase tracking-wider">{t.contact.infoArea}</span>
                  <span className="block text-base font-bold text-slate-900 mt-0.5">{t.contact.infoAreaDesc}</span>
                  <p className="text-xs text-slate-500 mt-1.5 font-light leading-relaxed">
                    {lang === 'PL' 
                      ? 'Nasz mobilny zespół inżynieryjny regularnie realizuje przeglądy i wdrożenia na terenie całego kraju oraz w Niemczech.'
                      : lang === 'EN'
                      ? 'Our mobile engineering team regularly executes audits and deployments throughout Poland and Germany.'
                      : 'Unser mobiles Ingenieurteam führt regelmäßig Audits und Einsätze in ganz Polen und Deutschland durch.'}
                  </p>
                </div>
              </div>
            </div>

            {/* Company Credentials & Trust Panel (5 Cols for excellent weight balance) */}
            <div className="lg:col-span-5" id="company-credentials-card">
              <div className="h-full p-6 md:p-8 rounded-2xl border border-slate-200 bg-slate-50 flex flex-col justify-between space-y-6 shadow-xs">
                
                <div className="space-y-4">
                  <span className="block text-xs font-mono text-slate-400 uppercase tracking-widest">{t.contact.infoCompanyDetails}</span>
                  <div className="space-y-1">
                    <span className="block text-lg font-bold text-slate-900">EMINSTALL Tomasz Miga</span>
                    <span className="block text-sm font-semibold text-orange-600">{t.contact.infoWojtek}</span>
                  </div>

                  {/* Registered Company Details */}
                  <div className="p-4 rounded-xl bg-white border border-slate-200 space-y-3.5 text-xs text-slate-700 shadow-2xs">
                    <div>
                      <span className="block text-[10px] font-mono uppercase text-slate-400 tracking-wider">
                        {lang === 'PL' ? 'Nazwa pełna' : lang === 'EN' ? 'Full name' : 'Vollständiger Name'}
                      </span>
                      <span className="font-semibold text-slate-900 text-sm">EMINSTALL Tomasz Miga</span>
                    </div>
                    <div>
                      <span className="block text-[10px] font-mono uppercase text-slate-400 tracking-wider">
                        {lang === 'PL' ? 'Adres rejestrowy' : lang === 'EN' ? 'Registered address' : 'Registrierte Adresse'}
                      </span>
                      <span className="font-semibold text-slate-900 leading-normal">
                        Chojnicka 19<br />
                        78-400 Szczecinek
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-4 pt-1">
                      <div>
                        <span className="block text-[10px] font-mono uppercase text-slate-400 tracking-wider">NIP</span>
                        <span className="font-mono font-semibold text-slate-900">6731587106</span>
                      </div>
                      <div>
                        <span className="block text-[10px] font-mono uppercase text-slate-400 tracking-wider">REGON</span>
                        <span className="font-mono font-semibold text-slate-900">365455350</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Credentials Bullet list */}
                  <div className="pt-4 border-t border-slate-200 space-y-2.5">
                    <div className="flex items-center space-x-2.5 text-xs text-slate-600">
                      <Check className="h-4 w-4 text-orange-500 shrink-0" />
                      <span>{lang === 'PL' ? 'Pełne uprawnienia eksploatacyjne SEP' : lang === 'EN' ? 'Full SEP Operational Licensing' : 'Vollständige SEP-Zulassungen'}</span>
                    </div>
                    <div className="flex items-center space-x-2.5 text-xs text-slate-600">
                      <Check className="h-4 w-4 text-orange-500 shrink-0" />
                      <span>{lang === 'PL' ? 'Autoryzacja wiodących producentów (Hager, Vertiv)' : lang === 'EN' ? 'Authorized partner (Hager, Vertiv)' : 'Autorisierter Partner (Hager, Vertiv)'}</span>
                    </div>
                    <div className="flex items-center space-x-2.5 text-xs text-slate-600">
                      <Check className="h-4 w-4 text-orange-500 shrink-0" />
                      <span>{lang === 'PL' ? 'Gwarancja ciągłości pracy systemów (SLA)' : lang === 'EN' ? 'Service Level Agreement (SLA) Guarantee' : 'Systemverfügbarkeitsgarantie (SLA)'}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-200 flex items-center space-x-2.5 text-xs text-slate-500 font-mono">
                  <MapPin className="h-4 w-4 text-orange-500/80 shrink-0" />
                  <span>PL / DE (Polska & Deutschland)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      </main>

      {/* MINIMAL HIGH-CONTRAST FOOTER */}
      <footer className="border-t border-slate-800 bg-slate-900 py-8 md:py-12 text-slate-400">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            
            {/* Branding */}
            <div className="flex items-center space-x-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-md bg-orange-500 shadow-md shadow-orange-500/10">
                <span className="font-display text-base font-bold text-white">E</span>
              </div>
              <div className="flex flex-col">
                <span className="font-display text-base font-bold text-white tracking-tight leading-none">Eminstall</span>
                <span className="text-[8px] font-mono uppercase tracking-widest text-slate-500 mt-0.5">Engineering</span>
              </div>
            </div>

            {/* Quick Links */}
            <div className="flex flex-wrap justify-center gap-6 text-xs text-slate-300">
              <button onClick={() => handleScrollTo('o-nas')} className="hover:text-orange-400 transition-colors cursor-pointer">{t.nav.about}</button>
              <button onClick={() => handleScrollTo('uslugi')} className="hover:text-orange-400 transition-colors cursor-pointer">{t.nav.services}</button>
              <button onClick={() => handleScrollTo('dlaczego-my')} className="hover:text-orange-400 transition-colors cursor-pointer">{t.nav.whyUs}</button>
              <button onClick={() => handleScrollTo('realizacje')} className="hover:text-orange-400 transition-colors cursor-pointer">{t.whyUs.projectsTitle}</button>
              <button onClick={() => handleScrollTo('kontakt')} className="hover:text-orange-400 transition-colors cursor-pointer">{t.nav.contact}</button>
            </div>

            {/* Copyright */}
            <div className="text-xs text-slate-500 text-center md:text-right">
              &copy; {new Date().getFullYear()} {t.footer.copyright}. {t.footer.rights}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
