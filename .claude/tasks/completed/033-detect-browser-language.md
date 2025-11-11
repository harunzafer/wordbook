# Detect Browser Language and Set Default

**Status:** ✅ Completed

## Overview
Automatically detect the user's browser language and set it as the default language selection on first visit.

## Goals
- Detect browser language from navigator.language
- Set as default if it's one of our supported languages
- Fallback to a sensible default (French) if not supported
- Improve UX by showing relevant language immediately

## Acceptance Criteria
- [x] Detect browser language on homepage load
- [x] Set selectedLanguage to browser language if supported
- [x] Fallback to 'fr' if browser language not in SUPPORTED_LANGUAGES
- [x] Only applies on first visit (before user preference is saved)
- [x] Works for all supported languages (de, es, fr, it, pl, pt, tr)

## Implementation Summary

### 1. UI Language (Paraglide)
- **Detection:** Automatic via Paraglide's `preferredLanguage` strategy
- **Configuration:** `vite.config.ts` with `strategy: ['cookie', 'preferredLanguage', 'baseLocale']`
- **Browser API:** Uses `navigator.languages` automatically
- **Fallback:** To base locale ('en') if not supported

### 2. Dictionary Language (Preferences Store)
- **Detection:** Implemented `getBrowserLanguage()` function in `preferences.svelte.ts:15-30`
- **Strategy:** localStorage → preferredLanguage → default ('fr')
- **Browser API:** Checks `navigator.languages` array for supported language codes
- **Fallback:** To 'fr' (French) if no match found
- **First Visit:** Automatically applies browser language before localStorage check

## Technical Notes
- Use `navigator.language` or `navigator.languages[0]`
- Extract language code (e.g., 'en-US' -> 'en', 'fr-CA' -> 'fr')
- Check against SUPPORTED_LANGUAGES array
- This should run before checking localStorage

## Dependencies
- Task 034 (save user language preference)
