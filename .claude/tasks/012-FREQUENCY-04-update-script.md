# Generate Database Update Script

**Status:** Not Started
**Story:** 012-FREQUENCY

## Overview
Create and run a script to batch update all word entries in DynamoDB with frequency data.

## Goals
- Create update script
- Batch update all word entries
- Handle words not in frequency list

## Acceptance Criteria
- [ ] Script created in `/scripts/` directory
- [ ] Includes dry-run option
- [ ] Progress logging implemented
- [ ] Successfully updates all word entries
- [ ] Words without frequency get default value

## Technical Notes
- Use BatchWriteItem (25 items per batch)
- Handle throttling with retry logic
- Log progress every 100 items
- Test with small subset first

## Related Files
- Create: `/scripts/update-word-frequencies.ts`
- Input: `/scripts/data/word-frequencies.json`

## Dependencies
- Task 035-2 (frequency data available)
- Task 035-3 (schema defined)
