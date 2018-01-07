const gulp 			= require('gulp');
const sass 	 		= require('gulp-sass');
const jshint 		= require('gulp-jshint')
const concat 		= require('gulp-concat');
const uglify 		= require('gulp-uglify');
const rename 		= require('gulp-rename');
const uncomment	= require('gulp-strip-css-comments');

/* SASS - Variables */
const scssFiles			 	= 'app/assets/css/scss/**/*.scss'; 	// Sass Source
const cssDest 				= 'app/assets/dist/css'; 						// CSS destination
const sassDevOptions 	= { outputStyle: 'expanded' }; 			// Options for development
const sassProdOptions = { outputStyle: 'compressed' }; 		// Options for production
const cssRename				= 'estilo';													// Rename output file name

gulp.task('sassdev', function() { // SASS task compiles any of our Sass files in our scss/ directory into CSS and saves the compiled CSS file in our dist/css directory.
	return gulp.src(scssFiles)
			.pipe(sass(sassDevOptions).on('error', sass.logError))
			.pipe(rename(cssRename + ".css"))
			.pipe(gulp.dest(cssDest));
});

gulp.task('sassprod', function() {
  return gulp.src(scssFiles)
		.pipe(sass(sassProdOptions).on('error', sass.logError))
		.pipe(uncomment({ all: true }))
		.pipe(rename(cssRename + ".min.css"))
    .pipe(gulp.dest(cssDest));
});

gulp.task('lint', function() { // Lint task checks any JavaScript file in our js/ directory and makes sure there are no errors in our code.
	return gulp.src('app/assets/js/*.js')
			.pipe(jshint())
			.pipe(jshint.reporter('default'));
});

gulp.task('scripts', function() { // Concatenate & Minify JS
	return gulp.src('app/assets/js/*.js')
			.pipe(concat('all.js'))
			.pipe(gulp.dest('app/assets/dist/js'))
			.pipe(rename('all.min.js'))
			.pipe(uglify())
			.pipe(gulp.dest('app/assets/dist/js'));
});

gulp.task('watch', function() { // Watch Files For Changes
	gulp.watch( 'app/assets/js/*.js', ['lint', 'scripts'] );
	gulp.watch( scssFiles, ['sassdev', 'sassprod'] );
});

gulp.task('default',	['sassdev', 'sassprod', 'lint', 'scripts', 'watch']); // Default Task

