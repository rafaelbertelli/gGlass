// Include gulp
const gulp = require('gulp');

// Include Plugins
const jshint = require('gulp-jshint')
const sass 	 = require('gulp-sass');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');

// Lint Task
// Our lint task checks any JavaScript file in our js/ directory and makes sure there are no errors in our code.
gulp.task('lint', function() {
	return gulp.src('app/assets/js/*.js')
			.pipe(jshint())
			.pipe(jshint.reporter('default'));
});

// Compile Our Sass
// The sass task compiles any of our Sass files in our scss/ directory into CSS and saves the compiled CSS file in our dist/css directory.
gulp.task('sass', function() {
	return gulp.src('app/assets/css/scss/*.scss')
			.pipe(sass())
			.pipe(gulp.dest('app/assets/dist/css'));
});

// Concatenate & Minify JS
gulp.task('scripts', function() {
	return gulp.src('app/assets/js/*.js')
			.pipe(concat('all.js'))
			.pipe(gulp.dest('app/assets/dist'))
			.pipe(rename('all.min.js'))
			.pipe(uglify())
			.pipe(gulp.dest('app/assets/dist/js'));
});

// Watch Files For Changes
gulp.task('watch', function() {
	gulp.watch('app/assets/js/*.js', ['lint', 'scripts']);
	gulp.watch('app/assets/css/scss/*.scss', ['sass']);
});

// Default Task
gulp.task('default', ['lint', 'sass', 'scripts', 'watch']);