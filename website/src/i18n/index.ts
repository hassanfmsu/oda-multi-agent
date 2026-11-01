import { en } from './en';
import { ar } from './ar';

export const languages = { en: 'English', ar: 'العربية' } as const;
export type Lang = keyof typeof languages;
export const langs = Object.keys(languages) as Lang[];

const dictionaries = { en, ar };

export const t = (lang: Lang) => dictionaries[lang];
export const dir = (lang: Lang) => (lang === 'ar' ? 'rtl' : 'ltr');
export const otherLang = (lang: Lang): Lang => (lang === 'ar' ? 'en' : 'ar');

/** '/services/' + 'ar' -> '/ar/services/' */
export const localize = (path: string, lang: Lang) => `/${lang}${path}`;

/** '/en/services/x/' -> '/ar/services/x/'. Pages outside /en/ and /ar/ (such as 404) go to the home page. */
export const switchLang = (pathname: string, to: Lang) =>
  /^\/(en|ar)(\/|$)/.test(pathname) ? pathname.replace(/^\/(en|ar)/, `/${to}`) : `/${to}/`;

/** For getStaticPaths() of pages that exist once per language. */
export const langPaths = () => langs.map((lang) => ({ params: { lang } }));
