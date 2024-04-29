# Note Creation API

This API is part of the challenge for Loomi to build an eccomerce REST API.

## Technologies Used

- Node.js
- Nest.Js
- Typescript
- Prisma
- Swagger
- AWS S3

## Adopted Practices

- SOLID, DRY, YAGNI, KISS Principles, CleanCode and EsLint
- RESTful API
- Queries with Prisma
- Dependency Injection
- Error Response Handling
- Automatic Swagger Generation with Nest.Js Swagger module

## How to Run BACK-END

1. _Clone Git Repository_
   bash
   git clone <URL_repository>

2. _Build the Project_
   npm install

3. _Create the database_
   npx prisma migrate dev

4. _Create first user administrator to use the application_
   npm run prisma:seed

5. _Run the Application_
   npm run start

## API Endpoints

To interact with the API, you can use the Swagger documentation that describes each endpoint and the data required to run them to execute the same flow on softwares like Postman.
