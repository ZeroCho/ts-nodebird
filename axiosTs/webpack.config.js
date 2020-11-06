const path = require('path');

module.exports = {
  mode: 'production',
  entry: {
    index: './axios/index.ts',
  },
  module: {
    rules: [{
      test: /.tsx?$/,
      loader: 'awesome-typescript-loader',
    }]
  },
  output: {
    path: path.join(__dirname),
    filename: '[name].js',
  },
  resolve: {
    extensions: ['.ts', '.js'],
  }
};
