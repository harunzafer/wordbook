# Update Suggest API to Sort by Frequency

**Status:** Not Started
**Estimated Time:** 30 minutes
**Parent Task:** 035-add-word-frequency-data

## Overview
Modify the suggest API to return results sorted by word frequency (most common first).

## Goals
- Include frequency in API response
- Sort suggestions by frequency
- Handle missing frequency values

## Acceptance Criteria
- [ ] Frequency included in DynamoDB projection
- [ ] `transformSuggestion()` includes frequency
- [ ] Sorting logic added to `getSuggestions()`
- [ ] API returns suggestions in correct order
- [ ] Missing frequencies handled gracefully

## Technical Notes
- Add frequency to ProjectionExpression
- Sort ascending if using rank (1 = most common)
- Sort descending if using score (1.0 = most common)
- Default Infinity for missing values

## Related Files
- `src/routes/api/suggest/+server.ts`

## Dependencies
- Task 035-4 (database updated)
