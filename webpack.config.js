const path = require('path');

module.exports = {
  entry: './assets/js/index.js',
  mode: 'production',
  devtool: 'sourcemap',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }, {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }, {
        test: /\.png$/,
        use: ['file-loader']
      }
    ]
  },
  output: {
    path: path.resolve(__dirname, 'static'),
    filename: 'bundle.js',
    library: 'joa'
  }
};
