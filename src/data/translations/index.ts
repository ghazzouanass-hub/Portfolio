import { enTranslations } from './en';
import { arTranslations } from './ar';
import { frTranslations } from './fr';
import { deTranslations } from './de';
import { esTranslations } from './es';
import { plTranslations } from './pl';
import { zhTranslations } from './zh';
import { jaTranslations } from './ja';
import { trTranslations } from './tr';

export interface TranslationDict {
  [key: string]: string;
}

export const TRANSLATIONS: Record<string, TranslationDict> = {
  en: enTranslations,
  ar: arTranslations,
  fr: frTranslations,
  de: deTranslations,
  es: esTranslations,
  pl: plTranslations,
  zh: zhTranslations,
  ja: jaTranslations,
  tr: trTranslations,
};
