#!/usr/bin/env node
'use strict';

/**
 * Module dependencies.
 */

var initHelpers = require('./config/initHelpers');
var app = require('./app');
var debug = require('debug')('myFullstackJsNetwork:server');
var http = require('http');

/**
 * Get port from environment and store in Express.
 */

var port = initHelpers.normalizePort(process.env.PORT || '3000');
app.set('port', port);

/**
 * Create HTTP server.
 */

var server = http.createServer(app);

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;
  debug('Listening on ' + bind);
}

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
var host = server.address().address;
var port = server.address().port;

console.log("server listening at http://%s:%s", host, port);
server.on('error', initHelpers.onError);
server.on('listening', onListening);