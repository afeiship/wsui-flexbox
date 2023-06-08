'use strict';

var gulp = require('gulp');
var autoprefixer = require('autoprefixer');
var sass = require('gulp-sass')(require('sass'));

var $ = require('gulp-load-plugins')({
  pattern: ['gulp-*', 'gulp.*', 'del', '@jswork/gulp-*'],
});

//styles
//styles
gulp.task('styles:web', function () {
  return gulp
    .src('src/*.scss')
    .pipe($.concat('index.scss'))
    .pipe($.jswork.pkgHeader())
    .pipe(gulp.dest('dist'))
    .pipe(sass({ outputStyle: 'expanded' }).on('error', sass.logError))
    .pipe($.rename('style.css'))
    .pipe(gulp.dest('dist'));
});

gulp.task('styles:weapp', function () {
  return gulp
    .src('src/*.scss')
    .pipe($.concat('index.scss'))
    .pipe($.replace(/&_ > \*/g, '&_ > view, &_ > text'))
    .pipe($.replace(/& > \*/g, '& > view, & > text'))
    .pipe($.rename('index.weapp.scss'))
    .pipe(gulp.dest('dist'))
    .pipe(sass({ outputStyle: 'expanded' }).on('error', sass.logError))
    .pipe($.rename('style.weapp.css'))
    .pipe(gulp.dest('dist'));
});

gulp.task('styles', gulp.series(['styles:web', 'styles:weapp']));
