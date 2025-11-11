import type { Language } from './language';

/**
 * Word type (part of speech)
 */
export type WordType = 'noun' | 'verb' | 'adjective' | 'adverb' | 'pronoun' | 'preposition' | 'conjunction' | 'interjection' | 'phrase';

/**
 * Translation of a word with context
 * Used in the API response
 */
export interface Translation {
	translation: string;
	type: WordType;
	example: string;
	description: string;
}

/**
 * Word with its translations
 * API response format
 */
export interface Word {
	word: string;
	lang: Language;
	translations: Translation[];
}

/**
 * English word meaning with translations to multiple languages
 * DynamoDB structure for English words (lang='en')
 */
export interface EnglishWordMeaning {
	type: WordType;
	description: string;
	sample_sentence: string;
	translations_fr: string[];
	translations_de: string[];
	translations_it: string[];
	translations_pl: string[];
	translations_pt: string[];
	translations_es: string[];
	translations_tr: string[];
}

/**
 * DynamoDB item for English words
 */
export interface EnglishWordItem {
	word: string;
	lang: 'en';
	prefix: string;
	meanings: EnglishWordMeaning[];
}

/**
 * Non-English translation pointing to English word
 * DynamoDB structure for non-English words
 */
export interface NonEnglishTranslation {
	word: string;
	type: WordType;
	description: string;
	example: string;
}

/**
 * DynamoDB item for non-English words
 */
export interface NonEnglishWordItem {
	word: string;
	lang: Exclude<Language, 'en'>;
	prefix: string;
	ascii?: string;
	prefixAscii?: string;
	translations: NonEnglishTranslation[];
}

/**
 * Union type for all DynamoDB word items
 */
export type WordItem = EnglishWordItem | NonEnglishWordItem;

/**
 * Suggestion item returned by autocomplete
 * Stripped down version without full translation data
 */
export interface Suggestion {
	word: string;
	lang: Language;
	ascii?: string;
}
