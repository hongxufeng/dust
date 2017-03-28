// (function(exports,require,module,__filename,__dirname){
//    var options={};
//    /**
//     * 俩种导出方式因为形参传递的问题，但是一般不会有影响（反正我是不想改变引入文件中的值）
//     */
//     exports.options;
//     module.exports.options;
// })

function Configuration(){
       var map =new Map();
       this.set = (x,y) => map.set(x,y);
       this.get =(x) => map.get(x);
       this.map = () =>  map;
}
/**
 * @prop default 设置default build 工程 默认为false 即不设置，当设置时需要将 default 值设置为 Array ，Array 中存放需要build 的工程名称如：['gui']
 */
Configuration.prototype.default = false;

function ConfigOptions(name,less,js,font){
    this.name=name||"framework";//生成合并文件的名字
    this.less=less||"./less/pack.less";
    this.js=js||"./js/pack/pack.js";

    // if((name&&less&&js&&font&&true)!==true){
    //     throw "name&less&js&font must be assigned";
    // }
    //this.font=font;
}

Configuration.prototype.default = ['gui'];
var config = new Configuration;
/**
 * @param <string>  folderName
 * @param <ConfigItem> config of project
 */
config.set("gui",new ConfigOptions);
// config.set("liz",new ConfigOptions);

//>node   node_modules\gulp\bin\gulp.js gui
//node.exe   node_modules\gulp\bin\gulp.js gui



module.exports = config;

