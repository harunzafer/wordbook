# Setup Environment Variables for Production

**Status:** Not Started

## Overview
Configure environment variables for Vercel deployment.

## Goals
- Document all required environment variables
- Create .env.example file
- Configure in Vercel dashboard
- Test in production-like environment

## Acceptance Criteria
- [ ] `.env.example` with all required vars documented
- [ ] AWS credentials configured for production
- [ ] DynamoDB region and config set
- [ ] Verified environment vars work locally with .env file

## Technical Notes
- AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, AWS_REGION
- Keep .env out of git (.gitignore)
- Use Vercel environment variables for production

## Related Files
- `.env.example` (create)
- `.gitignore`

## Dependencies
- Task 001 (DynamoDB setup)
