
/**
 * Normalize a port into a number, string, or false.
 */

export function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

export function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

export function renderFullPage(html, initialState) {
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
      `
    }



export default {
  normalizePort,
  onError,
  renderFullPage
};
