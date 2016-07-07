var path = require('path');
var srcPath = path.join(__dirname, 'app/src');
var buildPath = path.join(__dirname, 'public');
const webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var BrowserSyncPlugin = require('browser-sync-webpack-plugin');

module.exports = {
  context: srcPath,
  entry: path.join(srcPath, 'client.js'),
  output: {
      path: buildPath,
      filename: "bundle.js",
      publicPath: buildPath
  },
  module: {
    preLoaders: [
      {test: /\.js$/, loader: "eslint-loader", exclude: /node_modules/}
    ],
      loaders: [

        {
            test: /\.css$/,
            exclude: /node_modules/,
            loader: 'style-loader!css-loader?sourceMap!autoprefixer-loader'
        },
        {
            test: /\.scss$/,
            loader: ExtractTextPlugin.extract('style-loader',
 'css-loader?sourceMap!sass-loader?outputStyle=expanded&sourceMap=true&sourceMapContents=true')
        },
      {test: /\.js$/, loaders: [ "babel-loader", "eslint-loader" ], exclude:  /(node_modules|bower_components)/},
          {
            test: /\.jsx?$/,
            exclude: /(node_modules|bower_components)/,
            loader: 'babel',
            query: {
              presets: ['react', 'es2015']
            }
          }
      ]
  },
  devtool: "source-map", // or "inline-source-map"
  sassLoader: {
    includePaths: [path.resolve(__dirname, "src/sass")]
  },
  plugins: [
    new BrowserSyncPlugin({
      // browse to http://localhost:8000/ during development,
      // ./public directory is being served
      host: 'localhost',
      port: 8000,
      server: { baseDir: ['public'] }
    }),
    new ExtractTextPlugin("styles.css",{allChunks: true})
  //     new webpack.optimize.UglifyJsPlugin({
  //         compress: {
  //             warnings: process.env.NODE_ENV == 'dev',
  //         },
  //         output: {
  //             comments: process.env.NODE_ENV == 'dev',
  //         }
  //     })
  ],
  webpackServer: {
    noInfo: true // Suppress all webpack messages, except errors
  }
};
