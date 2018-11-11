# Holiday Extras CRUD Demo

### Downloading & Installing
  - Download or clone this repository
  - `cd` into `hx-crud`
  - Run `npm install` to install the dependencies
  - Install MongoDB and make sure it's running
  - run `node app.js` to start the program
  - If everything is successful the app will be running on port `1337`

You should now be able to use Postman to make requests to the API.


### The Routes
These are the following routes you can PUT, DELETE, GET and POST to.

| Route | Method | Parameters | Description |
| ------ | ------ | ------ | ------ |
| /create | POST | `email`: Email address of user<br>`givenName`: Users given name <br>familyName`: Users family name | Creates a user based on provided information<br>returns users id upon creation |
| /:id | GET | User ID | Get user details by id |
| /:id/update | PUT | User ID and fields you wish to update (see /create) | Update set details about user by id |
| /:id/delete | DELETE | User ID | Delete user by id |