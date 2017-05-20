'use strict';
const webpack = require('webpack');

module.exports = {
  entry: "./src/server/index.ts",
  target: 'node',
  output: {
    filename: "./dist/server/bundle.js",
    libraryTarget: "commonjs2"
  },
  // Enable sourcemaps for debugging webpack's output.
  devtool: "source-map",
  resolve: {
    // Add '.ts' and '.tsx' as resolvable extensions.
    extensions: [ ".ts", ".tsx", ".js" ]
  },
  module: {
    loaders: [
      // All files with a '.ts' or '.tsx' extension will be handled by 'ts-loader'.
      { test: /\.tsx?$/, loader: "ts-loader", exclude: /node_modules/ }
    ]
  }
};
