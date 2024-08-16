// import { ddb } from './dynamodbclient.js';  // Note: Added `.js` extension for ESM

// export async function put(tableName, item) {
//   const params = {
//     TableName: tableName,
//     Item: item,
//   };
//   const result = await ddb.put(params);
//   return result;
// }

// export async function get(tableName, key) {
//   const params = {
//     TableName: tableName,
//     Key: key,
//   };
//   const result = await ddb.get(params);
//   return result;
// }