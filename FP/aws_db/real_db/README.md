## Deploying the application

This code requires the following environment variables to execute:
access_key_id	Not Specified...
secret_access_key	Not Specified...
region	eu-west-1

1. Run the following command in the terminal above to deploy the application on AWS:

```bash
./setup.sh THE_NAME_OF_YOUR_BUCKET
```

2. If the deployment succeeds, we can find the base URL of our new backend in the CloudFormation console. Otherwise, we could use the command below to retrieve it:

```bash
aws cloudformation describe-stacks \
--stack-name reservations-example \
--query "Stacks[0].Outputs[0].OutputValue"
```
3. Create reservation with the following command:

```bash
curl --location --request POST '{INSERT_BASE_URL}/create' \
--header 'Content-Type: application/json' \
--data-raw '{
   "hotelId": "1",
   "userId": "abc",
   "start": "2021-01-10T09:00:00",
   "end": "2021-01-14T14:30:00",
   "timestamp": "2021-01-09T09:30:00"
}'
```

Note: Before creating the reservation, embed the INSERT_BASE_URL (that we retrieved earlier) in the above command.

```bash
curl --location --request GET '{INSERT_BASE_URL}/retrieve?hotelId=1&userId=abc&start=2021-01-10T09:00:00'
```