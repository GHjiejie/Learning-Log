#### 1.谈谈你对vue的理解，有什么优缺点？

**Vue.js** 是一款流行的 JavaScript 前端框架，专注于构建用户界面和单页面应用。以下是我对 Vue.js 的理解以及它的优缺点：

**理解：**

1. **简洁易用**：Vue.js 提供简洁直观的 API 和文档，容易上手和学习。
2. **响应式数据绑定**：采用双向数据绑定和虚拟 DOM，实现数据变化时自动更新视图。
3. **组件化**：Vue.js 支持组件化开发，能够将页面拆分成独立可复用的组件，便于管理和维护。
4. **灵活性**：支持通过指令、计算属性、事件处理等方式实现灵活的交互和逻辑处理。

**优点：**

1. **轻量级**：体积小，性能高，加载速度快。
2. **响应式**：数据驱动视图更新，提供了方便的响应式机制。
3. **易学易用**：简单直观的 API 设计，易于上手。
4. **组件化**：支持组件化开发，提高代码复用性。
5. **生态丰富**：有大量的插件和工具支持，社区活跃。

**缺点：**

1. **学习曲线**：对于初学者来说，Vue.js 的一些概念如组件化和路由可能需要一定时间理解。
2. **中小型项目更适合**：在大型复杂项目中可能会因为管理状态较为复杂而显得不够优雅。
3. **灵活性降低**：相比于 React，Vue.js 在某些高度自定义需求下的灵活性略显不足。

总的来说，Vue.js 作为一个现代化、灵活、易用的前端框架，在中小型项目和快速原型开发中表现出色，但在复杂大型项目中可能需要更多的规划和设计来保证项目的可维护性和扩展性。Vue.js 的优势在于其简洁性、响应式数据绑定和组件化开发，使得前端开发更加高效和愉悦。

#### 2、什么是虚拟DOM?



#### 3、描述一下Vue的生命周期有哪些？分别做了什么事情？



#### 4、谈谈你对Vue-Router的理解？



#### 5、你如何理解vue的插槽？

插槽是一种非常强大且灵活的机制，用于在父组件中定义可重用的子组件的内容。插槽允许我们将子组件的内容插入到父组件的指定的位置，从而实现更加灵活和可定制化的组件设计。

- **默认插槽**：v-slot:default或者#default,但是我们通常不写

- **具名插槽**：使用v-slot:name或者#name来接受具有命名的插槽

- **作用域插槽**（重要）：作用域插槽允许子组件向父组件传递数据或方法，并在父组件中使用。通过作用域插槽，父组件可以访问从子组件传递过来的数据。

  如何使用呢？

  我们可以像对组件传递props一样，像一个插槽的出口传递attributes

  但是我们的插槽有两种类型，默认插槽和具名插槽，父组件在接受子组件传递的数据时会有差别

  1. 默认插槽：

     ```vue
     //1->可以在组件名上使用v-slot指令接收，规范使用slotProps,这个属性是一个对象，所以我们也可以使用解构语法将里面的数据提取出来
     //2->也可以为默认插槽显示使用一个template标签（推荐,因为这样就不容易与具名插槽弄混）
     
     //父组件 parent.vue
     <template>
     	<div>
         
     		<template v-slot="slotProps">
         //上面说了slotProps是一个对象，所以现在我们拿到的值实际上是{ data : "Hello World" }
     		{{slotProps.data}}
     		</template>
     
        </div>
     </template>
     //或者我们可以解构,效果和上面的是一样的
     <template v-slot="{data}">
     	{{data}}
     </template>  
     
     
     //子组件child.vue
     <template>
      <div>
         <slot :data='childMsg'></slot>
      </div>
     </template>
     <script setup>
     import {ref} from 'vue'
     const childMsg=ref('Hello World');
     </script>
     
     
     
     ```

  2. 具名插槽

     ```vue
     //如果同时使用了默认插槽和具名插槽，我们需要为默认插槽使用显示的<template>标签
     尝试直接为组件添加v-slot指令将导致编译错误，这是为了避免因默认插槽的props的作用域带来的困惑
     
     //所以结论：全部显示使用template标签
     
     <!-- 该模板无法编译 -->
     <template>
       <MyComponent v-slot="{ message }">
         <p>{{ message }}</p>
         <template #footer>
           <!-- message 属于默认插槽，此处不可用 -->
           <p>{{ message }}</p>
         </template>
       </MyComponent>
     </template>
     
     
     //正确代码
     <template>
       <MyComponent>
         <!-- 使用显式的默认插槽 -->
         <template #default="{ message }">
           <p>{{ message }}</p>
         </template>
     
         <template #footer>
           <p>Here's some contact info</p>
         </template>
       </MyComponent>
     </template>
     
     //具名插槽获取子组件的数据与使用默认插槽时是相同的
     

     ```
     
     

- **动态插槽**

#### 6、Transition组件如何理解？

vue提供了两个内置组件，帮助你制作基于状态变化的过渡和动画

<Transition>会在一个元素或组件进入和离开DOM时应用动画

<TransitionGroup>会在一个v-for列表中的元素或组件被插入、移动或者移除时的应用动画

这里先只说<Transition>

我们通常为过渡效果命名（传一个 `name` prop 来声明一个过渡效果名），这样元素过渡的class会以其名字而不是v作为前缀。

**需要注意的是：`<Transition>`会将过渡效果传递到元素的根元素上，还是那句话，一个组件最多使用一个根元素，这个是规范，如果使用多个div包裹元素，会是当前的`<Transition>`组件传递的过渡效果失效**

```vue
//下面是一个默认的过渡类名

<Transition> 
...
</Transition>

<style>
	.v-enter-from,
    .v-leave-to{
        opcity:0
    };
    .v-enter-active,
    .v-leave-active{
       transition: opcity 0.5s ease;
    };
    
</style>
```

#### 7、TransitionGroup组件如何理解？

会在一个**v-for列表**中的元素或组件被插入、移动或者移除时的应用动画

#### 8、如何理解keepAlive组件？

keepAlive是一个内置组件，他的功能是在多个组件动态切换时缓存被移除的组件实例

##### **包含与排除**：

由于keepAlive组件是默认缓存所有的组件实例，但是我们可以通过include与exclude 来定制这种行为，

这两个prop的值可以是一个**英文逗号分隔的字符串**，也可以是**正则表达式**，也可以是**数组**。

```vue
<!-- 以英文逗号分隔的字符串 -->
<KeepAlive include="a,b">
  <component :is="view" />
</KeepAlive>

<!-- 正则表达式 (需使用 `v-bind`) -->
<KeepAlive :include="/a|b/">
  <component :is="view" />
</KeepAlive>

<!-- 数组 (需使用 `v-bind`) -->
<KeepAlive :include="['a', 'b']">
  <component :is="view" />
</KeepAlive>
```

##### 最大缓存实例：

我们的**缓存也有最大数**，使用max (`prop`) 来限制可被缓存的最大实例数

```vue
<KeepAlive :max="10">
  <component :is="activeComponent" />
</KeepAlive>
```

##### 缓存实例的生命周期

当一个组件实例从 DOM 上移除但因为被 `<KeepAlive>` 缓存而仍作为组件树的一部分时，它将变为**不活跃**状态而不是被卸载。当一个组件实例作为缓存树的一部分插入到 DOM 中时，它将重新**被激活**。

`onActivated()`与`onDeactivated()`

```vue
<script setup>
import { onActivated, onDeactivated } from 'vue'

onActivated(() => {
  // 调用时机为首次挂载
  // 以及每次从缓存中被重新插入时
})

onDeactivated(() => {
  // 在从 DOM 上移除、进入缓存
  // 以及组件卸载时调用
})
</script>
```

注意：使用了`<KeepAlive>`组件后在切换组件时不会触发生命周期的`onbeforeUnmount()`与`onUnmount()`

#### 9、谈谈你对vue生命周期的理解？

下面是vue官方文档

[生命周期钩子 | Vue.js (vuejs.org)](https://cn.vuejs.org/guide/essentials/lifecycle.html)

**beforeCreate**:在实例初始化之后，数据观察和事件监听之前调用。但是此时组件实例（data,methods)还不可以使用。

**created:**组件实例挂载完成，可以获得到data里面的值和methods里面的事件。

**boforeMount:**对dom进行预处理，此时模板已经被编译为渲染函数，但是还没有挂载到dom上，所以此时访问不了dom，但是我们可以进行一些数据的获取，因为我们可以访问到我们设置的数据变量，在这个里面获取数据可以防止页面渲染时的白屏事时间。

**mounted:**dom挂载完成，组件可以在页面呈现，可以访问并操作dom元素。

**beforeUpdate:**组件视图发生变化，导致视图需要更新之前调用，在此阶段，你可以获取更新之前的dom状态，对新数据进行预处理。

**updated**:在组件重新渲染并应用更新后立即调用，此时dom已经完成更新。

**beforeUnmount**:在组件实例销毁之前调用。此阶段组件实例仍然完全正常，可以做一些副作用的清除（消除定时器）。

**unmounted**:在组件实例化销毁完成之后调用。此阶段，组件的所有绑定事件被移除，子组件销毁

需要注意的是，在vue3里面作者增加了一些新钩子，也取消了一些钩子函数，比如作者将

beforeCreate与created钩子取消，使用vue3的setup()取代，所以判断以下代码输出什么？

```vue
<template>
  <div>
    <h1>Life Time</h1>
    <button @click="change">点击修改值</button>
    <p>count: {{ count }}</p>
  </div>
</template>
<script setup>
import {onBeforeMount,onMounted,onBeforeUpdate,onUpdated,onBeforeUnmount,onUnmounted} from 'vue';
import { ref } from 'vue';
const count=ref(666);
console.log('尝试获取数据元素'+count.value);//666
console.log('尝试获取dom节点'+document.querySelector('h1'));// null
    
const change=()=>{
  count.value++;
}

let prevCount = ref(count.value);


onBeforeMount(()=>{
console.log('dom还未挂载到页面上，所以这里获取不到dom元素');
// 尝试获取dom元素
console.log(document.querySelector('h1'));// null
console.log('count:',count.value);
 
});

 onMounted(()=>{
   console.log('dom已经挂载到页面上，所以这里可以获取到dom元素');
     console.log(document.querySelector('h1'));// 
 });

 onBeforeUpdate(()=>{
   // 拿到更新前的值
 console.log(prevCount.value);

   console.log('该组件的值即将更新');
   console.log('count:',count.value); // 确认组件的值是否更新
//   // 确认组件的值是否更新
    prevCount.value = count.value; 
     
 });

 onUpdated(()=>{
   console.log('组件的值已经更新')
 });

</script>

//输出的结果如下：
尝试获取数据元素666
尝试获取dom节点null
dom还未挂载到页面上，所以这里获取不到dom元素
null
count: 666
dom已经挂载到页面上，所以这里可以获取到dom元素
`<h1>Life Time</h1>`
```

由上面的输出顺序可以发现，在setup（）里面的数据会比onBeforeMount里面优先输出，这就证实了我们的猜想。**也就是说，vue2里面在beforeCreate和created生命周期里面写的代码可以直接在vue3的setup中书写。**



#### 10、在各个生命周期里面应该做些什么？

由于我们使用的是vue3,我们最好是在**onBeforeMount生命周期去获取一些异步数据**，（原因：如果在onMounted生命周期去获取，数据量比较大的情况下会导致页面白屏）



#### 11、你对计算属性的理解？

- **依赖追踪：** 计算属性会自动追踪其依赖的数据，只有当依赖的数据发生变化时才会重新计算。
- **缓存：** 计算属性的值会被缓存，避免重复计算，提高性能。
- **响应式：** 当依赖的数据发生变化时，计算属性会自动更新，并触发组件的重新渲染。
- **可读性：** 计算属性可以使代码更加简洁易懂，将复杂逻辑封装在计算属性中，避免模板过于臃肿。



#### 12、vue如何实现组件之间的通信？

##### 父子组件之间的通信

- prop :实现父组件对子组件的数据传递，我们在子组件接收的时候最好显示定义数据类型（Prop效验）

  ```vue
  //实现思路：
  1->在父组件上通过v-bind绑定一个响应式的数据，传递给子组件
  2->子组件通过defineProps接受父组件传递的数据
  
  parent.vue代码
  
  <template>
  
  //可以为子组件传递多个值，我们需要在子组件的props里面接受就好
  
  <child :msg='parent_msg'></child>
  
  </template>
  
  <script setup>
  	import child from './child.vue'
      import {reactive} from 'vue'
      const parent_msg=reactive({
          name:'jie',
          age:18,
          phone:123456789,
          hobbies:['basketball','football']
      });
  </script>
  
  ```

  由于我们为子组件绑定了一个变量，在子组件我们需要使用vue提供的API来接受变量里面的值，我们需要使用到`defineProps`,请看以下代码：

  ```vue
  <template>
  //遵守规范，只使用一个根节点
  	<div>
      <h1>
          我是子组件
      </h1>
      <p>
        {{props.msg.name}}
        {{props.msg.age}}
      </p>
      </div>
  </template>
  
  <script setup>
  	import {defineProps} from 'vue'
      const props=defineProps({
  		//这里的属性父组件绑定到子组件时使用的属性名，上面是msg,所以这里就是msg
          msg:Object
      });
  </script>
  ```

  

- event：因为数据的传递时单向的（单向数据流原则，否则数据乱套了），但是我们可以使用API来进行子组件对父组件的消息传递（这种方法我们称之为自定义事件），请看以下代码：

  ```vue
  //父组件parent.vue
  <template>
  	<div>
      
  		<child @test1='mothodsFormChild1' @test2='mothodsFormChild2'></child>
          
      </div>
  
  </template>
  <script setup>
      
  import child from './child.vue'
      
      
      const mothodsFormChild1=(data)=>{
          console.log(data);//我是test1
      }
      
      const mothodsFormChild2=(data)=>{
          console.log(data);//我是test2
      }
      
  </script>
  
  //子组件
  
  <template>
     <div>
      
      </div>
  </template>
  
  <script setup>
  import {defineEmits} from 'vue'
      
      //定义方法,在父组件里面需要自定义方法（方法名与下面数组里面的方法名对应）来接收
     const emits=definEmits(['test1','test2']);
      
     //向父组件传递数据
     emits('test1','我是test1');
      
     emits('test2','我是test2');
      
  </script>
  ```

- slot：使用插槽实现组件之前的通信上面已经讲过（父组件获取子组件的数据）

- style和class（原理就是透传，可以直接略过）:实现父子组件之间的样式传递，会传递到子组件的根元素上（规范的话我们声明每一个组件时只允许有一个根元素，如果设置了多个`<div>`，那么就会失效，因为我不知道样式要传递到哪个根元素身上(下面讲到的**attributes**会讲解决办法）

  ```vue
  //父组件parent.vue
  <template>
  	<child class='parnetStyle' @click='handleClick'></child>
  </template>
  
  <script setup>
  	import child from './child.vue'
      
      const handleClick=()=>{
          console.log('我竟然被点击了')
      }
  </script>
  
  <style scoped lang='scss'>
      .parnetStyle{
          width:200px;
          height:200px;
          background-color:red;
      }
  </style>
  
  //子组件child.vue
  
  <template>
  	//注意只需要一个根元素
  	<div>
        <button>点击我试试看</button>
          <p>点击我可以触发父组件上的事件吗</p>
      </div>
  	//不要再出现其他div了
  </template>
  
  
  //此时子组件会被渲染为<div class='parnetStyle'></div>
   
  //提问:如果子组件也设置了parentStyle样式，那么根元素的样式会使用父组件的样式还是当前的样式？？?
  经过测试后发现当前的样式会覆盖父组件传递的样式
  ```

- `attribute`:这个是透传，可以透传样式，事件等

  样式之间的透传我们已经实现了，问题:样式会不会传递到孙子组件甚至更远，经过测试后**发现可以**，那么我可以不让他透传吗？

  可以，我们**需要禁用Attributes继承**

  ```vue
  
  <script setup>
  import {defineOptions} from 'vue'
  defineOptions({
     //禁止属性透传
    inheritAttrs: false
  })
  // ...setup 逻辑
  </script>
  
  ```

  问题：方法的透传如何理解？

  当我们为组件注册事件后，事件会绑定在这个组件上，也就是**这个组件里面的所有元素都可以触发父组件里面的事件**。

-  那么现在解决上面的疑问：多根节点的Attributes继承问题？

  ```vue
  //子组件如下Child.vue
  <template>
  
  	<header >...</header>
  
  	<main>...</main>
  
  	<footer>...</footer>
  
  </template>
  
  //现在代码有三个根节点,那么父节点的样式和事件如何继承？
  //父节点Parent.vue
  <template>
  	<Child style="color:red" class='parentStyle'></Child>
  </template>
  
  此时浏览器会报错:Extraneous non-props attributes (style, class) were passed to component but could not be automatically inherited because component renders fragment or text root nodes. (无关的非 props 属性（样式、类）被传递给组件，但无法自动继承，因为组件渲染片段或文本根节点。)
  
  //解决方法，显示绑定,使用v-bind:"$attrs",
  把上面的代码<header >...</header>修改为<header v-bind="$attrs">...</header>，就不会报错了
  
  ```

- $parent与$children(不建议)
- v-model

##### 跨组件之间的通信

- `provide`与`inject`

  `provide`:提供一个值，可以被后代注入

  接收参数provide(key,value)      key可以是字符串，也可以是Symbol值

  `inject`:接收一个参数，有由provide暴露的key

  使用inject(key)，讲provide提供的数据value获取

- `vuex`：vue2推荐使用的状态管理库

- `pinia`：vue3推荐使用的状态管理库

- `router`：路由之间的通信

#### 13、如何看待虚拟DOM?

- 什么是虚拟dom，虚拟dom实际上就是一个js对象，用于描述视图的界面结构

  在vue中，，欸一个组件都有一个render()函数，,在编译阶段，模板会被编译器编译为渲染函数（render()),每一个render()函数执行后都会返回一个虚拟dom,也就是说，每一个组件都有一个虚拟dom树

- 为什么要有虚拟dom：在vue里面，渲染视图会使用到render()函数，这种渲染不仅仅只发生在组件刚刚创建时，视图依赖的数据发生变化时，也会发生视图的重新渲染。

  在使用真实dom时，当视图依赖的数据发生变化时，浏览器会重新渲染整个的dom树，会极大的影响页面的性能，但是当我们使用虚拟dom时，浏览器会先根据虚拟dom来生成一个真实的dom树，当视图上的数据发生变化时，浏览器不会根据真实dom树去重新渲染页面，而是会有一个新的虚拟dom生成，那么整个新生成的虚拟dom会和之前的旧的虚拟dom进行比对（diff算法)，找到数据变化的点，只更新发生变化的地方，然后再去替换真实dom,以此来最大程度的去减少页面的重绘和重拍，提升页面的性能。

#### 14、vue3如何实现优化的（对比与vue2)？

**静态提升，事件缓存，基于proxy的响应式对象**

- 静态提升

  一些静态节点没有必要在vue重新渲染时再次创建和对比他们。

  vue编译器会在预编译阶段会自动的提升这部分的vnode创建函数到这个模板的渲染函数之外，并且在每次渲染时都使用这份相同的vnode,渲染器会知道新旧vnode在这部分是完全相同的，所以会直接跳过他们的差异对比。

  

- 更新类型标记（PacthFlag)

  在为元素生成渲染函数时，Vue的vnode的创建中直接编码了每个元素所需的更新类型，一个元素可以有多个更新类型标记，最终会被合并为一个数字，那么在运行时渲染器也将会使用位运算来检查这些标记，确定相应的更新操作，因为位运算检查是非常快的，通过这样的更新类型标记，Vue可以在更新带有动态绑定的元素时做最少的操作。

  官方代码如下（经过个人解释）：

  ```vue
  export const enum PatchFlags {
    
    TEXT = 1,// 1 动态的文本节点
    CLASS = 1 << 1,  // 2 动态的 class
    STYLE = 1 << 2,  // 4 动态的 style
    PROPS = 1 << 3,  // 8 动态属性，不包括类名和样式
    FULL_PROPS = 1 << 4,  // 16 动态 key，当 key 变化时需要完整的 diff 算法做比较
    HYDRATE_EVENTS = 1 << 5,  // 32 表示带有事件监听器的节点
    STABLE_FRAGMENT = 1 << 6,   // 64 一个不会改变子节点顺序的 Fragment
    KEYED_FRAGMENT = 1 << 7, // 128 带有 key 属性的 Fragment
    UNKEYED_FRAGMENT = 1 << 8, // 256 子节点没有 key 的 Fragment
    NEED_PATCH = 1 << 9,   // 512  表示只需要non-props修补的元素 (non-props不知道怎么翻才恰当~)
    DYNAMIC_SLOTS = 1 << 10,  // 1024 动态的solt
    DEV_ROOT_FRAGMENT = 1 << 11, //2048 表示仅因为用户在模板的根级别放置注释而创建的片段。 这是一个仅用于开发的标志，因为注释在生产中被剥离。
   
    //以下两个是特殊标记
    HOISTED = -1,  // 表示已提升的静态vnode,更新时调过整个子树
    BAIL = -2 // 指示差异算法应该退出优化模式
  }
  ```

  

- 树结构打平

  理解区块概念：内部结构是稳定的一个部分可被称之为一个区块。

  每一个块都会追踪其所有带有更新标记的后代节点，比如：

  ```vue
  <div> <!-- root block -->
    <div>...</div>         <!-- 不会追踪 -->
    <div :id="id"></div>   <!-- 要追踪 -->
    <div>                  <!-- 不会追踪 -->
      <div>{{ bar }}</div> <!-- 要追踪 -->
    </div>
  </div>
  ```

  编译结果会被打平为一个数组，仅包含所有动态的后代节点：

  ```vue
  div (block root)
  
  - div 带有 :id 绑定
  - div 带有 {{ bar }} 绑定
  ```

  当这个组件需要渲染时，只需要遍历这个打平的树而不是整颗树，也就是我们说的树结构打平，这大大减少了我们在虚拟dom协调时需要遍历的节点数量。模板中的任何静态部分都会被高效的略过。

  **需要注意的是**：v-if和v-for指令会创建新的区块节点

- 对SSR激活的影响

#### 补充

## Vue 3 性能优化对比 Vue 2

Vue 3 在多个方面进行了优化，显著提升了性能和开发体验。以下是 Vue 3 相比 Vue 2 的一些关键优化点：

**1. 编译器优化**

- **静态提升：** Vue 3 编译器会静态分析模板，将静态内容提升到渲染函数之外，减少运行时开销。
- **树状结构优化：** Vue 3 使用更轻量级的虚拟 DOM 实现，并优化了虚拟 DOM 的 diff 算法，提高了更新性能。
- **事件缓存：** Vue 3 会缓存事件监听器，避免重复创建和销毁，提高事件处理效率。

**2. 响应式系统优化**

- **Proxy：** Vue 3 使用 Proxy 代替 Object.defineProperty 实现数据响应式，可以监听更多数据变化，并支持数组的变更检测。
- **依赖追踪优化：** Vue 3 使用更细粒度的依赖追踪机制，可以更精确地追踪数据变化，减少不必要的更新。

**3. 生命周期钩子优化**

- **Composition API：** Vue 3 引入了 Composition API，可以更好地组织代码，避免生命周期钩子嵌套过深，提高代码可读性和可维护性。
- **更灵活的生命周期钩子：** Vue 3 提供了更多生命周期钩子，例如 `onBeforeMount`、`onMounted`、`onBeforeUpdate`、`onUpdated` 等，可以更精细地控制组件的生命周期。

**4. 其他优化**

- **更小的包体积：** Vue 3 的核心库更小，可以更快地加载和解析。
- **TypeScript 支持：** Vue 3 对 TypeScript 提供了更好的支持，可以提高代码的类型安全性和可维护性。
- **更好的性能：** Vue 3 的整体性能比 Vue 2 有显著提升，包括渲染速度、更新速度和内存占用等方面。

### Vue 3 性能优化示例

**1. 静态提升**

```
html复制代码运行<template>
  <div>
    <h1>{{ title }}</h1>
    <p>{{ content }}</p>
  </div>
</template>
```

在 Vue 2 中，`<h1>` 和 `<p>` 元素会被视为动态内容，每次数据变化时都会重新渲染。在 Vue 3 中，编译器会将它们识别为静态内容，并提升到渲染函数之外，从而减少不必要的更新。

**2. 依赖追踪优化**

```
javascript复制代码export default {
  computed: {
    filteredList() {
      return this.list.filter(item => item.active);
    },
  },
};
```

在 Vue 2 中，当 `list` 数组发生变化时，`filteredList` 计算属性会重新计算，即使只有 `active` 属性发生变化。在 Vue 3 中，依赖追踪机制可以更精确地追踪 `active` 属性的变化，只有当 `active` 属性发生变化的元素才会触发 `filteredList` 的重新计算。

### 总结

Vue 3 在多个方面进行了优化，显著提升了性能和开发体验。使用 Vue 3 可以构建更快速、更流畅、更易于维护的 Web 应用程序。

##### 15、谈谈你对响应式原理的理解？

vue3将原始对象转换为响应式对象可以使用reactive或者ref包裹，那么其实现的原理大致相同：其中涉及到一些核心组件



## 16、watch 和 computed 的区别

`watch` 和 `computed` 都是 Vue.js 中用于处理响应式数据的工具，但它们的使用场景和工作方式有所不同：

**computed (计算属性):**

- **目的：** 基于响应式数据计算出一个新的值，并进行缓存。
- **触发时机：** 当依赖的响应式数据发生变化时自动更新。
- **返回值：** 计算结果。
- **缓存：** 计算结果会被缓存，只有在依赖的数据发生变化时才会重新计算，提高性能。
- 适用场景：
  - **格式化数据：** 例如，将日期格式化成特定的字符串格式，或将数字格式化成货币格式。
  - **组合数据：** 例如，将多个数据属性组合成一个新的值。
  - **过滤数据：** 例如，根据条件过滤出一个数组的子集。
  - **其他复杂逻辑：** 例如，根据数据计算出一个值。

**watch (侦听器):**

- **目的：** 监听响应式数据的变化，并执行相应的操作。
- **触发时机：** 当监听的响应式数据发生变化时触发。
- **返回值：** 无返回值。
- **缓存：** 不进行缓存，每次数据变化都会执行回调函数。
- 适用场景：
  - **执行异步操作：** 例如，当数据变化时发送网络请求或执行动画。
  - **执行副作用：** 例如，当数据变化时修改 DOM 或更新其他组件的状态。
  - **监听复杂数据类型：** 例如，监听数组或对象的深度变化。

## 18、v-for 没有 key 的后果

在 Vue.js 中，使用 `v-for` 指令循环渲染列表时，强烈建议为每个列表项添加唯一的 `key` 属性。如果没有 `key`，可能会导致以下问题：

**1. 性能问题：**

- **DOM 操作效率低下：** Vue 使用 `key` 来识别列表项，以便在数据变化时进行更高效的 DOM 更新。如果没有 `key`，Vue 会被迫使用一种更慢的算法，可能导致不必要的 DOM 操作，影响性能。
- **状态混乱：** 当列表项的顺序发生变化或有新项插入时，如果没有 `key`，Vue 可能会复用已存在的 DOM 元素，导致状态混乱，例如表单元素的值或组件的状态可能无法正确更新。

**2. 组件状态问题：**

- **组件状态不稳定：** 对于包含状态的组件，如果没有 `key`，Vue 可能会复用已存在的组件实例，导致组件状态不稳定。例如，一个包含输入框的组件，输入框的值可能会在列表项顺序变化时出现错误。

**3. 渲染错误：**

- 在某些情况下，例如使用 `<transition-group>` 进行列表动画时，如果没有 `key`，可能会导致渲染错误或动画效果不正确。

**最佳实践：**

- **始终为 `v-for` 添加 `key`：** 这是 Vue.js 官方推荐的最佳实践，可以避免上述问题，并提高性能和代码可维护性。
- **使用唯一且稳定的值作为 `key`：** 理想情况下，`key` 应该是唯一且稳定的，例如数据库 ID 或其他不会改变的标识符。
- **避免使用索引作为 `key`：** 索引值可能会在列表项顺序变化或插入新项时发生改变，导致状态混乱。

**总结：**

在使用 `v-for` 循环渲染列表时，添加 `key` 属性非常重要，可以避免性能问题、状态混乱和渲染错误。始终为 `v-for` 添加 `key` 是 Vue.js 开发的最佳实践。



## 19、Vue 双向绑定的原理

Vue.js 的双向绑定是指数据变化会自动更新视图，视图变化也会自动更新数据。这种机制使得开发者可以更方便地处理数据和视图之间的交互。

### 双向绑定实现原理

Vue.js 的双向绑定主要通过以下几个步骤实现：

**1. 数据劫持：**

- **Object.defineProperty()：** 在 Vue 2 中，使用 `Object.defineProperty()` 方法劫持数据对象的属性，为每个属性添加 getter 和 setter。当属性值发生变化时，setter 会触发通知，更新视图。
- **Proxy：** 在 Vue 3 中，使用 `Proxy` 代理数据对象，可以监听更多数据变化，例如属性的添加、删除和数组的变更。

**2. 发布-订阅模式：**

- Vue.js 使用发布-订阅模式来实现数据变化的通知。
- 当数据发生变化时，会发布一个事件。
- 订阅了该事件的组件会收到通知，并更新视图。

**3. 编译器：**

- Vue.js 的编译器会将模板编译成渲染函数。
- 渲染函数会将数据渲染成虚拟 DOM。
- 当数据发生变化时，虚拟 DOM 会重新渲染，并与之前的虚拟 DOM 进行比较，找出差异，然后更新真实 DOM。

**4. 观察者模式：**

- Vue.js 使用观察者模式来监听数据的变化。
- 每个组件实例都有一个观察者实例，它会监听组件数据和计算属性的变化。
- 当数据或计算属性发生变化时，观察者会通知组件重新渲染。

### 双向绑定的流程

1. **数据初始化：** 当组件初始化时，Vue 会遍历 data 中的数据，并使用 `Object.defineProperty()` 或 `Proxy` 对其进行劫持。
2. **模板编译：** Vue 会将模板编译成渲染函数，其中包含了数据绑定表达式。
3. **数据监听：** 每个组件实例都有一个观察者实例，它会监听组件数据和计算属性的变化。
4. **数据变化：** 当数据发生变化时，setter 会触发通知，观察者会收到通知。
5. **视图更新：** 观察者会通知组件重新渲染，生成新的虚拟 DOM，并与之前的虚拟 DOM 进行比较，找出差异，然后更新真实 DOM。
6. **视图变化：** 当用户在视图中进行操作时，例如输入文本或点击按钮，会触发相应的事件，更新组件的数据。
7. **数据更新：** 数据的变化会再次触发步骤 4，导致视图更新。

### 双向绑定的优点

- **简化开发：** 开发者可以专注于数据，而不用手动操作 DOM，提高开发效率。
- **提高可维护性：** 数据和视图之间的关系更加清晰，代码更容易维护。
- **响应式更新：** 数据变化会自动更新视图，提升用户体验。

### 双向绑定的缺点

- **性能问题：** 过多的数据绑定可能会影响性能，尤其是在大型应用程序中。
- **调试困难：** 双向绑定机制比较复杂，调试起来可能比较困难。

### 总结

Vue.js 的双向绑定是其核心特性之一，它通过数据劫持、发布-订阅模式、编译器和观察者模式来实现。双向绑定机制简化了开发，提高了可维护性，并提升了用户体验。

## 20、Vue 3 中 ref 与 reactive 的区别

在 Vue 3 中，`ref` 和 `reactive` 都是用于创建响应式数据的 API，但它们的使用场景和工作方式有所不同：

**ref：**

- **用途：** 用于创建单个值的响应式引用。可以是原始类型（例如数字、字符串、布尔值）或对象。
- **返回值：** 一个 ref 对象，包含 `.value` 属性来访问或修改值。
- **工作原理：** ref 内部使用Object.defineProperty()来实现数据的响应式。
- 使用场景：
  - **模板中：** 可以直接在模板中使用 `{{ refVar.value }}` 来访问 ref 的值。
  - **响应式计算：** 可以将 ref 作为依赖项用于计算属性或 `watch` 侦听器。
  - **传递参数：** 可以将 ref 传递给子组件或函数。

**reactive：**

- **用途：** 用于创建深层响应式对象或数组。
- **返回值：** 一个代理对象，可以像普通对象一样使用，但其属性是响应式的。
- **工作原理：** reactive 内部使用 Proxy 来拦截属性访问，追踪依赖并触发更新。
- 使用场景：
  - **存储复杂数据结构：** 例如对象或数组，需要对其属性进行深度监听。
  - **组件状态：** 通常用于存储组件的状态数据。

注意：

- **reactive里面是可以有嵌套ref的，因为reactive里面会有方法（isRef()方法）去判断他是否是ref，如果是，就会实现一个拆包**

- **ref里面也可以对一个对象实现响应式，首先会判断是否是一个对象，如果是，将返回代理的对象，用户访问时，将返回这个代理对象。**
- **reactive里面的值解构后会丧失响应式，所以我们可以在reactive里面去使用ref去包装数据，**

## 21、Vue 响应式原理

Vue.js 的响应式系统是其核心特性之一，它使得数据变化能够自动更新视图，而无需手动操作 DOM。Vue 的响应式原理主要涉及以下几个关键概念：

**1. 数据劫持 (Data Observation):**

- **Vue 2:** 使用 `Object.defineProperty()` 方法劫持数据对象的属性，为每个属性添加 getter 和 setter。当属性值发生变化时，setter 会触发通知，更新视图。
- **Vue 3:** 使用 `Proxy` 代理数据对象，可以监听更多数据变化，例如属性的添加、删除和数组的变更。

**2. 依赖追踪 (Dependency Tracking):**

- Vue 会追踪哪些组件或计算属性依赖于哪些数据。当数据发生变化时，Vue 会通知依赖于该数据的组件或计算属性进行更新。
- 依赖追踪的实现方式：
  - **Vue 2:** 使用 `Dep` 对象来管理依赖关系，每个数据属性都有一个对应的 `Dep` 实例，用于存储依赖于该属性的 watcher。
  - **Vue 3:** 使用 `effect` 和 `track` 函数来追踪依赖关系，当读取响应式数据时，会将当前活跃的 effect 记录为依赖。

**3. 响应式更新 (Reactive Updates):**

- 当数据发生变化时，Vue 会通知依赖于该数据的组件或计算属性进行更新。
- 更新过程：
  - **Vue 2:** 触发 setter，通知 `Dep` 实例，`Dep` 实例通知所有 watcher 进行更新。
  - **Vue 3:** 触发 `trigger` 函数，通知所有依赖于该数据的 effect 进行重新执行。

**4. 虚拟 DOM (Virtual DOM):**

- Vue 使用虚拟 DOM 来优化 DOM 操作，提高渲染性能。
- 虚拟 DOM 是一个轻量级的 JavaScript 对象，用于表示真实 DOM 的结构和状态。
- 当数据发生变化时，Vue 会先更新虚拟 DOM，然后将虚拟 DOM 与真实 DOM 进行比较，找出差异，并只更新需要更新的部分，从而减少 DOM 操作。

**响应式流程：**

1. **数据劫持：** Vue 使用 `Object.defineProperty()` 或 `Proxy` 对数据进行劫持，以便监听数据变化。
2. **依赖收集：** 当组件或计算属性访问数据时，Vue 会追踪依赖关系，将当前活跃的 watcher 或 effect 记录下来。
3. **数据变化：** 当数据发生变化时，Vue 会触发 setter 或 `trigger` 函数，通知所有依赖于该数据的 watcher 或 effect。
4. **视图更新：** watcher 或 effect 会重新执行，并更新虚拟 DOM。
5. **DOM 更新：** Vue 会将新的虚拟 DOM 与旧的虚拟 DOM 进行比较，找出差异，并只更新需要更新的部分，从而更新真实 DOM。

**总结：**

Vue 的响应式系统通过数据劫持、依赖追踪和响应式更新来实现数据变化自动更新视图的效果。虚拟 DOM 作为优化工具，进一步提高了渲染性能。理解 Vue 的响应式原理可以帮助开发者更好地理解 Vue 的工作机制，并编写更高效、可维护的代码。

#### 22、v-if和v-for的优先级？

vue2时，v-for的优先级会高于v-if。

vue3时，v-if的优先级会高于v-for。



## 23、Vue 双向绑定原理

Vue.js 的双向绑定机制是其核心功能之一，它允许数据和视图之间保持同步，修改其中一方会自动更新另一方。这个机制的核心是 **数据劫持** 和 **发布-订阅模式**。

**1. 数据劫持**

Vue.js 利用了 ES5 的 Object.defineProperty() 方法来劫持数据的 getter 和 setter。当访问或修改数据时，Vue.js 就会触发相应的回调函数，从而实现对数据的监控。

**2. 发布-订阅模式**

Vue.js 内部维护了一个 **订阅者-发布者** 的关系。当数据发生变化时，发布者会通知所有订阅者，订阅者收到通知后会更新相应的视图。

**具体实现步骤：**

1. **Observer (观察者):** 遍历 data 对象的所有属性，使用 Object.defineProperty() 将它们转换为 getter/setter，从而实现数据劫持。
2. **Dep (依赖):** 每个属性都有一个对应的 Dep 实例，用于收集依赖这个属性的订阅者 (Watcher)。
3. **Watcher (订阅者):** 负责监听数据的变化并更新视图。每个指令或表达式都会创建一个 Watcher 实例，它会将自己添加到 Dep 中，从而订阅数据的变化。
4. **Compile (编译器):** 将模板编译成渲染函数，并解析指令和表达式，创建相应的 Watcher 实例。

**双向绑定流程：**

1. 当用户修改视图时，会触发相应的事件，例如 input 事件。
2. 事件触发后，会调用对应的 Watcher 的 update 方法。
3. Watcher 会通知 Dep 数据发生了变化。
4. Dep 会通知所有订阅者 (Watcher) 数据发生了变化。
5. 订阅者收到通知后，会更新相应的视图。

**总结：**

Vue.js 的双向绑定机制通过数据劫持和发布-订阅模式，实现了数据和视图的同步更新，大大简化了开发流程，提高了开发效率。



## 27、理解 nextTick

`nextTick` 是 Vue.js 提供的一个全局 API，它用于在下次 DOM 更新循环结束之后执行延迟回调。换句话说，它允许我们在 DOM 更新完成后执行一些操作。

**为什么要使用 nextTick？**

首先需要知道Vue.js 的**数据更新是同步的**，**视图更新是异步的**，这意味着当我们修改数据时，DOM 并不会立即更新。而是在下一个事件循环中才会进行更新。

在某些情况下，我们需要在 DOM 更新之后执行一些操作，例如：

- 获取更新后的 DOM 元素的属性或状态
- 执行依赖于 DOM 更新的动画或过渡效果
- 调用第三方库的操作，这些操作需要在 DOM 更新后才能正常工作

**nextTick 的原理：**

`nextTick` 的实现机制与浏览器的事件循环机制有关。它会在内部维护一个回调队列，并将传入的回调函数添加到队列中。然后，它会利用以下几种方式之一，在下一个事件循环中执行队列中的回调函数：

**下面的方法是使用的优雅降级（只是vue2里面），在vue3里面，就不会有优雅降级，使用的是promise.then()，因为vue3不考虑兼容性了**

- **Promise:** 如果浏览器支持 Promise，则使用 Promise.then() 来延迟执行回调。
- **MutationObserver:** 如果浏览器支持 MutationObserver，则使用 MutationObserver 来监听 DOM 变化，并在变化发生后执行回调。
- **setImmediate:** 如果浏览器支持 setImmediate，则使用 setImmediate 来延迟执行回调。
- **setTimeout:** 如果以上方法都不支持，则使用 setTimeout(fn, 0) 来延迟执行回调。

## 28、MutationObserver 简介

`MutationObserver` 是一个 Web API，它提供了一种监听 DOM 变化的方式。它可以监视 DOM 树中发生的各种更改，例如：

- **子节点的添加或删除**
- **属性的修改**
- **文本内容的改变**

当 DOM 发生变化时，`MutationObserver` 会触发回调函数，并将发生变化的相关信息传递给回调函数。

**MutationObserver 的优势：**

- **高效：** `MutationObserver` 比传统的轮询方式更加高效，因为它只在 DOM 发生变化时才会触发回调函数。
- **精确：** `MutationObserver` 可以提供关于 DOM 变化的详细信息，例如变化的类型、目标节点以及新旧值等。
- **异步：** `MutationObserver` 的回调函数是在异步执行的，不会阻塞主线程。

**MutationObserver 的使用方法：**

1. **创建一个 MutationObserver 对象：**

```
js
复制代码const observer = new MutationObserver(callback);
```

其中，`callback` 是一个回调函数，它会在 DOM 发生变化时被调用。

1. **指定要观察的目标节点和变化类型：**

```
js复制代码const targetNode = document.getElementById('myElement');
const config = { childList: true, attributes: true, characterData: true };

observer.observe(targetNode, config);
```

其中，`config` 对象用于指定要观察的变化类型，例如：

- `childList`: 观察子节点的添加或删除
- `attributes`: 观察属性的修改
- `characterData`: 观察文本内容的改变

1. **处理回调函数：**

当 DOM 发生变化时，`callback` 函数会被调用，并传入一个 `MutationRecord` 对象列表作为参数。`MutationRecord` 对象包含了关于 DOM 变化的详细信息，例如：

- `type`: 变化的类型，例如 `childList`、`attributes` 或 `characterData`
- `target`: 发生变化的目标节点
- `addedNodes`: 添加的节点列表
- `removedNodes`: 删除的节点列表
- `attributeName`: 修改的属性名称
- `oldValue`: 属性的旧值
- `newValue`: 属性的新值

## 29、为什么 Vue 中的 data 是一个函数而不是一个普通的 Object

在 Vue 组件中，`data` 必须是一个函数，而不是一个普通的 Object。 这是因为 JavaScript 中的对象是引用类型，如果直接使用对象，则所有组件实例将共享同一个数据对象，导致数据互相污染。

**问题：**

假设 `data` 是一个普通的对象：

```javascript
const data = {
  count: 0
};

const ComponentA = {
  data,
  // ...
};

const ComponentB = {
  data,
  // ...
};
```

在这种情况下，`ComponentA` 和 `ComponentB` 将共享同一个 `data` 对象。如果 `ComponentA` 修改了 `count` 的值，`ComponentB` 中的 `count` 也会随之改变，导致数据混乱。

**解决方案：**

为了避免这个问题，Vue 要求 `data` 必须是一个函数，该函数返回一个新的数据对象：

```javascript
const ComponentA = {
  data() {
    return {
      count: 0
    };
  },
  // ...
};

const ComponentB = {
  data() {
    return {
      count: 0
    };
  },
  // ...
};
```

这样，每个组件实例都会拥有自己的数据对象，避免了数据互相污染。

**原因：**

* **JavaScript 的对象是引用类型：** 对象存储的是值的引用，而不是值本身。当多个变量引用同一个对象时，修改其中一个变量的值会影响其他变量。
* **Vue 组件的实例化：** Vue 组件在实例化时会执行 `data` 函数，并将其返回值作为组件的数据对象。
* **数据隔离：** 通过将 `data` 定义为函数，可以确保每个组件实例拥有独立的数据对象，避免数据互相干扰。

**总结：**

在 Vue 组件中，`data` 必须是一个函数，而不是一个普通的 Object，这是为了避免组件实例之间的数据互相污染，保证数据隔离。使用函数可以确保每个组件实例拥有自己的数据对象，从而维护数据的独立性和完整性。

## 30、vue-router 中的 hash 模式与 history 模式区别

Vue Router 提供了两种路由模式：hash 模式和 history 模式。它们的主要区别在于 URL 的格式和实现方式。

**1. hash 模式：**

- **URL 格式：** 使用 `#` 符号来分隔路由路径和 hash 值，例如 `http://example.com/#/home`。
- **实现方式：** 利用浏览器的 hashchange 事件监听 URL 的变化，并根据 hash 值来匹配路由规则。
- 特点：
  - 兼容性好，支持所有浏览器。
  - 不需要服务器端配置。
  - URL 不美观，包含 `#` 符号。
  - 刷新页面时，hash 值会保留，不会丢失路由状态。

**2. history 模式：**

- **URL 格式：** 使用正常的 URL 路径，例如 `http://example.com/home`。

- **实现方式：** 利用 HTML5 History API 来管理路由历史记录，通过 `pushState` 和 `replaceState` 方法来修改 URL，并监听 `popstate` 事件来处理浏览器的前进/后退操作。

- 特点：

  - URL 美观，不包含 `#` 符号。
  - 需要服务器端配置（**因为切换页面时，是根据路径向服务器起请求数据，如果服务端没有配置，那么就会报404错误**），将所有路由重定向到 index.html 页面，否则刷新页面会返回 404 错误。
  - 刷新页面时，路由状态可能会丢失，需要特殊处理。

   **注意，也可以在webpack里面去配置，确保路由状态不丢失（webpack history-fallback)**

  **选择建议：**
  
- 如果需要兼容旧版本的浏览器，或者不需要美观的 URL，可以选择 hash 模式。
  - 如果需要美观的 URL，并且能够进行服务器端配置，可以选择 history 模式。

  **注意：**
  
  - 在 history 模式下，需要配置服务器将所有路由重定向到 index.html 页面，否则刷新页面会返回 404 错误。
  - 为了避免刷新页面时丢失路由状态，可以使用 `keep-alive` 组件或者其他缓存机制来保存路由状态。

## 31、pushState 和 replaceState 方法

`pushState` 和 `replaceState` 是 HTML5 History API 提供的两个方法，用于在不重新加载页面的情况下修改浏览器的历史记录。它们是实现 history 路由模式的关键技术。

**1. pushState 方法：**0.0

* **语法：** `history.pushState(state, title, url)`
* **参数：**
    * `state`：一个 JavaScript 对象，用于存储与当前 URL 关联的状态信息。
    * `title`：新的页面标题，通常不使用，可以设置为 null 或空字符串。
    * `url`：新的 URL 地址。
* **功能：** 将新的 URL 和状态信息添加到浏览器的历史记录中，并更新地址栏的 URL。

**2. replaceState 方法：**

* **语法：** `history.replaceState(state, title, url)`
* **参数：** 与 `pushState` 相同。
* **功能：** 将当前历史记录项替换为新的 URL 和状态信息，并更新地址栏的 URL。

**区别：**

* `pushState` 会创建一个新的历史记录项，而 `replaceState` 会替换当前历史记录项。
* 使用 `pushState` 后，用户可以通过浏览器的后退按钮返回到之前的页面；使用 `replaceState` 后，用户无法返回到之前的页面。

**示例：**

```javascript
// 使用 pushState 创建一个新的历史记录项
history.pushState({ page: 1 }, '', '/page1');

// 使用 replaceState 替换当前历史记录项
history.replaceState({ page: 2 }, '', '/page2');
```

**应用场景：**

* **单页面应用 (SPA) 路由：** 在 SPA 中，可以使用 `pushState` 和 `replaceState` 来实现 history 路由模式，提供更加美观和友好的 URL。
* **页面状态管理：** 可以将页面状态信息存储在 `state` 对象中，并在页面切换时进行恢复，例如页面滚动位置、表单数据等。

**注意：**

* 使用 `pushState` 和 `replaceState` 修改 URL 后，浏览器不会自动发送请求到服务器，需要手动处理页面内容的更新。
* 为了避免用户直接访问新 URL 时出现 404 错误，需要在服务器端进行配置，将所有路由重定向到 index.html 页面。

#### 32、vue2响应式原理

- Observe
- Dep
- Watcher
- Scheduler

## 33、在 Vue 中封装 Axios

封装 Axios 可以帮助我们更好地组织代码、提高可复用性并简化 API 请求的处理。以下是在 Vue 中封装 Axios 的常见方法：

**1. 创建一个专门的 Axios 实例**

首先，创建一个新的 Axios 实例，以便与主 Axios 实例分离，并设置默认配置，如 baseURL、超时时间等。

```javascript
// src/utils/request.js

import axios from 'axios';

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // api 的 base_url
  timeout: 5000 // 请求超时时间
});

export default service;
```

**2. 添加请求拦截器和响应拦截器**

拦截器可以用于在请求发送前或响应返回后进行一些处理，例如添加 token、处理错误等。

```javascript
// src/utils/request.js

// 请求拦截器
service.interceptors.request.use(
  config => {
    // 在发送请求之前做些什么
    // 例如，添加 token
    config.headers['Authorization'] = 'Bearer your_token';
    return config;
  },
  error => {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

// 响应拦截器
service.interceptors.response.use(
  response => {
    const res = response.data;
    // 对响应数据做点什么
    if (res.code !== 200) {
      // 处理错误
      return Promise.reject(new Error(res.message || 'Error'));
    } else {
      return res;
    }
  },
  error => {
    // 对响应错误做点什么
    return Promise.reject(error);
  }
);
```

**3. 封装请求方法**

封装常用的请求方法，如 GET、POST、PUT、DELETE 等，方便在组件中调用。

```javascript
// src/utils/request.js

export function get(url, params) {
  return service({
    method: 'get',
    url,
    params
  });
}

export function post(url, data) {
  return service({
    method: 'post',
    url,
    data
  });
}

// ... 其他请求方法
```

**4. 在组件中使用封装的 Axios**

在组件中引入封装好的 Axios，并使用封装的请求方法进行 API 调用。

```javascript
// src/views/Home.vue

import { get, post } from '@/utils/request';

export default {
  mounted() {
    get('/api/users').then(res => {
      // 处理响应数据
    });

    post('/api/login', { username, password }).then(res => {
      // 处理响应数据
    });
  }
}
```

**5. 进一步封装**

可以根据项目需求进一步封装 Axios，例如：

*   添加取消请求的方法
*   封装常用的 API 接口
*   处理 loading 状态和错误提示

**总结：**

封装 Axios 可以提高代码的可维护性和可复用性，并简化 API 请求的处理。通过创建 Axios 实例、添加拦截器、封装请求方法等步骤，可以轻松地在 Vue 项目中使用 Axios 进行 API 调用。



## 34、localStorage 数据加密

在 localStorage 中存储敏感数据时，出于安全考虑，我们不希望数据以明文形式显示。以下是一些加密 localStorage 数据的方法：

**1. 使用 CryptoJS 库**

CryptoJS 是一个强大的加密库，可以用于各种加密算法，如 AES、DES 等。

**步骤：**

1. **安装 CryptoJS:**

```bash
npm install crypto-js
```

2. **加密数据:**

```javascript
import CryptoJS from 'crypto-js';

const data = {
  // 你的数据
};

// 秘钥，需要妥善保管
const secretKey = 'your_secret_key';

// 使用 AES 加密
const encryptedData = CryptoJS.AES.encrypt(JSON.stringify(data), secretKey).toString();

// 存储到 localStorage
localStorage.setItem('myData', encryptedData);
```

3. **解密数据:**

```javascript
const encryptedData = localStorage.getItem('myData');

const decryptedData = JSON.parse(CryptoJS.AES.decrypt(encryptedData, secretKey).toString(CryptoJS.enc.Utf8));
```

**2. 使用 Web Crypto API**

Web Crypto API 是浏览器提供的原生 API，支持各种加密算法。

**步骤：**

1. **生成密钥：**

```javascript
window.crypto.subtle.generateKey(
  {
    name: "AES-GCM",
    length: 256, // 可以选择 128, 192, 或 256
  },
  true, // 是否可导出密钥
  ["encrypt", "decrypt"] // 密钥用途
)
.then(key => {
  // 存储密钥，例如使用 IndexedDB
});
```

2. **加密数据：**

```javascript
const data = {
  // 你的数据
};

window.crypto.subtle.encrypt(
  {
    name: "AES-GCM",
    // 其他加密参数
  },
  key, // 密钥
  data // 要加密的数据
)
.then(encryptedData => {
  // 存储到 localStorage
  localStorage.setItem('myData', encryptedData);
});
```

3. **解密数据：**

```javascript
const encryptedData = localStorage.getItem('myData');

window.crypto.subtle.decrypt(
  {
    name: "AES-GCM",
    // 其他加密参数
  },
  key, // 密钥
  encryptedData // 要解密的数据
)
.then(decryptedData => {
  // 处理解密数据
});
```

**安全注意事项：**

*   **密钥管理：** 密钥是加密安全的关键，需要妥善保管。避免将密钥硬编码在代码中，可以选择使用环境变量或密钥管理服务。
*   **算法选择：** 选择安全的加密算法，例如 AES-GCM。
*   **其他安全措施：** 除了加密数据外，还应考虑其他安全措施，例如防止 XSS 攻击、CSRF 攻击等。

**总结：**

通过使用 CryptoJS 或 Web Crypto API，可以对 localStorage 中的数据进行加密，提高数据的安全性。选择合适的加密方法和密钥管理方案，可以有效保护敏感数据。



### 35、首屏加载速度慢怎么解决？

![image-20240505232909990](C:\Users\洁哥\AppData\Roaming\Typora\typora-user-images\image-20240505232909990.png)

### 36、 watch 和 watchEffect 方法的区别

`watch` 和 `watchEffect` 都是 Vue 3 中用于监听数据变化并执行副作用的 API，但它们之间存在一些关键区别：

**1. 监听目标：**

*   **watch:** 监听特定的数据源，可以是 ref、reactive 对象的属性、计算属性或 getter 函数。
*   **watchEffect:** 自动收集依赖，监听函数中使用到的所有响应式数据。

**2. 执行时机：**

*   **watch:** 在监听的数据源发生变化时执行回调函数，并且可以访问新值和旧值。
*   **watchEffect:** 立即执行一次回调函数，并自动追踪其依赖，当依赖的响应式数据发生变化时重新执行。

**3. 配置选项：**

*   **watch:** 提供更精细的控制，例如可以配置 `deep` 选项进行深度监听， `immediate` 选项控制是否立即执行回调函数。
*   **watchEffect:** 配置选项较少，主要用于需要自动收集依赖并立即执行的场景。

**4. 使用场景：**

*   **watch:** 适合监听特定的数据变化，并执行相应的操作，例如更新 DOM、发送网络请求等。
*   **watchEffect:** 适合需要自动收集依赖并执行副作用的场景，例如计算衍生数据、控制动画等。

**示例：**

```javascript
import { ref, watch, watchEffect } from 'vue';

const count = ref(0);

// watch 监听 count 变化
watch(count, (newValue, oldValue) => {
  console.log('count changed:', newValue, oldValue);
});

// watchEffect 自动收集依赖
watchEffect(() => {
  console.log('count:', count.value * 2);
});

count.value++; // 输出： count changed: 1 0
                 //        count: 2
```

**总结：**

*   `watch` 用于监听特定的数据变化，提供更精细的控制。
*   `watchEffect` 自动收集依赖并执行副作用，更简洁方便。

选择使用 `watch` 还是 `watchEffect` 取决于具体的需求和场景。