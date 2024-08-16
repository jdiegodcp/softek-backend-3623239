import { GetCommand } from "@aws-sdk/lib-dynamodb";
import { dynamo, tableName } from '../../parameters.js';
export const getOne = async (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  let body;
  let statusCode = 200;
  const headers = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Credentials": true
  };
  try {
    body = await dynamo.send(
      new GetCommand({
        TableName: tableName,
        Key: {
          documentNumber: event.pathParameters.id,
        },
      })
    );
    body = body.Item;
  } catch (err) {
    statusCode = 400;
    body = err.message;
  } finally {
    body = JSON.stringify(body);
  }

  callback(null, {
    statusCode,
    body,
    headers,
  })
};