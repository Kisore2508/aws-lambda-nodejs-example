const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const { DynamoDBDocumentClient, PutCommand } = require("@aws-sdk/lib-dynamodb");

const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);
const TABLE_NAME = process.env.TABLE_NAME;

exports.lambdaHandler  = async (event) => {
    try {
        const body = JSON.parse(event.body || "{}");

        const { userName, phoneNumber, address } = body;

        if (!userName || !phoneNumber || !address) {
            return {
                statusCode: 400,
                body: JSON.stringify({ message: "All fields required" }),
            };
        }

        await docClient.send(
            new PutCommand({
                TableName: TABLE_NAME,
                Item: { userName, phoneNumber, address },
            })
        );
        console.log("User Created");
        return {
            statusCode: 201,
            body: JSON.stringify({ message: "User created" }),
        };
    } catch (err) {
        console.error(err);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: "Error creating user" }),
        };
    }
};
