const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const { DynamoDBDocumentClient, ScanCommand } = require("@aws-sdk/lib-dynamodb");

const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);

const TABLE_NAME = process.env.TABLE_NAME;

exports.lambdaHandler = async () => {
    try {
        const result = await docClient.send(
            new ScanCommand({
                TableName: TABLE_NAME
            })
        );

        return {
            statusCode: 200,
            body: JSON.stringify(result.Items || [])
        };
    } catch (err) {
        console.error(err);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: "Error fetching users" })
        };
    }
};
