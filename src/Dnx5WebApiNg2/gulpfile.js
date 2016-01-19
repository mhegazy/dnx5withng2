/// <binding />
/*
This file in the main entry point for defining Gulp tasks and using Gulp plugins.
Click here to learn more. http://go.microsoft.com/fwlink/?LinkId=518007
*/

/// <binding Clean='clean' />
"use strict";

var gulp = require("gulp"),
    rimraf = require("rimraf"),
    concat = require("gulp-concat"),
    cssmin = require("gulp-cssmin"),
    uglify = require("gulp-uglify");

var paths = {
    webroot: "./wwwroot/"
};

gulp.task('default', function () {
    // place code for your default task here
});

gulp.task("copy:npmjs", function () {
    return gulp.src(['node_modules/es6-shim/**/*', 'node_modules/angular2/bundles/**/*', 'node_modules/systemjs/dist/**/*', 'node_modules/rxjs/bundles/**/*'],
        { base: 'node_modules' })
        .pipe(gulp.dest(paths.webroot + 'node_modules'));
});

gulp.task("copy", ["copy:npmjs"]);