import { ScanCommand } from "@aws-sdk/lib-dynamodb";
import { dynamo, tableName } from '../../parameters.js';
export const getAll = async (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  let body = '';
  let statusCode = 200;
  const headers = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Credentials": true
  };
  try {
    console.log('before_dynamo')
    body = await dynamo.send(
      new ScanCommand({ TableName: tableName })
    );
    body = body.Items;
    console.log('after_dynamo_1')

  } catch (err) {
    statusCode = 400;
    body = err.message;
  } finally {
    body = JSON.stringify(body);
    console.log('after_dynamo_2')
  }

  callback(null, {
    statusCode,
    body,
    headers,
  })
};