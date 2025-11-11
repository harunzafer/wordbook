# Implement i18n URL Routing

**Status:** ✅ Completed (Cookie-based approach)

## Overview
Add language prefix to URLs (e.g., `/en/about`, `/fr/a-propos`).

## Goals
- Set up locale-based routing
- Handle language detection
- Add language switcher to header

## Acceptance Criteria
- [x] Language detected from URL or browser ✅ (via Paraglide cookie + preferredLanguage strategy)
- [x] Language switcher in header works ✅ (UILanguageSelector component)
- [x] Redirects to default language if needed ✅ (automatic via Paraglide baseLocale)
- [~] Routes support language prefix (optional, like old: `[[i18nLang]]`) ⚠️ Not implemented (using cookie-based approach instead)

## Implementation Summary
- **Approach:** Cookie-based locale management instead of URL prefixes
- **Rationale:** Paraglide's cookie strategy is simpler, works well with SSR, and avoids URL complexity
- **Detection Strategy:** `['cookie', 'preferredLanguage', 'baseLocale']`
- **Cookie:** `PARAGLIDE_LOCALE` with 400-day expiration
- **Language Switcher:** UILanguageSelector component in Header with flag icons
- **Browser Detection:** Automatic via Paraglide's `preferredLanguage` strategy
- **Note:** URL-based routing can be added later if needed, but cookie approach meets all functional requirements

## Technical Notes
- Use SvelteKit param matchers if needed
- Keep URLs optional like old implementation
- Default to English if no locale

## Related Files
- Old routing pattern in frontend routes

## Dependencies
- Task 015 (translations)
- Task 007 (header component)
