var gulp = require('gulp');
var sourcemaps = require('gulp-sourcemaps');
var notify = require("gulp-notify");
var browserSync = require('browser-sync').create();
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');;
var postcss = require('gulp-postcss');

// gulp.task('autoprefixer', function () {
//     return gulp.src('./assets/css/*.css')
//         .pipe(sourcemaps.init())
//         .pipe(autoprefixer({
//             browsers: ['last 3 versions'],
//             cascade: false
//         }))
//         .pipe(sourcemaps.write('.'))
//         .pipe(gulp.dest('./assets/css'));
// });

gulp.task('serve', ['sass'], function() {

    browserSync.init({
        server: {
            baseDir: "./"
        }
    });

    gulp.watch("./assets/sass/**/*.scss", ['sass']);
    gulp.watch("./*.html").on('change', browserSync.reload);
    gulp.watch("./assets/js/**/*.js").on('change', browserSync.reload);

});

gulp.task('sass', function() {
    return gulp.src("./assets/sass/**/*.scss")
        .pipe(sourcemaps.init())
        .pipe(sass({ includePaths: ['./node_modules/foundation-sites/scss']} ).on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['last 3 versions'],
            cascade: false
        }))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('./assets/css'))
        .pipe(notify("Sass is done!"))
        .pipe(browserSync.stream());
});

gulp.task('watch:sass', function() {
    gulp.watch("./assets/sass/**/*.scss", ['sass']);
});

gulp.task('default', ['serve']);
