# Performance Optimization Pass

**Status:** Not Started

## Overview
Optimize app performance (bundle size, loading speed, etc.).

## Goals
- Run Lighthouse audit
- Optimize images (if any)
- Check bundle size
- Add preloading where beneficial

## Acceptance Criteria
- [ ] Lighthouse score > 90 (Performance)
- [ ] No unused dependencies
- [ ] Critical CSS inlined (Tailwind handles this)
- [ ] Fonts optimized
- [ ] Images optimized (if applicable)

## Technical Notes
- SvelteKit + Tailwind should be fast by default
- Check Vite build output for bundle sizes
- Consider lazy loading if needed

## Related Files
- `vite.config.ts`, all components

## Dependencies
- Task 024 (UI complete)
