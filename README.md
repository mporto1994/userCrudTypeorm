#User API Documentation (Backend)

This is a simple CRUD API for users with the ability to list all users or a single user, and token-based authentication via login. The API is built using Node.js and Express with TypeScript and TypeORM for integration with a PostgreSQL database. For more information on versions and libraries, please refer to the package.json file.

#Prerequisites:
To properly set up and install the project, the following tools need to be installed:
-Node.js
-npm
-TypeScript
-Docker
-Docker Compose
-Code Editor (VS Code was my choice)

#Steps to run the project on a Linux environment:

After downloading the project, navigate to the project folder and run the following command to install dependencies:
`npm install`

To create the database, run:
`npm run create-db`

With the database created in a container, you can now start the application:
`npm start`


#Endpoints
The application runs at http://localhost:3131/users/, and all routes use /users.

Create User
POST /
Description: Creates a new user.
Authentication: No authentication required.

Login
POST /login
Description: Authenticates a user.
Authentication: No authentication required.

Authenticated User Data
GET /me
Description: Returns information of the authenticated user.
Authentication: User authentication required.

Delete Authenticated User
DELETE /me/
Description: Deletes the authenticated user.
Authentication: User authentication required.

Update Authenticated User
PATCH /me/
Description: Updates information of the authenticated user.
Authentication: User authentication required.

Specific User Data
GET /
Description: Returns information of a specific user by ID.
Authentication: User authentication required.

Delete Specific User
DELETE /
Description: Deletes a specific user by ID.
Authentication: User authentication required.

Update Specific User
PATCH /
Description: Updates information of a specific user by ID.
Authentication: User authentication required.

List All Users
GET /
Description: Returns a list of all users.
Authentication: User authentication required.

#Notes
For deletion and update actions, the action can only be performed by the authenticated user.
Scripts (As per package.json scripts)
`npm run create-db`
-> docker run -d --name my-postgres-db -e POSTGRES_USER=userCrud -e POSTGRES_PASSWORD=userCrud1234 -e POSTGRES_DB=userCrud -p 5432:5432 postgres

`npm start`
-> npx tsx src/index.ts

#Other Useful Commands

Stop and remove all Docker containers (be very careful with this):
`docker stop $(docker ps -aq)`
`docker rm $(docker ps -aq)`

Find and kill process occupying port 5432:
`sudo lsof -i :5432`
-> Returns PID <-
`sudo kill -9 PID`

Stop and start the project container:
`docker stop my-postgres-db`
`docker start my-postgres-db`

#Dependencies Documentation and Links
Typescript: https://www.typescriptlang.org/docs/
Node.js: https://nodejs.org/docs/latest/api/
Express: https://expressjs.com/en/starter/installing.html
TypeORM: https://typeorm.io/
NPM: https://docs.npmjs.com/
Docker: https://docs.docker.com/guides/
Chai: https://www.chaijs.com/
Mocha: https://mochajs.org/
Jest: https://jestjs.io/docs/getting-started
Supertest: https://github.com/ladjs/supertest#readme
UUIDV4: https://github.com/thenativeweb/uuidv4#readme
JsonWebToken: https://github.com/auth0/node-jsonwebtoken#readme
Bcrypt: https://github.com/kelektiv/node.bcrypt.js#readme
