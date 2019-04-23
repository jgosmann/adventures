const changed = require('gulp-changed');
const child_process = require('child_process');
const favicons = require('favicons').stream;
const fs = require('fs');
const gulp = require('gulp');

gulp.task('favicons', () => {
  const dest = './static';
  const metafile = './assets/meta.html';
  return gulp.src('./assets/svg/favicon.svg')
    .pipe(changed(dest, {transformPath: _ => { return metafile; }}))
    .pipe(favicons({
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
});

gulp.task('deploy', async () => {
  await child_process.execFile(
    "lftp -u jgosmann 'sftp://hyper-world.de' -e 'mirror -R public adventures; wait all; exit'");
});
