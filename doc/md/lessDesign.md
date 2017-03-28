# less 设计提纲

## 参考链接

- [less手册](http://lesscss.org/features/#features-overview-feature)
- [less 在线编译](http://less2css.org/)

## LESS 规范
- 经过一段时间的沉淀，我对LESS的写法有了些新的理解（主要参照bootstrap结合我们自己的需求）我们一直想要的就是<strong>复用</strong>以不变应万变.
一个开放式的规范可以适应任何变换之前困扰我的就是我们想兼容各个项目而不是简单的换肤功能。
- 废话不多说说一下具体实现：具体结构参加下面图片
   * **变量**，变量是我们切换主题（这里指不同项目）的基础一个项目只有一个var.less（之前是项目自己的var覆盖公共的var思维禁锢在这里很久），var.less定义项目的基础配置基础字体基础颜色等等。
   * **widget.less**在Less根目录下直接添加各个widget对应的less
   * **mixin** mixin folder 下各个构造widget 函数名字跟 widget 相同
   * 具体实现参加下面**代码&注释**在code面前一切语言都是苍白无力的
   
## 常见的检测函式
- iscolor
- isnumber
- isstring
- iskeyword
- isurl
- ispixel
- ispercentage
- isem

## mixin 用法
![](./image/folder.png)

### LESS
``` less

// folder theme    file   var.less
@theme:"msf";//这个theme是一个大的主题代表各个项目
@fontbase:16px;
@colorbase:#fff;

//folder mixin file  button.less
// 前俩个函数对应不同**项目（主题）**的特性

.inintbutton (@theme) when (isstring(@theme)) and (@theme="msf")  { 
   content:"msf";

}

.initbutton (@theme) when (isstring(@theme)) and (@theme="rp")  { 
   content:"rp";
}
//公共基础样式
//由于生成的css会合并所有配合函数的规则所以所有的**项目（主题）**都会包含下面的定义规则
.inintbutton(@theme){
  display:block;
  font-size:@fontbase;
  border-color:@colorbase;
}

//button.less
.button{
  
 .inintbutton(@theme);
  
  &-default{//这是一个小主题同一项目下对button的各种修饰（换肤功能）
    color:hsla(10,50%,50%,0.5);
  }
  &-theme{//同上
    color:hsla(123,79%,21%,.9);
  }
}






```
### CSS
```css
//生成的结果此时主题是msf
.button {
  content: "msf";
  display: block;
  font-size: 16px;
  border-color: #fff;
}
.button-default {
  color: rgba(191, 85, 64, 0.5);
}
.button-theme {
  color: rgba(11, 96, 15, 0.9);
}

```




## Color 函数

- LESS 提供了一系列的颜色运算函数. 颜色会先被转化成 HSL 色彩空间, 然后在通道级别操作:


>lighten(@color, 10%);     // return a color which is 10% *lighter* than @color
darken(@color, 10%);      // return a color which is 10% *darker* than @color
>
>saturate(@color, 10%);    // return a color 10% *more* saturated than @color
desaturate(@color, 10%);  // return a color 10% *less* saturated than @color
>
> fadein(@color, 10%);      // return a color 10% *less* transparent than @color
fadeout(@color, 10%);     // return a color 10% *more* transparent than @color
fade(@color, 50%);        // return @color with 50% transparency
>
> spin(@color, 10);         // return a color with a 10 degree larger in hue than @color
spin(@color, -10);        // return a color with a 10 degree smaller hue than @color
>
> mix(@color1, @color2);    // return a mix of @color1 and @color2
