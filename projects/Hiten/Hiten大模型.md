### 1.通过vite-plugin-svg-icons插件封装SvgIcon组件

可以参考 [如何封装SvgIcon组件](https://juejin.cn/post/7094060278475653128#heading-2)

在我之前的开发过程中，我们如果使用到了`svg`，我们需要不断重新的去阿里矢量图网站下去将包下载至本地，

这会导致开发过程中再去添加`svg`文件比较困难，所以我们就需要封装一个组件，那么这个组件的最后的作用是什么呢，我们看下面的对比

```javascript
  //这个是没有封装组件前在页面里面使用svg
  <svg :class="svgClass" aria-hidden="true">
    <use :xlink:href="iconName" />
  </svg>

  //下面是封装后在页面里面使用svg
  <svg-icon icon-class="icon-clear"></svg-icon>
  //里面的icon-class是你设置的存放svg文件的位置
```

**下面就看一下是如何封装的呢**

#### 1.首先安装`vite-plugin-svg-icons fast-glob`这两个包

注意，如果是使用 `Js`+ `vue`的话，我们才需要安装 `fast-glob`这个包

#### 2.然后我们需要在 `vue.config.js` 增加这个插件

在 `vite.config.js`文件下面配置

我们先看默认的 `vite.config.js`

```javascript
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
})
```

配置后的

```javascript
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
//由于我们还需要指定需要缓存的图标文件夹，所以我们还需要引入path
import path from 'path'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'  +++

export default defineConfig({
  plugins: [
  	vue(),
    createSvgIconsPlugin({
        iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')], // icon存放的目录
        symbolId: 'icon-[name]', // symbol的id,简单的说就是svg文件命名的格式
        inject: 'body-last', // 插入的位置
        customDomId: '__svg__icons__dom__' // svg的id
    })
  ],
})
```

#### 3.封装`SvgIcon`组件 `src/components/SvgIcon`

```vue
<template>
  <svg :class="svgClass" aria-hidden="true">
    <use :xlink:href="iconName" />
  </svg>
</template>

<script setup lang="ts">
  import { computed } from 'vue'
  const props = defineProps({
    iconClass: {
      type: String,
      required: true
    },
    className: {
      type: String,
      default: () => ''
    }
  })

  const iconName = computed(() => {
    return `#icon-${props.iconClass}`
  })

  const svgClass = computed(() => {
    return props.className ? 'svg-icon ' + props.className : 'svg-icon'
  })
</script>
<style scoped lang="scss">
  .svg-icon {
    fill: currentColor;
  }
</style>
```

#### 4.注册全局组件

将这个组件注册未全局组件，方便在项目的任何位置都可以访问到

```javascript
import SvgIcon from '@/components/SvgIcon/index.vue'
export default (app: any) => {
  app.component('svg-icon', SvgIcon)
}
```

 当然，也可以在main.js里面进行配置

```javascript
import SvgIcon from '@/components/SvgIcon/index.vue'
app.component('svg-icon',svgIcon)
```

#### 5.然后需要在`main.js`进行配置

```javascript
import 'virtual:svg-icons-register'
```

##### `virtual:svg-icons-register`作用和功能

1. **自动注册 SVG 图标**: `virtual:svg-icons-register` 负责扫描指定目录中的所有 SVG 文件，并自动注册这些图标，使它们在项目中可以通过 `<svg-icon>` 组件方便地使用。
2. **生成符号定义**: 该虚拟模块将所有 SVG 图标转换为符号（symbol），并注入到页面中。这样可以通过 `<use>` 元素引用这些符号，达到高效使用 SVG 图标的目的。
3. **简化 SVG 图标管理**: 通过使用 `virtual:svg-icons-register`，开发者不需要手动管理和导入每一个 SVG 图标。只需将 SVG 文件放置在指定目录中，即可自动注册并使用。