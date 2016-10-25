var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    browserSync = require('browser-sync').create();
    gulp = require ('gulp');
    babel = require('gulp-babel');

// Now that we've installed the uglify package we can require it:

gulp.task('scripts', function(){
    gulp.src('./js/*.js') // What files do we want gulp to consume?
      .pipe(uglify()) // Call the uglify function on these files
      .pipe(rename({ extname: '.min.js' })) //  Rename the uglified file
      .pipe(gulp.dest('./build/js')) // Where do we put the result?
});

gulp.task('say_hello', function(){
    console.log('Hello!');
});

gulp.task('watch',function(){
    gulp.watch('js/*.js',['scripts']);
});


gulp.task('browser-sync',function(){
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
});

const input = 'src/index.js';
const output = 'dist';
gulp.task('babel', () => {
    return gulp.src(input)
        .pipe(babel())
        .pipe(gulp.dest(output));
});

gulp.task('default', ['say_hello', 'scripts','watch','browser-sync','babel']);


// var sass = require('gulp-sass'),
//     autoprefixer = require('gulp-autoprefixer'),
//     cssnano = require('gulp-cssnano'),
//     rename = require('gulp-rename');
// gulp.task('sass', function() {
//    gulp.src('./sass/style.scss')
//       .pipe(sass())
//       .pipe(autoprefixer({
//          browsers: ['last 2 versions']
//       }))
//       .pipe(gulp.dest('./build/css'))
//       .pipe(cssnano())
//       .pipe(rename('style.min.css'))
//       .pipe(gulp.dest('./build/css'));
//});