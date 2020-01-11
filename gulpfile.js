const child_process = require("child_process");
const del = require("del");
const faviconsStream = require("favicons").stream;
const fs = require("fs");
const gulp = require("gulp");
const { parallel, series } = require("gulp");
const path = require("path");
const webpack_stream = require("webpack-stream");
const webpack_config = require("./webpack.config.js");

const clean = () => {
  return del(["./public"]);
};
exports.clean = clean;

const favicons = () => {
  const dest = "./favicons";
  const metafile = "./assets/meta.html";
  return gulp
    .src("./assets/svg/favicon.svg")
    .pipe(
      faviconsStream(
        {
          appName: "Jan' outdoor adventures",
          developerName: "Jan Gosmann",
          developerURL: "https://www.jgosmann.de",
          start_url: "/",
          icons: {
            appleStartup: false,
            coast: false,
            firefox: false,
            yandex: false
          }
        },
        html => {
          fs.writeFile(metafile, html.join(""), err => {
            if (err) {
              return console.log(err);
            }
          });
        }
      )
    )
    .pipe(gulp.dest(dest));
};
exports.favicons = favicons;

const webpack = () => {
  return webpack_stream(webpack_config).pipe(gulp.dest("./lib"));
};
exports.webpack = webpack;

const hugo = async () => {
  const isFingerprinted = dirent => {
    return [".js", ".js.map", ".css"].some(suffix =>
      dirent.name.endsWith(suffix)
    );
  };

  const public_path = "./public";
  const public_dir = await fs.promises.opendir(public_path);
  for await (const dirent of public_dir) {
    if (isFingerprinted(dirent)) {
      await fs.promises.unlink(path.join(public_path, dirent.name));
    }
  }

  await child_process.execFile("hugo", { stdio: "inherit" });
};
exports.hugo = hugo;

const watchAssets = () => {
  gulp.watch("./assets/svg/favicon.svg", favicons);
  gulp.watch("./assets/js/**/*", webpack);
};
exports.watchAssets = watchAssets;

const hugoServer = () => {
  const hugo = child_process.spawn("hugo", ["server", "-D"]);
  hugo.stdout.on("data", data => {
    const lines = data.toString().split("\n");
    for (let i = 0; i < lines.length; ++i) {
      console.log(`[hugo] ${lines[i]}`);
    }
  });
  hugo.stderr.on("data", data => {
    const lines = data.toString().split("\n");
    for (let i = 0; i < lines.length; ++i) {
      console.error(`[hugo] ${lines[i]}`);
    }
  });
  return hugo;
};
exports.hugoServer = hugoServer;

const deploy = () => {
  return child_process.execFile(
    "rsync",
    [
      "-avz",
      "--delete",
      "--checksum",
      "public/",
      "jgosmann@hyper-world.de:~/adventures"
    ],
    { stdio: "inherit" }
  );
};
exports.deploy = deploy;

exports.server = parallel(watchAssets, hugoServer);
exports.build = series(parallel(favicons, webpack), hugo);
exports.default = exports.build;
