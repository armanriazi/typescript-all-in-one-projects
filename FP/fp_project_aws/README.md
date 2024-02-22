## Deploying the application

This code requires the following environment variables to execute:
access_key_id	Not Specified...
secret_access_key	Not Specified...
region	eu-west-1

1. Run the following command in the terminal above to deploy the application on AWS:

```bash
./setup.sh THE_NAME_OF_YOUR_BUCKET
```

2. After deploying the application, run the following command in the terminal to retrieve the function name:

```bash
aws cloudformation describe-stack-resource  --stack-name monitoring-example --logical-resource-id MetricsLambda
```

3. After getting the function name, run the command below in the terminal to invoke the Lambda.

```bash
aws lambda invoke  --function-name YOUR_FUNCTION_NAME  --invocation-type RequestResponse outfile.txt && cat outfile.txt
```