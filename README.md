# CRUD Demo

### Downloading & Installing
  - Download or clone this repository
  - `cd` into `hx-crud`
  - Run `npm install` to install the dependencies
  - Install MongoDB and make sure it's running
  - Create a database called simplecrudapi
  - run `node app.js` to start the program
  - If everything is successful the app will be running on port `1337`
  - Use Postman or something similar to start making your requests

--

### The Routes
These are the following routes you can PUT, DELETE, GET and POST to via Postman or another service.

| Route | Method | Parameters | Description |
| ------ | ------ | ------ | ------ |
| /user/all | GET | none | Returns a list of all users in the database |
| /user/create | POST | `email`: Email address of user<br>`givenName`: Users given name <br>`familyName`: Users family name | Creates a user based on provided information<br>returns users id upon creation |
| /user/:id | GET | User ID | Get user details by id |
| /user/:id/update | PUT | User ID and fields you wish to update (see /create) | Update set details about user by id |
| /user/:id/delete | DELETE | User ID | Delete user by id |

### Sample Requests
Here you can see the samples from the api endpoints.
### `/user/all`

```json
{
    "status": 1,
    "message": "Retrieved successfully",
    "users": [
        {
            "_id": "5be87df3837a593af6628c57",
            "email": "hello@example.com",
            "givenName": "John",
            "familyName": "Doe",
            "createdAt": "2018-11-11T19:07:31.040Z",
            "updatedAt": "2018-11-11T19:41:50.522Z",
            "__v": 0
        },
        {
            "_id": "5be87dfd837a593af6628c58",
            "email": "info@business.com",
            "givenName": "Jane",
            "familyName": "Doe",
            "createdAt": "2018-11-11T19:07:41.414Z",
            "updatedAt": "2018-11-11T19:07:41.414Z",
            "__v": 0
        },
        ...
    ]
}
```
----
### `/user/create` upon successful creation

```json
{
    "status": 1,
    "message": "Created Successfully",
    "user": {
        "_id": "5beb4168240eb04b39acf7ce"
    }
}
```
#### Upon failed creation
```json
{
    "status": 0,
    "error": "The specified email hello@example.com address already exists"
}
```
----
### `/user/:id` upon successful result

```json
{
    "status": 1,
    "user": {
        "_id": "5beb4168240eb04b39acf7ce",
        "email": "info@worldwideweb.com",
        "givenName": "Internet",
        "familyName": "Guardians",
        "createdAt": "2018-11-13T21:26:00.575Z",
        "updatedAt": "2018-11-13T21:26:00.575Z",
        "__v": 0
    }
}
```
#### Upon failed result

```json
{
    "status": 0,
    "error": "No user with id of iddefinitelydoesnotexist"
}
```
----
### `/user/:id/update` upon success

```json
{
    "status": 1,
    "message": "Update Successful"
}
```
----
### `/user/:id/delete` upon success

```json
{
    "status": 1,
    "message": "Deleted successfully"
}
```
---
### Tests
Use `npm test` to run the tests, what are located in `tests/testApi.js`
