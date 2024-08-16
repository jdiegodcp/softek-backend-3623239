import { PutCommand } from "@aws-sdk/lib-dynamodb";
import { dynamo, tableName } from '../../parameters.js';
export const createOne = async (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  let body;
  let statusCode = 200;
  const headers = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Credentials": true
  };
  const newClient = JSON.parse(event.body);
  try {
    const command = new PutCommand({
      TableName: tableName,
      Item: newClient
    });
    await dynamo.send(command);
    body = `Elemento creado ${JSON.stringify(newClient)}`;
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