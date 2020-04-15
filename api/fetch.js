import * as dynamoDbLib from "../libs/dynamodb-lib.js";
import { success, failure } from "../libs/response-lib.js";

export async function main(event, context) {
  const params = {
    TableName: process.env.tableName,
    // 'Key' defines the partition key and sort key of item to be fetched
    // 'userId': Identity pool identity id of the authenticated user
    // 'noteId': Path parameter
  };

  try {
    const result = await dynamoDbLib.call("scan", params);
    console.log(result.Items);
    if (result.Items) {
      return success(result.Items);
    } else {
      return failure({ status: false, error: "Item not found." });
    }
  } catch (err) {
    return failure({ status: false });
  }
}
