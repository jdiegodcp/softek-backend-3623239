import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({});

export const dynamo = DynamoDBDocumentClient.from(client);

export const tableName = process.env.DYNAMODB_TABLE_NAME || "softek_backend_client";