/**
 * All languages in the Wordbook application (including English as the dictionary base language)
 */
export type Language = 'en' | 'fr' | 'de' | 'it' | 'pl' | 'pt' | 'es' | 'tr';

/**
 * Translation languages (excluding English, which is the dictionary's base language)
 */
export type TranslationLanguage = Exclude<Language, 'en'>;

/**
 * Placeholder for "no language selected" state
 */
export const NO_LANGUAGE_SELECTED = 'xx' as const;

/**
 * Language display names
 */
export const LANGUAGE_NAMES: Record<Language, string> = {
	en: 'English',
	fr: 'Français',
	de: 'Deutsch',
	it: 'Italiano',
	pl: 'Polski',
	pt: 'Português',
	es: 'Español',
	tr: 'Türkçe'
};

/**
 * Translation languages - languages that provide translations from/to English
 * (English is the dictionary's base language and not included here)
 */
export const TRANSLATION_LANGUAGES: TranslationLanguage[] = ['fr', 'de', 'it', 'pl', 'pt', 'es', 'tr'];

/**
 * All languages including English (used for routing validation)
 */
export const ALL_LANGUAGES: Language[] = ['en', ...TRANSLATION_LANGUAGES];
