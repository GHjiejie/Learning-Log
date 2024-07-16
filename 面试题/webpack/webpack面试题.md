## 1、type的含义

在您提供的代码片段中，`type` 字段用于指定 webpack 如何处理匹配到的文件。此处 `type: "asset"` 表示将匹配到的文件视为 **资源模块 (asset module)** 进行处理。

### 资源模块 (asset module)

资源模块是 webpack 5 中引入的一种新的模块类型，用于处理各种类型的资源文件，例如图片、字体、图标等。它提供了几种不同的处理方式，具体取决于文件的大小和配置：

*   **asset/resource:** 将文件视为资源文件，并将其输出到输出目录中，并生成一个 URL 地址用于访问该文件。这是默认的处理方式。
*   **asset/inline:** 将文件的内容作为 base64 编码的字符串嵌入到模块中。
*   **asset/source:** 将文件的内容作为字符串导出，以便在 JavaScript 代码中使用。
*   **asset:** 根据文件大小自动选择处理方式。小于 `maxSize` 的文件将被内联，而较大的文件将被视为资源文件。

### 代码片段解析

在您的代码片段中，使用了 `asset` 类型并配置了 `parser.dataUrlCondition.maxSize` 选项。这意味着 webpack 将会：

*   将匹配到的文件 (png、svg、jpg、jpeg、gif) 视为资源模块。
*   对于小于 10kb 的图片，将其转换为 base64 编码的字符串并嵌入到模块中 (asset/inline)。
*   对于大于等于 10kb 的图片，将其视为资源文件输出到输出目录中，并生成一个 URL 地址用于访问 (asset/resource)。

这种配置方式可以减少小图片的 HTTP 请求数量，从而提高页面加载速度。

## 2、webpack处理浏览器兼容性问题（在package.json文件里面配置）

 "browserslist": [

   "last 2 versions",

   "> 1% ",

   "not dead"

  ]

# 3、CssMinimizerWebpackPlugin

这个插件使用 [cssnano](https://cssnano.co/) 优化和压缩 CSS。

## 4、SourceMap![image-20240506231643115](C:\Users\洁哥\AppData\Roaming\Typora\typora-user-images\image-20240506231643115.png)

![image-20240506231925490](C:\Users\洁哥\AppData\Roaming\Typora\typora-user-images\image-20240506231925490.png)

## 5、提升打包构建速度

开启**HMR**

**HotModuleReplacement**



## 6、多线程打包

![image-20240507000634603](C:\Users\洁哥\AppData\Roaming\Typora\typora-user-images\image-20240507000634603.png) 	

## 7、总结

![image-20240507025025429](C:\Users\洁哥\AppData\Roaming\Typora\typora-user-images\image-20240507025025429.png)