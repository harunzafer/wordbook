/**
 * Supported languages in the Wordbook application
 */
export type Language = 'en' | 'fr' | 'de' | 'it' | 'pl' | 'pt' | 'es' | 'tr';

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
 * All supported languages
 */
export const SUPPORTED_LANGUAGES: Language[] = ['en', 'fr', 'de', 'it', 'pl', 'pt', 'es', 'tr'];
