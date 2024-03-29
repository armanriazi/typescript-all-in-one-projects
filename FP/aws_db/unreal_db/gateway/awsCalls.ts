import {DynamoDB} from "aws-sdk";
import {DocumentClient} from "aws-sdk/lib/dynamodb/document_client";
import PutItemInput = DocumentClient.PutItemInput;
import GetItemInput = DocumentClient.GetItemInput;

const client = new DynamoDB.DocumentClient({region: 'eu-west-1'});

export const save = (params: PutItemInput) => {
    return client.put(params).promise();
};
export const get = (params: GetItemInput) => {
    return client.get(params).promise();
};