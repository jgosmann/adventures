const child_process = require('child_process');
const del = require('del');
const faviconsStream = require('favicons').stream;
const fs = require('fs');
const gulp = require('gulp');
const { parallel, series } = require('gulp');
const webpack_stream = require('webpack-stream');
const webpack_config = require('./webpack.config.js');

function favicons() {
  const dest = './favicons';
  const metafile = './assets/meta.html';
  return gulp.src('./assets/svg/favicon.svg')
    .pipe(faviconsStream({
      appName: 'Jan\' outdoor adventures',
      developerName: 'Jan Gosmann',
      developerURL: 'https://www.jgosmann.de',
      start_url: '/',
      icons: {
        appleStartup: false,
        coast: false,
        firefox: false,
        yandex: false
      }
    }, (html) => {
      fs.writeFile(
        metafile, html.join(''),
        (err) => {
          if (err) {
            return console.log(err);
          }
        }
      );
    }))
    .pipe(gulp.dest(dest));
}

function webpack() {
  return webpack_stream(webpack_config)
    .pipe(gulp.dest('./lib'))
}


function hugo_clean() {
  return del(['./public']);
}

async function hugo() {
  child_process.execFileSync(
    'hugo', { stdio: 'inherit' }
  );
}

async function deploy() {
  child_process.execFileSync(
    'rsync', [
      '-avz', '--delete', '--checksum',
      'public/', 'jgosmann@hyper-world.de:~/adventures'
    ],
    { stdio: 'inherit' }
  );
}

exports.favicons = favicons;
exports.webpack = webpack;
exports.rehugo = series(hugo_clean, hugo);
exports.rebuild = series(
  parallel(favicons, webpack),
  exports.rehugo);
exports.clean = hugo_clean;
exports.deploy = deploy;
