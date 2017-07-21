var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var debug = require('debug')('sampleexpress:server');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var webpack = require('webpack');
var webpackDevMiddleware = require('webpack-dev-middleware');
var webpackHotMiddleware = require('webpack-hot-middleware');
var webpackConfig = require('./webpack.dev.config.js');

var index = require('./backend/routes/index');
var users = require('./backend/routes/users');

var app = express();
var isDevelopment = process.env.NODE_ENV !== "production";

// view engine setup
app.set('views', path.join(__dirname, 'frontend/views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(require('node-sass-middleware')({
//   src: path.join(__dirname, 'frontend'),
//   dest: path.join(__dirname, 'public'),
//   indentedSyntax: false,
//   sourceMap: true
// }));

//IF DEV:
if (isDevelopment) {
  console.log('Webpack middleware is running: Dev mode is on.');
  app.use(webpackDevMiddleware(webpack(webpackConfig), {
    publicPath: webpackConfig.output.publicPath
  }));
  app.use(webpackHotMiddleware(webpack(webpackConfig)));
}


app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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
