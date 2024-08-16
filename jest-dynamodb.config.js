export default {
    tables: [
        {
            TableName: 'softek_backend_client',
            AttributeDefinitions: [
                {
                    AttributeName: documentNumber,
                    AttributeType: S
                }
            ],
            KeySchema:
                [
                    {
                        AttributeName: documentNumber,
                        KeyType: HASH
                    }
                ],
        }
    ],
    port: 8000,
};
