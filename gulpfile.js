var gulp = require('gulp');
var gutil = require("gulp-util");
var webpack = require('gulp-webpack');
var webpackConfig = require("./config/webpack.config.js");
var WebpackDevServer = require("webpack-dev-server");

gulp.task("webpack", function() {
  return gulp.src("app/assets/javascripts/entry.js")
             .pipe(webpack(webpackConfig))
             .pipe(gulp.dest("app/assets/javascripts/"));
});

gulp.task("watch", function() {
  gulp.watch(["app/assets/javascripts/**/*.js",
             "!app/assets/javascripts/bundle.js",
             "app/assets/javascripts/**/*.jsx"],
             ["webpack"]);
});

// gulp.task("webpack-dev-server", function(callback) {
//   new WebpackDevServer(webpack(webpackConfig), {
//     publicPath: "/public",
//     stats: {
//       colors: true
//     }
//   }).listen(3000, "localhost", function(err) {
//     if(err) throw new gutil.PluginError("webpack-dev-server", err);
//     gutil.log("[webpack-dev-server]", "http://localhost:3000/webpack-dev-server/index.html");
//   });
// });

gulp.task("default", ["watch"]);
