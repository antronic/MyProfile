var gulp = require('gulp');
var sass = require('gulp-sass');
var rename = require('gulp-rename');
var minifycss = require('gulp-minify-css');
var browserSync = require('browser-sync');
var sourcemaps = require('gulp-sourcemaps');
var imagemin = require('gulp-imagemin');

var sass_input = './src/sass/*.+(scss|sass)';
var css_output = './public/assets/css/';
var view_dir = './views/*.+(ejs)';

var img_src = './src/img/**.+(jpg|png|gif|jpeg|svg)';
var img_src_dir = './src/img/';
var img_dest = './public/img/';

var port = 9000;
var ip = '127.0.0.1';
var proxy = ip+":"+port;

var sass_options = {
    errLogToConsole: true,
    outputStyle: 'expanded'
};

gulp.task('watch', function(){

    browserSync.init({
        proxy: proxy
    });

    gulp.watch(sass_input, ['sass']);
    gulp.watch(img_src, ['img_min']);
    gulp.watch(view_dir).on('change', browserSync.reload);
    gulp.watch(img_dest).on('change', browserSync.reload);
});

gulp.task('sass', function(){
    return gulp
        .src(sass_input)
        .pipe(sourcemaps.init())
        .pipe(sass(sass_options).on('error', sass.logError))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(minifycss())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(css_output))
        .pipe(browserSync.stream());
});

gulp.task('img_min', function(){
    return gulp
        .src(img_src)
        .pipe(imagemin())
        .pipe(gulp.dest(img_dest));
});
