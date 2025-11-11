import { browser } from '$app/environment';
import type { Language } from '$lib/types/language';
import { SUPPORTED_LANGUAGES } from '$lib/types/language';

const PREFERRED_LANGUAGE_KEY = 'wordbook-preferred-language';
const THEME_KEY = 'wordbook-theme';
const FIRST_VISIT_KEY = 'wordbook-first-visit';

export type Theme = 'light' | 'dark';

/**
 * Detect browser's preferred language from navigator.languages
 * Returns a supported language or null if no match found
 */
function getBrowserLanguage(): Language | null {
	if (!browser) return null;

	const browserLanguages = navigator.languages || [navigator.language];

	for (const browserLang of browserLanguages) {
		// Try exact match first (e.g., "en-US" -> "en")
		const langCode = browserLang.split('-')[0].toLowerCase() as Language;

		if (SUPPORTED_LANGUAGES.includes(langCode)) {
			return langCode;
		}
	}

	return null;
}

// Load initial values using strategy: [localStorage, preferredLanguage, default]
function getInitialLanguage(): Language {
	if (browser) {
		// 1. Check localStorage first (user's saved preference)
		const stored = localStorage.getItem(PREFERRED_LANGUAGE_KEY) as Language | null;
		if (stored) return stored;

		// 2. Check browser's preferred language
		const browserLang = getBrowserLanguage();
		if (browserLang) return browserLang;
	}

	// 3. Default to French
	return 'fr';
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
	#language = $state<Language>(getInitialLanguage());
	#theme = $state<Theme>(getInitialTheme());
	#isFirstVisit: boolean;

	constructor() {
		// Check if first visit BEFORE marking
		this.#isFirstVisit = browser ? !localStorage.getItem(FIRST_VISIT_KEY) : false;
	}

	get language(): Language {
		return this.#language;
	}

	set language(value: Language) {
		this.#language = value;
		if (browser) {
			localStorage.setItem(PREFERRED_LANGUAGE_KEY, value);
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
}

export const preferences = new Preferences();
