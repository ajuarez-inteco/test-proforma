const ESLintWebpackPlugin = require('eslint-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

const path = require('path');

module.exports = {
  entry: './src/index.jsx',
  mode: 'development',
  cache: false,
  output: {
    path: path.resolve(__dirname, './dist'),
    publicPath: '/',
    filename: 'index_bundle.js',
  },
  stats: {
    errorDetails: true,
  },
  target: 'web',
  devServer: {
    port: '3001',
    historyApiFallback: true,
    static: {
      directory: path.join(__dirname, 'public'),
      watch: {
        ignored: /node_modules/,
      },
    },
    open: true,
    hot: true,
    liveReload: true,
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
  },
  module: {
    rules: [
      {
        test: /\.js$|jsx/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.css$/i,
        use: [
          'style-loader',
          { loader: 'css-loader', options: { importLoaders: 1 } },
          'postcss-loader',
        ],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'public', 'index.html'),
    }),
    new CopyPlugin({
      patterns: [
        { from: './public/manifest.json', to: './manifest.json' },
        { from: './public/logo.ico', to: './logo.ico' },
      ],
    }),
    new ESLintWebpackPlugin({ extensions: ['js', 'jsx'] }),
  ],
};
