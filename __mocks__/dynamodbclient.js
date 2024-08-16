const { DynamoDB } = require('@aws-sdk/client-dynamodb');
const { DynamoDBDocument } = require('@aws-sdk/lib-dynamodb');

const isTest = process.env.JEST_WORKER_ID;

export const ddb = DynamoDBDocument.from(
    new DynamoDB({
        ...(isTest && {
            endpoint: 'http://localhost:8000/shell',
            region: 'local-env',
            credentials: {
                accessKeyId: 'fakeMyKeyId',
                secretAccessKey: 'fakeSecretAccessKey',
            },
        }),
    }),
    {
        marshallOptions: {
            convertEmptyValues: true,
        },
    }
);