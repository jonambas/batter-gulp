"use strict";

var gulp            = require('gulp'),
    uglify          = require('gulp-uglify'),
    concat          = require('gulp-concat'),
    sass            = require('gulp-ruby-sass'),
    autoprefixer    = require('gulp-autoprefixer'),
    minifycss       = require('gulp-minify-css'),
    plumber         = require('gulp-plumber'),
    imagemin        = require('gulp-imagemin'),
    browserSync     = require('browser-sync'),
    rename          = require('gulp-rename'),
    nunjucksRender  = require('gulp-nunjucks-render'),
    notify          = require("gulp-notify"),
    reload          = browserSync.reload;

var src = {
  scss:    './src/public/styles/scss/',
  css:     './src/public/styles/*.css',
  js:      './src/public/scripts/**/*.js',
  img:     './src/public/images/**/*',
  tmp:     './src/templates/',
  fonts:   './src/public/fonts/**/*.{ttf,woff,eot,svg}'
}

gulp.task('browser-sync', function() {
    browserSync({
        server: {
            baseDir: "dist/"
        },
        ghostMode: {
            clicks: true,
            forms: true,
            scroll: false
        },
        notify: false,
        open: "external"
    });
});

gulp.task('scripts', function(){
  gulp.src(src.js)
    .pipe(plumber())
    .pipe(uglify())
    .pipe(concat('scripts.min.js'))
    .pipe(gulp.dest('./dist/public/scripts/'));
});

gulp.task('sass', function() {
  return sass(src.scss, { 
    style: 'expanded', 
    sourcemap: false 
  })
    /*.pipe(plumber()) plumber doesn't work with gulp-ruby-sass */
    .on('error', function(err) {
        notify.onError({
            title: 'Sass Error!',
            message: '<%= error.message %>',
            sound: 'Basso'
        })(err);
    })
    .pipe(autoprefixer())
    .pipe(gulp.dest('src/public/styles/css'))
    .pipe(minifycss({ keepSpecialComments: 0 }))
    .pipe(rename({suffix: '.min' }))
    .pipe(gulp.dest('./dist/public/styles/'))
    .pipe(reload({ stream: true }));
});

gulp.task('image', function(){
  gulp.src(src.img)
    .pipe(plumber())
    .pipe(imagemin())
    .pipe(gulp.dest('./dist/public/images/'));
});

gulp.task('layout', function () {
  nunjucksRender.nunjucks.configure([src.tmp]);
  return gulp.src([src.tmp + '*.html'])
    .pipe(nunjucksRender())
    .pipe(gulp.dest('./dist/'));
});

gulp.task('fonts', function() {
   gulp.src(src.fonts)
   .pipe(gulp.dest('./dist/public/fonts'));
});

gulp.task('watch', function(){  
  gulp.watch(src.scss + '**/*.scss', ['sass']);
  gulp.watch(src.js,                 ['scripts', reload]);
  gulp.watch(src.tmp  + '**/*.html', ['layout', reload]);
});


gulp.task('default', ['scripts', 'fonts', 'sass', 'layout', 'image', 'watch', 'browser-sync']);
