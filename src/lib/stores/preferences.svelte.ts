import { browser } from '$app/environment';
import type { TranslationLanguage } from '$lib/types/language';
import { TRANSLATION_LANGUAGES, NO_LANGUAGE_SELECTED } from '$lib/types/language';
import { setLocale } from '$lib/paraglide/runtime';

const PREFERRED_LANGUAGE_KEY = 'wordbook-preferred-language';
const THEME_KEY = 'wordbook-theme';
const FIRST_VISIT_KEY = 'wordbook-first-visit';

export type Theme = 'light' | 'dark';

/**
 * Detect browser's preferred language from navigator.languages
 * Returns a supported translation language or null if no match found
 */
function getBrowserLanguage(): TranslationLanguage | null {
	if (!browser) return null;

	const browserLanguages = navigator.languages || [navigator.language];

	for (const browserLang of browserLanguages) {
		// Try exact match first (e.g., "es-ES" -> "es")
		const langCode = browserLang.split('-')[0].toLowerCase() as TranslationLanguage;

		if (TRANSLATION_LANGUAGES.includes(langCode)) {
			return langCode;
		}
	}

	return null;
}

// Load initial values using strategy: [localStorage, browserLanguage, placeholder]
function getInitialLanguage(): TranslationLanguage | typeof NO_LANGUAGE_SELECTED {
	if (browser) {
		// 1. Check localStorage first (user's saved preference)
		const stored = localStorage.getItem(PREFERRED_LANGUAGE_KEY) as TranslationLanguage | null;
		if (stored && TRANSLATION_LANGUAGES.includes(stored)) return stored;

		// 2. Check browser's preferred language - if found, use it AND save it
		const browserLang = getBrowserLanguage();
		if (browserLang) {
			console.log('Detected browser language:', browserLang);
			// Save browser language to localStorage so we don't need to detect again
			localStorage.setItem(PREFERRED_LANGUAGE_KEY, browserLang);
			return browserLang;
		}
	}

	// 3. No saved preference and no browser language match - return UN flag placeholder
	return NO_LANGUAGE_SELECTED;
}

function getInitialTheme(): Theme {
	if (browser) {
		const stored = localStorage.getItem(THEME_KEY) as Theme | null;
		if (stored) return stored;
	}
	return 'light';
}

/**
 * Reactive preferences store using $state
 */
class Preferences {



	#language = $state<TranslationLanguage | typeof NO_LANGUAGE_SELECTED>(getInitialLanguage());
	#theme = $state<Theme>(getInitialTheme());
	#isFirstVisit: boolean;

	constructor() {
		// Check if first visit BEFORE marking
		this.#isFirstVisit = browser ? !localStorage.getItem(FIRST_VISIT_KEY) : false;

	}

	get language(): TranslationLanguage | typeof NO_LANGUAGE_SELECTED {
		return this.#language;
	}

	set language(value: TranslationLanguage | typeof NO_LANGUAGE_SELECTED) {
		const wasGlobe = this.#language === NO_LANGUAGE_SELECTED;
		this.#language = value;
		// Only save to localStorage if it's a real language selection (not the placeholder)
		if (browser && value !== NO_LANGUAGE_SELECTED) {
			localStorage.setItem(PREFERRED_LANGUAGE_KEY, value);

			// One-way sync: If this is the first selection (coming from globe), also set UI language
			if (wasGlobe) {
				setLocale(value as any);
			}
		}
	}

	get theme(): Theme {
		return this.#theme;
	}

	set theme(value: Theme) {
		this.#theme = value;
		if (browser) {
			localStorage.setItem(THEME_KEY, value);
		}
	}

	/**
	 * Check if this is the user's first visit
	 */
	isFirstVisit(): boolean {
		return this.#isFirstVisit;
	}

	/**
	 * Mark the user as having visited (call this after showing onboarding)
	 */
	markVisited(): void {
		this.#isFirstVisit = false;
		if (browser) {
			localStorage.setItem(FIRST_VISIT_KEY, 'true');
		}
	}

	/**
	 * Check if user has a saved language preference in localStorage
	 */
	hasStoredLanguagePreference(): boolean {
		if (!browser) return false;
		const stored = localStorage.getItem(PREFERRED_LANGUAGE_KEY);
		return stored !== null && TRANSLATION_LANGUAGES.includes(stored as TranslationLanguage);
	}
}

export const preferences = new Preferences();
