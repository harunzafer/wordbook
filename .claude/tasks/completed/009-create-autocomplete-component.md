# Create Autocomplete Component

**Status:** Completed

## Overview
Build autocomplete dropdown that fetches suggestions from API.

## Goals
- Create autocomplete component with dropdown
- Call `/api/suggest` endpoint
- Display suggestion results
- Handle selection

## Acceptance Criteria
- [x] AutoComplete component in `src/lib/components/`
- [x] Fetches from `/api/suggest` on input
- [x] Shows dropdown with results
- [x] Handles click/keyboard selection
- [x] Uses DaisyUI dropdown styling

## Technical Notes
- Debounce API calls (300ms)
- Show loading state
- Port logic from old AutoComplete.svelte but use Svelte 5 runes

## Related Files
- `/home/harun/workspace/wordbook-frontend/src/lib/AutoComplete.svelte`
- `/home/harun/workspace/wordbook-frontend/src/lib/Suggestion.svelte`

## Dependencies
- Task 004 (suggest API)
- Task 008 (search input)
