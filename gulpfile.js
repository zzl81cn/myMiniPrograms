/**
 * @author zzl81cn
 * @since 20200111
 */

var path = require('path');
var gulp = require('gulp');
var sass = require('gulp-sass');
sass.compiler = require('node-sass')
var rename = require('gulp-rename');
var del = require('del');
var replace = require('gulp-replace');
// var postcss = require('gulp-postcss');
var gulpif = require('gulp-if');
var gutil = require('gulp-util');
// var newer = require('gulp-newer');
// var cache = require('gulp-cached');
var debug = require('gulp-debug');
// var pxtorpx = require('postcss-px2rpx');
var argv  = require('yargs').argv;
var config = null;

// 相关路径配置
var paths = {
	src: {
		baseDir: 'src',
		scssDir: './assets/scss',
		scssFiles: ['./assets/scss/**/*.scss']
	},
	dist: {
    baseDir: 'src',
    wxssDir: 'src/style'
	},
	tmp: {}
};

// Log for output msg.
function log() {
	var data = Array.prototype.slice.call(arguments);
	gutil.log.apply(false, data);
}

// Sass 编译
function sassCompile() {
	// var res = config.assetsCDN + config.qcloud.prefix + '/';
	return gulp.src(paths.src.scssFiles)
	// return gulp.src('./assets/scss/**/*.scss')
		/* .pipe(sass({errLogToConsole: true, outputStyle: 'expanded'})
		.on('error', sass.logError)) */
		// .pipe(sass({errLogToConsole: true, outputStyle: 'expanded'})
		.pipe(sass({includePaths: ['./assets/scss/**/*.scss'], errLogToConsole: true, outputStyle: 'expanded'}).on('error', sass.logError))
		// .pipe(gulpif(Boolean(argv.debug),debug({title: '`sassCompile` Debug:'})))
		// .pipe(postcss([lazysprite(lazyspriteConfig), pxtorpx(), base64()]))
		.pipe(rename({
			'extname': '.wxss'
		}))
		.pipe(replace('.css', '.wxss'))
		// .pipe(replace('%ASSETS_IMG%/', res))
		// .pipe(replace('src/assets/images', res)) // 雪碧图CSS RUL 中的图片路径
		.pipe(gulp.dest(paths.dist.wxssDir));
}

var watchHandler = function (type, file) {
	var extname = path.extname(file);
	// SCSS 文件
	if (extname === '.scss') {
		sassCompile();
	}
};

//监听文件
function watch(cb) {
	var watcher = gulp.watch([
			paths.src.scssDir
		],
		{ignored: /[\/\\]\./}
	);
	watcher
		.on('change', function (file) {
			log(gutil.colors.yellow(file) + ' is changed');
			watchHandler('changed', file);
		})
		.on('add', function (file) {
			log(gutil.colors.yellow(file) + ' is added');
			watchHandler('add', file);
		})
		.on('unlink', function (file) {
			log(gutil.colors.yellow(file) + ' is deleted');
			watchHandler('removed', file);
		});

	cb();
}

// sass watch
function watchSass() {
	sassCompile()
	gulp.watch(paths.src.scssFiles, gulp.parallel(sassCompile))
}

gulp.task('default', watchSass)

//注册默认任务
gulp.task('other', gulp.series(
	gulp.parallel(
		sassCompile,
	),
	watch
));
