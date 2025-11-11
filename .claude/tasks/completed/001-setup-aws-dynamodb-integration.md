# Install AWS SDK and Create DynamoDB Client

**Status:** Completed

## Overview
Install AWS SDK v3 and create a basic DynamoDB client utility for server-side use.

## Goals
- Install AWS SDK v3 packages
- Create reusable DynamoDB client instance
- Set up environment variables for configuration

## Acceptance Criteria
- [x] AWS SDK v3 packages installed (`@aws-sdk/client-dynamodb`, `@aws-sdk/lib-dynamodb`)
- [x] DynamoDB client utility created in `src/lib/server/db/dynamodb.ts`
- [x] `.env.example` file created with required AWS variables
- [x] Client exports DocumentClient for easy querying

## Technical Notes
- Use DynamoDBDocumentClient for simpler JavaScript object mapping
- Region and credentials from environment variables
- No actual queries yet - just setup

## Related Files
- Old backend: `/home/harun/workspace/wordbook-backend/lambda/`

## Dependencies
None
