# dust（Ashes to ashes,dust to dust）
build a framwork which includes a custom bootstrap css framework，some custom jquery plug-ins, and uses the node.js to realize front-end automation.

## 起步
本工程前端自动化依赖node所以使用前需要安装node（但是之后我会提交批处理脚本剔除对node安装的依赖）

在当前目录运行以下命令
```
$ npm install //根据package.json 下载项目依赖

$ gulp        //运行默认task（编译less，合并压缩js，生成js和css 对应的sourcemap，生成一个包含所有文件的压缩包
````
