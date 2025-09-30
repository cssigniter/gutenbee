const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CSSMinimizerPlugin = require('css-minimizer-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const ESLintPlugin = require('eslint-webpack-plugin');

const NODE_ENV = process.env.NODE_ENV || 'development';

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

module.exports = {
  mode: NODE_ENV,
  entry: {
    'gutenbee.build': './src/index.js',
    'gutenbee.scripts': './src/frontend.js',
    'gutenbee.animations': './src/animations.js',
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: '[name].js',
    library: {
      name: ['wp', '[name]'],
      type: 'window',
    },
  },
  externals: wplib.reduce(
    (externals, lib) => {
      externals[`wp.${lib}`] = { window: ['wp', lib] };
      return externals;
    },
    {
      jquery: 'jQuery',
      react: 'React',
      'react-dom': 'ReactDOM',
      lodash: 'lodash',
      '@wordpress/dom': { window: ['wp', 'dom'] },
    },
  ),
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'postcss-loader',
            options: { postcssOptions: { plugins: ['autoprefixer'] } },
          },
          {
            loader: 'sass-loader',
            options: {
              sassOptions: { silenceDeprecations: ['legacy-js-api'] },
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
        type: 'asset/resource',
        generator: {
          filename: 'fonts/[name][ext]',
        },
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({ filename: '[name].css' }),
    new ESLintPlugin({ context: 'src' }),
    ...(process.env.ANALYZE ? [new BundleAnalyzerPlugin()] : []),
  ],
  optimization: {
    minimize: NODE_ENV === 'production',
    minimizer: [
      `...`,
      new CSSMinimizerPlugin(),
    ],
  },
  devtool: NODE_ENV === 'production' ? false : 'cheap-module-source-map',
  performance: {
    hints: false,
  }
};
