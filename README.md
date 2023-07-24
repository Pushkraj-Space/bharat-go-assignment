# Bharat-Go-assignment
Start this project locally requirements : Install node.js and postgresql 

## Setup 
Open your terminal (cmd, powershell, git bash)
Clone this repository by :
```
git clone https://github.com/Pushkraj-Space/bharat-go-assignment.git
```
Enter to the repository folder :
```
cd bharat-go-assignment
```
Install all required dependencies using `npm` or you can also use` yarn`:
```
npm install or yarn install
```
## Setup Database
1. **Create a database** with a name of your choice in postgres.
```
postgres=# CREATE DATABASE db_name;
```
2. **Import SQL file**, you will find backup.sql file in our cloned folder "bharat-go-assignment" .\
   in terminal
```
postgres=# psql -U username -d db_name -f "%path%\backup.sql";
```
* Replace username with your PostgreSQL database username.
* Replace db_name with the name you choose in 1st step.
* Replace %path% with the actual path to your cloned folder.

3. **Setup .env file** according to your local settings.
```
PORT = 8081 // choose the port for server to run
TOKEN_SECRET = "your secret string"
DB_USER = "postgres" //your PostgreSQL username
DB_HOST = "localhost" 
DB_DATABASE = "bharat_go" //the db_name you choose in 1st step
DB_PASSWORD = "root123" //password of your PostgreSQL database
DB_PORT = 5432 // replace with the port on which postgresql is running.
   ```
## How to use 
Now it's time to use API endpoints.
1. Import "Bharat Go.postman_collection.json" file to postman(find in cloned folder).
2. setup port variable in postman according to your settings.
3. start node.js server
```
npm start
```
4. Refer below API documentation for simplicity.

## Run mocha test 
```
npm test
```

## API Documentation : 
* set bearer token in postman after login of a particular user. To use /users api's.
  
### POST /auth/register

Register a new user.

- **Method:** POST
- **Endpoint:** /auth/register

#### Request Body

| Field     | Type     | Description                   |
|-----------|----------|-------------------------------|
| name  | string   | User's desired username       |
| email     | string   | User's email address          |
| password  | string   | User's password (plaintext)    |

#### Response

Upon successful registration, the API will return a response with status code 201 and the following JSON data:

```json
{
  "message": "User registration successful"
}
```
## POST /auth/login

Authenticate and generate a JWT token for the user.

- **Method:** POST
- **Endpoint:** /auth/login
  
#### Request Body

| Field     | Type     | Description                   |
|-----------|----------|-------------------------------|
| email     | string   | User's registered email       |
| password  | string   | User's password   |

#### Response

Upon successful login, the API will return a response with status code 200 and the following JSON data:

```json
{
  "message": "User login successful",
  "token": "jwt_token",
  "user": {
    "name" : "user_name",
    "email" : "user_mail",
    "id" : "user_id"
  } 
}
```
## GET /users

Retrieve a list of all users.

- **Method:** GET
- **Endpoint:** /users
- **Authentication required**
  
#### Response

Upon successful retrieval, the API will return a response with status code 200 and the following JSON data:

```json
[
    {
        "name": "user_name",
        "email": "user_mail",
        "password": "user_password",
        "id": "user_id"
    },
    {
        "name": "user_name",
        "email": "user_mail",
        "password": "user_password",
        "id": "user_id"
    }
]
```
## GET /users/:id

Retrieve a specific user by their ID.

- **Method:** GET
- **Endpoint:** /users/:id
- **Authentication required**
  
#### Response

Upon successful retrieval, the API will return a response with status code 200 and the following JSON data:

```json
{
    "name": "user_name",
    "email": "user_mail",
    "password": "user_password",
    "id": "user_id"
}
```
## POST /users

Create a new user.

- **Method:** POST
- **Endpoint:** /users
- **Authentication required**
  
#### Request Body

| Field     | Type     | Description                   |
|-----------|----------|-------------------------------|
| name  | string   | User's desired username       |
| email     | string   | User's email address          |
| password  | string   | User's password     |

#### Response

Upon successful creation, the API will return a response with status code 201 and the following JSON data:

```json
{
    "message": "User registration successful"
}
```
## PUT /users/:id

Update an existing user by their ID.

- **Method:** PUT
- **Endpoint:** /users/:id
- **Authentication required**
  
#### Request Body

| Field     | Type     | Description                   |
|-----------|----------|-------------------------------|
| name  | string   | Updated username              |

#### Response

Upon successful update, the API will return a response with status code 200 and the following JSON data:

```json
{
    "message": "User updated successfully"
}
```
## DELETE /users/:id

Delete a user by their ID.

- **Method:** DELETE
- **Endpoint:** /users/:id
- **Authentication required**
  
#### Response

Upon successful deletion, the API will return a response with status code 200 and the following JSON data:

```json
{
    "message": "User deleted successfully"
}
```
#### Thank you 
