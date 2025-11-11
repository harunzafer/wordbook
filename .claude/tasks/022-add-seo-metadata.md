# Add SEO Metadata and Open Graph Tags

**Status:** Not Started

## Overview
Add proper meta tags for SEO and social sharing.

## Goals
- Add meta title, description for each page
- Add Open Graph tags
- Add language meta tags
- Configure in layout and pages

## Acceptance Criteria
- [ ] Each page has unique title and description
- [ ] Open Graph tags for social sharing
- [ ] Language meta tags (hreflang)
- [ ] Favicon configured

## Technical Notes
- Use SvelteKit's `<svelte:head>` blocks
- Dynamic titles based on page content
- Consider using a SEO component/utility

## Related Files
- All page components

## Dependencies
- Task 016 (i18n routing)
- Task 017 (static pages)
