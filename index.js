#!/usr/bin/env node

/**
 * Module dependencies.
 */

var initHelpers = require('./config/initHelpers');
var app = require('./app');
var debug = require('debug')('myapp:server');
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
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
console.log('server listening on port ' + port);
server.on('error', initHelpers.onError);
server.on('listening', initHelpers.onListening);
