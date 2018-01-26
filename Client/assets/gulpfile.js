// TM-Website/gulpfile.js
// VERSION 2.00
// TiCubius <trashmates@protonmail.com>

const gulp = require("gulp")
const pump = require("pump")
const plugins = require("gulp-load-plugins")()

// GULP:TASKS
// > CSS FILES

gulp.task("clean-css", (cb) =>
{
	pump(
		[
			gulp.src("./css/**/*.css"),

			plugins.clean()
		], cb)
})

gulp.task("compile-css", ["clean-css"], (cb) =>
{
	pump(
		[
			gulp.src("./sass/*.*"),

			plugins.sass(),
			plugins.csscomb(),
			plugins.cssbeautify(
			{
				indent: "	"
			}),
			plugins.autoprefixer(),

			gulp.dest("./css/")
		], cb)
})

// TASKS:GULP
gulp.task("watch", () =>
{
	gulp.watch("./sass/*.sass", ["compile-css"])
})

gulp.task("default", ["watch"])