import gulp from 'gulp';
import sass from 'gulp-sass';
import autoprefix from 'gulp-autoprefixer';
import plumber from 'gulp-plumber';
import connect from 'gulp-connect';
import babel from 'gulp-babel';


let base={
    src:'./src/',
    dest:'./build'
};

let styleBase={
    src:base.src+'/style/*.scss',
    devDest:".tmp/style",
    buildDest:base.dest
};

let scriptBase={
    src:base.src+'/js/*.es6',
    devDest:".tmp/js",
    buildDest:base.dest
};

gulp.task('dev-styles',()=>{
    return gulp.src(styleBase.src)
        .pipe(plumber())
        .pipe(sass())
        .pipe(autoprefix({
            browsers:['> 1%','last 4 Android versions']
        }))
        .pipe(gulp.dest(styleBase.devDest))
        .pipe(connect.reload());

});

gulp.task('dev-scripts',()=>{
    return gulp.src(scriptBase.src)
        .pipe(plumber())
        .pipe(babel())
        .pipe(gulp.dest(scriptBase.devDest))
        .pipe(connect.reload());

})

gulp.task('dev-connect',()=>{
    connect.server({
        port:8888,
        livereload:true,
        root:['src/','.tmp/']
    })
});
gulp.task('dev-watch',()=>{
    gulp.watch(styleBase.src,['dev-styles']);
    gulp.watch(scriptBase.src,['dev-scripts']);
});
gulp.task('dev',['dev-connect','dev-styles','dev-scripts','dev-watch'])

