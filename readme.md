# 开发过程中总结的小程序模板

## 开发

### 初始化

```bash
$ # 安装依赖
$ cd your-project
$ npm install
$
$ # 开发
$ npm run dev
```

### 安装微信开发者工具

- [下载地址](https://developers.weixin.qq.com/miniprogram/dev/devtools/download.html)
- 开发者工具设置：
  - es6: 对应关闭 ES6 转 ES5 选项，关闭。 重要：未关闭会运行报错。
  - postcss: 对应关闭上传代码时样式自动补全选项，关闭。 重要：某些情况下漏掉此项也会运行报错。
  - minified: 对应关闭代码压缩上传选项，关闭。重要：开启后，会导致真机 computed,props.sync 等等属性失效。（注：压缩功能可使用 WePY 提供的 build 指令代替，详见后文相关介绍以及 Demo 项目根目录中的 wepy.config.js 和 package.json 文件。）
  - urlCheck: 对应不检查安全域名选项，开启。 如果已配置好安全域名则建议关闭。

### 代码高亮

- vscode
  - 在 Code 里先安装 Vue 的语法高亮插件 Vetur。
  - 打开任意 .wpy 文件。
  - 点击右下角的选择语言模式，默认为纯文本。
  - 在弹出的窗口中选择 .wpy 的配置文件关联...。
  - 在选择要与 .wpy 关联的语言模式 中选择 Vue。

### wepy 项目中使用 Promise

- 本项目已经安装
- 进入项目根目录，安装 polyfill

```bash
  # 安装 polyfill
  $ npm install promise-polyfill --save
```

- 在 app.wpy 中引入 polyfill

```js
  // 引入Promise
  import Promise from 'promise-polyfill';
```

- 在 app.wpy 中使 API promise 化

```js
  export default class extends wepy.app {
  constructor () {
      super();
      this.use('promisify');
    }
  }
```

### wepy 踩坑

1.  wepy 内引用原生小程序的 api 时

- 将前缀 wx 换成 wepy
- 内部回调函数一律改成 promise 的.then(...)
- 示例：

```js
  // 原生小程序写法
  wx.chooseImage({
    count: 1,
    sizeType: ['compressed'],
    sourceType: ['album', 'camera'],
    success: function(res){
      // do something
      console.log(res)
    },
    fail: function(err){
      // do something
      console.log(err)
    },
  })
  // 框架内写法
  wepy.chooseImage({
    count: 1,
    sizeType: ['compressed'],
    sourceType: ['album', 'camera'],
  }).then(res => {
    // do something
    console.log(res)
  }).catch(err => {
    // do something
    console.log(err)
  })
```

2.  异步函数数据更新必须要手动加上 this.$apply()
3.  组件实例或页面实例的函数最好写成箭头函数,不然类似定时器内部有可能拿不到 this
4.  点击事件@tap,标签上的函数传参,函数小括号内双花括号内传参

```html
  <view @tap="click({{params}})"></view>
```

5.  标签上的事件写在 methods = {...},自定义事件写在 methods 外面，与 methods 平级
6.  子父组件间传值，只能写 data 下面的第一层级的属性，不能写属性值的属性，如下：propname0 传值无效，propname1 才有效

```html
<template>
  <child :propname0="prop0.a" :propname1="prop1a"></child>
</template>

<script>
  export default class  extends wepy.page {
    data = {
      prop0: {
        a: 1
      },
      prop1a: 1
    }
  }
</script>
```
7. 父子组件静态传prop,type必须是String
```js
// parent.wpy
<child propStatic="1"></child>
// child.wpy
  props = {
    propStatic: String
  }
```
8. open-data宽高设置无效：display: inline-block；圆角设置无效：overflow:hidden;

```css
  open-data {
    display: inline-block;
    height: 40rpx;
    width: 40rpx;
    overflow:hidden;
    border-radius: 50%;
  }
```

## 参考资料

- [wepy 框架](https://tencent.github.io/wepy/document.html#/)
- [原生小程序](https://developers.weixin.qq.com/miniprogram/dev/component/)
