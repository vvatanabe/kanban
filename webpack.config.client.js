'use strict';
const webpack = require('webpack');

module.exports = {
  entry: "./src/client/index.tsx",
  output: {
    filename: "./dist/client/javascripts/bundle.js"
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
