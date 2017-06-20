'use strict';
const webpack = require('webpack');

module.exports = {
  entry: "./src/client/index.tsx",
  output: {
    filename: "./dist/static/javascripts/bundle.js"
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
        WS_HOST: JSON.stringify("wss://taskboard.vvatanabe.com"),
      })
  ]
};
