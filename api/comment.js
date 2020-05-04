import * as dynamoDbLib from '../libs/dynamodb-lib.js';
import { success, failure } from '../libs/response-lib.js';
import { v1 as uuidv1 } from "uuid";
export async function main(event, context) {
    console.log(event.requestContext.identity);
    console.log(event.pathParameters.id);
    const data = JSON.parse(event.body);
    const params = {
        TableName: process.env.tableName,
        Key: {
            userId: event.requestContext.identity.cognitoIdentityId,
            noteId: event.pathParameters.id
        },
        UpdateExpression:
            "set comments.#commentId = :content",
        ExpressionAttributeNames: {
            "#commentId": uuidv1()
        },
        ExpressionAttributeValues: {
            ":content": {
                "comment": data.content || null,
                "createdAt": Date.now()

            }
        },
    };
    try {
        await dynamoDbLib.call("update", params);
        return success({ status: true });
    } catch (err) {
        console.log(err);
        return failure({ status: false, err });
    }
};
