const gulp = require('gulp');
const sass = require('gulp-sass');
const sassGlob = require('gulp-sass-glob');
const watch = require('gulp-watch');
const plumber = require('gulp-plumber');
const ejs = require('gulp-ejs');
const prettyHtml = require('gulp-pretty-html');
const del = require('del');
const runSequence = require('run-sequence');
const webserver = require('gulp-webserver');
const config = require('./config.js');

gulp.task('ejs', function(){
  return gulp.src(config.assets + '/**/[^_]*.ejs', { base: './src/' })
    .pipe(plumber({
      errorHandler: function(err){
        console.log(err.messageFormatted);
        this.emit('end');
      }
    }))
    .pipe(ejs({}, {}, {"ext": ".html"}))
    .pipe(prettyHtml({
      indent_size: 2,
      indent_char: ' ',
      max_preserve_newlines: 0
    }))
    .pipe(gulp.dest(config.build))
});

gulp.task('sass', function(){
  return gulp.src(config.assets + '/**/*.scss', { base: './src/' })
    .pipe(plumber({
      errorHandler: function(err){
        console.log(err.messageFormatted);
        this.emit('end');
      }
    }))
    .pipe(sassGlob())
    .pipe(sass({outputStyle: 'expanded'}))
    .pipe(gulp.dest(config.build))
});

gulp.task('clean', function() {
  return del(['./dist/**/*']);
});

gulp.task('copy', function(){
  return gulp.src([config.assets + '/**/*.+(html|js|css|json|jpg|gif|png|svg|ico|md)', '!' + config.assets + '/**/_*'], { base: './src/' })
  .pipe(gulp.dest(config.build))
});

gulp.task('webserver', function () {
  gulp.src(config.build)
    .pipe(webserver({
      host: 'localhost',
      port: 8080,
      livereload: true
    }));
});

gulp.task('watch', function(){
  watch([config.assets + '/**/*'], function(){
      gulp.start(['sass']);
      gulp.start(['ejs']);
      gulp.start(['copy']);
  });
});

//gulp.task('build', ['clean', 'sass', 'ejs', 'copy']);
gulp.task('build', function(callback) {
  return runSequence(
    'clean', ['sass', 'ejs', 'copy'],
    callback
  );
});
