const { src, dest, watch, parallel } = require("gulp");

// css
const sass = require("gulp-sass")(require('sass'));
const plumber = require("gulp-plumber");
const autoprefixer= require('autoprefixer');
const cssnano=require('cssnano');
const postcss=require('gulp-postcss');
// imagenes
const cache=require("gulp-cache");
const webp=require("gulp-webp");
const imagemin= require("gulp-imagemin");
const avif=require("gulp-avif");

// css
function css(done){
  src('src/scss/**/*.scss')
    .pipe(plumber())
    .pipe(sass())
    .pipe(postcss([autoprefixer(),cssnano()]))
    .pipe(dest("build/css"));

done()
}
// imagenes
function imagenes(done){
  const opciones={
    optimizationlevel:3
  }
  src('src/img/**/*.{png,jpg}')
  .pipe(cache(imagemin(opciones)))
  .pipe(dest('build/img'))
  done();
}

function versionwebp(done){
  const opciones={
    quality:50
  };

  src('src/img/**/*.{png,jpg}')
  .pipe(webp(opciones))
  .pipe(dest("build/img"));
  
  done();
}
function versionavif(done){
  const opciones={
    quality:50
  };

  src('src/img/**/*.{png,jpg}')
  .pipe(avif(opciones))
  .pipe(dest("build/img"));
  
  done();
}
function javascript(done){
  src('src/js/**/*.js')
    .pipe(dest("build/js"));

done()
}
//watch
function dev(done){
  
  watch("src/scss/**/*.scss", css)
  watch("src/js/**/*.js", javascript)
  done();
}
exports.css=css;
exports.javascript=javascript;
exports.imagenes=imagenes;
exports.versionwebp=versionwebp;
exports.versionavif=versionavif;
exports.dev=parallel(imagenes,versionwebp,versionavif,javascript,dev);
  