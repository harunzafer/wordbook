import type { Language } from './language';
import type { Word, Suggestion } from './word';

/**
 * Request body for word lookup API
 */
export interface LookupRequest {
	word: string;
	from_lang: Language;
	to_lang: Language;
}

/**
 * Response from word lookup API
 */
export type LookupResponse = Word;

/**
 * Request body for word suggestion API
 * Suggestions are always bidirectional between English and the user's language
 */
export interface SuggestRequest {
	prefix: string;
	lang: Language; // User's selected language (English is implicit)
}

/**
 * Response from word suggestion API
 */
export type SuggestResponse = Suggestion[];

/**
 * API Error response
 */
export interface ApiError {
	statusCode: number;
	message: string;
}
