# Implement Client-Side Caching

**Status:** Not Started

## Overview
Add caching for API responses to reduce redundant requests.

## Goals
- Implement simple cache utility
- Cache word lookups
- Cache suggestions
- Set expiration policy

## Acceptance Criteria
- [ ] Cache utility created in `src/lib/utils/`
- [ ] Word lookup results cached
- [ ] Suggestions cached
- [ ] Cache has TTL (time-to-live)
- [ ] Works in browser storage or memory

## Technical Notes
- Port cache logic from old util/cache.ts
- Use localStorage or in-memory Map
- Set reasonable TTL (e.g., 30 minutes)

## Related Files
- `/home/harun/workspace/wordbook-frontend/src/lib/util/cache.ts`

## Dependencies
- Task 003 (lookup API)
- Task 004 (suggest API)
