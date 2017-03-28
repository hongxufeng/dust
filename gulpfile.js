
//导入工具包 require('node_modules里对应模块')
var gulp = require("gulp"), //本地安装gulp所用到的地方
    clean = require("gulp-clean"),
    less = require("gulp-less"),
    lessmap = require("gulp-less-sourcemap"),
    cleancss = require('gulp-cleancss'),
    rename = require("gulp-rename"),
    webpack = require("webpack-stream"),
    uglify = require('gulp-uglify'),
    zip = require('gulp-zip'),
    config = require('./config'),
    postcss = require('gulp-postcss'),
    sourcemaps = require('gulp-sourcemaps'),
    autoprefixer = require('autoprefixer'),
    browserSync = require('browser-sync').create(),
    argv = require('yargs').argv,
    filter = require('gulp-filter'),
    gulpIgnore = require('gulp-ignore'),
    babel = require("gulp-babel"),
    header = require('gulp-header');

var pkg = require('./package.json');
var banner = ['/**',
    ' * <%= pkg.name %> - <%= pkg.description %>',
    ' * @version v<%= pkg.version %>',
    ' * @link <%= pkg.homepage %>',
    ' * @license <%= pkg.license %>',
    ' */',
    ''].join('\n');

/**
 * 页面逻辑所涉及的变量
 * @var project_array <Array> 记录所有生成的工程
 * @var defaultTasks  <Array> 设置默认build的工程
 */
var project_array = [], defaultTasks;


gulp.task("clean", function () {
    return gulp.src("dist/", { read: false }).pipe(clean());
});


gulp.task("testbabel", function () {
    gulp.src("src/js/babel.js")
        .pipe(babel({
            presets: ["es2015"]
        }))
        .pipe(gulp.dest("dist"));
});
gulp.task('browser-sync', function () {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
});


// gulp.task('browser-sync', function() {
//     browserSync.init({
//         proxy: "localhost:80"
//     });
//      gulp.watch("*.html").on("change", browserSync.reload);
// });


/**
 * @method 立即执行函数 Tasks 生成入口
 */

+function generateTasks(config) {
    var projectName, projectConfig;
    for (var project of config.map()) {
        /**
         * config.set("gui",new ConfigOptions);
         * @var projectName <String>
         * @var projectConfig <ConfigOptions>
         */
        projectName = project[0];
        projectConfig = project[1];
        generateCleanTask(projectName);
        generateLessTask(projectName, projectConfig);
        generateJSTask(projectName, projectConfig);
        generateProjectTask(projectName);
        project_array.push(projectName);

    }
    generateDefaultTask();
}(config);
/**
 * @method 生成各个projec task
 */
function generateProjectTask(projectName) {
    //@var tasks_array 局部变量每个工程要执行的所有tasks
    var tasks_array = [projectName + "clean", projectName + "less", projectName + "js"];

    gulp.task(projectName, tasks_array, function () {
        return gulp.src('dist/' + projectName + '/**')
            .pipe(zip(projectName + '.zip'))
            .pipe(gulp.dest('dist/' + projectName + '/'));
    })
}
/**
 * @method 生成各个project 的clean task
 */
function generateCleanTask(projectName) {
    gulp.task(projectName + "clean", function () {
        return gulp.src("dist/" + projectName, { read: false }).pipe(clean());
    });

}
/**
 * @method 生成各个project 的less task
 */

function generateLessTask(projectName, projectConfig) {
    /**
     * projectConfig.less 以后可能会扩展因为projectConfig.less 可能以后会是一个自定义类型的对象因为
     * 一个project 可能要生成多种CSS
     * 关于gulp-less-sourcemap 
     * @param sourceMapRootpath 绝对或者相对路径（相对站点部署到服务器上之后相对map 文件的位置）
     * @desc pack.less 为什么不放在pack folder 因为  sourceless 的路径等于 soursourceMapRootpath+ sourceless 相对 pack.less 的路径
     */
    gulp.task(projectName + "less", [projectName + "compile:less"], function () {

        return gulp.src("dist/" + projectName + "/*.css")
            // .pipe(sourcemaps.init())
            //.pipe(postcss([autoprefixer({ browsers: ['last 2 versions', 'ie >=11', '> 5%'], remove: false })]))
            .pipe(cleancss())
            // .pipe(sourcemaps.write('.'))
            .pipe(rename({ suffix: '.min' }))
            // .pipe(rename(projectConfig.name + '.min.css'))
            .pipe(gulp.dest("dist/" + projectName + "/"));

    });

    gulp.task(projectName + "compile:less", [projectName + "clean"], function () {
        //var fileName = projectConfig.name + ".css";
        return gulp.src(projectConfig.less)
            .pipe(rename(projectConfig.name + ".less"))
            .pipe(lessmap({
                sourceMap: {

                    sourceMapRootpath: '../../less/'
                }
            }))
            .pipe(gulp.dest("./dist/" + projectName + "/"))
            
    });

}
/**
 * @method 生成各个projec 的 js task
 */
function generateJSTask(projectName, projectConfig) {

    gulp.task(projectName + "js", [projectName + "clean"], function () {

        return gulp.src(projectConfig.js)
            .pipe(webpack({
                output: {
                    filename: projectConfig.name + ".js"
                }
            }))
            // .pipe(babel({
            //     presets: ["es2015"]
            // }))
            .pipe(header(banner, { pkg: pkg }))
            .pipe(gulp.dest("dist/" + projectName + "/"))
            .pipe(sourcemaps.init())
            .pipe(rename(projectConfig.name + '.min.js'))
            .pipe(uglify())
            .pipe(sourcemaps.write('.'))
            .pipe(gulp.dest("dist/" + projectName + "/"));
    });

}

function generateDefaultTask() {
    config.default.constructor == Array ?
        (defaultTasks = config.default) :
        (defaultTasks = project_array);
    gulp.task("default", defaultTasks);
}
/**http://localhost:10097/less/mixin
 * https://github.com/postcss/autoprefixer
 */

//gulp.task(name[, deps], fn) 定义任务  name：任务名称 deps：依赖任务名称 fn：回调函数
//gulp.src(globs[, options]) 执行任务处理的文件  globs：处理的文件路径(字符串或者字符串数组) 
//gulp.dest(path[, options])处理完后文件生成路径

// gulp 只有你需要熟知的参数标记，其他所有的参数标记只在一些任务需要的时候使用。

// -v 或 --version 会显示全局和项目本地所安装的 gulp 版本号
// --require <module path> 将会在执行之前 reqiure 一个模块。这对于一些语言编译器或者需要其他应用的情况来说来说很有用。你可以使用多个--require
// --gulpfile <gulpfile path> 手动指定一个 gulpfile 的路径，这在你有很多个 gulpfile 的时候很有用。这也会将 CWD 设置到该 gulpfile 所在目录
// --cwd <dir path> 手动指定 CWD。定义 gulpfile 查找的位置，此外，所有的相应的依赖（require）会从这里开始计算相对路径
// -T 或 --tasks 会显示所指定 gulpfile 的 task 依赖树
// --tasks-simple 会以纯文本的方式显示所载入的 gulpfile 中的 task 列表
// --color 强制 gulp 和 gulp 插件显示颜色，即便没有颜色支持
// --no-color 强制不显示颜色，即便检测到有颜色支持
// --silent 禁止所有的 gulp 日志
// 命令行会在 process.env.INIT_CW 中记录它