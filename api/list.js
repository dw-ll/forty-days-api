import * as dynamoDbLib from "../libs/dynamodb-lib.js";
import { success, failure } from "../libs/response-lib.js";

export async function main(event, context) {
  const params = {
    TableName: process.env.tableName,
    // 'KeyConditionExpression' : defines condition for query,
    // 'userId' : only return items that match this, partition key,
    // 'ExpressionAttributeValues' : defines the value in condition
    // ':userId' : defines 'userId' to be Identitiy Pool identity id
    // of the authenticated user

    KeyConditionExpression: "userId = :userId",
    ScanIndexForward: false,
    ExpressionAttributeValues: {
      ":userId": event.requestContext.identity.cognitoIdentityId,
    },
  };

  try {
    const result = await dynamoDbLib.call("query", params);
    // Query accesses items from a table by primary key or secondary index.
    return success(result.Items);
  } catch (err) {
    return failure({ status: false });
  }
}
