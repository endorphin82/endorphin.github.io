var
	gulp			= require("gulp"),	//npm install gulp -D
	livereload 		= require("gulp-livereload"),	//npm install gulp-livereload
	sass			= require("gulp-sass"),	//npm install gulp-sass
	autoprefixer 	= require('gulp-autoprefixer'),	//npm install gulp-autoprefixer - adding -browser prefix
	cleancss 		= require('gulp-clean-css'), //npm install gulp-clean-css - minification css
	rename 			= require('gulp-rename'); //npm install gulp-rename - adding .min to mini css

gulp.task("reload-css", function() {
	gulp.src('./ex/css/*.scss')
	.pipe(sass().on('error', sass.logError))
	.pipe(autoprefixer({
		browsers: ['last 3 versions'],
		cascade: false
	}))
	.pipe(gulp.dest('./ex/css/'))
	.pipe(cleancss({compatibility: 'ie8'}))
	.pipe(rename({suffix: '.min'}))
	.pipe(gulp.dest('./ex/css/'))
	.pipe(livereload());
});

gulp.task("default", function() {
	livereload.listen();
	gulp.watch('./ex/css/*.scss', ['reload-css']);
});
//npm install gulp -D
//npm install gulp-livereload
//npm install gulp-sass
//npm install gulp-autoprefixer - adding -browser prefix
//npm install gulp-clean-css - minification css
//npm install gulp-rename - adding .min to mini css
