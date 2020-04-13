import * as dynamoDbLib from "../libs/dynamodb-lib.js";
import { success, failure } from "../libs/response-lib.js";

export async function main(event, context) {
  const data = JSON.parse(event.body);
  const params = {
    TableName: process.env.tableName,
    // 'UpdateExpression': The attributes that are being set.
    // 'ExpressionAttributeValues': Sets the attruibutes in the update expression.
    Key: {
      userId: event.requestContext.identity.cognitoIdentityId,
      noteId: event.pathParameters.id,
    },
    UpdateExpression:
      "set content = :content, attachment = :attachment, title= :title",
    ExpressionAttributeValues: {
      ":attachment": data.attachment || null,
      ":content": data.content || null,
      ":title": data.title || null,
    },
  };

  try {
    await dynamoDbLib.call("update", params);
    return success({ status: true });
  } catch (err) {
    console.log(err);
    return failure({ status: false, err });
  }
}
