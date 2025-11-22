# Setup Testing Framework (Optional)

**Status:** Not Started

## Overview
Set up basic testing (unit tests for utilities, maybe e2e).

## Goals
- Choose testing framework (Vitest + Playwright suggested)
- Configure test setup
- Write a few sample tests

## Acceptance Criteria
- [ ] Vitest configured for unit tests
- [ ] Playwright configured for e2e (optional)
- [ ] At least 2-3 utility function tests
- [ ] Test command in package.json

## Technical Notes
- Old frontend had Playwright already
- Focus on critical paths: API calls, cache, utils
- Can be minimal for MVP

## Related Files
- `vite.config.ts`, create test files

## Dependencies
- Task 021 (cache utility for test examples)
