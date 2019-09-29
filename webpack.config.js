const fs = require('fs');
const path = require('path');
const ManifestPlugin = require('webpack-manifest-plugin');

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
    filename: 'bundle.[contenthash].js',
    library: 'joa'
  },
  plugins: [
    new ManifestPlugin({
      map: (fd) => {
        if (fd.name === 'main.js') {
          templateFile = path.resolve(__dirname, 'layouts/_default/baseof.template.html');
          outFile = path.resolve(__dirname, 'layouts/_default/baseof.html');
          content = fs.readFileSync(templateFile, 'utf8');
          content = content.replace(/%SCRIPT%/g, fd.path);
          fs.writeFileSync(outFile, content);
        }
        return fd;
      },
      fileName: 'webpack-manifest.json'
    })
  ]
};
