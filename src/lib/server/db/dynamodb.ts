import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb';
import {
	AWS_REGION,
	AWS_ACCESS_KEY_ID,
	AWS_SECRET_ACCESS_KEY
} from '$env/static/private';

/**
 * DynamoDB Client Configuration
 * Uses environment variables for AWS credentials and region
 */
const client = new DynamoDBClient({
	region: AWS_REGION,
	credentials: {
		accessKeyId: AWS_ACCESS_KEY_ID,
		secretAccessKey: AWS_SECRET_ACCESS_KEY
	}
});

/**
 * DynamoDB Document Client
 * Provides simplified interface for working with DynamoDB items
 * Automatically marshals/unmarshals JavaScript objects to DynamoDB format
 */
export const dynamoDbClient = DynamoDBDocumentClient.from(client, {
	marshallOptions: {
		// Don't remove undefined values (set to false to remove them)
		removeUndefinedValues: true,
		// Convert empty strings to null
		convertEmptyValues: false
	},
	unmarshallOptions: {
		// Don't convert empty strings to null on read
		wrapNumbers: false
	}
});

/**
 * DynamoDB Table Name
 */
export const WORDBOOK_TABLE_NAME = 'Wordbook';
