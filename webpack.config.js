var path = require('path');
var srcPath = path.join(__dirname, 'src');
var buildPath = path.join(__dirname, 'public');
const webpack = require('webpack');

module.exports = {
  context: srcPath,
  entry: path.join(srcPath, 'client.js'),
  output: {
      path: buildPath,
      filename: "bundle.js",
      publicPath: buildPath
  },
  module: {
      loaders: [

        {
            test: /\.css$/,
            exclude: /node_modules/,
            loader: 'style-loader!css-loader!autoprefixer-loader'
        },
        {
            test: /\.scss$/,
            loader: 'style-loader!css-loader!autoprefixer-loader!sass loader'
        },
          // { test: /\.css$/, loader: "style!css" },
          // {
          //   test: /\.scss$/,
          //   loaders: ["style", "css?sourceMap", "sass?sourceMap"],
          //   include: path.join(srcPath, 'scss', 'index.scss')
          // },
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
    includePaths: [path.resolve(__dirname, "src/sass/index.scss")],
    data: [path.resolve(__dirname, "src/sass")]
  },
  // plugins: [
  //     new webpack.optimize.UglifyJsPlugin({
  //         compress: {
  //             warnings: process.env.NODE_ENV == 'dev',
  //         },
  //         output: {
  //             comments: process.env.NODE_ENV == 'dev',
  //         }
  //     })
  // ],
  webpackServer: {
    noInfo: true // Suppress all webpack messages, except errors
  }
};
