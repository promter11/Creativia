const   gulp            = require("gulp"),
        browserSync     = require("browser-sync"),
        sass            = require("gulp-sass"),
        htmlmin         = require("gulp-htmlmin"),
        cleanCSS        = require("gulp-clean-css"),
        uglify          = require("gulp-uglifyjs"),
        concat          = require("gulp-concat"),
        rename          = require("gulp-rename"),
        autoprefixer    = require("gulp-autoprefixer"),
        imagemin        = require("gulp-imagemin"),
        pngquant        = require("imagemin-pngquant"),
        cache           = require("gulp-cache"),
        del             = require("del");

gulp.task('browser-sync', () => {
    browserSync.init({
        server: {
            baseDir: "app"
        },

        notify: false
    });
});

gulp.task('sass', () => {
    return gulp.src('app/scss/**/*.scss')
        .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
        .pipe(autoprefixer({browsers: ['last 15 versions'], cascade: false}))
        .pipe(gulp.dest('app/css'))
        .pipe(browserSync.stream({stream: true}));
});

gulp.task('scripts', () => {
    return gulp.src('app/js/modules/**/*.js')
        .pipe(concat('script.js'))
        .pipe(gulp.dest('app/js'))
        .pipe(browserSync.stream({stream: true}));
});

gulp.task('img', () => {
    return gulp.src('app/img/**/*')
        .pipe(cache(imagemin({
            interlaced: true,
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        })))
        .pipe(gulp.dest('app/img'));
});

gulp.task('minify-html', () => {
    return gulp.src('app/*.html')
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest('dist'));
});

gulp.task('minify-css', () => {
    return gulp.src('app/css/**/*.css')
        .pipe(cleanCSS())
        .pipe(rename({suffix: '.min', prefix : ''}))
        .pipe(gulp.dest('dist/css'));
});

gulp.task('minify-js', () => {
    return gulp.src('app/js/modules/**/*.js')
        .pipe(uglify())
        .pipe(concat('script.min.js'))
        .pipe(gulp.dest('dist/js'))
});

gulp.task('clear-dist', (done) => {
    del.sync('dist');
    done();
});

gulp.task('clear-cache', () => {
    return cache.clearAll();
});

gulp.task('build-dist', (done) => {
    let buildCss = gulp.src('app/css/**/*.css')
        .pipe(gulp.dest('dist/css'));
    
    let buildJs = gulp.src('app/js/*.js')
        .pipe(gulp.dest('dist/js'));
    
    let buildImg = gulp.src('app/img/**/*')
        .pipe(gulp.dest('dist/img'));

    done();
});

gulp.task('watch', gulp.parallel('browser-sync', 'sass', 'scripts', () => {
    gulp.watch('app/scss/**/*.scss', gulp.parallel('sass'));
    gulp.watch('app/js/**/*.js').on('change', gulp.parallel('scripts'));
    gulp.watch('app/*.html').on('change', browserSync.reload);
}));

gulp.task('build', gulp.series('clear-dist', 'build-dist', 'minify-html', 'minify-css', 'minify-js', 'img'));