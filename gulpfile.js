const gulp = require('gulp');
const babelify = require('babelify');
const babel = require('gulp-babel');
const browserify = require('browserify');
const buffer = require('vinyl-buffer');
const rename = require('gulp-rename');
// const sourceMaps = require('gulp-sourcemaps');
const source = require('vinyl-source-stream');
const watch = require('gulp-watch');

const config = {
    js: {
        src: './src/script.js',
        outputDir: './public/javascripts',
        mapDir: './lib/',
        outputFile: 'bundle.js'
    },
}

function bundle(bundler){
    bundler.bundle()
        .pipe(source(config.js.src))
        .pipe(buffer())
        .pipe(rename(config.js.outputFile))
        // .pipe(sourceMaps.init({ loadMaps: true }))
        // .pipe(sourceMaps.write(config.js.mapDir))
        .pipe(gulp.dest(config.js.outputDir))
}

gulp.task('bundle', () => {
    const bundler = browserify(config.js.src)
        .transform(babelify, {
            presets: [ 'es2015' ]
        });
    bundle(bundler);
})

gulp.task('default', () => {
    gulp.src('src/script.js')
        .pipe(babel({
            presets: ['env']
        }))
        .pipe(gulp.dest('public/javascripts'))
});

gulp.task('watch', () => {
    gulp.watch('./src/**/*.js', ['bundle']);
});