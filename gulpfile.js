var gulp 						= require('gulp'),
		uglify 					= require('gulp-uglify'),
		concat					= require('gulp-concat'),
		sass 						= require('gulp-ruby-sass'),
		compass 				= require('gulp-compass'),
		minifycss       = require('gulp-minify-css'),
		plumber 				= require('gulp-plumber'),
		imagemin 				= require('gulp-imagemin'),
		browserSync 		= require('browser-sync'),
		rename 					= require('gulp-rename'),
		nunjucksRender 	= require('gulp-nunjucks-render'),
		reload 					= browserSync.reload;

var src = {
	scss: 'src/public/styles/scss/',
	css:  'src/public/styles/*.css',
	js: 	'src/public/scripts/**/*.js',
	img: 	'src/public/images/**/*',
	tmp: 	'src/templates/'
}

// Static server
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
        notify: false
    });
});

//Uglifies
gulp.task('scripts', function(){
	gulp.src(src.js)
		.pipe(plumber())
		.pipe(uglify())
		.pipe(concat('scripts.min.js'))
		.pipe(gulp.dest('dist/public/scripts/'));
});

//Uglifies
gulp.task('sass', function() {
  //return sass(src.scss, { style: 'compressed', sourcemap: false })
  return gulp.src('src/public/styles/scss/*.scss')
  	.pipe(plumber())
  	.pipe(compass({
      config_file: 'src/config.rb',
      css: 'src/public/styles/css' ,
      sass: 'src/public/styles/scss',
      style: 'expanded'
    }))
    .pipe(minifycss())
		.pipe(rename({suffix: '.min' }))
    .pipe(gulp.dest('dist/public/styles/'))
    .pipe(reload({stream: true}));
});

//Image 
gulp.task('image', function(){
	gulp.src(src.img)
		.pipe(plumber())
		.pipe(imagemin())
		.pipe(gulp.dest('dist/public/images/'));
});

//Nunjucks
gulp.task('layout', function () {
  nunjucksRender.nunjucks.configure([src.tmp]);

  return gulp.src([src.tmp + '*.html'])
    .pipe(nunjucksRender())
    .pipe(gulp.dest('dist/'));

});

//Watch Task
gulp.task('watch', function(){	
	gulp.watch(src.scss + '**/*.scss', ['sass']);
	gulp.watch(src.js, 								 ['scripts', reload]);
	gulp.watch(src.tmp  + '**/*.html', ['layout', reload]);
});


gulp.task('default', ['scripts', 'sass', 'layout', 'image', 'watch', 'browser-sync']);
