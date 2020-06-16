const gulp = require('gulp');
const uglify = require('gulp-uglify-es').default;
const uglifyCss = require('gulp-uglifycss');
const webserver = require('gulp-webserver');
const concat = require('gulp-concat');
const watch = require('gulp-watch');


function concatJS(cb){
    gulp.src(['node_modules/jquery/dist/jquery.min.js','node_modules/bootstrap/dist/js/bootstrap.min.js','src/assets/scripts/script.js'])
    .pipe(concat('script.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./build/assets/scripts'));

    return cb();
}

function concatCSS(cb){
    gulp.src(['src/assets/styles/style.css','node_modules/bootstrap/dist/css/bootstrap.min.css','node_modules/@fortawesome/fontawesome-free/css/fontawesome.min.css','node_modules/@fortawesome/fontawesome-free/css/solid.min.css',
             'node_modules/@fortawesome/fontawesome-free/css/regular.css','node_modules/@fortawesome/fontawesome-free/css/brands.min.css'])
    .pipe(concat('style.css'))
    .pipe(uglifyCss())
    .pipe(gulp.dest('./build/assets/styles'));

    return cb();
}

function getWebFonts(cb){
    gulp.src('node_modules/@fortawesome/fontawesome-free/webfonts/**/*',{
        base: 'node_modules/@fortawesome/fontawesome-free',
    })
    .pipe(gulp.dest('./build/assets'));

    return cb();
}

function getHTML(cb){
    gulp.src('src/**/*.html')
    .pipe(gulp.dest('./build'));

    return cb();
}

function getIMG(cb){
    gulp.src('src/assets/imgs/**/*.*')
    .pipe(gulp.dest('./build/assets/imgs'))
    
    return cb();
}

function server(cb){
    gulp.src('build')
    .pipe(webserver({
        port: 8080,
        open: true,
        livereload: true,
    }))

    return cb();
}

gulp.task('getHTML', getHTML);
gulp.task('getIMG', getIMG);
gulp.task('concatJS',concatJS);
gulp.task('concatCSS', concatCSS);

function watchFiles(cb){
    gulp.watch('./src/**/*.html').on('change', () => gulp.series('getHTML')());
    gulp.watch('./src/**/*.css').on('change', () => gulp.series('concatCSS')());
    gulp.watch('./src/**/*.js').on('change', () => gulp.series('concatJS')());
    gulp.watch('./src/assets/imgs/**/*.*').on('change', () => gulp.series('getIMG')());

    return cb();
}

function defineMainTask(){
    if(process.argv[2] === '--build'){
        return gulp.series(getHTML, getIMG, getWebFonts, concatJS, concatCSS);
    }
    else if(process.argv[2] === '--dev'){
        return gulp.series(getHTML, getWebFonts, getIMG, concatJS, concatCSS, server, watchFiles);
    }
    else{
        function errorOnCommand(cb){
            console.log("\x1b[31m%s\x1b[0m", 'Comando errado, para criar apenas o build digite `npm run build` ou para desenvolve-lo por um servidor local `npm run dev`!');
            return cb();
        }
        return gulp.series(errorOnCommand);
    }
}

module.exports.default = defineMainTask();