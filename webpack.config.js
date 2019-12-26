const fs = require('fs');
const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');

module.exports = {
  entry: {
    main: './assets/js/index.js',
    doveseed: './assets/js/doveseed/index.js',
    mapping: './assets/js/mapping.js'
  },
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
    path: path.resolve(__dirname, 'lib'),
    filename: '[name].[contenthash].js',
  },
  plugins: [
    new CleanWebpackPlugin(),
    new ManifestPlugin({
      map: (fd) => {
        if (/.js$/.test(fd.name)) {
          outPath = path.resolve(__dirname, 'layouts/partials/', 'script.' + fd.name + '.html');
          fs.writeFileSync(outPath, `<script src="{{ "${fd.path}" | relURL }}" defer></script>`);
        }
        return fd;
      },
      fileName: 'webpack-manifest.json'
    })
  ],
  resolve: {
    alias: {
      'react': 'preact/compat',
      'react-dom/testing-utils': 'preact/test-utils',
      'react-dom': 'preact/compat'
    }
  }
};
