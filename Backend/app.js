require('dotenv').config()
var cors = require('cors')
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var fileUpload = require('express-fileupload');

var indexRouter = require('./routes/index');
var productsRouter = require('./routes/products');
var usersRouter = require('./routes/users');
var loginRouter = require('./routes/login');
var initRouter = require('./routes/init');
var cartRouter = require('./routes/cart');
var imgsRouter = require('./routes/imgs');
var tagsRouter = require('./routes/tags')

var app = express();

var corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200 
}

const mongoose = require('mongoose');

const uri = 'mongodb://localhost:27017/shyentist';

mongoose.connect(uri)
    .then(() => console.log('Connected'));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(cors(corsOptions));
app.use(logger('dev'));
app.use(express.json({limit: '10mb'}));
app.use(express.urlencoded({ extended: false, limit: '10mb' }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(fileUpload({limits: { fileSize: 10 * 1024 * 1024 }}))

app.use('/', indexRouter);
app.use('/products', productsRouter);
app.use('/users', usersRouter);
app.use('/login', loginRouter);
app.use('/init', initRouter);
app.use('/cart', cartRouter);
app.use('/imgs', imgsRouter);
app.use('/tags', tagsRouter);
app.use('/*', indexRouter);

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