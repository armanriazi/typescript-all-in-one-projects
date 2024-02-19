app.post('/create-employee'): This creates a record and returns the saved data.

```bash
curl --header "Content-Type: application/json" --request POST --data '{"name":"xyz","email":"xyz@gmail.com"}' $EDUCATIVE_LIVE_VM_URL/create-employee
```

app.get('/'): This retrieves employee records.

```bash
curl --header "Content-Type: application/json" --request GET $EDUCATIVE_LIVE_VM_URL/
```

app.put('/single/update'): This updates a single user with the given email.

```bash
curl --header "Content-Type: application/json" --request PUT --data '{"userId":1,"new_email":"xyz@gmail.com"}' $EDUCATIVE_LIVE_VM_URL/single/update
```

app.delete('/del'): This deletes one or more records from the database.

```bash
curl --header "Content-Type: application/json" --request DELETE --data '{"userId":1}' $EDUCATIVE_LIVE_VM_URL/del
```

app.put('/all/update'): This updates all users with the given name.

```bash
curl --header "Content-Type: application/json" --request PUT --data '{"name":"xyz"}' $EDUCATIVE_LIVE_VM_URL/all/update
```