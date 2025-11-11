# Research and Setup i18n Library

**Status:** ✅ Completed

## Overview
Research modern SvelteKit i18n solutions and set up chosen library.

## Goals
- Research i18n libraries (svelte-i18n, paraglide, etc.)
- Choose best fit for Svelte 5 + SvelteKit
- Install and configure basic setup
- Document decision

## Acceptance Criteria
- [x] Research completed (document pros/cons)
- [x] Library chosen and installed
- [x] Basic configuration done
- [x] Decision documented in task or CLAUDE.md

## Implementation Summary
- **Chosen Library:** Paraglide-js 2.0
- **Rationale:** Modern, type-safe, tree-shakeable, framework-agnostic with Vite plugin
- **Installation:** Via `npx sv add paraglide="languageTags:en,fr,de,it,pl,pt,es,tr"`
- **Configuration:** Vite plugin configured with strategy `['cookie', 'preferredLanguage', 'baseLocale']`

## Technical Notes
- Need support for 8 languages (en, fr, de, it, pl, pt, es, tr)
- Should work well with SvelteKit routing
- Type-safe would be a plus
- Consider: svelte-i18n, paraglide-js, typesafe-i18n (latest version)

## Related Files
- Old i18n: `/home/harun/workspace/wordbook-frontend/src/i18n/`

## Dependencies
None
