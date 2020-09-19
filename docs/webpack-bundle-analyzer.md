先增加依赖

```bash
// npm
$ npm install --save-dev webpack-bundle-analyzer

// or yarn
$ yarn add webpack-bundle-analyzer -D
```

配置文件 `vue.config.js` 增加 `configureWebpack.plugins` 参数

```
const path = require('path')
const webpack = require('webpack')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

function resolve (dir) {
  return path.join(__dirname, dir)
}

// vue.config.js
module.exports = {
  configureWebpack: {
    plugins: [
 
    ]
  },
  
  
  ...
}
```



<!-- 启动 `cli` 的 `build` 命令进行项目编译，编译完成时，会自动运行一个 http://localhost:8888 的地址，完整显示了支持库依赖 -->