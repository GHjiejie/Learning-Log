#### `1`、快速上手？

- 首先安装webpack与webpack-cli

  ```html
  //安装依赖 ，—D指在将其安装在开发依赖下
  npm install webpack webpack-cli -D
  ```

- 在项目的根目录下创建webpack.config.js配置文件

- 配置必要的点：

  1. 入口文件entry

  2. 输出文件output

  3. 模式：development(开发模式)或者production（生产模式）

     补充：什么是开发模式：就是给开发人员用的，有调试等功能

     ​            什么是生产模式：项目经过打包压缩后上线，展示给用户看的

     

- 在根目录下打开终端，执行 

  ```html
  npx webpack
  ```

  需要理解什么是npx命令

#### 2、使用html-webpack-plugin插件

为什么要使用html-webpack-plugin插件？？？

如果我们不适用这个插件，我们只能通过手动修改index.html里面引入的script脚本

但是这样会十分麻烦，同时我们不妨试试配置开发服务器，也就是devServer,我们配置后发现打开网址后没有页面的显示，因为打包默认是打开dist/index.html文件，但是，现在没有使用这个插件，所以dist目录下就没有这个文件。

所以，我们使用webpack-dev-server的前提是使用了html-webpack-plugin插件，

这个插件会根据你提供的模板文件(通常是位于src/index.html)在dist目录下生成一个index.html文件（自动引入了相关的依赖，

#### 3、webpack-dev-server的作用？

我们使用webpack-dev-server主要是实现一个热更新的作用，不然修改代码后每一次都要重新打包，如果项目比较大的话，就会使打包的过程比较缓慢

#### 4、像使用node开发一样，如果我们有静态资源，我们应该如何处理？？？

在webpack5之前，我们使用的是file-loader、url-loader等loader来实现，但是现在我们使用的是webpack5推荐的资源模块asset来实现

**那么什么又是资源模块asset呢？？**

Webpack 的资源模块 (Asset Modules) 是 Webpack 5 中引入的一种新的资源管理方式，它提供了一种更简洁、更灵活的方式来处理各种类型的资源文件，例如：

- 图片 (`.png`、`.jpg`、`.gif`、`.svg` 等)
- 字体文件 (`.woff`、`.woff2`、`.ttf`、`.eot` 等)
- 音频文件 (`.mp3`、`.wav` 等)
- 视频文件 (`.mp4`、`.webm` 等)
- 数据文件 (`.json`、`.csv`、`.xml` 等)

##### 4-1资源模块类型(asset module type)，通过添加 4 种新的模块类型，来替换所有这些 loader：

- `asset/resource` 发送一个单独的文件并导出 URL。之前通过使用 `file-loader` 实现。
- `asset/inline` 导出一个资源的 data URI。之前通过使用 `url-loader` 实现。
- `asset/source` 导出资源的源代码。之前通过使用 `raw-loader` 实现。
- `asset` 在导出一个 data URI 和发送一个单独的文件之间自动选择。之前通过使用 `url-loader`，并且配置资源体积限制实现。

##### 4-2**资源模块的特点：**

- **统一的处理方式：** 不再需要使用 `file-loader`、`url-loader` 等不同的 loader 来处理不同类型的资源文件，而是使用 `type: "asset"` 来统一处理。

- **自动选择输出方式：** Webpack 会根据文件大小和配置，自动选择将资源文件嵌入到 JavaScript 代码中 (Data URL) 还是将其作为独立文件输出。

- **更灵活的控制：** 你可以使用 `parser` 和 `generator` 选项对资源文件的解析和输出方式进行更细粒度的控制。（需要注意的是，paeser与generator字段只会在type:asset时生效）

  你使用 `asset/resource` 或 `asset/inline` 时，由于它们的功能已经明确定义，所以 `parser` 和 `generator`  字段会被忽略。

  - **`asset/resource`:**  等同于之前的 `file-loader`，总是将资源文件作为独立文件输出，因此不需要 `parser` 字段来决定是否转换为 Data URL，也不需要 `generator`  字段来自定义输出文件名等。
  - **`asset/inline`:**  等同于之前的 `url-loader`  的 `limit` 选项设置为 `Infinity`，总是将资源文件转换为 Data URL 并嵌入到 JavaScript 代码中，因此也不需要 `parser` 和 `generator`  字段。

  只有当你使用 `type: 'asset'`  时，才会根据 `parser` 和 `generator`  字段的配置来决定资源文件的处理方式。

##### 4-3**什么时parser字段，什么又是generator字段**：

**parser字段**用于配置资源文件的解析方式，例如如何处理 Data URL、如何提取资源文件的元数据等。

常用的是**`dataUrlCondition`:**  配置将资源文件转换为 Data URL 的条件（超过多少大小以Data Url显示，否则以单独文件输出（通过字段maxSize控制））。

```javascript
module.exports = {
  // ...其他配置
  module: {
    rules: [
      {
        test: /\.png$/,
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: 8 * 1024 // 8KB
          }
        }
      }
    ]
  }
};
```

**generator字段**：用于配置资源文件的生成方式，例如如何生成输出文件名、如何将资源文件写入磁盘等。

我们在打包的时候可以根据文件的类型放到不同的文件夹里面

**`filename`:**  配置输出文件的名称模板，可以使用以下占位符：

- `[name]`: 资源文件的原始名称。
- `[hash]`: 资源文件内容的哈希值。
- `[ext]`: 资源文件的扩展名。
- `[query]`: 资源文件的查询字符串。

```
javascript复制代码module.exports = {
  // ...其他配置
  module: {
    rules: [
      {
        test: /\.jpg$/,
        type: 'asset',
        generator: {
          filename: 'images/[name]-[hash:5].[ext]'
        }
      }
    ]
  }
};
```



#### 5、打包时如何清除之前打包的文件？

- 在output字段里面添加`clean:true`

  ```javascript
  const path = require('path');
  const fs = require('fs');
  
  module.exports = {
    // ...其他配置
    output: {
      path: path.resolve(__dirname, 'dist'),
      clean: true // Webpack 5.20+，等价于 fs.rmSync(path.resolve(__dirname, 'dist'), { recursive: true, force: true })
    }
  };
  
  ```

- **使用**`clean-webpack-plugin`插件

实际开发时使用`clean-webpack-plugin`更多，他可以实现更精确的控制

```javascript
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  // ... other webpack configurations
  plugins: [
    new CleanWebpackPlugin({
      // 选项配置，例如:
      // cleanOnceBeforeBuildPatterns: ['**/*', '!**/*.txt'], // 清除所有文件，除了 .txt 文件
      // cleanStaleWebpackAssets: false // 阻止清理与当前配置不匹配的旧 webpack assets
    }),
  ],
};

```

#### 6、css文件如何压缩同时打包为一个文件？

使用插件 `MiniCssExtractPlugin`,	实际开发过程中，我们需要将`MiniCssExtractPlugin`这个插件与`CssMinnizerPlugin`这个插件结合使用

#### 7、将打包的css文件进行压缩？

在 webpack 配置中，`optimization` 字段用于配置 **代码优化** 相关的选项。它允许你控制 webpack 如何压缩、分割和优化代码，从而提高应用程序的性能。

`optimization` 字段可以包含多个属性，每个属性都对应着一种特定的优化方式。以下是一些常用的属性：

- **`minimize`:** (boolean) 是否启用代码压缩。**默认情况下，在生产环境 (`mode: 'production'`)  会启用**，而在**开发环境 (`mode: 'development'`)  则会禁用**。你可以手动设置为 `true` 或 `false` 来覆盖默认行为。
- **`minimizer`:** (array) 用于指定自定义的代码压缩插件。默认情况下，webpack 会使用 `TerserPlugin` 来压缩 JavaScript 代码。你可以使用该属性添加其他压缩插件，例如用于压缩 CSS 的 `CssMinimizerPlugin`。
- **`splitChunks`:** (object) 用于配置代码分割。它允许你将代码拆分成多个 chunk，以便浏览器可以按需加载，从而提高页面加载速度。`splitChunks` 属性可以进行更细粒度的配置，例如指定拆分哪些类型的代码、每个 chunk 的最大体积等等。
- **`runtimeChunk`:** (boolean | string | object) 用于将 webpack 运行时代码提取到一个单独的 chunk 中。这可以使浏览器更好地缓存代码，因为运行时代码通常不会频繁更新。
- **`moduleIds`:** (string)  用于配置模块 ID 的生成方式。可以使用不同的策略来生成更短或更易于理解的模块 ID，例如 `'deterministic'`、 `'hashed'` 等。
- **`chunkIds`:** (string) 用于配置 chunk ID 的生成方式。类似于 `moduleIds`，可以使用不同的策略来生成更短或更易于理解的 chunk ID。

#### 8、如何处理js文件（或者说如何处理js文件的兼容性)？

使用babel进行处理

- 首先在项目的根目录下创建一个`.babelrc`文件，这个里面是babel的配置项，当然，你使用不同的配置文件里面的形式是不一样的，使用.`babelrc`时，我们里面的配置文件是以`JSON`形式去书写的，如果我们创建的的是`babel.config.js`这个文件，里面的配置代码是以module.exports来书写的

- 在module里面添加处理js代码的loader

  ```javascript
  {
      text:/\.js$/,
     	//排除node_modules里面的js文件
      exclude:/node_modules/,
     	use:[
          //如果没有写配置文件的话，我们可以直接在这里进行配置，比如处理js兼容性到什么程度
          //否则代码在编译的过程中会到根目录下去寻找配置文件并读取
          loader:'babel-loader'
      ],
      
  }
  ```

- .`babelrc`示例配置文件

  ```json
  {
    // 智能预设，作用是根据目标环境自动转换代码(向下兼容)
    "presets": ["@babel/preset-env"],
  
    "plugins": ["@babel/plugin-transform-runtime"]
  }
  
  ```

#### 9、和js处理兼容性的想法一样，我们应该如何处理css兼容性？

**使用postcss**

具体使用查看官方文档