const path = require('path');

module.exports = {
  static: {
    directory: path.resolve(__dirname, 'public')
  },
  port: 3002,
  historyApiFallback: true,
}