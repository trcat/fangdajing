# fangdajing
放大镜组件

## demo

[demo](https://trcat.github.io/fangdajing/)

## 使用方式

1. 引入 `fangdajin.min.js`

   ```html
   <script src="fangdajin.min.js"></script>
   ```

2. HTML 中添加目标元素，并将图片路径添加至 `data-img-src` 属性中

   ```html
   <div class="fangdajin" data-img-src="./image.jpg"></div>
   ```

3. 然后添加 JavaScript 代码，启用组件

   ```javascript
       new Fangdajin({
         el: ".fangdajin", // 目标 css class, 必填
         areaWidth: 250, // 选择区域的宽度， 选填
         areaHeight: 300, // 选择区域的高度， 选填
         viewWidth: 250, // 显示区域的宽度， 选填
         viewHeight: 300, // 显示区域的高度， 选填
         largeSize: 2, // 发大选择区域的倍数， 选填
       }).init();
   ```



## 注意点

1. 目标元素必须要设定宽度和高度样式，且只添加这两个样式



## 浏览器支持情况

目前已通过 `babel` 编译，但是未添加 `polyfill`，请按实际情况添加。浏览器支持情况如下：

```json
{
    "browserslist": [
    "last 2 versions",
    "> 1%",
    "ie >= 9"
  ]
}
```


