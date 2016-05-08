"use strict";
const exec = require('child_process').exec;
const gulp = require('gulp');
const sourcemaps = require('gulp-sourcemaps');
const babel = require('gulp-babel');

const paths = {
    src: 'src/**/*.{js,jsx}',
    dest: 'dist'
}

gulp.task('clean', () => {
    return del('dist/**');
});

gulp.task('default', () => {
    return gulp.src(paths.src)
        .pipe(sourcemaps.init())
        .pipe(babel())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(paths.dest));
});

gulp.task('render', ['default'], () => {
    return new Promise((resolve, reject) => {
        let process = exec('node dist/test.js | fop -fo - -pdf output/report1.pdf', (err, stdout, stderr) => {
            if (err) return reject(err);

            resolve();
        });
    });
});

gulp.task('render-watch', ['render'], () => {
    return gulp.watch(paths.src, ['render']);
});
