const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');

const NODE_ENV = process.env.NODE_ENV || 'development';
const extractEditor = new ExtractTextPlugin('gutenbee.editor.css');
const extractStyles = new ExtractTextPlugin('gutenbee.style.css');

const styleLoader = {
  fallback: 'style-loader',
  use: [
    {
      loader: 'css-loader',
    },
    {
      loader: 'postcss-loader',
      options: {
        plugins: () => [
          autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false,
          }),
        ],
      },
    },
    {
      loader: 'sass-loader',
      options: {
        outputStyle: 'expanded',
      },
    },
  ],
};

const webpackConfig = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'gutenbee.build.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'eslint-loader',
        enforce: 'pre',
        exclude: /node_modules/,
      },
      {
        test: /.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /editor.scss$/,
        use: extractEditor.extract(styleLoader),
      },
      {
        test: /style.scss$/,
        use: extractStyles.extract(styleLoader),
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(NODE_ENV),
    }),
    extractEditor,
    extractStyles,
  ],
  devtool: 'eval-source-map',
};

if (NODE_ENV === 'production') {
  webpackConfig.plugins.push(new webpack.optimize.UglifyJsPlugin());
  delete webpackConfig.devtool;
}

module.exports = webpackConfig;
