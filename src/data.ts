import pl from './locales/pl.json';
import en from './locales/en.json';
import de from './locales/de.json';
import company from './company.json';

export type TranslationSet = typeof pl;

export type Language = 'PL' | 'EN' | 'DE';

export const TRANSLATIONS: Record<Language, TranslationSet> = {
  PL: pl,
  EN: en,
  DE: de,
};

export type CompanyData = typeof company;
export const COMPANY_DATA: CompanyData = company;
