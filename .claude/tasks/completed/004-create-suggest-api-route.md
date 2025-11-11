# Create Word Suggestion API Route

**Status:** Completed

## Overview
Implement `/api/suggest` endpoint for autocomplete suggestions.

## Goals
- Create POST endpoint at `src/routes/api/suggest/+server.ts`
- Implement suggestion logic using DynamoDB GSIs
- Return matching words based on prefix

## Acceptance Criteria
- [x] API route accepts `{ prefix, from_lang, to_lang }` in POST body
- [x] Queries both `prefixIndex` and `prefixAsciiIndex`
- [x] Returns deduplicated suggestions
- [x] Validates input (non-empty strings)

## Technical Notes
- Port from `suggest_lambda.py` and `words.py:35-66`
- Query both indexes and merge results
- Filter by languages

## Related Files
- `/home/harun/workspace/wordbook-backend/lambda/suggest_lambda.py`
- `/home/harun/workspace/wordbook-backend/lambda/words.py:35-104`

## Dependencies
- Task 001 (DynamoDB client)
- Task 002 (TypeScript types)
