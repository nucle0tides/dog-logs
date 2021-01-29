const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const dotenv = require('dotenv');

const { NODE_ENV } = process.env;

module.exports = {
  entry: {
    main: './website/index.js',
  },
  mode: NODE_ENV,
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        options: { presets: ['@babel/env'] },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        // https://webpack.js.org/loaders/sass-loader/
        test: /\.s[ac]ss$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true,
            },
          },
          {
            loader: 'sass-loader',
            options: {
              // https://webpack.js.org/loaders/sass-loader/#additionaldata
              additionalData: '@import "default";',
              sassOptions: {
                includePaths: [path.resolve(__dirname, 'website/theme/')],
              },
            },
          },
        ],
      },
      {
        // https://webpack.js.org/loaders/file-loader/
        test: /\.(jpe?g|png|gif)$/i,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      },
    ],
  },
  resolve: { extensions: ['*', '.js', '.jsx'] },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  devServer: {
    contentBase: path.join(__dirname, 'public/'),
    port: 3000,
    publicPath: 'http://localhost:3000/',
    hotOnly: true,
  },
  // clean /dist with clean-webpack-plugin
  plugins: [
    NODE_ENV === 'development' && new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'public/index.html'),
      // favicon: path.join(__dirname, 'public/favicon.ico'),
    }),
    new webpack.DefinePlugin({ 'process.env': JSON.stringify(dotenv.config().parsed) }),
  ].filter(Boolean),
};
