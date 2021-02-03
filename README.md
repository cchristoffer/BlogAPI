# BlogAPI
Simple API for blog and development portfolio with user authentication and authorization.


## Table of contents
1. List of dependencies
2. Security
- User Authentication
- User Authorization
- Security dependecies
3. APIFeatures
4. Error Handling
- AppError
- Operational Errors
- Unknown Errors
- Global Error Handling
5. MongoDB with Mongoose
- FactoryHandler
6. Routes
7. Credits

# 1.List of dependencies
- bcrypt
- express
- express-mongo-sanitize
- express-rate-limit
- helmet
- hpp
- jsonwebtoken
- mongoose
- nodemailer
- nodemon
- slugify
- validator
- xss-clean

# 2.Security
The app is built so that anyone can view blogposts and comments, while you're required to be logged in to comment or edit/delete your own comments. To create a blog post admin priviledges are required.
## JSON Web Tokens
To create access tokens for this application JSON Web Tokens was used. Upon logging in with correct credentials the token is signed on the server and sent to the client which identifies the user. This Token is stored in an HTTPOnly Cookie and will then be sent from client to server each request where it is verified (signature checked) before it reads the request information. If the verification fails the request is dropped.
## User Authentication
For any CRUD operations a user will have to be authorized. This is done by the "protect" middleware which checks the JWT token of the request and verifies it with the JWT_SECRET in the confiv.env file (not included in repo). If no problems arises, the user is stored in the req.user object (no sensitive info stored).
## User Authorization
For this simple API there's only two roles, user and admin. For admin priviledged routes the "restrictTo" middleware is used which takes an array of options as input (for potential expansion of roles). If the role matches the role of the user.role in the request object (from protect) the user is authorized for this route.
## Security Dependencies
For general purposes, some "security dependencies" are included to help with sanitization, xss, attacks etc.
### Helmet
Helmet is a wrapper for multiple middlewares which helps against well known vulnerabilites by securing HTTP headers. In this app helmet is used with it's default options which helps against XSS, sniffing sets strict-transport-security etc..
### Rate Limit
With this app i'm using express-rate-limit to set a max limit of 100 requests per hour to reduce the effects of potential DDOS attacks.
### Express.json limit
Using the express body parser we set a limit to the request.body to prevent the server from handling to large of requests. A regular user will only be able to comment on blog posts, making it unneccesary for users to post large request objects.
### Mongo Sanitize
To sanitize our req.bodies, req.queries and req.params mongoSanitize is used which automaticly filters out all $ and dots. Sanitizing theese inputs will help against query injections.
### xss-clean
xss-clean is a middleware that sanitizes request bodies and URL params automaticly when used by express.
# 3.APIFeatures
The APIFeatures class allows for building parameter queries with advanced (multiple) filtering. Allowing for combining sorting, field limiting and pagination.
# 4.Error Handling
To distinguish between operational and programming errors, the ApppError class is used to decide how much information is displayed to the client.
## AppError
AppError is a child class (extends) of the generic Error class. With this AppError class a constructor is used to set status codes, status message and a boolean check if the error is operational along with the entire Stack trace of the super Error. Using this constructor it's easy to generate correct error handling while keeping code DRY.
## ErrorController
Here we distinguish wether the errors are operational or unknown/programming. For operational errors we try to account for validation errors in the database, input errors, cast errors, duplicate fields errors and JWT errors. Any unknown errors that might occur have their error data obscured with "Something went wrong!" to not leak potentially harmful data to the client unless the server is running in development mode, then the entire stack and error data is logged.
## Global Error Handling
For all errors, above errorController is used to ensure obfuscation. For any errors not handled by above mentioned, there is a handler for unknown URLs as well as unhandled rejecitons which will shut the server down after the request/response cycle is finished.
# 5.MongoDB with Mongoose
In progress...
## FactoryHandler
In progress...
# 6.Routes
## User Routes
#### GET: /api/v1/users/me
- Gets current user data (Authentication)
#### DELETE: /api/v1/users/me
- Deletes current user (Authentication)
#### POST: /api/v1/users/forgotPassword
- Sends password reset url with token parameter to mailTrap (No Authentication)
#### PATCH: /api/v1/users/:resetToken
- If token is valid, allows user to enter new password (No Authentication)
#### PATCH: /api/v1/users/updateMyPassword 
- Allows user to update password, requires knowledge of current password. (Authentication)
#### PATCH: /api/v1/users/updateMe 
- Allows user to update current data (Authentication)

#### GET: /api/v1/users
- Gets all users (Authentication, role: ADMIN)
#### GET: /api/v1/users/:id
- Gets user by ID (Authentication, role: ADMIN)
#### PATCH: /api/v1/users/:id
- Allows admin to update user data (Authentication, role: ADMIN)
#### DELETE: /api/v1/users/:id
- Allows admin to delete user (Authentication, role: ADMIN)
## Projects Routes
#### GET: /api/v1/projects
- Gets all projects (No Authentication)
#### GET: /api/v1/projects/:id
- Gets project by id (No Authentication)
#### POST: /api/v1/projects
- Create project (Authentication, role: ADMIN)
#### PATCH: /api/v1/projects/:id
- Update project by id (Authentication, role: ADMIN)
#### DELETE: /api/v1/projects/:id
- Deletes project by id (Authentication, role: ADMIN)

## Blog Routes
#### GET: /api/v1/blog
- Gets all blog posts (No Authentication)
#### GET: /api/v1/blog/:id
- Gets blog posts by id, comments and user info is virtually populated from their models. (No Authentication)
#### POST: /api/v1/blog
- Create blog posts (Authentication, role: ADMIN)
#### PATCH: /api/v1/blog/:id
- Update blog posts by id (Authentication, role: ADMIN)
#### DELETE: /api/v1/blog/:id
- Deletes blog post by id (Authentication, role: ADMIN)

## Comment routes (Nested with blog routes)
#### GET: /api/v1/:blodPostId/:commentId
- Gets comment and some user info by Id. (No Authentication)
#### POST: /api/v1/:blodPostId
- Create comment for blog by Id (Authentication)
#### PATCH: /api/v1/:blodPostId/:commentId
- Update comment by id, requires you to be owner of comment (Authentication)
#### DELETE: /api/v1/:blodPostId/:commentId
- Deletes blog post by id, requires you to be owner of comment (Authentication)

# 7.Credits
All knowledge to build this API was aquired by Jonas Schmedtmann's Udemy Course "Node.js, Express, MongoDB & More: The Complete Bootcamp 2021". I greatly recommend it if you want to learn NodeJS!
