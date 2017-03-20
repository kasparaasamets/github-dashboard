
var gulp = require('gulp'),
    webserver = require('gulp-webserver'),
    del = require('del'),
    sass = require('gulp-sass'),
    jshint = require('gulp-jshint'),
    sourcemaps = require('gulp-sourcemaps'),
    browserify = require('browserify'),
    source = require('vinyl-source-stream'),
    buffer = require('vinyl-buffer'),
    uglify = require('gulp-uglify'),
    gutil = require('gulp-util'),
    ngAnnotate = require('browserify-ngannotate');

var CacheBuster = require('gulp-cachebust');
var cachebust = new CacheBuster();

// cleans the build output
gulp.task('clean', function (cb) {
    del([
        'dist'
    ], cb);
});

// runs sass, creates css source maps
gulp.task('build-css', ['clean'], function() {
    return gulp.src(['./src/styles/*'])
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(cachebust.resources())
        .pipe(sourcemaps.write('./maps'))
        .pipe(gulp.dest('./dist'));
});

// fills in the Angular template cache, to prevent loading the html templates via
// separate http requests
gulp.task('build-template-cache', ['clean'], function() {
    
    var ngHtml2Js = require("gulp-ng-html2js"),
        concat = require("gulp-concat");
    
    return gulp.src(["./src/controllers/**/*.html", "./src/directives/**/*.html"])
        .pipe(ngHtml2Js({
            moduleName: "appPartials",
            prefix: ""
        }))
        .pipe(concat("templateCachePartials.js"))
        .pipe(gulp.dest("./dist"));
});

// runs jshint
gulp.task('jshint', function() {
     gulp.src(["/src/app.states.js", "/src/**/**/*.js", "/src/**/*.js"])
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

// Build a minified Javascript bundle - the order of the js files is determined by browserify
gulp.task('build-js', ['clean'], function() {
    var b = browserify({
        entries: './src/app.js',
        debug: true,
        paths: ['./src', './src/vendor', './src/controllers/**', './src/services', './src/directives/**'],
        transform: [ngAnnotate]
    });

    return b.bundle()
        .pipe(source('bundle.js'))
        .pipe(buffer())
        .pipe(cachebust.resources())
        .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(uglify())
        .on('error', gutil.log)
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./dist/js/'));
});

// full build, applies cache busting to the main page css and js bundles
gulp.task('build', [ 'clean', 'build-css','build-template-cache', 'jshint', 'build-js'], function() {
    return gulp.src('./src/index.html')
        .pipe(cachebust.references())
        .pipe(gulp.dest('dist'));
});

// watches file system and triggers a build when a modification is detected
gulp.task('watch', function() {
    return gulp.watch(['./src/*.html', './src/**/**/*.html', './src/**/**/*.js', './src/**/*.js', './src/styles/*.*css'], ['build']);
});

// launches a web server that serves files in the current directory
gulp.task('webserver', ['watch','build'], function() {
    gulp.src('.')
        .pipe(webserver({
            livereload: false,
            directoryListing: true,
            open: "http://localhost:8000/dist/index.html"
        }));
});

// launch a build upon modification and publish it to a running server
gulp.task('dev', ['watch', 'webserver']);

// installs and builds everything
gulp.task('default', ['build']);