import express from 'express'
import path from 'path'
import favicon from 'serve-favicon'
import morgan from 'morgan'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'
import hbs from 'express-handlebars'
import config from './config'

import React from 'react'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { renderToString } from 'react-dom/server'
import reducers from './client/js/reducers/index'
import routes from './client/js/routes'
import { createHashHistory } from 'history'
import { configureStore } from './client/store'
import { syncHistoryWithStore } from 'react-router-redux'
import { Router, createRoutes, RoutingContext, match, RouterContext, createMemoryHistory  } from 'react-router'
import zlib from 'zlib'

const app = express();
// import mongoose from 'mongoose'
// mongoose.connect(config.getDb());
// const db = mongoose.connection;
// db.on('error', console.error.bind(console, 'connection error:'));
// db.once('open', console.error.bind(console, 'Connected to the db'));

app.engine('hbs', hbs({extname: 'hbs', defaultLayout: 'layout', layoutsDir: __dirname + '/views/layouts/'}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(favicon(path.join(__dirname, 'client/public', 'favicon.ico')));
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
function handleRender(req, res, next) {

  const memoryHistory = createMemoryHistory(req.path)
  let store = configureStore(memoryHistory )
  const history = syncHistoryWithStore(memoryHistory, store)

  match({ history, routes , location: req.originalUrl }, (error, redirectLocation, renderProps) => {

    if (error) {
      res.status(500).send(error.message)
    } else if (redirectLocation) {
      res.redirect(302, redirectLocation.pathname + redirectLocation.search)
    } else if (renderProps) {
        store = configureStore(memoryHistory, store.getState() )
        const content = renderToString(
          <Provider store={store}>
            <RouterContext {...renderProps}/>
          </Provider>
        )

        zlib.gzip(content, (err, result) => {
          res.writeHead(200, {
            'Content-Length': result.length,
            'Content-Type': 'text/javascript',
            'Content-Encoding': 'gzip'
          })
          res.write(result)
          res.status(200).send(html)
        res.status(200).send(renderFullPage(content, store.getState()))
    }
  })
}


function renderFullPage(html, initialState) {
  return `
  <!doctype html>
  <html>
    <head>
      <meta charset="UTF-8">
        <title>myFullstackJsNetwork</title>
        <link rel="shortcut icon" href="favicon.ico" />
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
    app.use('/*', handleRender);

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
