'use strict';

const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const webpack = require("webpack");
const path = require('path');
var pkg = require('./package.json');
var vendors = Object.keys(pkg.dependencies);
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
  target: "web",
  cache: true,
  entry: {
    app: './Resources/src/app.js'
  },
  resolve: {
    extensions: ['.html', '.js', '.json', '.scss', '.css'],
    alias: {
      leaflet_css: __dirname + "/node_modules/leaflet/dist/leaflet.css"
    }
  },
  output: {
    path: __dirname + "/Resources/public/js",
    filename  : '[name].min.js'
  },
  devtool: 'source-map',
  module: {
    loaders: [
      {
        test: /\.js?$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader'
      }
    ]
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({name: "vendors", filename: 'vendors.min.js'}),
    new CopyWebpackPlugin([
      { from: 'node_modules/leaflet/dist/leaflet.css', to: __dirname + '/Resources/public/css/leaflet.css' },
    ]),
    new UglifyJsPlugin()
  ]
};