## Deploying the application

This code requires the following environment variables to execute:
access_key_id	Not Specified...
secret_access_key	Not Specified...
region	eu-west-1

1. Run the following command in the terminal above to deploy the application on AWS:

```bash
./setup.sh THE_NAME_OF_YOUR_BUCKET
```

2. After deploying the application, we can find the API_ID of our new backend in the API Gateway console. Or we could use the command below to retrieve it:

```bash
aws cloudformation describe-stack-resource  --stack-name pets-example-new --logical-resource-id HttpApi
```

Note: The API_ID is found against PhysicalResourceId, which is fetched as a result of the above command.

3. Create petwith the following command:

```bash
curl --location --request POST 'https://{API_ID}.execute-api.eu-west-1.amazonaws.com/pets' \
--header 'Content-Type: application/json' \
--data-raw '{
   "id": "100",
   "clientId": "client1",
   "name": "Woof",
   "age": 4,
   "cuteness": "very",
   "type": "dog"
}'
```
Note: Before creating pet, embed the API_ID (that we retrieved earlier) in the command above.4. Retrieve pet with the following command:

```bash
curl --location --request GET 'https://{API_ID}.execute-api.eu-west-1.amazonaws.com/pets?id=100&clientId=client1'
```