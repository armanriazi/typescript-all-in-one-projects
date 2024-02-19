
## Description of NestJS Section

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ pnpm install
```

## Running the app

```bash
# development
$ pnpm run start

# watch mode
$ pnpm run start:dev

# production mode
$ pnpm run start:prod
```

## Test

```bash
# unit tests
$ pnpm run test

# e2e tests
$ pnpm run test:e2e

# test coverage
$ pnpm run test:cov
```


## Requests


@Post(employee/create/employee-account): This route creates a new employee record.

`Note:` Once the server is running, use the “+” sign below the code to open a new tab with a terminal than can test the APIs using the curl commands given below.


```bash
curl --header "Content-Type: application/json" --request POST --data '{"name":"John Xyz", "email":"johnxyz@gmail.com", "password": "john1000"}' $EDU_LIVE_VM_URL/employee/create/employee-account
```


@Get(employee/:id): This route retrieves an employee record for the specified id.

`Note:` For the curl command below, we’re using an id of 1. When testing, use the id returned from the previous API to create an employee.

```bash
curl --location --request GET $EDU_LIVE_VM_URL/employee/1
```

@Put(employee/update-data): This route updates an employee record.

```bash
curl --location --request PUT $EDU_LIVE_VM_URL/employee/update-data \
--header 'Content-Type: application/json' \
--data-raw '{
        "id": 1,
        "name": "Loop James",
        "password": "_7SiI80aUNFtUgx",
        "email": "Norval_Rosenbaum@hotmail.com"
}'
```


@Delete(employee/delete-data/:id): This route deletes an employee record by id.

Note: For the curl command below, we made a DELETE request for an employee with an id of 1.

```bash
curl --location --request DELETE $EDU_LIVE_VM_URL/employee/delete-data/1
```

@Post('account/create-employer'): This creates a new employer.

```bash
curl --header "Content-Type: application/json" --request POST --data '{"name":"John Xyz", "email":"johnxyz@gmail.com", "password": "john1000"}' $EDU_LIVE_VM_URL/employee/account/create-employer
```


@Post('account/create-employee'): This creates a new employee record.

Note: For the curl command below, we made a POST request to create an employee record using the employerID of 1. So, use the id returned from the previous API to create an employer.

```bash
curl --header "Content-Type: application/json" --request POST --data '{"employerID":1, "employeeDt": {"name":"Alice Wonder", "email":"alice@wonder.com", "password": "alice1000"}}' $EDU_LIVE_VM_URL/employee/account/create-employee
```

@Get('retrieve/employer/:id'): This retrieves employer data with a given id.

`Note:` For the curl command below, we’re using an id of 1. When testing, use the employerID returned from the previous API to create an employer.

```bash
curl --header "Content-Type: application/json" --request GET $EDU_LIVE_VM_URL/employee/retrieve/employer/1
```

@Post(employee/create/employee-account): This route creates a new employee record.

Note: Once the server is running, use the “+” sign below the code to open a new tab with a terminal to test the APIs using the curl commands given below.

```bash
curl --header "Content-Type: application/json" --request POST --data '{"name":"John Xyz", "email":"johnxyz@gmail.com", "password": "john1000"}' $EDU_LIVE_VM_URL/employee/create/employee-account
```


@Post(/employee/get-employee/:id): This route retrieves an employee record with a given id.

Note: For the curl command below, we used an id of 2. When testing, use the id returned from the previous API with which we created an employee.

```bash
curl --location --request GET $EDU_LIVE_VM_URL/employee/get-employee/2
```

Post(/employee/retrieve/date-range?dateRange=WEEK): This route retrieves an employee record with a given id, created within the following query constant— WEEK, MONTH, YEAR.

```bash
curl --location --request GET $EDU_LIVE_VM_URL/employee/retrieve/date-range?dateRange=WEEK
```