# BlogAPI
Simple API for blog with user authentication and authorization


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
In progress...
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
In progress...
# 4.Error Handling
In progress...
## AppError
In progress...
## Operational Errors
In progress...
## Unkown Errors
In progress...
## Global Error Handling
In progress...
# 5.MongoDB with Mongoose
In progress...
## FactoryHandler
In progress...
# 6.Routes
In progress...
# 7.Credits
All knowledge to build this API was aquired by Jonas Schmedtmann's Udemy Course "Node.js, Express, MongoDB & More: The Complete Bootcamp 2021". I greatly recommend it if you want to learn NodeJS!
