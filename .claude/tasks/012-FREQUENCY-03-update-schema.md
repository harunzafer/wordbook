# Update DynamoDB Schema

**Status:** Not Started
**Estimated Time:** 30 minutes
**Parent Task:** 035-add-word-frequency-data

## Overview
Add a `frequency` field to the DynamoDB word schema and update TypeScript types.

## Goals
- Define frequency field type
- Update TypeScript type definitions
- Document schema change

## Acceptance Criteria
- [ ] Frequency field format decided (rank/score/occurrences)
- [ ] TypeScript types updated in `src/lib/types.ts`
- [ ] Schema change documented

## Technical Notes
- Field should be optional initially (backward compatibility)
- Consider default value for missing data
- No new GSI needed (sort in application layer)

## Related Files
- `src/lib/types.ts` (Word and Suggestion interfaces)

## Dependencies
- Task 035-2 (frequency format decided)
