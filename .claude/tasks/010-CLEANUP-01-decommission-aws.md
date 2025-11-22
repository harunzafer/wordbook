# Decommission Old AWS Lambda Infrastructure

**Status:** Not Started

## Overview
Clean up old AWS Lambda functions and related resources after successful migration to SvelteKit.

## Goals
- Document all AWS resources to be removed
- Remove old Lambda functions
- Clean up IAM roles/policies for Lambda
- Archive old backend codebase
- Keep only DynamoDB table and necessary credentials

## Acceptance Criteria
- [ ] List all AWS resources currently in use (Lambda functions, API Gateway, IAM roles, etc.)
- [ ] Verify new SvelteKit app is fully functional in production
- [ ] Delete old Lambda functions (WordbookApiLambdaSuggest, WordbookApiLambdaLookup)
- [ ] Remove old API Gateway endpoints
- [ ] Clean up Lambda-specific IAM roles and policies
- [ ] Keep DynamoDB table and access credentials (still needed)
- [ ] Archive old backend repo (tag as `legacy` or similar)

## Technical Notes
- **DO NOT DELETE:** DynamoDB table (WordBook) - still in use
- **DO NOT DELETE:** Current IAM user credentials for DynamoDB access
- **DELETE:** Lambda functions, API Gateway, Lambda execution roles
- **ARCHIVE:** Old backend and frontend repos (don't delete, just archive)
- Take screenshots/backups before deletion
- Consider cost savings from removing Lambda/API Gateway

## Related Files
- Old infrastructure: `/home/harun/workspace/wordbook-backend/infra/`
- CloudFormation stack: `WordbookStack`

## Dependencies
- Task 031 (post-deployment verification - ensure everything works first)
- At least 1-2 weeks of successful production operation recommended
