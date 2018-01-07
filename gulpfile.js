const gulp 			= require('gulp');
const sass 	 		= require('gulp-sass');
const jshint 		= require('gulp-jshint')
const concat 		= require('gulp-concat');
const uglify 		= require('gulp-uglify');
const rename 		= require('gulp-rename');
const concatCss = require('gulp-concat-css');

/* SASS - Variables */
var scssFiles = 'app/assets/css/scss/**/*.scss'; // Sass Source
var cssDest = 'app/assets/dist/css'; // CSS destination
var sassDevOptions = { outputStyle: 'expanded' } // Options for development
var sassProdOptions = { outputStyle: 'compressed' } // Options for production

// gulp.task('sassdev', function() {
//   return gulp.src(scssFiles)
// 		.pipe(sass(sassDevOptions).on('error', sass.logError))
// 		.pipe(concatCss("estilo.css"))
//     .pipe(gulp.dest(cssDest));
// });

// gulp.task('sassprod', function() {
//   return gulp.src(scssFiles)
// 		.pipe(sass(sassProdOptions).on('error', sass.logError))
// 		// .pipe(concatCss("estilo.min.css"))
// 		.pipe(rename('estilo.min.css'))
//     .pipe(gulp.dest(cssDest));
// });



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
	return gulp.src('app/assets/css/scss/**/*.scss')
			// .pipe(sass())
			.pipe(sass())
			.pipe(concatCss("estilo.css"))
			.pipe(gulp.dest('app/assets/dist/css'));
});

// Concatenate & Minify JS
gulp.task('scripts', function() {
	return gulp.src('app/assets/js/*.js')
			.pipe(concat('all.js'))
			.pipe(gulp.dest('app/assets/dist/js'))
			.pipe(rename('all.min.js'))
			.pipe(uglify())
			.pipe(gulp.dest('app/assets/dist/js'));
});

// Watch Files For Changes
gulp.task('watch', function() {
	gulp.watch('app/assets/js/*.js', ['lint', 'scripts']);
	// gulp.watch('app/assets/css/scss/**/*.scss', ['sass', 'sassdev', 'sassprod']);
	gulp.watch('app/assets/css/scss/**/*.scss', ['sass']);
});

// Default Task
gulp.task('default',	['lint', 'sass', 'scripts', 'watch']);
// gulp.task('default',	['lint', 'sass', 'sassdev', 'sassprod', 'scripts', 'watch']);

