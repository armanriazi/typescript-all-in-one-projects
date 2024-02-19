
## Routes

`Note:` All routes are defined in /usercode/flight-booking/src/config/server.ts and in the routes folder.

In the /usercode/flight-booking/src/controllers/user/index.ts file, implement the registerUser method to create a new single user.

This method sends a response of type IRes<User> defined in the /usercode/flight-booking/src/global/index.ts file.


Then, you’ll implement the API to create a new flight records method.

In /usercode/flight-booking/src/controllers/flight/index.ts, implement the bookFlight method. It returns a type of IRes<your-flight-dataType>.


## User Requests

```bash
curl --location --request POST $EDU_LIVE_VM_URL/api/user \
--header 'Content-Type: application/json' \
--data-raw '{ 
    "name": "Kay Lakin", 
    "nationality": "Dominica", 
    "national_id": "6", 
    "maritalStatus": "Married", 
    "sex": "M", 
    "age": 21
 }'
```

Open your terminal, and run the POST command below to get a response of type IRes<User>:

```bash
curl --location --request POST $EDU_LIVE_VM_URL/api/booking/flight \
--header 'Content-Type: application/json' \
--data-raw '{
"leavingAt": "Mon Jul 18 2022 19:27:29 GMT+0100 (West Africa Standard Time)",
"returningAt": "Mon Jun 26 2023 09:36:40 GMT+0100 (West Africa Standard Time)",
"country": "Croatia",
"state": "Lois Spurs",
"destination": "Mauritius",
"tripType": "ROUND",
"passengerSize": 2,
"promoCode": null,
"amount": 2300,
"email": "Raul.Armstrong10@gmail.com",
"user_id": 1
}'
```

## Flight Requests

Open your terminal, and run the PUT command below to get a response of type IRes<your-flight-dataType>

```bash
curl --header "Content-Type: application/json" --request PUT --data '{"userId":1,"new_email":"xyz@gmail.com"}' $EDU_LIVE_VM_URL/single/update
```

Open your terminal, and run the GET command below to get a response of type IRes<your-flight-dataType>:

```bash
curl --location --request GET $EDU_LIVE_VM_URL/api/booking/flight/get-flight/1
```

Open your terminal, and run the DELETE command below:

```bash
curl --location --request DELETE $EDU_LIVE_VM_URL/api/booking/flight/cancel-flight/1
```
