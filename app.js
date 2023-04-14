const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const cookieSession = require("cookie-session");
const logger = require('morgan');
const cors = require('cors');
const passportSetup = require('./passport-setup');
const passport = require('passport');
require('dotenv').config()

const indexRouter = require('./routes/index');
const authRouter = require('./routes/auth');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(
  cookieSession({name:"session", keys:[process.env.SESSION_KEY], maxAge: 24 * 60 * 60 * 100,})
);
app.use(passport.initialize());
app.use(passport.session());
app.use(cors({
  origin: "http://localhost:5000",
  methods: "GET,POST,PUT,DELETE",
  credentials: true,
})
);

const authCheck = (req, res, next) => {
  if (!req.user) {
    console.log('no user')
  } else {
    console.log(req.user)
  }
  next();
};

app.use('/auth', authRouter);
app.use('/', authCheck, indexRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
