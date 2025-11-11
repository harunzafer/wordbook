import type { PageLoad } from './$types';
import { error } from '@sveltejs/kit';
import type { Language } from '$lib/types/language';
import { SUPPORTED_LANGUAGES } from '$lib/types/language';

export const load: PageLoad = async ({ params, fetch }) => {
	const { fromLang, toLang, word } = params;

	// Validate both languages are supported
	if (
		!SUPPORTED_LANGUAGES.includes(fromLang as Language) ||
		!SUPPORTED_LANGUAGES.includes(toLang as Language)
	) {
		throw error(400, `Unsupported language pair: ${fromLang}-${toLang}`);
	}

	// Validate that either fromLang or toLang is English
	if (fromLang !== 'en' && toLang !== 'en') {
		throw error(400, 'One language must be English');
	}

	// Validate word parameter
	if (!word || word.trim().length === 0) {
		throw error(400, 'Word parameter is required');
	}

	const normalizedWord = word.toLowerCase().trim();

	// Fetch translations in the specified direction (fromLang -> toLang)
	try {
		const response = await fetch('/api/lookup', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				word: normalizedWord,
				from_lang: fromLang,
				to_lang: toLang
			})
		});

		let translations = null;
		if (response.ok) {
			translations = await response.json();
		}

		return {
			word: normalizedWord,
			fromLang: fromLang as Language,
			toLang: toLang as Language,
			translations
		};
	} catch (err) {
		console.error('Error fetching translations:', err);
		return {
			word: normalizedWord,
			fromLang: fromLang as Language,
			toLang: toLang as Language,
			translations: null
		};
	}
};
