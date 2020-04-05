import * as dynamoDbLib from './libs/dynamodb-lib.js';
import { success, failure } from './libs/response-lib.js';

export async function main(event, context) {
    const params = {
        TableName: process.env.tableName,
        Key: {
            userId: event.requestContext.identity.cognitoIdentityId,
            noteId: event.pathParameters.id
        }
    };

    try {
        const result = await dynamoDbLib.call('delete', params);
        console.log(result.Item);
        return success({ status: true });

    } catch (err) {
        console.log(err);
        return failure({ status: false });
    }
}