'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _serveFavicon = require('serve-favicon');

var _serveFavicon2 = _interopRequireDefault(_serveFavicon);

var _morgan = require('morgan');

var _morgan2 = _interopRequireDefault(_morgan);

var _cookieParser = require('cookie-parser');

var _cookieParser2 = _interopRequireDefault(_cookieParser);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _expressHandlebars = require('express-handlebars');

var _expressHandlebars2 = _interopRequireDefault(_expressHandlebars);

var _config = require('./config');

var _config2 = _interopRequireDefault(_config);

var _webpack = require('webpack');

var _webpack2 = _interopRequireDefault(_webpack);

var _webpack3 = require('../../webpack.config');

var _webpack4 = _interopRequireDefault(_webpack3);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _redux = require('redux');

var _reactRedux = require('react-redux');

var _server = require('react-dom/server');

var _index = require('./client/js/reducers/index');

var _index2 = _interopRequireDefault(_index);

var _App = require('./client/containers/App');

var _App2 = _interopRequireDefault(_App);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _webpack2.default)(_webpack4.default, function (err, stats) {
  console.log(stats);
  console.log(err);

  console.log('============== webpack complied ===============');
});
// import routes from './routes/index'
// import users from './routes/users'
// import auth from './routes/auth'

var app = (0, _express2.default)();
// import mongoose from 'mongoose'
// mongoose.connect(config.getDb());
// const db = mongoose.connection;
// db.on('error', console.error.bind(console, 'connection error:'));
// db.once('open', console.error.bind(console, 'Connected to the db'));

app.engine('hbs', (0, _expressHandlebars2.default)({ extname: 'hbs', defaultLayout: 'layout', layoutsDir: __dirname + '/views/layouts/' }));
app.set('views', _path2.default.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// TODO uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use((0, _morgan2.default)('dev'));
app.use(_bodyParser2.default.json());
app.use(_bodyParser2.default.urlencoded({ extended: false }));
app.use((0, _cookieParser2.default)());
app.use(_express2.default.static(_path2.default.join(__dirname, 'client/public')));
app.set('superSecret', _config2.default.getSecret());

app.use('*', function timeLog(req, res, next) {
  console.log('Time: ', new Date(Date.now()).toUTCString());
  next();
});

// We are going to fill these out in the sections to follow
function handleRender(req, res) {
  // Create a new Redux store instance
  var store = (0, _redux.createStore)(_index2.default);

  // Render the component to a string
  var html = (0, _server.renderToString)(_react2.default.createElement(
    _reactRedux.Provider,
    { store: store },
    _react2.default.createElement(
      'reactApp',
      null,
      _react2.default.createElement(
        'div',
        null,
        "this is from the server"
      )
    )
  ));

  // Grab the initial state from our Redux store
  var initialState = store.getState();

  // Send the rendered page back to the client
  res.send(renderFullPage(html, initialState));
}

function renderFullPage(html, initialState) {
  return '\n  <!doctype html>\n  <html>\n    <head>\n      <meta charset="UTF-8">\n        <title>myFullstackJsNetwork</title>\n        <link rel="stylesheet" href="styles.css" charset="utf-8">\n        </head>\n        <body>\n          <div id="root">' + html + '</div>\n          <script>\n            window.__INITIAL_STATE__ = ' + JSON.stringify(initialState) + '\n          </script>\n          <script src="bundle.js"></script>\n          <script src="bundle.map.js"></script>\n        </body>\n      </html>\n      ';
}

// This is fired every time the server side receives a request
app.use('/', handleRender);

// app.use('/', routes);
// app.use('/users', users);
// app.use('/auth', auth);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

module.exports = app;