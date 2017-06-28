const gulp = require('gulp'),
	  nodemon = require('gulp-nodemon')

gulp.task('reload', () => {
	nodemon({
		script: 'server.js'
	})
})

gulp.task('default', ['reload'])