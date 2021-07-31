# Documentation for the User Authentication REST API
## Our custom authentication system is build using JSON Web Token. Our API supports the following calls:

## 1. Register New Account
### POST: /auth
We provide the following information in the body:
```json
{
	"username": "your_user_name",
	"password": "your_password",
	"passwordVerify": "your_password",
	"email": "your_email"
}
```
If the information passed our requirements, the expected return is going to be:
```json
{
  "success": 1,
  "message": "User created"
}
```
otherwise we will get an error message with the appropriate explanation. For example, if we try to create a user but our chosen username is taken we would get:
```json
{
  "success": 0,
  "message": "An account with this username already exists."
}
```

## 2. Login
### POST: /auth/login
We provide the following information in the body:
```json
{
	"username": "our_username",
	"password": "our_password"
}
```
if our credentials were correct we would get:
```json
{
  "success": 1,
  "message": "Logged In Successfully"
}
```
otherwise an error message, for example:
```json
{
  "success": 0,
  "message": "Wrong username or password"
}
```
## 3. Logout
### POST: /auth/logout

if we were logged in, we would get:
```json
{
  "success": 1,
  "message": "Logged Out"
}
```
And our JSON Web Token will expire.

## 4. Get User Data
### GET: /auth

if we were logged in, we would get the information that is stored in the database for the currently logged in user, for example:
```json
{
  "success": 1,
  "data": {
    "_id": "60fc1f466f9c85a7652ccd19",
    "username": "nick",
    "email": "ntziris@gmail.com",
    "description": "my description",
    "color": "purple",
    "numberOfQuestions": 2,
    "numberOfAnswers": 0,
    "numberOfLikes": 1
  }
}
```

## 5. Get User Data by id
### GET: /auth/:id

Returns user data for user with the given _id, for example:
```json
{
  "success": 1,
  "data": {
    "_id": "60fb2098deca924dfd338a60",
    "username": "nick2",
    "email": "ntziris2@gmail.com",
    "description": "",
    "color": "blue",
    "numberOfQuestions": 1,
    "numberOfAnswers": 3,
    "numberOfLikes": 0
  }
}
```

## 6. Is logged In
### GET: /auth/isLoggedIn

Returns true if we are logged in, false if we are not.

## 7. Delete User
### DELETE: /auth

Deletes the account of the currently logged in user.

```json
{
  "success": 1,
  "message": "User deleted successfully"
}
```

## 8. Update User
### PUT: /auth

Updates the information for the currently logged-in user. In the request body the oldPassword must be provides (required). And any of the following properties (optional): color, description, email, username, password, passwordVerify. Example1:

```json
{
	"oldPassword": "1234567",
	"color": "purple",
	"description": "my description"
}
```

This will update our color and description. We will receive:

```json
{
  "success": 1,
  "message": "User Updated Successfully"
}
```

If we provide a wrong password, we will receive:
```json
{
  "success": 0,
  "message": "Wrong Password"
}
```
and the user account won't be updated.

Example2: password change.
```json
{
	"oldPassword": "123456",
	"password": "1234567",
	"passwordVerify": "1234567"
}
```
and if the oldPassword was correct and the new password is 6 or more character we will receive:

```json
{
  "success": 1,
  "message": "User Updated Successfully"
}
```

otherwise an error message, like:

```json
{
  "success": 0,
  "message": "Please enter a password of at least 6 characters."
}
```

or

```json
{
  "success": 0,
  "message": "Please enter the same password twice."
}
```
