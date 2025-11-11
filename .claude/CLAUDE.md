# Wordbook

An online dictionary platform for English learners with multilingual support.

## Tech Stack

- **Framework**: SvelteKit (Svelte 5) with TypeScript
- **Styling**: Tailwind CSS 4 + DaisyUI 5
- **Database**: AWS DynamoDB
- **Deployment**: Vercel
- **i18n**: TBD (migrating from typesafe-i18n to a more recent library)

## Project Structure

Single SvelteKit project containing:
- Frontend UI (Svelte components)
- Backend API (SvelteKit server-side API routes)
- All business logic in TypeScript

## Key Features

- Simplified English word definitions
- Example sentences for contextual learning
- Common translations in 8 languages (EN, FR, DE, IT, PL, PT, ES, TR)
- Word lookup and suggestions
- Multilingual interface

## Migration Notes

Migrating from:
- **Old Frontend**: `/home/harun/workspace/wordbook-frontend` (Svelte 3 + Bootstrap + typesafe-i18n)
- **Old Backend**: `/home/harun/workspace/wordbook-backend` (AWS Lambda Python functions)
- **Live Site**: https://wordbook.ca

To:
- Unified SvelteKit TypeScript project with Tailwind + DaisyUI
- Server-side API routes replacing Lambda functions
- DynamoDB integration for data persistence
