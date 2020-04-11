const path = require('path');

module.exports = {
  mode: 'development',
  entry: {
    index: './index.ts',
  },
  module: {
    rules: [{
      test: /.[jt]s?$/,
      loader: 'awesome-typescript-loader',
      options: {
        useBabel: true,
        babelOptions: {
          babelrc: false,
          presets: ['@babel/preset-env'],
          plugins: [
            'add-module-exports',
          ]
        },
        babelCore: '@babel/core',
      }
    }],
  },
  output: {
    path: path.join(__dirname),
    filename: '[name].js',
    library: 'axios',
    libraryTarget: "umd"
  }
}
