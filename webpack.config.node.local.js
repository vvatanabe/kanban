'use strict';
const webpack = require('webpack');
const fs = require('fs');
const path = require('path');

module.exports = {
  entry: "./src/server/index.ts",
  target: 'node',
  output: {
    filename: "./dist/node/bundle.js",
    libraryTarget: "commonjs2"
  },
  devtool: "source-map",
  resolve: {
    extensions: [ ".ts", ".tsx", ".js" ]
  },
  module: {
    loaders: [
      { test: /\.tsx?$/, loader: "ts-loader", exclude: /node_modules/ }
    ]
  },
  plugins: [
      new webpack.DefinePlugin({
        STATIC_PATH: JSON.stringify('/dist/static'),
      })
  ]
};
