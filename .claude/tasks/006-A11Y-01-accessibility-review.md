# Accessibility Review and Improvements

**Status:** Not Started

## Overview
Review and improve accessibility (a11y) across the app.

## Goals
- Test keyboard navigation
- Add ARIA labels where needed
- Ensure proper heading hierarchy
- Test with screen reader

## Acceptance Criteria
- [ ] All interactive elements keyboard accessible
- [ ] Autocomplete has proper ARIA attributes
- [ ] Forms have labels
- [ ] Heading hierarchy is logical (h1, h2, h3)
- [ ] Color contrast meets WCAG AA
- [ ] No accessibility warnings in browser console

## Technical Notes
- DaisyUI provides good defaults
- Focus on search/autocomplete interaction
- Use axe DevTools or Lighthouse for testing

## Related Files
- All components, especially autocomplete and forms

## Dependencies
- Task 024 (after responsive is done)
