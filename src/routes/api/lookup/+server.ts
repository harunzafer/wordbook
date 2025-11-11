import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { GetCommand } from '@aws-sdk/lib-dynamodb';
import { dynamoDbClient, WORDBOOK_TABLE_NAME } from '$lib/server/db/dynamodb';
import type {
	LookupRequest,
	LookupResponse,
	Word,
	Translation,
	EnglishWordItem,
	NonEnglishWordItem,
	Language
} from '$lib/types';

/**
 * Validates if a value is a non-empty string
 */
function isValidString(value: unknown): value is string {
	return typeof value === 'string' && value.trim() !== '';
}

/**
 * Validates the lookup request body
 */
function isValidRequest(data: unknown): data is LookupRequest {
	if (typeof data !== 'object' || data === null) {
		return false;
	}

	const req = data as Record<string, unknown>;
	const requiredParams: (keyof LookupRequest)[] = ['word', 'from_lang', 'to_lang'];

	for (const param of requiredParams) {
		if (!isValidString(req[param])) {
			return false;
		}
	}

	return true;
}

/**
 * Transform English word meanings to Translation array
 * Ports logic from Python words.py:transform_meanings
 */
function transformMeanings(
	meanings: EnglishWordItem['meanings'],
	toLang: Language
): Translation[] {
	const translations: Translation[] = [];

	for (const meaning of meanings) {
		const translationKey = `translations_${toLang}` as keyof typeof meaning;
		const translationArray = meaning[translationKey];

		if (Array.isArray(translationArray)) {
			const translationStr = translationArray.join(', ').trim();
			translations.push({
				translation: translationStr,
				type: meaning.type,
				example: meaning.sample_sentence,
				description: meaning.description
			});
		}
	}

	return translations;
}

/**
 * Transform non-English word translations to Translation array
 * Ports logic from Python words.py:transform_translations
 */
function transformTranslations(
	translations: NonEnglishWordItem['translations']
): Translation[] {
	return translations.map((trans) => ({
		translation: trans.word,
		type: trans.type,
		example: trans.example,
		description: trans.description
	}));
}

/**
 * Transform DynamoDB item to Word response
 * Ports logic from Python words.py:transform_word
 */
function transformWord(
	item: EnglishWordItem | NonEnglishWordItem,
	fromLang: Language,
	toLang: Language
): Word {
	let translations: Translation[];

	if (fromLang === 'en' && 'meanings' in item) {
		translations = transformMeanings(item.meanings, toLang);
	} else if ('translations' in item) {
		translations = transformTranslations(item.translations);
	} else {
		translations = [];
	}

	return {
		word: item.word,
		lang: item.lang,
		translations
	};
}

/**
 * POST /api/lookup
 * Lookup a word and return its translations
 */
export const POST: RequestHandler = async ({ request }) => {
	try {
		const data = await request.json();

		// Validate request
		if (!isValidRequest(data)) {
			return json({ statusCode: 400, message: 'Invalid input' }, { status: 400 });
		}

		const { word, from_lang, to_lang } = data;

		// Query DynamoDB
		const command = new GetCommand({
			TableName: WORDBOOK_TABLE_NAME,
			Key: {
				word,
				lang: from_lang
			}
		});

		const response = await dynamoDbClient.send(command);

		// Check if word was found
		if (!response.Item) {
			return json({ statusCode: 404, message: 'Word not found' }, { status: 404 });
		}

		// Transform and return the word
		const wordData = transformWord(
			response.Item as EnglishWordItem | NonEnglishWordItem,
			from_lang as Language,
			to_lang as Language
		);

		return json(wordData as LookupResponse);
	} catch (error) {
		console.error('Lookup API error:', error);
		return json(
			{
				statusCode: 500,
				message: 'Internal server error'
			},
			{ status: 500 }
		);
	}
};
