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
var doiuse = require('doiuse');
var flexbugsFixes = require('postcss-flexbugs-fixes');


var browsers = ['> 5%', 'last 2 versions', 'ie > 8'];

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
		.pipe(
			postcss([
				doiuse({
					browsers: browsers,
					ignoreFiles: [
						'**/_reset.scss',
						'node_modules/**'
					]
				}),
				reporter({
					clearMessages: true,
				})
			],
			{
				syntax: scss
			})
		)

		.pipe(sourcemaps.init())

		// Sass Compilation
		.pipe(
			sass({
				importer: require('npm-sass').importer
			}).on('error', sass.logError)
		)

		// PostCSS tasks after Sass compilation
		.pipe(
			postcss([
				postcssBemLinter({
					preset: 'suit'
				}),
				flexbugsFixes(),
				autoprefixer({ browsers: browsers }),
				cssnano(),
				reporter({
					clearMessages: true,
					throwError: true,
				})
			])
		)
		.pipe( sourcemaps.write() )
		.pipe( gulp.dest('./dist') );
});

