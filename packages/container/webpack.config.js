const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack').container.ModuleFederationPlugin;
const {TuneDtsPlugin} = require('@efox/emp-tune-dts-plugin');
const devServer = require('./webpack.devServer.config')
const deps = require('./package.json').dependencies;

module.exports = {
  entry: './src/index',
  cache: false,
  mode: 'development',
  devtool: 'source-map',
  devServer,

  optimization: {
    minimize: false,
    splitChunks: {
      chunks: 'all',
      name: false,
    },
  },

  output: {
    publicPath: 'auto',
  },

  resolve: {
    extensions: [".tsx", ".ts", ".json", '.js']
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: {
          loader: 'babel-loader',
        }
      }
    ]
  },

  plugins: [
    new ModuleFederationPlugin({
      name: "container",
      // library: { type: "var", name: "container" },
      filename: "remoteEntry.js",
      remotes: {
        me: "me@http://localhost:3002/remoteEntry.js",
      },
      exposes: {
        'AppContainer':'./src/App'
      },
      shared: {
        react: {
          requiredVersion: deps.react,
          singleton: true
        },
        'react-dom': {
          requiredVersion: deps['react-dom'],
          singleton: true
        },
        'react-router-dom': {
          requiredVersion: deps['react-router-dom'],
          singleton: true
        },
      }
    }),
    new HtmlWebpackPlugin({
      template: "./public/index.html"
    }),
  ],

  node: false,
}