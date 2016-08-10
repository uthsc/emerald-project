var gulp = require('gulp');
var $    = require('gulp-load-plugins')();

var sassPaths = [
  'bower_components/foundation-sites/scss',
  'bower_components/motion-ui/src',
  'bower_components/emerald/scss',
	'bower_components'
];

gulp.task('sass', function() {
  //output unminified css and map
  gulp.src('scss/app.scss')
    .pipe($.rename('uthsc.scss'))
    .pipe($.sourcemaps.init())
      .pipe($.sass({
        outputStyle: 'compressed',
        includePaths: sassPaths
      })
        .on('error', $.sass.logError))
    .pipe($.autoprefixer({
      browsers: ['last 2 versions', 'ie >= 9']
    }))
    .pipe($.sourcemaps.write('../css'))
    .pipe(gulp.dest('./-resources/2015/css'));

  //output minified sylesheet
  gulp.src('scss/app.scss')
    .pipe($.sass({
      outputStyle: 'compressed',
      includePaths: sassPaths
    }))
    .on('error', $.sass.logError)
    .pipe($.rename('uthsc.min.css'))
    .pipe(gulp.dest('./-resources/2015/css'));
});

gulp.task('copy-fonts', function() {
  gulp.src('./bower_components/font-awesome/fonts/**/*.{ttf,woff,woff2,eof,svg}')
      .pipe(gulp.dest('./-resources/2015/fonts'));
  gulp.src('./bower_components/font-awesome/css/**/*.{css,css.map}')
      .pipe(gulp.dest('./-resources/2015/css'));
});

gulp.task('copy-images', function() {
    gulp.src('./images/**/*')
        .pipe(gulp.dest('./-resources/2015/images'));
});

gulp.task('copy-vendor-js', function() {
    return gulp.src ([
        './bower_components/jquery/dist/jquery.min.js',
        './bower_components/what-input/what-input.min.js',
        './bower_components/foundation-sites/dist/foundation.min.js'
    ])
        .pipe(gulp.dest('./-resources/2015/js'));
});

gulp.task('uthsc-emergency-notification', function() {
	return gulp.src ([
		'./js/partials/uthsc-emergency-notification.js'
	])
		.pipe($.uglify())
		.pipe($.rename('uthsc-emergency-notification.min.js'))
		.pipe(gulp.dest('./-resources/2015/js'));
});

gulp.task('uthsc-news-ajax', function() {
	return gulp.src ([
		'./js/partials/uthsc.news-ajax.js'
	])
		.pipe($.uglify())
		.pipe($.rename('uthsc-news-ajax.min.js'))
		.pipe(gulp.dest('./-resources/2015/js'));
});

gulp.task('uthsc-search-detail', function() {
	return gulp.src ([
		'./js/partials/uthsc-search-detail.js'
	])
		.pipe($.uglify())
		.pipe($.rename('uthsc-search-detail.min.js'))
		.pipe(gulp.dest('./-resources/2015/js'));
});

gulp.task('uthsc-js', function() {
  return gulp.src ([
      './js/app.js',
      './bower_components/emerald/js/partials/uthsc.off-canvas.js',
      './bower_components/emerald/js/partials/uthsc.safari-bottom-nav-fix.js',
      './js/partials/uthsc.section-nav.js',
      './js/partials/uthsc-navigation-highlight.js'
      ])
          .pipe($.concat('uthsc.js'))
          .pipe(gulp.dest('./-resources/2015/js'))
          .pipe($.uglify())
          .pipe($.rename('uthsc.min.js'))
          .pipe(gulp.dest('./-resources/2015/js'));
});

gulp.task('buildjs',
	[ 'uthsc-js',
		'copy-vendor-js',
		'uthsc-emergency-notification',
	]
);

gulp.task('build', ['sass','copy-fonts', 'copy-images', 'buildjs']);

gulp.task('default', ['sass','copy-fonts'], function() {
  gulp.watch(['scss/**/*.scss'], ['sass']);
});
