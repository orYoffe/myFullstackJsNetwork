var path = require('path');
var srcPath = path.join(__dirname, 'app/src');
const webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var buildPath = path.join(__dirname, 'app/dist/client/public');
process.env.NODE_ENV = 'production';

module.exports = {
    context: srcPath,
    entry: path.join(srcPath, 'client/client.js'),
    output: {
      path: buildPath,
      filename: "bundle.js",
      publicPath: "/public/"
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
        {
          test: /\.js$/,
          exclude: /(node_modules|bower_components)/,
          loader: 'babel',
          query: {
            presets:[ 'es2015', 'react', 'stage-2' ]
          }
        },
        {
          test: /\.jsx$/,
          exclude: /(node_modules|bower_components)/,
          loader: 'babel',
          query: {
            presets:[ 'es2015', 'react', 'stage-2' ]
          }
        }
      ]
    },
    devtool: "source-map", // or "inline-source-map"
    sassLoader: {
      includePaths: [path.resolve(srcPath)]
    },
    plugins: [
        new ExtractTextPlugin("styles.css", {allChunks: true}),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
            },
            output: {
                comments: false,
            }
        }),
        new webpack.DefinePlugin({
          'process.env': {
            'NODE_ENV': JSON.stringify('production')
          }
        })
      ],
      webpackServer: {
        noInfo: true // Suppress all webpack messages, except errors
      }
    };
