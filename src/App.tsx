import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Shield,
  Zap,
  Wind,
  Layers,
  Globe,
  HardHat,
  Phone,
  Mail,
  MapPin,
  Menu,
  X,
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Server,
  Check,
  ShieldCheck
} from 'lucide-react';
import { TRANSLATIONS, COMPANY_DATA, Language } from './data';
import { WorkScopeSection } from './components/WorkScope';

import logoSvg from './assets/Logo/eminstall-logo.svg';
import logoWhiteSvg from './assets/Logo/eminstall-logo-white.svg';

export default function App() {
  const [lang, setLang] = useState<Language>(() => {
    if (typeof window !== 'undefined' && navigator) {
      const browserLang = (navigator.language || (navigator.languages && navigator.languages[0]) || '').toLowerCase();
      if (browserLang.startsWith('pl')) return 'PL';
      if (browserLang.startsWith('de')) return 'DE';
    }
    return 'EN';
  });
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const t = TRANSLATIONS[lang];

  // Dynamic SEO & Accessibility Language Synchronization
  useEffect(() => {
    // Synchronize HTML lang attribute
    document.documentElement.lang = lang.toLowerCase();

    // Synchronize Dynamic Document Title based on selected locale
    document.title = t.seo.title;

    // Update dynamic SEO Meta Description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', t.seo.description);
  }, [lang, t]);

  const handleScrollTo = (id: string) => {
    setIsMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const offset = window.innerWidth >= 640 ? 96 : 80; // height of sticky navbar
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

  return (
    <div className="relative min-h-screen w-full bg-[#F8FAFC] text-slate-800 font-sans selection:bg-orange-500 selection:text-white overflow-x-hidden antialiased">
      {/* Skip to Content link for keyboard-only screen reader navigation */}
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:bg-orange-500 focus:text-white focus:px-4 focus:py-2.5 focus:rounded-lg focus:shadow-lg focus:font-bold focus:outline-hidden focus:ring-2 focus:ring-orange-600"
      >
        {t.accessibility.skipToContent}
      </a>

      {/* Background patterns */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f080_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f080_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-sky-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-[600px] h-[600px] bg-orange-500/5 rounded-full blur-[140px] pointer-events-none" />

      {/* STICKY NAVBAR */}
      <header className="sticky top-0 z-50 w-full border-b border-slate-200/80 bg-white/90 backdrop-blur-md shadow-xs transition-all duration-300">
        <div className="mx-auto flex h-20 sm:h-24 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Logo */}
          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center text-left focus:outline-hidden focus-visible:ring-2 focus-visible:ring-orange-500 rounded-lg p-1 cursor-pointer group"
            id="logo-container"
            aria-label={t.accessibility.logoAria}
          >
            <img 
              src={logoSvg} 
              alt="Eminstall - Engineering Group" 
              className="h-12 sm:h-15 lg:h-16 w-auto object-contain transition-transform group-hover:scale-[1.02]" 
            />
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            <button
              onClick={() => handleScrollTo('o-nas')}
              className="text-sm font-medium text-slate-600 hover:text-orange-600 transition-colors cursor-pointer"
              id="nav-link-about"
            >
              {t.nav.about}
            </button>
            <button
              onClick={() => handleScrollTo('zakres-prac')}
              className="text-sm font-medium text-slate-600 hover:text-orange-600 transition-colors cursor-pointer"
              id="nav-link-scope"
            >
              {t.nav.scopeAndRealizations}
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
          <div className="hidden lg:flex items-center space-x-6">
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
              href={`tel:${COMPANY_DATA.contact.phone.raw}`}
              className="inline-flex items-center justify-center rounded-lg bg-slate-900 hover:bg-orange-600 px-4 py-2 text-sm font-semibold text-white transition-all cursor-pointer shadow-xs"
              id="header-phone-cta"
            >
              <Phone className="mr-2 h-3.5 w-3.5" />
              {COMPANY_DATA.contact.phone.display}
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center space-x-3 lg:hidden">
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
              id="mobile-menu-toggle"
              aria-label="Toggle Navigation Menu"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile menu dropdown */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-b border-slate-200 bg-white px-4 pt-2 pb-6 space-y-3 shadow-lg animate-in slide-in-from-top duration-200" id="mobile-menu">
            <div className="flex flex-col space-y-1">
              <button
                onClick={() => handleScrollTo('o-nas')}
                className="flex w-full items-center py-2.5 px-3 text-base font-semibold rounded-lg text-slate-700 hover:bg-slate-50 hover:text-orange-600 transition-all cursor-pointer"
                id="mobile-link-about"
              >
                {t.nav.about}
              </button>
              <button
                onClick={() => handleScrollTo('zakres-prac')}
                className="flex w-full items-center py-2.5 px-3 text-base font-semibold rounded-lg text-slate-700 hover:bg-slate-50 hover:text-orange-600 transition-all cursor-pointer"
                id="mobile-link-scope"
              >
                {t.nav.scopeAndRealizations}
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
                href={`tel:${COMPANY_DATA.contact.phone.raw}`}
                className="flex items-center justify-center w-full rounded-lg bg-orange-500 py-3 text-center text-sm font-bold text-white shadow-xs hover:bg-orange-600 transition-all"
                id="mobile-phone-cta"
              >
                <Phone className="mr-2 h-4 w-4" />
                {COMPANY_DATA.contact.phone.display}
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
                  onClick={() => handleScrollTo('zakres-prac')}
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
                <div className="relative overflow-hidden rounded-2xl border-2 border-slate-100 bg-white p-6 md:p-8 shadow-sm">
                  {/* Header Info */}
                  <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-6">
                    <div className="flex items-center space-x-2">
                      <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-500 animate-ping" />
                      <span className="flex h-2.5 w-2.5 absolute rounded-full bg-emerald-500" />
                      <span className="font-mono text-xs text-emerald-600 tracking-wider font-semibold uppercase">
                        {t.hero.status}
                      </span>
                    </div>
                    <span className="font-mono text-[10px] text-slate-400">{t.hero.systemCode}</span>
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
                          {t.hero.features.containersTitle}
                        </h4>
                        <p className="text-[11px] text-slate-500 mt-0.5">
                          {t.hero.features.containersDesc}
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
                          {t.hero.features.hvacTitle}
                        </h4>
                        <p className="text-[11px] text-slate-500 mt-0.5">
                          {t.hero.features.hvacDesc}
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
                          {t.hero.features.powerTitle}
                        </h4>
                        <p className="text-[11px] text-slate-500 mt-0.5">
                          {t.hero.features.powerDesc}
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
        </div>
      </section>

      {/* O NAS (ABOUT US) SECTION */}
      <section id="o-nas" className="py-20 md:py-28 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Side: Technical Badge Box */}
            <div className="lg:col-span-5 order-2 lg:order-1" id="about-left-box">
              <div className="relative">
                <div className="rounded-2xl border-2 border-slate-100 bg-white p-6 md:p-8 shadow-sm">
                  {/* Clean Technical Emblem */}
                  <div className="flex flex-col space-y-6">
                    <div className="flex items-center space-x-4 border-b border-slate-100 pb-5">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-500/10 text-orange-600">
                        <Shield className="h-6 w-6" />
                      </div>
                      <div>
                        <span className="text-xs font-mono uppercase text-slate-400 tracking-wider">Certyfikacja & Standardy</span>
                        <h3 className="font-bold text-slate-900 text-base">Polskie i Europejskie Normy</h3>
                      </div>
                    </div>

                    <div className="space-y-4 text-xs text-slate-600 leading-relaxed">
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
                    <div className="mt-6 flex items-center space-x-3 bg-slate-50 p-3.5 rounded-xl border border-slate-200/60 shadow-xs">
                      <HardHat className="text-orange-600 h-5 w-5 shrink-0" />
                      <span className="text-xs text-slate-500 leading-normal">
                        {t.about.engineeringControl}
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

              {/* Engineering Credo Quote */}
              <div className="p-5 rounded-2xl bg-orange-500/5 border-l-4 border-orange-500 space-y-1.5 shadow-2xs">
                <span className="block font-display font-bold text-lg sm:text-xl text-slate-900">
                  „{t.about.credoQuote}”
                </span>
                <span className="block text-xs sm:text-sm text-slate-600 font-light leading-relaxed">
                  {t.about.credoSub}
                </span>
              </div>

              <div className="space-y-4 text-slate-600 font-light leading-relaxed text-base">
                <p>{t.about.p1}</p>
                <p>{t.about.p2}</p>
              </div>

              {/* Core Values Highlight */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-100">
                <div className="p-4 rounded-2xl bg-white border-2 border-slate-100 shadow-sm">
                  <div className="h-8 w-8 rounded bg-orange-500/10 flex items-center justify-center text-orange-600 mb-2.5">
                    <Shield className="h-4 w-4" />
                  </div>
                  <h4 className="font-bold text-slate-900 text-sm mb-1">{t.about.precision}</h4>
                  <p className="text-xs text-slate-500 leading-normal">{t.about.precisionDesc}</p>
                </div>

                <div className="p-4 rounded-2xl bg-white border-2 border-slate-100 shadow-sm">
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

      {/* ZAKRES PRAC I REALIZACJE (UNIFIED SCOPE & REALIZATIONS) */}
      <WorkScopeSection
        translation={t.workScope}
        onContactClick={() => handleScrollTo('kontakt')}
      />

      {/* KONTAKT & DIRECT DETAILS SECTION */}
      <section id="kontakt" className="relative py-20 md:py-28 border-t border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-16" id="contact-header">
            <span className="text-xs font-bold tracking-widest text-orange-600 uppercase font-mono">{t.contact.header}</span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-slate-900">{t.contact.title}</h2>
            <div className="h-0.5 w-12 bg-orange-500 mx-auto my-4" />
            <p className="text-slate-600 text-sm md:text-base font-light">{t.contact.subtitle}</p>
            <div className="pt-2">
              <span className="inline-flex items-center text-xs sm:text-sm text-orange-700 font-medium bg-orange-500/10 py-1.5 px-4 rounded-full border border-orange-500/20 shadow-2xs">
                <ShieldCheck className="h-3.5 w-3.5 mr-2 text-orange-600 shrink-0" />
                {t.contact.assurance}
              </span>
            </div>
          </div>

          {/* Clean wide high-trust grid displaying direct contact methods & engineering credentials */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch" id="contact-info-grid">
            
            {/* Direct Channels Cards (7 Cols on large screen for rich presence) */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Channel: Phone */}
              <motion.a 
                whileHover={{ scale: 1.01 }}
                href={`tel:${COMPANY_DATA.contact.phone.raw}`} 
                className="flex flex-col justify-between p-6 rounded-2xl border-2 border-slate-100 bg-white hover:border-orange-500/60 hover:shadow-md transition-all group shadow-sm"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-orange-500/10 text-orange-600 group-hover:bg-orange-500 group-hover:text-white transition-all mb-4">
                  <Phone className="h-5 w-5" />
                </div>
                <div>
                  <span className="block text-xs text-slate-400 font-mono uppercase tracking-wider">{t.contact.infoPhone}</span>
                  <span className="block text-xl font-bold text-slate-900 mt-1 group-hover:text-orange-600 transition-colors">{COMPANY_DATA.contact.phone.display}</span>
                  <p className="text-xs text-slate-500 mt-2 font-light">
                    {t.contact.phonePrompt}
                  </p>
                </div>
              </motion.a>

              {/* Channel: Email */}
              <motion.a 
                whileHover={{ scale: 1.01 }}
                href={`mailto:${COMPANY_DATA.contact.email}`} 
                className="flex flex-col justify-between p-6 rounded-2xl border-2 border-slate-100 bg-white hover:border-orange-500/60 hover:shadow-md transition-all group shadow-sm"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-orange-500/10 text-orange-600 group-hover:bg-orange-500 group-hover:text-white transition-all mb-4">
                  <Mail className="h-5 w-5" />
                </div>
                <div className="overflow-hidden">
                  <span className="block text-xs text-slate-400 font-mono uppercase tracking-wider">{t.contact.infoEmail}</span>
                  <span className="block text-base sm:text-lg font-bold text-slate-900 mt-1 group-hover:text-orange-600 transition-colors truncate">{COMPANY_DATA.contact.email}</span>
                  <p className="text-xs text-slate-500 mt-2 font-light">
                    {t.contact.emailPrompt}
                  </p>
                </div>
              </motion.a>

              {/* Channel: Operational Area */}
              <div className="sm:col-span-2 flex items-start gap-4 p-6 rounded-2xl border-2 border-slate-100 bg-white shadow-sm">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-orange-500/10 text-orange-600">
                  <Globe className="h-5 w-5" />
                </div>
                <div>
                  <span className="block text-xs text-slate-400 font-mono uppercase tracking-wider">{t.contact.infoArea}</span>
                  <span className="block text-base font-bold text-slate-900 mt-0.5">{t.contact.infoAreaDesc}</span>
                  <p className="text-xs text-slate-500 mt-1.5 font-light leading-relaxed">
                    {t.contact.areaPrompt}
                  </p>
                </div>
              </div>
            </div>

            {/* Company Credentials & Trust Panel (5 Cols for excellent weight balance) */}
            <div className="lg:col-span-5" id="company-credentials-card">
              <div className="h-full p-6 md:p-8 rounded-2xl border-2 border-slate-100 bg-white flex flex-col justify-between space-y-6 shadow-sm">
                
                <div className="space-y-4">
                  <span className="block text-xs font-mono text-slate-400 uppercase tracking-widest">{t.contact.infoCompanyDetails}</span>
                  <div className="space-y-1">
                    <span className="block text-lg font-bold text-slate-900">{COMPANY_DATA.name}</span>
                    <span className="block text-sm font-semibold text-orange-600">{COMPANY_DATA.owner.name} — {COMPANY_DATA.owner.role[lang]}</span>
                  </div>

                  {/* Registered Company Details */}
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/60 space-y-3.5 text-xs text-slate-700 shadow-2xs">
                    <div>
                      <span className="block text-[10px] font-mono uppercase text-slate-400 tracking-wider">
                        {t.contact.companyNameLabel}
                      </span>
                      <span className="font-semibold text-slate-900 text-sm">{COMPANY_DATA.name}</span>
                    </div>
                    <div>
                      <span className="block text-[10px] font-mono uppercase text-slate-400 tracking-wider">
                        {t.contact.companyAddressLabel}
                      </span>
                      <span className="font-semibold text-slate-900 leading-normal">
                        {COMPANY_DATA.address.street}<br />
                        {COMPANY_DATA.address.postalCode} {COMPANY_DATA.address.city}
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-4 pt-1">
                      <div>
                        <span className="block text-[10px] font-mono uppercase text-slate-400 tracking-wider">{t.contact.nip}</span>
                        <span className="font-mono font-semibold text-slate-900">{COMPANY_DATA.legal.nip}</span>
                      </div>
                      <div>
                        <span className="block text-[10px] font-mono uppercase text-slate-400 tracking-wider">{t.contact.regon}</span>
                        <span className="font-mono font-semibold text-slate-900">{COMPANY_DATA.legal.regon}</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Credentials Bullet list */}
                  <div className="pt-4 border-t border-slate-200 space-y-2.5">
                    <div className="flex items-center space-x-2.5 text-xs text-slate-600">
                      <Check className="h-4 w-4 text-orange-500 shrink-0" />
                      <span>{t.contact.credentialLicensing}</span>
                    </div>
                    <div className="flex items-center space-x-2.5 text-xs text-slate-600">
                      <Check className="h-4 w-4 text-orange-500 shrink-0" />
                      <span>{t.contact.credentialPartners}</span>
                    </div>
                    <div className="flex items-center space-x-2.5 text-xs text-slate-600">
                      <Check className="h-4 w-4 text-orange-500 shrink-0" />
                      <span>{t.contact.credentialSla}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-200 flex items-center space-x-2.5 text-xs text-slate-500 font-mono">
                  <MapPin className="h-4 w-4 text-orange-500/80 shrink-0" />
                  <span>{COMPANY_DATA.operationalArea.full}</span>
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
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="flex items-center text-left focus:outline-hidden focus-visible:ring-2 focus-visible:ring-orange-500 rounded-lg cursor-pointer group"
              aria-label={t.accessibility.logoAria}
            >
              <img 
                src={logoWhiteSvg} 
                alt="Eminstall - Engineering Group" 
                className="h-11 sm:h-13 lg:h-14 w-auto object-contain transition-transform group-hover:scale-[1.02]" 
              />
            </button>

            {/* Quick Links */}
            <div className="flex flex-wrap justify-center gap-6 text-xs text-slate-300">
              <button onClick={() => handleScrollTo('o-nas')} className="hover:text-orange-400 transition-colors cursor-pointer">{t.nav.about}</button>
              <button onClick={() => handleScrollTo('uslugi')} className="hover:text-orange-400 transition-colors cursor-pointer">{t.nav.services}</button>
              <button onClick={() => handleScrollTo('realizacje')} className="hover:text-orange-400 transition-colors cursor-pointer">{t.nav.realizations}</button>
              <button onClick={() => handleScrollTo('kontakt')} className="hover:text-orange-400 transition-colors cursor-pointer">{t.nav.contact}</button>
            </div>

            {/* Copyright */}
            <div className="text-xs text-slate-500 text-center md:text-right">
              &copy; {new Date().getFullYear()} {COMPANY_DATA.shortName}. {t.footer.rights}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
