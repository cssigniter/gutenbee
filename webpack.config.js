const path = require('path');

const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const autoprefixer = require('autoprefixer');
const CSSMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

const NODE_ENV = process.env.NODE_ENV || 'development';

const recursiveIssuer = m => {
  if (m.issuer) {
    return recursiveIssuer(m.issuer);
  } else if (m.name) {
    return m.name;
  }

  return false;
};

const wplib = [
  'blocks',
  'components',
  'date',
  'blockEditor',
  'element',
  'i18n',
  'data',
  'compose',
  'keycodes',
  'htmlEntities',
  'serverSideRender',
  'icons',
];

const webpackConfig = {
  mode: NODE_ENV,
  entry: {
    'gutenbee.build': './src/index.js',
    'gutenbee.scripts': './src/frontend.js',
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: '[name].js',
    library: ['wp', '[name]'],
    libraryTarget: 'window',
  },
  // Define WordPress external libraries loaded globally
  // as separate scripts so that we can use them as ES modules
  externals: wplib.reduce(
    (externals, lib) => {
      externals[`wp.${lib}`] = {
        window: ['wp', lib],
      };

      return externals;
    },
    {
      // Initial externals (non WP libraries)
      jquery: 'jQuery',
      react: 'React',
      'react-dom': 'ReactDOM',
      lodash: 'lodash',
    },
  ),
  optimization: {
    // https://github.com/webpack-contrib/mini-css-extract-plugin#extracting-css-based-on-entry
    splitChunks: {
      cacheGroups: {
        editorStyles: {
          name: 'gutenbee.build',
          test: (m, c, entry = 'gutenbee.build') =>
            m.constructor.name === 'CssModule' && recursiveIssuer(m) === entry,
          chunks: 'all',
          enforce: true,
        },
        frontendStyles: {
          name: 'gutenbee.scripts',
          test: (m, c, entry = 'gutenbee.scripts') =>
            m.constructor.name === 'CssModule' && recursiveIssuer(m) === entry,
          chunks: 'all',
          enforce: true,
        },
      },
    },
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
        test: /\.scss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: 'css-loader',
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: () => [
                autoprefixer({
                  browsers: [
                    'last 5 chrome version',
                    'last 5 firefox version',
                    'last 3 iOS version',
                    'last 3 Safari version',
                    'Android >= 8',
                  ],
                  cascade: false,
                  remove: true,
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
      },
      {
        test: /\.svg$/,
        use: ['@svgr/webpack'],
      },
      {
        test: /\.(ttf|eot|woff|woff2)$/,
        loader: 'file-loader',
        options: {
          name: 'fonts/[name].[ext]',
        },
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(NODE_ENV),
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),
  ],
  devtool: 'eval-source-map',
};

if (NODE_ENV === 'production') {
  delete webpackConfig.devtool;

  webpackConfig.optimization = {
    ...webpackConfig.optimization,
    minimize: true,
    minimizer: [
      ...(webpackConfig.optimization.minimizer || []),
      new TerserPlugin(),
      new CSSMinimizerPlugin(),
    ],
  };
}

module.exports = webpackConfig;
