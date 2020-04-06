import { v1 as uuidv1 } from "uuid";
import { success, failure } from '../libs/response-lib';
import * as dynamoLib from '../libs/dynamodb-lib.js';
export async function main(event, context, callback) {
    //  Request body is passed in as a JSON encoded string in 'event.body'
    const data = JSON.parse(event.body);

    const params = {
        TableName: process.env.tableName,
        // process.env.tableName is set up in serverless.yml
        // 'Item' contains attrubutes of the item to be created
        // 'userId': user identity from Cognito
        // 'noteId': A unique id from uuid
        // 'content': This is parsed from the req body
        // 'attatchment': This is parsed from the req body
        // 'createdAt': Current unix timestamp
        Item: {
            userId: event.requestContext.identity.cognitoIdentityId,
            noteId: uuidv1(),
            content: data.content,
            attatchment: data.attatchment,
            createdAt: Date.now()
        }
    };

    try {
        await dynamoLib.call("put", params);
        return success(params.Item);

    } catch (e) {
        console.log(e);
        return failure({ status: false });
    }
}