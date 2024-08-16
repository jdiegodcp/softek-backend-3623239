import { DeleteCommand } from "@aws-sdk/lib-dynamodb";
import { dynamo, tableName } from '../../parameters.js';
export const deleteOne = async (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  let body;
  let statusCode = 200;
  const headers = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Credentials": true
  };
  try {
    const command = new DeleteCommand({
      TableName: tableName,
      Key: {
        documentNumber: event.pathParameters.id
      },
    })
    await dynamo.send(command);
    body = `Eliminado elemento con Número de documento ${event.pathParameters.id}`;
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