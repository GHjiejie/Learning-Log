#### 1、为什么要使用Vue Router?

使用Vue Router 是为了实现前端的单页面应用（SPA)的路由功能，通过管理页面之间的跳转和状态切换，提供更加流畅的用户体验与更加优秀的性能。

他具有很多优点：

- **嵌套路由映射：**实现复杂的路由结构和布局，将页面拆分为多个组件进行模块化开发。
- **动态路由：**根据参数动态生成路由，可以根据条件不同来加载不同的页面。
- **路由守卫：**可以在路由跳转前、跳转后或者路由更新时执行特定的逻辑，比如用户的权限，数据加载等
- 模块化的路由组件配置：可以将路由的配置放在一个单独的文件中，并一并导出
- **自动激活CSS类的链接：**可以根据当前URL参数激活对应模块的CSS样式，不需要去手动设置
- **支持懒加载：**可以在需要时再加载对应的路由组件，优化性能
- .............



#### 2、如何在项目里面引入Vue Router?

- 下载对应的Vue Router 版本 （npm i vue-router)(默认下载是最新版，后面可以添加参数指定版本 )

- 在src目录下面创建routes文件夹（一下只是我的个人习惯，针对与项目复杂度比较高的情况，如果功能很简单，那么就只需要再index.js下面配置即可）

  - 一个index.js文件,配置路由文件的主要入口，需要暴露给main.js

  - 创建需要创建的路由文件夹，比如现在有user与admin两个模块

  - 创建user文件夹，下面创建文件user.config.js，最后将模块暴露出去（export default ......)

    创建admin文件夹，下面创建文件admin.config.js,将文件暴露

  - 在index.js里面引入各种被暴露出来的路由，最后在将index.js暴露，在根目录下的main.js接受

  - 将路由挂载到实例（通常是app)

#### 3、那么如何去创建路由实例？

- 下载vue-router成功后，我们在index.js里面需要导入需要的模块，

  ```javascript
  //createRouter是用于创建路由实例的，可以配置路由信息（按需加载等）、路由导航守卫等
  //createWebHistory 是Vue Router里面创建基于浏览器历史记录的路由模式的函数
  import {createRouter,createWebHistory} from 'vue-router'
  
  //导入需要使用的模块
  import Home from '../views/Home.vue'
  
  //创建具体的实例
  const router=createRouter({
      //使用HTML5的history模式
      history: createWebHistory(),
      //创建具体的路由规则
      routes:[
          {
          path:'/',
          name:'Home',
          component:Home
          },
          {
          path:'/user',
          name:'User',
          //如果是传统的方法化，就是下面的一行代码
          //component:User
          //下面的代码实现按需加载,当路由跳转到这个页面时再加载对应的组件（此时我们就不需要在上面引入User.vue这个组件了）
          component: () => import('../views/User.vue');
  		}
      ]
  });
  //将模块暴露出去,在main.js里面接受
  export default router;
  
  ```

#### 4、如何证明你的配置生效？

在App.vue里面的template里面插入动态渲染路由组件的组件

**<router-view />**

```vue
<template>
    <router-view></router-view>
</template>
```

如果前面的配置都生效，那么你在浏览器输入/user后会显示user.vue里面所要展示的内容

上面的代码会根据用户在浏览器输入的url来动态渲染需要加载的组件，我们也可以手动去实现路由的跳转

我们需要使用组件 <router-link>

```vue
<template>
    <router-link to='/'>首页</router-link>
    <router-link to='user'>去用户首页</router-link>
	//我们点击上面两个链接后会时页面的url发生变化，但是你会发现页面没有实际上的变化，什么原因？？？
	//我们还需要使用动态渲染路由组件的组件
	<router-view></router-view>
	//这个时候你就会发现功能正常实现
</template>
```

#### 5、**<router-link>与<a>的区别在哪里？**

- 主要区别就时使用<router-link>实现的路由跳转不会刷新整个页面，只会更新试图部分；使用<a>标签会刷新这个页面
- 使用<router-link>会方便实现组件的按需加载与预加载，可以优化性能
- 编程式导航，<router-link>支持使用to来指定目标路地址，可以响应式的处理路由的跳转

#### 6、useRouter与useRoute的区别是什么？

**userRouter是用于获取当前的路由实例**，里面暴露了许多方法，包括back() 、forword() 、push()等，可以方便我们进行编程式导航和与其他路由之间进行操作

**useRoute是用于获取当前的路由对象**，包括获取当前页面的路径，查询参数、路由参数等，可以通过实例化这个对象来获取当前路由对象的各种信息，比如我们获取了参数后可以像后台去申请数据等

需要注意的是，如果你在路由规则里面设置的参数为：id,那么你想在组件里面获取id的时候就为

**route.params.id**,不可以写成**route.params.name**或者其他的。

#### 7、什么是嵌套路由？

嵌套路由就是在当前路由下还有子路由，我们可以在配置路由规则的时候实现嵌套路由，比如：

```javascript
routes:[
    {
    path:"parent",
    name:'parent',
    component:()=>import('../views/parent.vue'),
	//由于子路由可能不止一个，所以我们以数组来接受，就和上面的路由规则一样，也是以数组形式来接受的
		children:[
        
        {
        //注意子路由的路径不可以使用绝对路径，即以/开头
        path:'children_1',
        name:'children_1',
        component:()=>import(../views/children_1.vue);
    	},
            
        {
        path:'children_2',
        name:'children_2',
        component:()=>import(../views/children_2.vue);
		}

		]
    }
]
```

此时我们的父组件里面应该也需要添加一些代码来响应子路由对应的组件

```vue
<template>
    <div>
        <h1>
            我是父组件
    </h1>
        //关键点，我们需要添加路由渲染组件来响应子路由的页面数据
        <router-view></router-view>
        //使用上面代码后，你的childern_1.vue或者childern_2.vue的页面才会在parent.vue的页面展示
    </div>
</template>
```

#### 8、什么是编程式导航？

编程式导航就是前端人员通过编写代码来实现路由之间的跳转

使用router.push()就是一个典型的编程式导航

router.push()实现跳转的方式：

- 直接以字符串形式：  router.push('/users/jie');
- 带有路径的对象：router.push({path:'/users/jie'});
- 使用命名路由，携带参数： router.push({name:'users',params:{username:'jie'}});
- 携带查询参数，router.push({path:'/users'},query:{username:'jie'});
- 携带hash

但是我们需要注意一些事项：如果提供了path,params会被忽略，所以总结：**params与path不可以在一起使用**



#### 9、<router-link>与router.push()区别？

<router-link>是声明式导航，他的作用效果更类似于<a>,需要用户来点击后实现路由的跳转

router.push()是编程式导航，在某些事件被触发后会实现自动跳转，比如用户登录后路由跳转到首页

##### 注意：

想要导航到不同的URL,可以使用router.push方法。这个方法会向history栈添加一个记录，所以用户点击浏览器后退按钮时会回到之前的URL。

当我们点击<router-link>后，实际上内部也会调用这个方法，所以你点击浏览器的回退按钮时也会退回到上一个URL 

#### 10、为什么要使用命名路由？

- 提高可读性

- 防止在url中出现打字错误

- 没有硬编码的URL

- 有利于编程式导航的路由跳转

  ```javascript
  //我们在使用router-link时或者使用router.push()时可以使用路由的命名来实现对应的路由跳转
  //比如我在路由规则里面设置了某个路由如下：
  {
  path:'home',
  name:'MyWebHome',
  component:()=>import('../views/home.vue');
  }
  ...
  
  ```

  ```vue
  //我们在其他组件比如user.vue里面可以实现路由跳转
  <router-link to="{name:MyWebHome}"></router-link>
  
  //或者在这个页面直接跳转
  import {useRouter} from 'vue-router';
  
  const router=useRouter();
  
  router.push({name:'MyWebHome'});
  ```

#### 11、为什么要使用命名视图？

我个人认为不必要，可以直接进行组件化开发，使用组件来取代。

#### 12、重定向和别名？

使用redirect 来实现重定向

使用alias来为URL取别名

#### 13、如何理解不同的历史模式？

历史模式有三种（只需要掌握前两个即可）：

- **Hash模式**：这个是vue-router的默认模式，，在Hash模式下，URL的路由信息回被放在URL的Hash部分后（即#后面），但是却不会影响浏览器向服务器发送请求

- **History模式**,在历史模式下，vue-router会使用浏览器的Histroy API来管理路由，而不再依赖URL中的Hash.

  可以让URL变得简单美观，但是却有一个致命的缺陷，可以前进、后退，但是就是不可以实现刷新功能，我们需要在后端进行配置（或者在部署时在服务器上进行配置），否则会返回404，**为什么会这样呢？**

- **Memory模式**:不推荐，Memory 模式不会假定自己处于浏览器环境，因此不会与 URL 交互**也不会自动触发初始导航**。这使得它非常适合 Node 环境和 SSR。它是用 `createMemoryHistory()` 创建的，并且**需要你在调用 `app.use(router)` 之后手动 push 到初始导航**。

#### 14、你如何理解vue-router的导航守卫？

- **全局前置守卫beforEach**：在所有的路由发生改变之前会进行这个方法的调用，可以实现对不同用户的权限管理

- **全局解析守卫beforResolve**

- **全局后置钩子afterEach**：在所有路由切换的时候被调用，可用于在页面切换完成后执行清理工作、记录日志或发送分析数据等操作。

  通常用于处理页面切换后的状态更新或日志记录

- **路由独享守卫**：**beforEnter**：可以使用全局前置与meta来代替，实际使用场景不多

- **组件内的路由：**

  1. **beforeRouteEnter**:在进入路由之前调用

  2. **beforeRouteUpdate**：当前路由改变，但是该组件被复用时调用。

     比如：对于一个有动态参数的路径，/blog/:id,在/blog/1与blog/2之间跳转的时候，由于会渲染同一个组件，因此就说明这个组件会被复用，而这个钩子函数就会在这种情况下被调用。

  3. **beforeRouteLeave**：在页面跳转之前进行一些逻辑操作，比如提醒用户是否保护当前的信息什么的。

#### 15、routerView插槽如何理解（重点）？

使用routerVIew可以实轻松实现路由之间的跳转，如果搭配transition组件与keepAlive组件会实现路由之间的组件过渡

可以使用插槽来判断当前匹配到的组件，注意，router-view会默认传递一个插槽对象，里面有两个属性，**Component**与**route**,可以在vue-router里面的源码看到：

```typescript
/**
 * Component to display the current route the user is at.
 */
export declare const RouterView: new () => {
    $props: AllowedComponentProps & ComponentCustomProps & VNodeProps & RouterViewProps;
    $slots: {
        default?: (({ Component, route, }: {
            //当前匹配到的组件
            Component: VNode;
            //当前的路由实例        
            route: RouteLocationNormalizedLoaded;
        }) => VNode[]) | undefined;
    };
};
```

##### 使用routerView插槽与动态组件来搭配`<Transition>`和`<KeepAlive>`两个vue内置组件来实现路由间的过渡与缓存效果

我们想要实现上面的效果需要注意到以下几点：

- `<router-view>`有默认的插槽，我们需要将其解构，获取匹配到的组件，然后将组件名称传递给`<component :is='Component'>`(动态组件)

  示例代码如下：

  ```vue
  <router-view v-slot={Component}>
      
  	<component :is='Component'></component>
      
  </router-view>
  ```

- 然后为其添加过渡，使用内置组件

  ```vue
  <router-view v-slot={Component}>
      
      <Transition name='fade'>
          
      <component :is='Component'></component>
          
      </Transition>
      
  </router-view>
  
  <style scoped lang='scss'>
  	.fade-enter-from,
      .fade-leave-to{
          opcity:0;
      }
      .fade-enter-active,
      .fade-leave-active{
          transition:opcity 0.5s easy
      }
  </style>
  ```

- 使用组件缓存，但是我们需要注意某些事项：
  - `<KeepAlive>`组件只可以实现组件的数据缓存，不会对单独的html元素（如文本，input框等）进行缓存

  - 使用到这个组件时，我们需要考虑哪些因素会影响到对组件的缓存，我现在只发现一个，就是`<Ttransition>`组件，请看示例代码：

    ```vue
    <router-view v-slot={Component}>
        <KeepAlive>
            
        	<Transition name='fade'>
            
        	<component :is='Component'></component>
            
        	</Transition>
            
        </KeepAlive>
    </router-view>
    
    //此时组件不会被缓存，原因暂时为止
    ```

    正确代码如下：

    ```vue
    <router-view v-slot = '{Component}'>
        
        <Transition name = 'fade'>
                
             <KeepAlive>
                 
        		<component :is='Component'></component>
                 
              </KeepAlive>
                
        </Transition>
          
    </router-view>
    ```

    









