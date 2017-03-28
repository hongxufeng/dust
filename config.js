// (function(exports,require,module,__filename,__dirname){
//    var options={};
//    /**
//     * 俩种导出方式因为形参传递的问题，但是一般不会有影响（反正我是不想改变引入文件中的值）
//     */
//     exports.options;
//     module.exports.options;
// })
/**
 * Constructor of Configuration 
 * @class Configuration
 * @private {Map} map Map对象
 * @method set
 * @method get 
 * @description 一个对象规划配置gulp tasks 
 */

function Configuration(){
      
       var map =new Map();
        /**
         * set key and value of Map
         * @method set 
         * @param {String}  x taskname
         * @param {Task} y task object
         */
       this.set = (x,y) => map.set(x,y);
       this.get =(x) => map.get(x);
       this.map = () =>  map;
}
/**
 * @prop default {Array}  设置default build 工程 默认为[] ，Array 中存放需要build 的工程名称如：['gui']
 */
Configuration.prototype.default = ['gui'];
/**
 * constructor of Task
 * @class Task
 * @prop {String} name taskname
 * @prop {String} less path of less pack config
 * @prop {String} js path of js pack config
 */

function Task(name,less,js,font){
    this.name=name||"framework";//生成合并文件的名字
    this.less=less||"./less/pack.less";
    this.js=js||"./js/pack/pack.js";

    // if((name&&less&&js&&font&&true)!==true){
    //     throw "name&less&js&font must be assigned";
    // }
    //this.font=font;
}

//gulp tasks 配置对象实例
var tasks_config = new Configuration;

tasks_config.set("gui",new Task);
// config.set("liz",new ConfigOptions);

//>node   node_modules\gulp\bin\gulp.js gui
//node.exe   node_modules\gulp\bin\gulp.js gui



module.exports = tasks_config;

