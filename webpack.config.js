const fs = require('fs');
const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');

module.exports = {
  entry: {
    main: './assets/js/index.js',
    doveseed: './assets/js/doveseed/index.js'
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
        if (fd.name === 'main.js') {
          templateFile = path.resolve(__dirname, 'layouts/_default/baseof.template.html');
          outFile = path.resolve(__dirname, 'layouts/_default/baseof.html');
          content = fs.readFileSync(templateFile, 'utf8');
          content = content.replace(/%SCRIPT%/g, fd.path);
          fs.writeFileSync(outFile, content);
        } else if (fd.name === 'doveseed.js') {
          templateFile = path.resolve(__dirname, 'layouts/shortcodes/doveseed.template.html');
          outFile = path.resolve(__dirname, 'layouts/shortcodes/doveseed.html');
          content = fs.readFileSync(templateFile, 'utf8');
          content = content.replace(/%SCRIPT%/g, fd.path);
          fs.writeFileSync(outFile, content);

          templateFile = path.resolve(__dirname, 'layouts/shortcodes/doveseed-confirm.template.html');
          outFile = path.resolve(__dirname, 'layouts/shortcodes/doveseed-confirm.html');
          content = fs.readFileSync(templateFile, 'utf8');
          content = content.replace(/%SCRIPT%/g, fd.path);
          fs.writeFileSync(outFile, content);
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
