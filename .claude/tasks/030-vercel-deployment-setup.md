# Setup Vercel Deployment

**Status:** Not Started

## Overview
Configure project for Vercel deployment and deploy to production.

## Goals
- Connect repo to Vercel
- Configure build settings
- Set environment variables
- Deploy to production

## Acceptance Criteria
- [ ] Vercel project created and connected
- [ ] Environment variables configured in Vercel
- [ ] Build settings correct (SvelteKit adapter-auto)
- [ ] Successfully deployed to production
- [ ] Custom domain configured (wordbook.ca)

## Technical Notes
- Use @sveltejs/adapter-auto (already in package.json)
- Set environment variables in Vercel dashboard
- Test deployment on preview URL first

## Related Files
- `svelte.config.js`

## Dependencies
- Task 027 (environment variables)
- Task 029 (local testing complete)
