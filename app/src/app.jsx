import express from 'express'
import path from 'path'
import favicon from 'serve-favicon'
import morgan from 'morgan'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'
import hbs from 'express-handlebars'
import config from './config'

import webpack from 'webpack'
import webpackConfig from '../../webpack.config'
webpack(webpackConfig, (err, stats) => {
  console.log(stats);
  console.log(err);

  console.log('============== webpack complied ===============');
})
// import routes from './routes/index'
// import users from './routes/users'
// import auth from './routes/auth'

import React from 'react'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { renderToString } from 'react-dom/server'
import reducers from './client/js/reducers/index'
import reactApp from './client/containers/App'

const app = express();
// import mongoose from 'mongoose'
// mongoose.connect(config.getDb());
// const db = mongoose.connection;
// db.on('error', console.error.bind(console, 'connection error:'));
// db.once('open', console.error.bind(console, 'Connected to the db'));

app.engine('hbs', hbs({extname: 'hbs', defaultLayout: 'layout', layoutsDir: __dirname + '/views/layouts/'}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// TODO uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'client/public')));
app.set('superSecret', config.getSecret());

app.use('*', function timeLog(req, res, next) {
  console.log('Time: ', new Date(Date.now()).toUTCString());
  next();
});

// We are going to fill these out in the sections to follow
function handleRender(req, res) {
  // Create a new Redux store instance
  const store = createStore(reducers)

  // Render the component to a string
  const html = renderToString(
    <Provider store={store}>
      <reactApp>
        <div>{"this is from the server"}</div>
      </reactApp>
    </Provider>
  )

  // Grab the initial state from our Redux store
  const initialState = store.getState()

  // Send the rendered page back to the client
  res.send(renderFullPage(html, initialState))
}

function renderFullPage(html, initialState) {
  return `
  <!doctype html>
  <html>
    <head>
      <meta charset="UTF-8">
        <title>myFullstackJsNetwork</title>
        <link rel="stylesheet" href="styles.css" charset="utf-8">
        </head>
        <body>
          <div id="root">${html}</div>
          <script>
            window.__INITIAL_STATE__ = ${JSON.stringify(initialState)}
          </script>
          <script src="bundle.js"></script>
        </body>
      </html>
      `;
    }

// This is fired every time the server side receives a request
app.use('/', handleRender);

// app.use('/', routes);
// app.use('/users', users);
// app.use('/auth', auth);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
