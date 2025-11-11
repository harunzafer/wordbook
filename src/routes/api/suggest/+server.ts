import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { QueryCommand } from '@aws-sdk/lib-dynamodb';
import { dynamoDbClient, WORDBOOK_TABLE_NAME } from '$lib/server/db/dynamodb';
import type { SuggestRequest, SuggestResponse, Suggestion, Language } from '$lib/types';

/**
 * Validates if a value is a non-empty string
 */
function isValidString(value: unknown): value is string {
	return typeof value === 'string' && value.trim() !== '';
}

/**
 * Validates the suggest request body
 */
function isValidRequest(data: unknown): data is SuggestRequest {
	if (typeof data !== 'object' || data === null) {
		return false;
	}

	const req = data as Record<string, unknown>;
	const requiredParams: (keyof SuggestRequest)[] = ['prefix', 'from_lang', 'to_lang'];

	for (const param of requiredParams) {
		if (!isValidString(req[param])) {
			return false;
		}
	}

	return true;
}

/**
 * Transform DynamoDB item to Suggestion format
 * Removes unnecessary fields like translations, meanings, prefix
 */
function transformSuggestion(item: Record<string, unknown>): Suggestion {
	const suggestion: Suggestion = {
		word: item.word as string,
		lang: item.lang as Language
	};

	// Include ascii field if present (for non-English words)
	if (item.ascii) {
		suggestion.ascii = item.ascii as string;
	}

	return suggestion;
}

/**
 * Query suggestions from a specific index
 * Ports logic from Python words.py:get_suggestions_from_index
 */
async function getSuggestionsFromIndex(
	indexName: string,
	partitionKey: string,
	sortKey: string,
	prefix: string,
	fromLang: Language,
	toLang: Language
): Promise<Suggestion[]> {
	try {
		const suggestions: Suggestion[] = [];

		// Query using first 3 characters as partition key
		// Use ExpressionAttributeNames for reserved keywords like "ascii"
		// Note: Prefix data is stored lowercase in the database
		const prefix3 = prefix.substring(0, 3).toLowerCase();
		const prefixLower = prefix.toLowerCase();

		const command = new QueryCommand({
			TableName: WORDBOOK_TABLE_NAME,
			IndexName: indexName,
			KeyConditionExpression: `#pk = :prefix3 AND begins_with(#sk, :fullPrefix)`,
			FilterExpression: '#lang = :fromLang OR #lang = :toLang',
			ExpressionAttributeNames: {
				'#pk': partitionKey,
				'#sk': sortKey,
				'#lang': 'lang'
			},
			ExpressionAttributeValues: {
				':prefix3': prefix3,
				':fullPrefix': prefixLower,
				':fromLang': fromLang,
				':toLang': toLang
			}
		});

		const response = await dynamoDbClient.send(command);

		if (response.Items) {
			for (const item of response.Items) {
				suggestions.push(transformSuggestion(item));
			}
		}

		return suggestions;
	} catch (error) {
		console.error(`Error querying ${indexName}:`, error);
		throw error;
	}
}

/**
 * Get all suggestions by querying both indexes and deduplicating
 * Ports logic from Python words.py:get_suggestions
 */
async function getSuggestions(
	prefix: string,
	fromLang: Language,
	toLang: Language
): Promise<Suggestion[]> {
	// Use a Map for deduplication with composite key: word_lang
	const suggestionsMap = new Map<string, Suggestion>();

	// Query prefixAsciiIndex first (for special characters)
	try {
		const asciiSuggestions = await getSuggestionsFromIndex(
			'prefixAsciiIndex',
			'prefixAscii',
			'ascii',
			prefix,
			fromLang,
			toLang
		);

		for (const item of asciiSuggestions) {
			const key = `${item.word}_${item.lang}`;
			suggestionsMap.set(key, item);
		}
	} catch (error) {
		// Continue even if prefixAsciiIndex query fails
		console.error('prefixAsciiIndex query failed, continuing...', error);
	}

	// Query prefixIndex (standard)
	const standardSuggestions = await getSuggestionsFromIndex(
		'prefixIndex',
		'prefix',
		'word',
		prefix,
		fromLang,
		toLang
	);

	for (const item of standardSuggestions) {
		const key = `${item.word}_${item.lang}`;
		suggestionsMap.set(key, item);
	}

	// Convert Map values to array
	return Array.from(suggestionsMap.values());
}

/**
 * POST /api/suggest
 * Get word suggestions for autocomplete
 */
export const POST: RequestHandler = async ({ request }) => {
	try {
		const data = await request.json();

		// Validate request
		if (!isValidRequest(data)) {
			return json({ statusCode: 400, message: 'Invalid input.' }, { status: 400 });
		}

		const { prefix, from_lang, to_lang } = data;

		// Get suggestions from both indexes
		const suggestions = await getSuggestions(
			prefix,
			from_lang as Language,
			to_lang as Language
		);

		return json(suggestions as SuggestResponse);
	} catch (error) {
		console.error('Suggest API error:', error);
		return json(
			{
				statusCode: 500,
				message: 'Internal server error'
			},
			{ status: 500 }
		);
	}
};
