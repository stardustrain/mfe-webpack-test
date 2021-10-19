const path = require('path');
const ModuleFederationPlugin = require('webpack').container.ModuleFederationPlugin;
const {TuneDtsPlugin} = require('@efox/emp-tune-dts-plugin');

module.exports = {
  entry: './src/index',
  cache: false,
  mode: 'development',
  devtool: 'source-map',

  optimization: {
    minimize: false,
    splitChunks: {
      chunks: 'all',
      name: false,
    },
  },

  output: {
    publicPath: 'http://localhost:3001/'
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
      name: 'components',
      library: {type: 'var', name: 'components'},
      filename: 'removeEntry.js',
      exposes: {
        './Button': './src/Button'
      },
      shared: {
        react: {
          singleton: true
        },
        'react-dom': {
          singleton: true
        }
      }
    }),
    new TuneDtsPlugin({
      output: path.join('./dist', 'index.d.ts'),
      path: './dist',
      name: 'index.d.ts',
      isDefault: true,
    })
  ],

  node: false,
}