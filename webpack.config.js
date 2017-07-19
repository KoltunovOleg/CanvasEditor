const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge');
const devserver = require('./webpack/devserver');
const babel = require('./webpack/babel');
const sass = require('./webpack/sass');
const css = require('./webpack/css');
const extractCSS = require('./webpack/css.extract');

const PATHS = {
  source: path.join(__dirname, 'source'),
  build: path.join(__dirname, 'build')
};


const common = merge([
  {
    entry: PATHS.source + '/index.js',
    output: {
      filename: 'js/[name].js',
      path: PATHS.build
    },
    plugins: [
      new HtmlWebpackPlugin({
        filename: 'index.html',
        template: PATHS.source + '/index.html'
      }),
      new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery'
      })
    ]
  },
  babel()
]);



module.exports = function (env) {
  if (env === 'production') {
    return merge([
      common,
      extractCSS()
    ]);
  }
  if (env === 'development') {
    return merge([
      common,
      devserver(),
      sass(),
      css()
    ])
  }
};
