var path = require('path');
var config = require('./webpack.config');
var buildPath = path.join(__dirname, 'app/src/client/public');
config.output.path = buildPath;
config.output.publicPath = buildPath;
module.exports = config;
