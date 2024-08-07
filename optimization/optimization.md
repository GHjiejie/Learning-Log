### 1.在设计按钮的时候要为按钮添加可访问名称

这个主要是为了使用屏幕阅读器的用户

具体实现有两种方式，使用 `aria-label`与 `aria-labelledby`

他们的使用区别于应用场景如下：

- **使用 `aria-label`  的场景:**
  - 按钮或链接本身没有或只有很少的文本内容。
  - 按钮或链接的功能是**独立的**，不会影响到页面上其他元素的状态或数据。
  - 按钮的 accessible name  是**固定的**，不会随着页面状态或数据的变化而改变。

- **使用 `aria-labelledby`  的场景:**
  - 按钮或链接的 accessible name  需要**参考页面上其他元素的内容**，例如显示数量、状态或其他动态信息。
  - 按钮或链接的功能会**影响到页面上其他元素的状态或数据**，需要让屏幕阅读器用户感知到这些变化。
  - 按钮的 accessible name  是**动态的**，会随着页面状态或数据的变化而改变。

**举例说明：**

- **`aria-label`  示例:**  "提交表单"、 "关闭窗口"、 "播放视频" 等。 
  - 这些按钮的功能相对独立， 不会影响其他数据， 而且按钮的文字描述也是固定的。

- **`aria-labelledby`  示例:**  "购物车 (3)"、 "喜欢 (10)"、 "评论 (5)"  等。
  - 这些按钮的功能会影响到其他数据 (例如购物车中的商品数量、点赞数量),  而且按钮的文字描述需要随着数据的变化而更新。

**总结：**

选择使用 `aria-label` 还是 `aria-labelledby` ，需要根据具体的场景和需求来决定。 最终目标是为屏幕阅读器用户提供清晰、准确、易于理解的网页内容和交互方式。



### 2.对图片的处理

#### 摒弃原来的JPEG与PNG格式的图片，优先使用Webp与AVIF个格式的图片，

**优点如下**：

**1.  更高的压缩率和更小的文件大小：**

- AVIF 和 WebP 使用更先进的压缩算法，可以在保证图片质量的前提下，实现比 JPEG 和 PNG 更高的压缩率，从而生成更小的文件。
- **例如：** 相同质量下， AVIF 文件大小通常比 JPEG 小 50%， 比 PNG 小 70% 以上； WebP 文件大小也比 JPEG 小 25%-34%， 比 PNG 小 26%。

**2. 更高的图片质量：**

- 在相同文件大小下， AVIF 和 WebP 格式的图片通常比 JPEG 和 PNG 格式的图片拥有更高的视觉质量， 更少的失真和 artifacts。

**3. 支持更丰富的功能：**

- AVIF 和 WebP 支持透明度、动画、更广的色域等功能， 而 JPEG 不支持透明度， PNG 在动画和压缩效率方面存在不足。

**4. 更好的用户体验：**

- 更小的图片文件意味着更快的页面加载速度，从而提升用户体验， 降低网站跳出率。
- 更高的图片质量可以提升网站的视觉效果， 增强用户体验。

**5. 节省带宽和存储空间：**

- 对于网站运营者来说， 使用 AVIF 或 WebP 格式的图片可以节省带宽成本和存储空间。

**缺点如下**：0

- **浏览器兼容性：** 目前并非所有浏览器都完全支持 AVIF 和 WebP 格式， 需要根据目标用户的浏览器使用情况进行选择。
- **编码和解码速度：** AVIF 的编码速度相对较慢， WebP 的解码速度也可能比 JPEG 和 PNG 慢。
- **生态系统支持：** JPEG 和 PNG 格式已经存在多年， 生态系统非常完善， 而 AVIF 和 WebP 还比较新， 一些图像编辑软件和网站平台可能还不支持。

#### 图片的延迟加载

- 主要原因是因为如果 `img`标签里面有 `src`属性时，浏览器会直接通过这个链接去加载这个图片，都是现在我们的思路是将 `src`替换成 `data-src`,这样就避免了浏览器的默认事件，我们可以使用官方推荐的框架 [lazysizes](https://github.com/aFarkas/lazysizes)去实现，这个框架易于上手，上面有详细的教程
- 我们也可以使用  [IntersectionObserver](https://developer.mozilla.org/zh-CN/docs/Web/API/IntersectionObserver) 这个API来监听图片元素在视口的位置来实现对图片的延迟加载

#### 使用图片 CDN 优化图片

#### 压缩图片

- 我一直使用的是 [sharp.js](https://github.com/lovell/sharp) 这个库，当然，还是有很多其他的库可以去使用的，比如官方推荐的[imagemin.js](https://github.com/imagemin/imagemin),webpack默认的对图片的压缩plugin就是这个,

  官方推荐的是将JPEG的图片压缩级别设置为85，暂时就先先按这个来吧

#### 将GIF动画改为视频播放

使用gif的缺点：

1. gif会自动播放
2. 他会连续播放
3. 他们会保持沉默

都是视频可以定制上面的行为，那么如何将`gif`转换为视频呢？可以使用 [FFmpeg](https://www.ffmpeg.org/)

###  3.缩减网络载荷并对其进行压缩

具体原因可以参考 [优化基于文本的资源的编码和传输大小](https://web.dev/articles/optimizing-content-efficiency-optimize-encoding-and-transfer?hl=zh-cn)

 以我在实习时的Hiten大模型为例，本地环境与生产环境的区别是很大的



### 4.使用合适的缓存策略去提供静态资源

可以参考文档 [采用高效的缓存政策提供静态资源](https://developer.chrome.com/docs/lighthouse/performance/uses-long-cache-ttl?hl=zh-cn)，后面可能会涉及到灰度部署



### 5.避免链接关键请求

这个会涉及到**Chrome资源优先级和调度**

下面是GPT给出的回答：

### 6.Chrome 资源优先级和调度

Chrome 浏览器使用一个复杂的系统来确定资源加载的优先级和调度顺序，以优化页面加载性能和用户体验。

#### 资源分类

Chrome 将页面资源分为以下几类，并根据类别分配不同的优先级：

*   **最高优先级:**
    *   **文档 (HTML):**  构建 DOM 树的基石。
    *   **关键子资源:**  阻塞渲染的关键资源，例如 CSS、字体文件等。
*   **高优先级:**
    *   **脚本 (JS):**  可能影响页面渲染和交互。
    *   **图片 (Images):**  首屏可见区域的图片。
    *   **XHR 请求:**  获取重要数据的异步请求。
*   **低优先级:**
    *   **图片 (Images):**  非首屏可见区域的图片 (懒加载)。
    *   **预加载资源:**  未来可能用到的资源。
    *   **跟踪脚本:**  用于分析和监控的脚本。
*   **最低优先级:**
    *   **广告:**  广告资源。
    *   **第三方脚本:**  非关键的第三方脚本。

#### 影响优先级的因素

除了资源类型，以下因素也会影响资源的优先级：

*   **资源大小:**  较小的资源通常优先级更高。
*   **连接类型:**  快速连接 (例如 WiFi) 上的资源优先级更高。
*   **缓存状态:**  已缓存的资源优先级更高。
*   **用户交互:**  与用户交互相关的资源优先级更高。
*   **开发者提示:**  开发者可以使用 `<link rel="preload">` 或 `fetch(..., {priority: "high"})`  等方式提示资源的重要性。

#### 调度策略

Chrome 使用以下策略来调度资源加载：

*   **并行下载:**  同时下载多个资源，但限制并发连接数以避免网络拥塞。
*   **优先级队列:**  根据资源优先级排序，高优先级资源优先下载。
*   **依赖关系:**  如果资源 A 依赖于资源 B，则资源 B 会优先下载。
*   **预加载扫描器:**  预先扫描 HTML 代码，发现需要加载的资源并提前下载。
*   **资源限制:**  限制特定类型资源的并发请求数，例如图片、脚本等。

#### 查看资源优先级

你可以使用 Chrome 开发者工具 (Network 面板) 查看资源的优先级：

1.  打开开发者工具 (F12 或 Ctrl+Shift+I)。
2.  切换到 "Network" 面板。
3.  刷新页面。
4.  在 "Name" 列中找到你想要查看的资源。
5.  查看 "Priority" 列，它会显示资源的优先级 (Highest, High, Medium, Low, Lowest)。

#### 优化建议

为了优化页面加载性能，你可以采取以下措施：

*   **减少关键资源数量:**  合并 CSS 和 JS 文件，减少 HTTP 请求数。
*   **优化资源大小:**  压缩图片、代码等资源，使用 WebP 等现代图片格式。
*   **使用缓存:**  设置合理的缓存策略，减少重复下载。
*   **懒加载非关键资源:**  使用懒加载技术延迟加载非首屏可见区域的图片和视频。
*   **使用 CDN:**  使用内容分发网络 (CDN) 加速资源访问。
*   **使用预加载:**  使用 `<link rel="preload">`  预加载关键资源。
*   **优化脚本执行:**  减少 JavaScript 代码量，避免阻塞渲染。

通过理解 Chrome 的资源优先级和调度机制，并采取相应的优化措施，可以显著提升网站的加载速度和用户体验。

### 7.对文本进行压缩

在构建阶段，可以使用`webpack`插件进行压缩。

在服务端数据传输时，可以使用`nginx`进行压缩

Nginx 压缩和 Webpack 插件压缩的区别主要在于它们的用途、作用时间和适用场景。以下是详细的区别：

#### Nginx 压缩

1. **用途**：Nginx 压缩用于在服务器端压缩传输的数据，以减少网络带宽和提高传输速度。

2. **作用时间**：在客户端请求数据后，服务器响应数据前进行压缩。

3. **适用场景**：适用于所有通过 Nginx 传输的静态和动态资源（如 HTML、CSS、JavaScript、图片等）。

4. **配置**：需要在 Nginx 配置文件中启用 gzip 模块，并指定哪些文件类型需要压缩。

   ```nginx
   http {
       gzip on;
       gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;
       gzip_min_length 1000;
       gzip_proxied any;
       gzip_vary on;
   }
   ```

5. **优势**：可以对所有资源进行压缩，不限于特定的文件类型；减少传输数据量，提高加载速度。

#### Webpack 插件压缩

1. **用途**：Webpack 插件压缩用于在构建过程中对静态资源进行压缩和优化，以减少文件大小。

2. **作用时间**：在代码编写完成后、部署前进行压缩。

3. **适用场景**：主要适用于前端开发中的 JavaScript、CSS 等资源的打包和压缩。

4. **常用插件**：如 `compression-webpack-plugin` 和 `terser-webpack-plugin`。

   ```javascript
   const CompressionPlugin = require('compression-webpack-plugin');
   
   module.exports = {
       // ...other configuration options...
       plugins: [
           new CompressionPlugin({
               test: /\.(js|css|html|svg)$/,
               filename: '[path][base].gz',
               algorithm: 'gzip',
               threshold: 10240,
               minRatio: 0.8
           })
       ]
   };
   ```

5. **优势**：在开发阶段就能对代码进行优化，减少最终部署文件的大小；可以结合其他优化插件使用，提供更好的构建和打包体验。

### 总结

- **Nginx 压缩**：适用于所有传输的资源，作用于服务器响应阶段，对传输效率提升显著。
- **Webpack 插件压缩**：主要针对前端资源的构建和优化，作用于打包阶段，有助于减少部署文件大小和提升加载性能。

两者可以结合使用：在开发和构建阶段使用 Webpack 插件进行代码压缩和优化，在生产环境中使用 Nginx 进行传输压缩，从而最大化提升性能和用户体验。





### 8.移除未使用的CSS与JS

具体是如何查看哪些CSS与JS文件没有被使用却在FCP是被加载，我们可以在控制台去看source里面的Coverage,这个里面油详细的说明

那么我提出问题：在优化FCP时，我们可以查看到未使用的CSS与JS，这个时候我们就可以手动去优化，这仅仅是针对与未使用资源文件比较少的情况，如果未使用的文件过多，那么手动去处理实在是太麻烦，我们应该怎么解决这种问题？？？？

当未使用的 CSS 和 JS 文件过多时，手动处理这些未使用的资源确实非常繁琐。为了高效地解决这个问题，可以使用自动化工具和技术来进行优化。以下是一些推荐的工具和方法：

#### 1. 使用工具来自动移除未使用的 CSS 和 JS

#### **PurifyCSS / PurgeCSS**

PurifyCSS 和 PurgeCSS 是用于移除未使用 CSS 的工具。它们可以扫描你的 HTML、JS 文件，找出未使用的 CSS 并将其删除。

**PurgeCSS Example**：

```javascript
// 安装 purgecss-webpack-plugin 和 glob-all
npm install purgecss-webpack-plugin glob-all --save-dev

// 在 Webpack 配置中使用
const PurgeCSSPlugin = require('purgecss-webpack-plugin');
const glob = require('glob-all');

module.exports = {
    // ...other configuration options...
    plugins: [
        new PurgeCSSPlugin({
            paths: glob.sync([
                // 这里是所有包含的文件路径
                path.join(__dirname, 'src/**/*.html'),
                path.join(__dirname, 'src/**/*.js')
            ]),
        }),
    ],
};
```

#### **UnCSS**

UnCSS 是另一个工具，可以通过静态分析 HTML 文件来移除未使用的 CSS。

**UnCSS Example**：

```javascript
// 安装 uncss 和相关插件
npm install uncss --save-dev

// 使用 UnCSS 移除未使用的 CSS
const uncss = require('uncss');

uncss(['src/index.html'], (error, output) => {
    console.log(output); // 这里是优化后的 CSS
});
```

#### 2. 使用代码分割（Code Splitting）

代码分割是一种优化技术，可以将代码分割成更小的块（chunks），并按需加载，从而减少初始加载时间。

**Webpack Code Splitting Example**：

```javascript
// 使用动态 import 进行代码分割
import(/* webpackChunkName: "lodash" */ 'lodash').then(({ default: _ }) => {
    const element = document.createElement('div');
    element.innerHTML = _.join(['Hello', 'webpack'], ' ');
    document.body.appendChild(element);
});
```

#### 3. 延迟加载（Lazy Loading）

对于非关键资源，可以使用延迟加载技术，确保这些资源只有在需要时才被加载。

**Lazy Loading Example**：

```javascript
// 使用 Intersection Observer 实现图片懒加载
const lazyLoadImages = document.querySelectorAll('img[data-src]');
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            observer.unobserve(img);
        }
    });
});

lazyLoadImages.forEach((img) => {
    observer.observe(img);
});
```

#### 4. Tree Shaking

Tree Shaking 是一种用于移除 JavaScript 中未使用代码的技术，通常在构建过程中由 Webpack 自动处理。

**Webpack Tree Shaking Configuration**：

```javascript
module.exports = {
    mode: 'production',
    // 确保模块使用 ES6 模块语法
    optimization: {
        usedExports: true,
    },
};
```

#### 5. 使用 CSS-in-JS 解决方案

使用 CSS-in-JS 解决方案（如 Styled Components 或 Emotion）可以更好地管理和优化 CSS，只在组件渲染时加载需要的样式。

**Styled Components Example**：

```javascript
import styled from 'styled-components';

const Button = styled.button`
  background: palevioletred;
  color: white;
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid palevioletred;
  border-radius: 3px;
`;
```

通过结合使用上述工具和技术，可以更高效地自动化移除未使用的 CSS 和 JS，从而优化 First Contentful Paint（FCP）和整体性能。



#### **6. 使用代码分析工具:**

- **Webpack Bundle Analyzer:**  Webpack 提供的 Bundle Analyzer 工具可以帮助你分析打包后的文件内容，清晰地展示每个文件的大小和依赖关系。通过分析，你可以找到哪些文件包含了未使用的代码，并进行针对性的优化。
- **Source Map:**  使用 Source Map 可以将压缩后的代码映射回原始代码，方便你定位和分析未使用代码的位置。
- **其他代码分析工具:**  一些专门的代码分析工具，例如 ESLint、SonarQube 等，可以帮助你查找代码中的问题，包括未使用代码、冗余代码等等。

#### **7. 优化代码结构:**

- **模块化开发:**  将代码拆分成多个模块，只加载需要的模块，可以有效减少资源加载量。
- **按需加载:**  使用动态加载的方式，只在需要的时候加载相应的模块，可以减少初始加载时间，提高页面性能。
- **代码分割:**  将代码分割成多个小的 chunk，并根据用户访问的页面进行加载，可以减少每个页面加载的资源量。

#### **8. 使用自动化工具:**

- **Tree Shaking:**  Webpack 的 Tree Shaking 功能可以自动剔除打包后的代码中没有被使用的部分，例如未使用的函数、变量、模块等等。
- **Code Splitting:**  Webpack 的 Code Splitting 功能可以将代码分割成多个小的 chunk，并根据用户访问的页面进行加载，可以减少每个页面加载的资源量。
- **其他插件:**  一些其他的 Webpack 插件，例如 `webpack-bundle-analyzer`、`html-webpack-plugin`、`purgecss-webpack-plugin`  等等，可以帮助你识别和移除未使用的代码。

#### **9. 使用预渲染或服务端渲染:**

- **预渲染:**  将页面内容预渲染成 HTML 文件，可以减少页面初始加载时间，提高 FCP。
- **服务端渲染:**  在服务器端渲染页面内容，可以有效减少资源加载量，并提高搜索引擎优化 (SEO)。

#### **10. 优化 CSS 加载策略:**

- **Critical CSS:**  将页面中重要的 CSS 代码提取出来，优先加载，可以提高 FCP。
- **Lazy Loading:**  使用 `lazy` 属性，延迟加载非关键的 CSS 代码，可以减少初始加载时间。

**总结：**

- 使用代码分析工具可以帮助你识别未使用代码。
- 优化代码结构可以有效减少资源加载量。
- 使用自动化工具可以帮助你自动移除未使用代码。
- 使用预渲染或服务端渲染可以减少页面初始加载时间。
- 使用 CSS 加载策略可以提高页面性能。

通过综合运用这些方法，你可以有效地解决项目中存在大量未使用资源的问题，并优化 FCP，提升用户体验。

#### 9、使用 `webpack`打包工具打包项目

我们进行A/B测试，主要就是看网络请求

打开开发者调试工具，点击network,查看最下面的一栏，

我们在实验里面有如下的数据

**打包前:**

- **请求数量:** 38 个请求
- **传输数据总量:** 232 KB
- **实际资源大小:** 3.4 MB
- **页面加载时间:** 481 ms
- **DOMContentLoaded:** 327 ms

**打包后:**

- **请求数量:** 1 个请求 (主要请求，忽略 HTML 本身)
- **传输数据总量:** 798 KB
- **实际资源大小:** 798 KB
- **页面加载时间:** 84 ms
- **DOMContentLoaded:** 76 ms

**对比分析:**

- **请求数量大幅减少:** 打包后请求数量从 38 个减少到 1 个， 这是 webpack 最直观的优化效果，显著减少了浏览器与服务器建立连接的次数，从而提升页面加载速度。

- **页面加载速度显著提升:** 打包后的页面加载时间缩短了 82.7% (481 ms -> 84 ms)，DOMContentLoaded 时间也缩短了 76.8% (327 ms -> 76 ms)。这说明合并资源和减少请求数量对页面性能有极大的提升。

- 传输数据量略有增加:

  打包后传输数据量从 232 KB 增加到了 798 KB。这可能是因为：

  - 打包后的文件未开启 Gzip 压缩。
  - 开发环境中使用了较大的第三方库，而打包后这些库的代码也被打包进了 `bundle.js` 中。

**建议：**

- **开启 Gzip 压缩:** 配置您的 Web 服务器，对 `bundle.js` 文件开启 Gzip 压缩，可以显著减少文件传输大小，进一步提升页面加载速度。
- **分析 `bundle.js` 构成:** 使用 webpack-bundle-analyzer 仔细分析 `bundle.js` 文件，查看哪些模块占用了较大的体积。我们可以在打包的时候执行以下的命令 `npx webpack --analyze`
- 优化代码体积:
  - 考虑是否使用了体积过大的第三方库，是否有更轻量级的替代方案。
  - 移除项目中未使用的代码。
  - 使用 tree-shaking 等技术，在打包时移除未使用的代码。

总的来说，webpack 打包对您的项目性能优化起到了非常显著的作用。但仍然可以通过一些进一步的优化措施，例如开启 Gzip 压缩、分析和优化 `bundle.js` 文件等，来进一步提升页面的加载速度和用户体验。

##### 9-1理解：什么是传输数据总量和实际资源大小，为什么传输数据总量在打包前与打包后差别那么大？？？

浏览器在于服务器获取数据，需要去请求服务器的资源文件，一般服务器的资源文件是放在一个目录下的，这个目录，我们可以将这个目录下的所有资源文件发送给浏览器，浏览器也可以正常接受到，但是这个资源会比较大，就向上面的情况一样。

**那么我们如何解决呢？？？？**

服务器向浏览器发送资源数据的时候，我们可以对这个资源进行压缩，这个需要我们在服务器（ 比如 `Nginx`, `Apache`）去配置，开启Gzip或者其他的压缩方式都可以,x下面给出在 `Nginx`服务器的示例配置

```nginx
gzip on;
gzip_types text/plain text/css application/javascript text/xml application/xml+rss text/javascript image/svg+xml;
gzip_min_length 1000;

```

- **`gzip on;`**: 启用 Gzip 压缩。
- **`gzip_types`**: 指定要压缩的文件类型。
- **`gzip_min_length`**: 设置最小压缩文件大小，小于该大小的文件不会被压缩。

上面是生产环境的做法，如果我们没有服务器，我们在本地如何去直观的看到中这个效果呢？

我们可以使用`compression`中间件来实现，以`express`来作为后端服务器

```javascript
const express = require('express');
const compression = require('compression');

const app = express();

app.use(compression());

// ...其他路由和中间件

```

所以我们可以得到结论：我们可以看实际资源大小于传输数据总量来判断服务器是否开启了压缩。

一般情况下，我们希望传输数据总量越小越好，因为这意味着更快的页面加载速度。开启 Gzip 压缩可以有效减少传输数据总量，提升用户体验。

##### 9-2,为什么要开启压缩,压缩加载和解压的时间难道不多吗？（为什么一般来说花费在传输上的时间远大于压缩加载解压的时间？）

一般来说，网络传输时间远大于压缩、加载和解压缩时间，主要原因如下：

**1. 网络传输的距离和延迟**

* **物理距离:** 数据在网络中传输需要经过多个节点，例如路由器、交换机等，这些节点之间的物理距离会影响传输时间。
* **网络延迟:** 网络延迟是指数据包从发送端到接收端所需的时间，它受到网络距离、网络拥塞、网络设备处理速度等多种因素的影响。
* **多次往返:**  一个完整的网络请求通常需要多次往返，例如 TCP 协议的三次握手和四次挥手，每次往返都会增加延迟。

**2. 压缩算法的效率**

* **成熟的压缩算法:**  现代的压缩算法，例如 gzip、brotli 等，都非常高效，可以在较短的时间内完成压缩和解压缩操作。
* **CPU 性能:**  现代 CPU 的处理能力非常强大，可以快速地执行压缩和解压缩算法。

**3. 加载和解压缩的并行化**

* **并行加载:** 浏览器可以并行加载多个资源，从而减少加载时间。
* **并行解压缩:**  现代浏览器和操作系统都支持多线程，可以并行解压缩数据，进一步减少解压缩时间。


**举例说明:**

假设一个 1MB 的文件需要从服务器传输到客户端，网络延迟为 50 毫秒，网络带宽为 10 Mbps。

* **传输时间:** 1MB = 8Mb，传输时间 = 8Mb / 10 Mbps = 0.8 秒 + 50 毫秒延迟 = 850 毫秒。
* **压缩时间:**  假设使用 gzip 压缩，压缩比为 50%，压缩时间通常在几毫秒到几十毫秒之间。
* **解压缩时间:**  解压缩时间与压缩时间类似，通常也在几毫秒到几十毫秒之间。


可以看出，传输时间远远大于压缩和解压缩时间。


**总结:**

网络传输时间受到网络距离、延迟和带宽等多种因素的影响，而压缩和解压缩操作通常可以在较短的时间内完成。因此，一般来说，花费在传输上的时间远大于压缩、加载和解压缩的时间。

，服务端压缩，然后将压缩的文件

#### 10、使用 `terser-webpack-plugin`插件移除注释

使用 `terser-webpack-plugin`这个插件来在优化在生产环境下的配置，比如我们可以在开发环境下移除所有的注释，减少代码打包体积



#### 11、代码分割

我们在9点里面提到了，我们使用webpcak打包后最后向服务器请求的是一个`bundle.js`，虽然相比未打包，确实优化了很多，但是我们这样想，如果你的项目很大，导致最后打包的`js`文件有`1G`多，导致我们用户会看到很长一段时间的白屏（因为 `js`异步加载，页面上没有数据显示，这样的体验非常不好，所以我们可以考虑打包时不将最后的资源打包成为一个js文件，而是分模块，也就是我们说的`Code Splitting`,比如我用户进入页面的时候显示的`Home` ，购物的时候显示的是 `Shopping`,那么我们就可以将这两部分的逻辑拆开，用户点到哪一个部分才去进行加载。

优点：

- 减小初始化的加载体积，提升首屏加载速度
- 提升缓存利用率，修改其他功能模块的代码，只需要重新下载修改过的文件即可，不需要重新下载整个文件
- 并行加载，因为浏览器对同一个域名下的并发请求数量有限制，代码分割可以将代码分散到多个文件中，使浏览器能够并行下载，加快加载速度

#### 12、如何进行代码分割：

**常见的代码分割方法：**

##### 1、**入口点分割 (Entry Point Splitting):**

* **原理:**  为每个页面或入口文件生成独立的 bundle 文件。

* **适用场景:**  多页面应用，例如单页应用的不同路由。

* **webpack 配置示例:**

  ```javascript
  module.exports = {
    // ...
    entry: {
      home: './src/home.js',
      about: './src/about.js',
    },
    output: {
      // ...
      filename: '[name].bundle.js', // 生成 home.bundle.js 和 about.bundle.js
    },
  };
  ```

##### 2、**动态导入 (Dynamic Imports):**

* **原理:** 使用 `import()` 语法动态加载模块，浏览器会在需要时才去加载。

* **适用场景:** 

  *  路由组件懒加载，只在用户访问特定路由时才加载对应组件。
  *  按需加载，例如根据用户操作或条件加载特定功能模块。

* **代码示例:**

  ```javascript
  // 点击按钮时才加载模块
  button.addEventListener('click', () => {
    import('./moduleA').then(module => {
      // 使用 moduleA 中的函数或类
    });
  });
  ```

##### 3、**组件级代码分割:**

* **原理:** 将大型组件拆分成多个小型组件，并使用异步组件或动态导入的方式加载。

* **适用场景:** 

  *  提升代码可维护性。
  *  减少初始加载体积，仅加载用户当前可见的组件。

* **代码示例 (Vue 异步组件):**

  ```javascript
  components: {
    MyComponent: () => import('./MyComponent.vue')
  }
  ```

**代码分割的优势:**

* **加快页面加载速度，提升用户体验。**
* **优化缓存利用率，提升二次访问速度。**
* **提高代码可维护性，更容易管理大型项目。**

希望以上讲解能帮助您理解代码分割的概念和优势！ 😊