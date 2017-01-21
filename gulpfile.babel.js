import gulp from 'gulp';
import sass from 'gulp-sass';
import autoprefix from 'gulp-autoprefixer';
import plumber from 'gulp-plumber';
import connect from 'gulp-connect';
import babel from 'gulp-babel';
import del from 'del';
import usemin from 'gulp-usemin';
import uglify from 'gulp-uglify';
import htmlminify from 'gulp-html-minify';
import 'babel-polyfill';


let base = {
    src: './src/',
    dest: 'build/'
};

let styleBase = {
    src: base.src + '/style/*.scss',
    devDest: ".tmp/style",
    buildDest: base.dest
};

let scriptBase = {
    src: base.src + '/js/js.js',
    devDest: ".tmp/js",
    buildDest: base.dest
};

gulp.task('dev-styles', () => {
    return gulp.src(styleBase.src)
        .pipe(plumber())
        .pipe(sass())
        .pipe(autoprefix({
            browsers: ['> 1%', 'last 4 Android versions']
        }))
        .pipe(gulp.dest(styleBase.devDest))
        .pipe(connect.reload());

});

gulp.task('dev-scripts', () => {
    return gulp.src(scriptBase.src)
        .pipe(plumber())
        .pipe(babel({
            presets: ['es2015'],
            plugins: ["babel-polyfill"]
        }))
        .pipe(gulp.dest(scriptBase.devDest))
        .pipe(connect.reload());

});

gulp.task('build-scss', () => {
    return gulp.src([styleBase.src])
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(autoprefix({
            browsers: ['> 1%', 'last 4 Android versions']
        }))
        .pipe(gulp.dest(styleBase.devDest));
});

gulp.task('dev-connect', () => {
    connect.server({
        host: "0.0.0.0",
        port: 8888,
        livereload: true,
        root: ['.tmp/', 'src/']
    })
});
gulp.task('dev-watch', () => {
    gulp.watch(styleBase.src, ['dev-styles']);
    gulp.watch(scriptBase.src, ['dev-scripts']);
});
gulp.task('dev', ['dev-connect', 'dev-styles', 'dev-scripts', 'dev-watch']);

gulp.task('clean', (cbk) => {
    del([base.dest, '.tmp'], {force: true},cbk);
});

gulp.task('usemin', ['build-scss'], () => {
    return gulp.src('src/index.html')
        .pipe(usemin({
            style: [],
            es6: [babel(), uglify()]
        }))
        .pipe(htmlminify())
        .pipe(gulp.dest('build/'));
});


gulp.task('copy-assets', function () {
    return gulp.src(['src/assets/**'], {base: 'src/assets'})
        .pipe(gulp.dest('build/assets/'));
});

gulp.task('test-connect', function () {
    connect.server({
        root: ['build/'],
        port: 9000
    });
});


gulp.task('build',
    ['clean', 'usemin', 'copy-assets']
);
gulp.task('test', ['build', 'test-connect']);