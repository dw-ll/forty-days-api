import AWS from 'aws-sdk';

export function call(action, params) {
    const dynamoClient = new AWS.DynamoDB.DocumentClient();
    return dynamoClient[action](params).promise();
}