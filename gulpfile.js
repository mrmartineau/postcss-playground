var gulp = require('gulp');
var sourcemaps = require('gulp-sourcemaps');
var postcss = require('gulp-postcss');
var sass = require('gulp-sass');
var stylelint = require('gulp-stylelint');

// PostCSS plugins
var reporter = require('postcss-reporter');
var scss = require('postcss-scss');
var autoprefixer = require('autoprefixer');
var cssnano = require('cssnano');
var postcssBemLinter = require('postcss-bem-linter');


gulp.task('css', function () {
	return gulp.src(['./src/*.scss'])
		.pipe(
			stylelint({
				reporters: [
					{
						formatter: 'string',
						console: true
					}
				]
			})
		)
		// .pipe(
		// 	postcss([

	 //      reporter({
		// 			clearMessages: true,
		// 			throwError: true,
		// 		})
		// 	],
  //     { syntax: scss })
		// )
		.pipe(sourcemaps.init())

		// Sass Compilation
		.pipe(
			sass().on('error', sass.logError)
		)

		// PostCSS tasks after Sass compilation
		.pipe(
			postcss([
			  postcssBemLinter({
					preset: 'suit'
				}),
				autoprefixer({ browsers: ['> 5%', 'last 2 versions'] }),
				cssnano(),
				reporter({
					clearMessages: true,
					throwError: true,
				})
		]) )

		.pipe( sourcemaps.write() )
		.pipe( gulp.dest('./dist') );
});

