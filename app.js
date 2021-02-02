const express = require('express');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');

const morgan = require('morgan');
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');

const app = express();

const userRouter = require('./routes/userRoutes');
const projectRouter = require('./routes/projectRoutes');
const blogPostRouter = require('./routes/blogPostRoutes');

//SECURITY HTTP HEADERS
app.use(helmet());

//Development  logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

//Limit requests from same API
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'To many requests from this IP, please try again in 60 minutes..',
});
app.use('/api', limiter);

//Body parser, reading data from body into req.body
app.use(express.json({ limit: '10kb' }));

//Data sanitization against NoSQL query injection
//looks at req.body, query and param. Filters out $ and dots (.)
app.use(mongoSanitize());

//Data sanitization against XSS
//cleans user input from malicious html code (JS can be attached to html)
app.use(xss());

//Prevent parameter polution (multiple query strings etc.) Removes and uses last one.
app.use(
  hpp({
    whitelist: ['title', 'description', 'tags', 'name'],
  })
);

//Serving static files
app.use(express.static(`${__dirname}/public`));

//Test middleware (request time)
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

//ROUTES (Mounting)
app.use('/api/v1/users', userRouter);
app.use('/api/v1/projects', projectRouter);
app.use('/api/v1/blog', blogPostRouter);

//Error for unkown routes
app.all('*', (req, res, next) => {
  next(new AppError(`Can´t find ${req.originalUrl} on this server!`, 404));
});

//Obscures error data for unknown/programming errors with generic messages and detailed messages for operational errors.
app.use(globalErrorHandler);

module.exports = app;
