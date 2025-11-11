# Create Word Lookup API Route

**Status:** Completed

## Overview
Implement `/api/lookup` endpoint to fetch word details from DynamoDB.

## Goals
- Create POST endpoint at `src/routes/api/lookup/+server.ts`
- Implement word lookup logic (port from Python)
- Return word with translations filtered by target language

## Acceptance Criteria
- [x] API route accepts `{ word, from_lang, to_lang }` in POST body
- [x] Validates request parameters
- [x] Queries DynamoDB and returns Word object
- [x] Handles errors gracefully (404 for not found, 400 for invalid input)

## Technical Notes
- Port logic from `lookup_lambda.py` and `words.py`
- Use DynamoDB DocumentClient from task 001
- Return proper HTTP status codes

## Related Files
- `/home/harun/workspace/wordbook-backend/lambda/lookup_lambda.py`
- `/home/harun/workspace/wordbook-backend/lambda/words.py:68-78`

## Dependencies
- Task 001 (DynamoDB client)
- Task 002 (TypeScript types)
