var gulp = require('gulp'),
	uglify = require('gulp-uglify')
	sass = require('gulp-sass'),
	plumber = require('gulp-plumber'),
	browserSync = require('browser-sync').create(),
	autoprefixer = require('gulp-autoprefixer'),
	del = require('del');

// minify scripts
gulp.task('scripts', function() {
	gulp.src('app/assets-dev/js/*.js')
		.pipe(plumber())
		.pipe(uglify())
		.pipe(gulp.dest('app/assets/js/'));
});

// handle styles
gulp.task('styles', function() {
	gulp.src('app/assets-dev/scss/**/*.scss')
		.pipe(plumber())
		.pipe(autoprefixer())
		.pipe(sass({
			outputStyle: 'compressed'
		}))
		.pipe(gulp.dest('app/assets/css/'))
		.pipe(browserSync.stream());
});

// //////////////////////////////////////////////////////////
// BUILD TASKS
// //////////////////////////////////////////////////////////

// clear out all files and folders from build folder
gulp.task('build:clean', function(cb) {
	del([
		'build/**'
	], cb);
	cb();
});

// create build directory for all files
gulp.task('build:copy', ['build:clean'], function(cb) {
	var stream = gulp.src('app/**/*/')
		.pipe(gulp.dest('build/'));
	return stream;
	cb();
});

// remove unwanted build files
gulp.task('build:remove', ['build:copy'], function(cb) {
	del([
		'build/assets-dev/'
	], cb);
});
// run build tasks after each complete
gulp.task('build', ['build:copy', 'build:remove']);

// static browser-sync server
gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./app/"
        }
    });
});

gulp.task('build:serve', function() {
    browserSync.init({
        server: {
            baseDir: "./build/"
        }
    });
});

// watch tasks
gulp.task('watch', function() {
	gulp.watch('app/assets-dev/js/*.js', ['scripts']);
	gulp.watch('app/assets-dev/scss/*.scss', ['styles']);
});

gulp.task('default', ['scripts', 'styles', 'browser-sync', 'watch']);