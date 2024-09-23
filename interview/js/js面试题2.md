#### 1、说一下什么是闭包？

闭包就是函数里面访问了另一个函数作用域里面的变量（或者说是引用了另一个函数作用域变量的函数）

**闭包就是引用了另一个函数作用域里面变量的函数（红宝书）**

#### 2、说一下类的继承和创建，列举一下你所知道的继承方式？

**在ES6之前：**

我们使用改造函数来创建类，使用原型链与修改this指向来实现实现继承

可以使用的继承方式有：

- 原型继承

  ![image-20240507113116165](C:\Users\洁哥\AppData\Roaming\Typora\typora-user-images\image-20240507113116165.png)

  ![image-20240507113143651](C:\Users\洁哥\AppData\Roaming\Typora\typora-user-images\image-20240507113143651.png)

- 构造函数继承

  ![image-20240507113202948](C:\Users\洁哥\AppData\Roaming\Typora\typora-user-images\image-20240507113202948.png)

  ![image-20240507113253773](C:\Users\洁哥\AppData\Roaming\Typora\typora-user-images\image-20240507113253773.png)

- 组合继承（原型链继承+构造函数继承）

- **优点：**

  - 结合了原型链继承和构造函数继承的优点，既能继承实例属性，又能继承原型属性/方法。
  - 可以向父类构造函数传参。

  **缺点：**

  - 调用了两次父类构造函数（一次在创建子类原型时，一次在子类构造函数中），造成了一定的性能损失。
  - 父类构造函数中的属性会被创建两次，一次是在子类原型上，一次是在子类实例上。

![image-20240507113449085](C:\Users\洁哥\AppData\Roaming\Typora\typora-user-images\image-20240507113449085.png)

![image-20240507113459986](C:\Users\洁哥\AppData\Roaming\Typora\typora-user-images\image-20240507113459986.png)

- 寄生式组合继承

  ![image-20240507113941771](C:\Users\洁哥\AppData\Roaming\Typora\typora-user-images\image-20240507113941771.png)

  ![image-20240507113541257](C:\Users\洁哥\AppData\Roaming\Typora\typora-user-images\image-20240507113541257.png)

**ES6后：**

使用class关键字来创建一个类，使用extends与super来实现子类对父类的属性与方法的继承

#### 3、如何解决异步回调地狱？

- 使用promise.then()方法链式调用
- 使用async与await

#### 4、说一下图片的懒加载与预加载？

**懒加载：**

就是当页面滚动到需要展示图片的地方再展示，否则不需要加载图片

我们可以通过 intersectionOberser（callback [,options]）方法来实现元素进入模块的监听

那么如何理解这个方法：

```javascript
callback(entries,observer);
entries是一个数组，里面是所有被监听的元素
observer是被调用的实例

options里面有三个参数
root,设置祖先元素
rootMargin，设置偏移量
threshold,阈值，范围0-1，0表示元素接触到交叉区域就显示，1表示元素全部在交叉区域里面显示才显示
```

下面是实例代码：

```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>IntersectionObserver Test</title>
  <style>
    img {
      width: 600px;
      height: 300px;
      object-fit: cover;
      opacity: 0;
      transition: all 0.5s ease-in-out;
    }

    .show {
      opacity: 1;
    }
  </style>
</head>

<body>
  <main>
    <img src="" alt=""
      data-src="https://images.pexels.com/photos/45201/kitty-cat-kitten-pet-45201.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2">
    <img src="" alt=""
      data-src="https://images.pexels.com/photos/104827/cat-pet-animal-domestic-104827.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2">
    <img src="" alt=""
      data-src="https://images.pexels.com/photos/416160/pexels-photo-416160.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2">
    <img src="" alt=""
      data-src="https://images.pexels.com/photos/1170986/pexels-photo-1170986.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2">
    <img src="" alt=""
      data-src="https://images.pexels.com/photos/57416/cat-sweet-kitty-animals-57416.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2">
  </main>

  <script>
    const images = document.querySelectorAll('img');

    const options = {
      root: null,//根元素
      rootMargin: '0px',//偏移量：元素进入视口时的偏移量
      threshold: 0.5 // 阈值:取值范围0-1,0表示当元素刚进入时就触发回调函数,1表示元素完全进入视口时触发回调函数
    }

    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const img = entry.target;
        img.src = img.dataset.src;
        img.classList.add('show');
        // 删除观察目标，减少性能浪费
        observer.unobserve(img);
      })
    }, options);

    // 监听所有的图片
    images.forEach(image => {
      observer.observe(image);
    })


  </script>
</body>

</html>
```

**预加载：**

再页面显示之前就提前加载好所有的图片资源，等到需要是使用的时候直接从缓存里面读取就可以

#### 5、mouseover与mouseenter的区别？

mouseover在鼠标指针进入他的子元素或目标元素时会触发，并且会触发事件，并且会触发事件冒泡

mouseenter只有在鼠标指针进入到自身元素时才会触发，不会有事件冒泡

#### 6、new操作符做了哪些事情？

- 创建一个空的对象
- 将空的对象的原型指向传入的构造函数的原型
- 将构造函数的this指向指向新创建的对象
- 返回这个对象（可以有判断）

#### 7、改变函数内部this指针的指向函数（bind、apply、call的区别)，内在是如何实现的？

call与apply在改变this指向的同时会调用这个函数，他们两个的区别是传参的形式不同，call是一个一个的传，apply是一数组的形式传

bind与call的传参形式是相同的，不同点是使用bind后不会调用函数，他返回的是一个函数，需要用变量接受这个函数的引用，再去调用。

#### 8、JS的各种位置，比如clientHeight ,scrollHeight,offsetHeight,以及scrollTop,offsetTop,clientTop的区别？

1. **clientHeight**：
   - 这个属性返回元素的可视高度，包括内边距（padding），但不包括滚动条、边框和外边距。
   - 例如，如果一个元素有20px的内边距，clientHeight 将返回内容区域的高度减去内边距的大小。
2. **scrollHeight**：
   - scrollHeight 返回元素的内容高度，包括因溢出而被隐藏的部分。
   - 当内容超出容器的可视区域时，会出现滚动条。scrollHeight 会计算整个内容的高度，包括被隐藏部分。
3. **offsetHeight**：
   - 这个属性返回元素的高度，包括内边距、边框和滚动条（如果存在），但不包括外边距。
   - 如果一个元素没有滚动条并且没有定义内边距或边框，offsetHeight 将等于 clientHeight。
4. **scrollTop**：
   - scrollTop 表示元素的垂直滚动条滚动的距离。当一个元素的内容被垂直滚动时，scrollTop 表示内容顶部被隐藏的部分的高度。
5. **offsetTop**：
   - offsetTop 返回当前元素相对于其 offsetParent 元素的顶部内边距边缘的距离。
   - 如果没有设置 position 属性，则 offsetParent 元素是距离最近的已设置了 position 属性的祖先元素；如果没有已设置了 position 属性的祖先元素，则 offsetParent 是根元素。
6. **clientTop**：
   - clientTop 返回元素顶部边框的宽度，不包括外边距。
   - 在一些浏览器中，clientTop 也包括滚动条的宽度，但这是不规范的行为。

#### 9、异步加载js的方法？

在script里面使用defer或者async

**defer：**

使用defer后，脚本在加载的过程中不会阻塞主页面的渲染，在文档下载完成后会根据出现的顺序执行。

多个延迟脚本的执行顺序与他们在文档中出现的顺序一致

**async:**

使用async后，脚本在加载的过程中也不会阻塞主页面的渲染，并且在脚本下载完后立即执行，多个异步脚本的执行顺序不确定，取决于下载完成的先后顺序。

#### 10、ajax解决浏览器缓存问题？

- 在ajax的请求参数后面添加一个随机参数或者时间戳，确保每次请求都是唯一的，从而防止浏览器返回缓存的结果
- 设置请求头：在发送http请求的时候禁用浏览器使用缓存，添加 Cache-Control:no-cache 来禁止浏览器使用缓存
- 将get请求修改为post请求，因为get请求会被浏览器缓存，post请求不会
- 设置响应头：设置Cache-Control:no-cache和Expires:0等让告诉浏览器不要缓存这个结果

#### 11、节流和防抖是什么，如何实现？

防抖：浏览器只会响应用户的最后一次dom事件

**在用户事件被触发n秒后再执行回调逻辑，如果在这n秒内事件又被触发，则重新计算。**

实现代码：

```javascript
function debounce(fn,delay){
    //设置变量接受定时器的值
    let timer=null;
    return function(){
        //判断当前的任务队列里面是否有定时器，如果有，我们需要清空的当前的延时队列任务（因为我们要
        //实现的是防抖功能，只需要执行响应用户的最后一次操作即可）
        if(timer){
            clearTimeout(timer);
        }else{
            //如果没有定时器任务，我们就开启一个定时器，然后用户会一直触发任务，都是最后只会响应一次
            timer=setTimeout(()=>{
                fn();
            },delay)
        }
    }
}

为什么要有 let timer = null;
let timer = null; 这行代码在 debounce 函数内部声明并初始化了 timer 变量。它有两个主要作用：

初始化定时器： 将 timer 初始化为 null 表示当前没有定时器正在运行。这很重要，因为在第一次调用返回的匿名函数时，需要确保不会尝试清除一个不存在的定时器。
存储定时器： 每次创建新的定时器时，都会将定时器对象赋值给 timer 变量。这样，在下次调用返回的匿名函数时，就可以访问并清除之前的定时器，从而实现防抖功能。
如果没有 let timer = null; 这行代码，timer 变量将是未定义的，导致代码无法正常工作。

总结：

let timer = null; 在 debounce 函数中起着至关重要的作用，它初始化定时器并存储定时器状态，从而确保防抖功能的正确实现。
```

节流：事件只会在规定时时间内触发一次

**当遇到连续事件时，以n秒为间隔进行阻断**，**减少同一时间段内，连续事件的触发频率**

实现代码：

```javascript
function throttle(fn,delay){
    let timer=null;
    return function (){
        //判断当前是否有定时器，如何有，直接返回，需要等这个定时器执行完并被清除后才可以开启下了一个定时器
        if(timer){
            return;
        }else{
            timer=setTimeout(()=>{
                fn();
                timer=null;
            },delay)
        }
    }
}
```

#### 12、eval的作用是什么？

eval是js里面的一个全局函数，它可以将用户传入的字符串当作js代码来解析和执行

所以存在危险，因为你不知道用是否会输入恶意代码

#### 13、对象深拷贝的简单实现？

- 使用json序列化和反序列化，都是有一个缺点，就是对于一些不安全的数据json不会进行处理，比如：含有循环引用的对象，函数等，所以这个只可以实现简单的深拷贝

- 使用递归（对于一些特殊类型的对象无法实现拷贝：比如正则，日期对象什么的）

  请看以下代码;

  ```javascript
  function deepCopy(obj){
      if(typeof obj == 'object' || obj === null ){
          return obj;
      }
      let newObj=Array.isArray(obj) ? [] : {};
      
      for (let key in obj){
          //确保只拷贝当前对象的属性，不考虑原型链上的属性
          if (obj.hasownProperty(key)){
              //判断是否是对象,但是还是存在问题，比如正则，日期对象什么的，我们可以在上面优先判断或者在下面的if里面直接过滤
              if (typeof obj[key] == 'object'){
                  //递归拷贝
                  newObj[key] == deepCopy(obj[key]);
              }else{
                  newObj[key]==obj[key];
              }
          }
      }
      return newObj;
  }
  ```

  #### 14、实现js中所有对象的深度克隆(包装对象、Date对象、正则对象) ？

  请看一下代码：

  ```html
  <!DOCTYPE html>
  <html lang="en">
  
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
  </head>
  
  <body>
    <script>
      function deepClone(obj, visited = new WeakMap()) {
        if (typeof obj !== 'object' || obj === null) {
          return obj;
        }
  
        if (visited.has(obj)) {
          return visited.get(obj);
        }
  
        let clone;
  
        if (obj instanceof Date) {
          clone = new Date(obj.getTime());
        } else if (obj instanceof RegExp) {
          clone = new RegExp(obj.source, obj.flags);
        } else if (obj instanceof Function) {
          clone = obj;
        } else if (obj instanceof Object) {
          clone = Array.isArray(obj) ? [] : {};
  
          visited.set(obj, clone);
  
          for (let key in obj) {
            if (Object.prototype.hasOwnProperty.call(obj, key)) {
              clone[key] = deepClone(obj[key], visited);
            }
          }
        }
  
        return clone;
      }
  
      // 测试
      const originalObj = {
        name: 'Alice',
        age: 30,
        date: new Date(),
        regex: /abc/g,
        func: function () { console.log('Hello'); },
        nestedObj: {
          prop1: 'value1',
          prop2: 'value2'
        }
      };
  
      const clonedObj = deepClone(originalObj);
      console.log(clonedObj);
  
    </script>
  </body>
  
  </html>
  ```

  #### 15、实现一个once函数，传入函数参数只执行一次？

  ```javascript
  function once(fn){
      //设置变量判断函数是否被调用过
      let excuted=false;
      return function (...args){
          if(!excuted){
              //修改this的绑定，同时创如参数，注意，参数的个数应该保持与fn()的参数一致
              return fn.apply(this,args);
          }
      }
  }
  ```

  #### 16、将原生的ajax封装为promise

  ```javascript
  function ajax_promise(url){
      return new Promise((reslove,reject)=>{
          //创建一个原生的ajax请求对象
          const xhr=new XMLHttpRequest();
          //打开请求
          xhr.open('Get',url);
          //将请求发送
          xhr.send();
          //监听请求回来的状态
          xhr.onreadystatechange = function () {
              if(xhr.readyState==4){
                  if(xhr.status===200){
                      //请求发送成功，修改promise的状态为fulfilled
                      resolve(JSON.parse(xhr.responseText));
                  }else{
                      //请求失败，修改promise的状态为rejected
                      reject(new Error('请求失败'));
                  }
              }
          }
      })
  }
  
  ajax_promise(your_URL)
    .then(()=>{
      console.log(res);
  }).catch(()=>{
      console.log(error);
  })
  ```

  #### 17、js监听对象属性的改变

  使用defineProperty()，实现的原理就是将对象属性的访问与赋值修改为函数,访问：get函数，赋值：set函数

  ```javascript
  const obj={
      name:'Jie'
  }
  //
  Object.defineProperty(obj,'name',{
      //将对属性的访问设置为get函数
      get (){
          console.log('属性被访问');
          return this._name;
      },
      //将对属性的赋值设置为set函数
      set (value){
      console.log('属性发生变化，变为'+value);
      this._name=value;
  	}
  });
  
  obj.name='zhengjie';
  ```

  - 使用proxy代理对象,proxy监听的整个的对象里面的所有属性，所以没有必要去指定属性

  ```javascript
  const target={
      name:'Jie',
      age:18
  }
  const handler={
      set (target,key,value){
          console.log(`目标对象${target}里面的键值为${key}的属性的值变为${value}`);
          target[key]=value;
          return true;
      }
  }
  const proxyObj =new Proxy(target,handler);
  
  proxyObj.name='jiejie'
  console.log(target.name);
  ```

  #### 18、你如何理解Proxy代理？

  使用代理的目的主要就是使用捕获器。

  什么是捕获器：捕获器就是在处理程序对象中定义的“基本操作的拦截器”。每次在代理对象上执行一些基本操作时，不会调用底层的实现函数，而是先被代理对象设置的对应的捕获器拦截，执行对应的操作。

  你可以在自己的捕获器里面实现自己的方法与逻辑（如果复杂度不是特别高的话），都是，**我们并不需要来手动重建原始行为，而是可以通过调用全局对象上的Reflect对象上（封装了原始行为）的同名方法来实现重建。**

  #### 19、列举proxy的捕获器（或者称之为陷阱）覆写的特性与其默认特性？

  | 代理陷阱       | 覆写的特性                                                   | 默认特性                 |
  | -------------- | ------------------------------------------------------------ | ------------------------ |
  | set            | 属性的设置                                                   | Reflect.set()            |
  | get            | 属性的读取                                                   | Reflect.get()            |
  | has            | in操作符                                                     | Reflect.has()            |
  | ownKeys        | Object.keys()、Object.getOwnPropertyNames()、Object.getOwnPropertySymbols() | Reflect.ownKeys()        |
  | setPrototypeOf | Object.setPrototypeOf()                                      | Reflect.setPrototypeOf() |
  | getPrototypeOf | Object.getPrototypeOf()                                      | Reflect.getPrototypeOf() |
  | apply          | 调用一个函数                                                 | Reflect.apply()          |
  | construct      | 用new构造一个函数                                            | Reflect.construct()      |

  还有其他的一些捕获器，可以自己去查阅文档。

  可以不使用默认特性，但是这个时候你需要根据覆写的特性的功能来自己设置函数的实现逻辑达到与其功能相似的目的。

  比如说看以下代码,我设置了set陷阱，

```javascript
const target = {
    name:'jie'
}

const handler={
    set(trapTarget,key,value,receiver){
        //如果使用默认特性的话，我们可以直接使用以下代码
        //Reflect.set(trapTarget,key,value,receiver);
        //如果不使用默认特性，那么就要重写特性
        if(Reflect.has(trapTarget,ket)){
            console.log(`属性${key}已经存在！！！`);
        }else{
            trapTarget[key]=value;
        }
    }
}
const proxyObj = new Proxy(target,handler);

proxyObj.name='jiejie';//属性name已经存在！！！
proxyObj.age=18;
console.log(proxyObj.age);
console.log(proxyObj.name);

```

其实反射API不一定只在代理中使用，比如，在实现简单的对象深拷贝的时候：

```javascript
const testObj={
    name:'Jie',
    age:18,
    testArr:[1,2,3],
    testDate:new Date(),
    friend:{
       //这个有循环引用，导致递归时报错，解决方法，使用weakMap    myFriend:testObj,
        name:'XiaoMing',
        age:19
    },
    say(){
        return 'hello';
    }
}

function deepCopy(obj){
	if(typeof obj != 'object' || obj === null){
    	return obj;
	}
    
    let newObj=Array.isArray(obj) ? [] :{};
    
    for(let key in obj){
		if(Reflect.has(obj,key)){
          if(typeof obj[key] == 'object'){
                newObj[key] = deepCopy(obj[key]);
          }else{
               newObj[key] = obj[key]
          }
        }
    }
    return newObj;
}
const newObj = deepCopy(testObj);
console.log(newObj);//testDate不会被正常拷贝，我们需要做特殊判断或者使用wekMap实现

```

或者某些对象覆盖了原型上的方法，比如覆盖了apply方法

```javascript
//在通过apply方法调用函数的时候，被调用的函数可能也定义了自己的apply属性，为了绕过这个问题，可以使用定义在原型上的apply()方法，
Function.prototype.apply(myFunc,thisVal,args);
//但是代码太长，不好看，可以使用
Reflect.apply(myFunc,thisVal,args);

```

#### 20、如何实现一个私有变量，使用get可以访问，不可以直接访问？

我暂时只知道使用闭包，Object.defineProperty和Proxy不知道怎么实现

- 使用闭包

  ```javascript
  function private_get(){
      let private_name = 'jie';
      return function(){
          function get(){
              return private_name;
  		}
      }
  }
  
  const test_private = private_get();
  console.log(test_private());//jie
  ```

#### 21、怎么控制一次加载一张图片，加载后在加载下一张图片？

方法：promise+递归

为什么使用promise,因为他可以显示状态的改变，确保一次只加载一次图片

实现思路：

- 设置图片数组
- 一个加载图片的方法，内部返回一个promise对象
- 在then方法里面实现图片的显示，同时数组下标++，然后递归调用方法

```javascript
const imgArr = [
      'https://p2.itc.cn/q_70/images03/20230902/721191166cd2465c9db74d5b52a3e7bc.png',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcStKnBJl0DA6vqgkVL4eqeFrHVHRr-jJXAqSEQJxGxCOARHIgigLe1pXEopj3n2oDSt2e4&usqp=CAU',
      'https://p2.itc.cn/q_70/images03/20230902/721191166cd2465c9db74d5b52a3e7bc.png'];
    let currentIndex = 0;
    function loadImage(url) {
      return new Promise((reslove, reject) => {
        //我们需要新建Image对象
        const img = new Image();
        //监听图片的加载,如果图片加载成功，那么就让当前的promise的状态变为fulfilled
        img.onload = () => {
          reslove(img);
        };
        //如果图片加载过程中出现问题，那么就报错
        img.onerror = reject;
        img.src = url;
      })
    }

    function loadNextImg() {
      if (currentIndex < imgArr.length) {
        loadImage(imgArr[currentIndex])
          .then((img) => {
            document.body.appendChild(img);
            currentIndex++;
            loadNextImg();
          }).catch((error) => {
            throw new Error('图片加载失败')
          })
      }
    }

    loadNextImg();
```

#### 22、如何实现sleep的效果？

#### 23、Function.getPrototypeOf()是什么？

Object

#### 24、箭头函数中this的指向？

箭头函数的this是是指向上下文对象的，并且无法通过apply、bind、call方法来显式改变this。

#### 25、数组常用的方法有哪些？

**find()** :里面是一个函数，返回值是满足里面函数逻辑的第一个值（是数组里面的具体的值）

**findIndex() :**返回满足条件的数组元素下标，有就返回下标，没有就返回-1、

**indexOf():**传入具体的值，如果在数组里面找到这个值，返回这个值在数组里面的下标，如果没有找到这个值，就返回-1。

**filter()：**数组过滤数据的方法，返回了一个新的数组，并且没有修改原来的数组

**map()：**map的返回值是一个新的数组，这个新的数组会由原始数组的元素经过调用map里面定义的方法的返回值组成

**reduce():**为数组的每一个元素添加一个reduce方法，并将第一次执行reduce方法后的结果作为第二次执行reduce方法的参数。

**concat():**数组连接的方法，几个数组拼接为一个数组

**sort():**数组排序的方法，默认从小到达进行排序

**reserve():**数组逆转的方法

**includes()**：传入参数判断当前数组里面是否有这个元素，返回值值为boolean

#### 26、数组去重有哪些方法？

- 使用Set集合去重，但是得到的是一个对象，我们需要转换为数组

```javascript
const arr=[1,1,2,2,3];
const newArr=new Set(arr);
//使用Array.from()方法将对象转为数组
const newArray=Array.from(newArr);
//使用展开运算符
const newArray=[...newArr]
console.log(newArray);
```

- 使用reduce（）方法

```javascript
const arr=[1,1,2,2,3];
const newArr=arr.reduce((acc,curr)=>{
 if(!acc.includes(curr)){
     acc.push(curr);//需要知道的是Array.prototype.push()方法返回是的是添加到数组后元素长度
 }   
 //也可以将上面的语法用三元表达式实现
    return acc.includes(item) ? '' : [...newArr,curr];
},[])
```

- filter去重

```javascript

const arr = [1, 1, 2, 2, 3, 44, 3, 2, 5];
    const newArr = arr.filter((item, index) => {
      return arr.indexOf(item) === index;//根据返回的值是否为true来判断是否保留这个元素
    });
  console.log(newArr);


```

- forEach去重

```javascript
const arr = [1, 1, 2, 2, 3, 4];
const newArr = [];
arr.forEach((item) => {
    if (!newArr.includes(item)) {
        newArr.push(item);
    }
});
console.log(newArr); // 输出：[1, 2, 3, 4]
```

#### 27、如何去除字符串首尾空格？

- trim()方法

```javascript
const str=' hello ';
const newStr=str.trim();
console.log(newStr)
```

#### 28、说说你知道的JS语言特性？

- 解释性语言JavaScript是一种解释性语言，不需要编译，可以直接在支持JS的web浏览器运行

- 单线程
- 事件驱动：JS是通过事件驱动的方式进行交互
- 动态类型：JS的变量类型会在运行时发生改变。
- 异步
- 解释性语言：JS支持函数式编程风格，函数可以作为变量进行传递作为其他函数的返回值、作为匿名函数使用等。
- 闭包
- 原型链继承

#### 29、如何判断一个数组？

- Array.isArray();
- instanceofc 操作符
- Object.prototype.toString.call()
- 看是不是可以使用数组的特殊的方法

#### 30、JS的全排列

#### 31、谈谈你所理解的跨域，为什么会有这个问题？如何解决？

跨域是指在web开发中，一个网页的脚本试图访问另一个网站资源时所遇到的安全限制问题

为什么会出现这个问题：

- 安全性考虑：同源策略是为了保护用户的数据安全，防止恶意网站利用脚本获取用户的敏感信息
- 隐私保护

如何解决：

- JSONP：利用script标签不受同源策略限制的原因来实现
- **构建BFF**（Backend For Frontend）：通过在后端建立专门的服务层来处理跨域请求，前端只和这个服务层交互，从而规避跨域限制。
- 使用**nginx实现反向代理**
- 在请求头设置域名白名单

#### 32、null === undefined 输出什么，null == undefined又输出什么？

```javascript
console.log(null===undefined)//false
console.log(null==undefined)//true
```

具体的原因就是使用===运算符时由于类型不同就会直接返回false

但是使用==时，会强制类型转换，以下是一些具体的转换规则：

- boolean转数字
- 字符串转数字
- 如果一个操作数是对象，另一个不是对象，那么是对象的那一方会调用valueOf()方法获取原始值，再利用上面的方法进行比较

#### 33、什么是按需加载？

按需加载就是需要使用到的时候再加载，否则浏览器不会立即加载

优点：

- 减少初始页面的加载时间
- 优化用户体验

#### 34、简单介绍一下symbol

symbol是ES6新增的一个数据类型，表示独一无二的值

### 主要特点：

1. **唯一性**：每个`Symbol`值都是唯一的，即使使用相同的描述字符串创建多个`Symbol`值，它们也是不相等的。
2. **不可变性**：`Symbol`值是不可变的，不能被修改或重写。
3. **作为对象属性名**：由于`Symbol`的唯一性，可以用作对象的属性名，确保不会与其他属性名冲突。
4. **内置Symbol**：ES6提供了一些内置的`Symbol`值，如`Symbol.iterator`、`Symbol.toPrimitive`等，用于定义对象的行为和特性。

#### 35、介绍一下promise,及其底层如何实现？

**Promise介绍：**

`Promise`是JavaScript中用于处理异步操作的一种解决方案，它代表了一个异步操作的最终完成或失败，并返回其结果值。`Promise`对象有三种状态：pending（进行中）、fulfilled（已成功）和rejected（已失败），一旦状态发生变化就不会再变。

**Promise底层实现思路：**

1. **构造函数**：

- `Promise`是一个构造函数，接受一个执行器函数作为参数，在构造时立即执行这个函数。
- 执行器函数接受两个参数：`resolve`和`reject`，分别表示成功和失败的回调函数。

2. **状态转换**：

- 初始状态为`pending`，当调用`resolve`时状态变为`fulfilled`，调用`reject`时状态变为`rejected`。

3. **then方法**：

- `Promise`原型上有`then`方法，接受两个回调函数，分别对应`fulfilled`和`rejected`状态下的处理逻辑。
- 返回一个新的`Promise`实例，实现链式调用。

4. **异步处理**：

- `then`方法中可以处理同步和异步操作，通过微任务机制（如`Promise.resolve`、`setTimeout`等）来确保异步任务的顺序执行。

#### 36、JS中字符串转数字的方法？

- 使用一元运算符+
- 使用parseInt()
- 使用parseFloat()
- 使用Number()

#### 37、平时是怎么调试JS的？

- console.log
- 断电调试

#### 38、如何获取对象上的属性？

- Object.getOwnProperty()
- for in 循环
- Reflect.ownKeys();
- 如果是可迭代对象，可以使用
  - Object.entries():返回对象的键与值
  - Object.keys()：返回对象的键名
  - 补充：Object.values():返回对象的属性值

#### 39、async与await具体应该怎么使用？

async与await是promise的语法糖，当有多个promise对象构成的很长的then链的时候，我们可以使用async与await来简化代码的书写，使其看起来像同步代码一样。

#### 40、Promise与async和await之间的关系？

promise是一种处理异步操作的对象，但是我们也可以使用async来显示声明一个异步函数，使用await来等待这个异步函数，并接受异步函数返回的结果

#### 41、JS加载过程阻塞，解决的办法？

- 使用defer与async
  - defer:使用defer后，浏览器在加载脚本时不会阻塞主线程，但是加载脚本的顺序会根据使用defer的script脚本顺序出现。
  - async:也不会阻塞浏览器的主线程，script脚本的加载顺序会根据实际加载情况来显示，优先加载成功的脚本会优先被使用，不会有顺序问题
- 动态加载js
- 使用模块化开发

#### 42、轮播的实现原理，如果页面上有两个轮播，你会如何实现？

轮播通常通过定时器和样式控制来实现，基本原理如下：

1. **HTML结构**：通常使用一个容器元素包裹多张图片或内容项。
2. **CSS样式**：设置容器元素为相对定位（`position: relative;`），每个内容项绝对定位（`position: absolute;`）并设定初始位置。
3. **JavaScript**：通过操作样式（例如改变 `left` 或 `transform` 属性）实现内容项的切换，同时利用定时器控制轮播。

#### 43、解释一下JS的事件循环？



#### 44、LocalStorage 、sessionStorage、cookie的区别？

**LocalStorage ：**

- 存储的容量大小：约5M
- 生命周期：永久存储，除非手动删除
- 作用域：同源（协议+域名+端口）
- 访问权限：同源的所有页面可以访问
- 主要用途：长期保护用户的信息的、网站配置等。

**SessionStorage:**

- 存储容量：与LocalStorage差不多，也约为5M
- 生命周期：会话级存储，关闭浏览器或窗口后被清除
- 作用域：同源
- 访问权限：同一个会话窗口或者页面可以访问
- 主要用途：临时保存会话数据，不同页面共享数据

**cookie:**

- 存储容量：比较小，每个cookie最多存储4KB
- 生命周期：可以设置过期时间，可以是永久性的，也可以是会话级的
- 作用域：同源
- 访问权限：由服务器设置、浏览器发送请求时会自动携带
- 主要用途：跟踪用户都身份信息、会话状态等

#### 45、解释一下HTML5的drag API?

drag是HTML5新增的一个API,用于处理元素的拖放，开启的步骤如下：

- 为需要开启拖拽的元素设置draggable='true',然后监听事件
- dragstart事件（元素开始拖动）
- drag事件（元素在拖动过程中）
- dragend事件（元素拖动结束）

除此之外，我们需要设置存放拖动元素的目标元素

- 设置一个新的div,,设置id为target

- 获取元素，同时添加事件drop

- 在drop事件里面需要阻止默认事件，e.preventDefault(),

  因为浏览器是默认不允许元素在页面上随意放置的

#### 46、解释一下web worker?

web worker 可以为单线程的js开启多线程的模式，可以将一些数据处理放在一个单独的线程，不影响主页面的渲染，可以优化用户的体验，提高性能

特点：

- 异步操作：在Worker里面进行一些运算量比较大的操作（数据处理）或者外部资源加载，避免阻塞主线程。

- 独立的运行环境，Worker里面的代码运行在一个完全独立的上下文，不可以访问到主线程的DOM节点
- 跨线程通信：由于无法访问主线程的DOM节点，我们可以使用特有的通信机制来实现于主线程之间的通信
  - 在主线程里面使用self.onmessage()来监听webworker里面发送的数据
  - 在Worker里面使用postMessage()来向主线程发送消息

#### 47、{} 与[ ]的valueOf()与toString()的结果是什么？

我们需要知道valueOf()与toString()方法的作用是什么？

valueOf()方法：如果是基本数据类型，那么就返回原始值，如果是Object，就将其转换为基本数据类型的值

toString()方法：返回对象的字符串表示

```javascript
const obj={};
const arr=[];
console.log(valueOf(obj));//{}
console.log(toString(arr));//
console.log(toString(obj));//[Object Object]
console.log(toString(obj));//{}
```

#### 48、三种事件模型是什么？



#### 49、介绍一下V8隐藏类？

### 隐藏类的工作原理

为了解决这个问题，V8 引入了隐藏类。当创建一个对象时，V8 会为其创建一个隐藏类。隐藏类包含了对象的属性信息，例如属性名称、属性顺序和属性值类型。

当访问对象的属性时，V8 会使用隐藏类来快速定位属性信息，从而避免了动态查找。如果对象的属性结构发生变化（例如添加或删除属性），V8 会创建一个新的隐藏类来反映新的属性结构。

### 隐藏类的好处

- **提高属性访问速度：** 通过使用隐藏类，V8 可以避免动态查找属性信息，从而提高属性访问速度。
- **优化代码：** V8 可以根据隐藏类信息来优化代码，例如内联缓存（inline caching）。

### 影响隐藏类性能的因素

- **属性添加顺序：** 按照相同的顺序添加属性可以确保对象共享相同的隐藏类。
- **属性类型：** 避免混合使用不同类型的属性值（例如数字和字符串）。
- **动态添加属性：** 尽量避免在对象创建后动态添加属性，因为这会导致创建新的隐藏类。



#### 50、AMD和CMD规范的区别？说一下CommonJs、AMD和CMD

CommonJS、AMD 和 CMD 是 JavaScript 模块化规范的代表，它们在模块化开发中发挥着重要作用。

**1. CommonJS：**

- **特点**：主要用于服务器端（Node.js）的模块化开发。
- **特点**：采用同步加载模块的方式，使用 `require()` 导入模块，`module.exports` 导出模块。
- **优点**：适合于服务端开发和同步加载场景。

**2. AMD (Asynchronous Module Definition)：**

- **特点**：主要用于浏览器端的异步模块加载。
- **特点**：采用异步加载模块的方式，定义模块时可以立即执行，使用 `define()` 定义模块，`require()` 异步加载依赖。
- **优点**：适合于浏览器端开发和异步加载场景，能够提高页面加载速度。

**3. CMD (Common Module Definition)：**

- **特点**：也是一种用于浏览器端的模块定义规范。
- **特点**：与 AMD 类似，采用异步加载模块的方式，但在依赖加载上有区别，CMD 是延迟引入依赖。
- **优点**：相对于 AMD 更注重代码的简洁和易读，更符合国内开发者的编程习惯。

**区别和总结：**

- **CommonJS vs. AMD/CMD**：CommonJS 适用于同步加载，主要用于服务器端；AMD/CMD 适用于异步加载，主要用于浏览器端。
- **AMD vs. CMD**：AMD 是提前加载所有依赖，适用于浏览器端异步加载；CMD 是延迟加载依赖，适用于简洁易读的模块定义。

选择模块化规范取决于应用场景和个人偏好。在现代前端开发中，通常会使用 ES6 的模块化语法，通过 `import` 和 `export` 来实现模块化，同时可以使用工具如 Webpack 或 Rollup 来打包和管理模块。

## 51、JavaScript 运行机制

JavaScript 是一种单线程、非阻塞、异步的脚本语言，其运行机制主要涉及以下几个方面：

**1. 引擎 (Engine):**

* 负责解析和执行 JavaScript 代码。
* 主流引擎包括 V8 (Chrome, Node.js)、SpiderMonkey (Firefox)、JavaScriptCore (Safari)。
* 引擎工作流程：
    * **解析：** 将 JavaScript 代码解析为抽象语法树 (AST)。
    * **编译：** 将 AST 转换为字节码或机器码。
    * **执行：** 执行编译后的代码。

**2. 运行时环境 (Runtime Environment):**

* 提供 JavaScript 代码执行所需的环境，包括：
    * **全局对象 (Global Object):** 提供全局变量和函数，例如 `window`、`document`、`setTimeout` 等。
    * **堆 (Heap):** 用于存储对象和函数。
    * **栈 (Stack):** 用于存储执行上下文和函数调用。

**3. 执行上下文 (Execution Context):**

* 执行 JavaScript 代码的环境，包括：
    * **变量对象 (Variable Object):** 存储当前作用域内的变量、函数声明和函数参数。
    * **作用域链 (Scope Chain):** 用于解析变量和函数的引用。
    * **this 值：** 指向当前执行代码的对象。

**4. 事件循环 (Event Loop):**

* 用于处理异步操作，例如：
    * **定时器 (setTimeout, setInterval):** 在指定时间后执行代码。
    * **事件监听器 (addEventListener):** 响应用户交互或其他事件。
    * **网络请求 (fetch, XMLHttpRequest):** 从服务器获取数据。
* 事件循环的工作原理：
    * 维护一个任务队列 (task queue)，用于存储待执行的异步任务。
    * 当主线程执行栈为空时，事件循环会从任务队列中取出任务并执行。

**5. 异步编程：**

* JavaScript 通过回调函数、Promise、async/await 等机制实现异步编程。
* 异步编程允许代码在等待异步操作完成的同时继续执行其他任务，避免阻塞主线程。

**6. 垃圾回收 (Garbage Collection):**

* 自动回收不再使用的内存，避免内存泄漏。
* 主流垃圾回收算法包括标记清除、引用计数等。

**示例：**

```javascript
console.log('1'); // 同步任务，立即执行

setTimeout(() => {
  console.log('2'); // 异步任务，在 1 秒后执行
}, 1000);

console.log('3'); // 同步任务，立即执行
```

**输出：**

```
1
3
2
```

**解释：**

* 首先，同步代码 `console.log('1')` 和 `console.log('3')` 立即执行并输出。
* 然后，`setTimeout` 创建一个异步任务，并在 1 秒后将回调函数添加到任务队列中。
* 当主线程执行栈为空时，事件循环从任务队列中取出回调函数并执行，输出 `2`。 

**总结：**

JavaScript 的运行机制是单线程、非阻塞和异步的。引擎负责解析和执行代码，运行时环境提供执行所需的环境，事件循环处理异步操作，异步编程机制允许非阻塞代码执行。理解 JavaScript 运行机制有助于编写高效、可靠的 JavaScript 代码。



#### 52、浏览器渲染原理？

- 浏览器解析HTML生成DOM树
- 浏览器解析CSS生成CSSOM树
- 浏览器将DOM树与CSSOM树合并，生成渲染树，渲染树只包括需要显示的元素和他们的样式信息，例如不可见元素（如 `display: none`）将被忽略。
- 布局，根据渲染树计算每个元素的大小和位置
- 绘制，浏览器将元素绘制到屏幕上。

#### 53、可迭代协议 (Iterable Protocol)

**可迭代协议** 是一种约定，它定义了对象如何与 `for...of` 循环和其他迭代机制进行交互。符合可迭代协议的对象称为 **可迭代对象 (iterable)**。

**核心要求：**

* 可迭代对象必须实现一个名为 `@@iterator` 的方法 (Symbol.iterator)。
* `@@iterator` 方法必须返回一个迭代器对象 (iterator)。

**迭代器对象 (Iterator):**

* 迭代器对象是一个具有 `next()` 方法的对象。
* `next()` 方法每次调用都返回一个包含 `value` 和 `done` 属性的对象：
    * `value`：当前迭代的值。
    * `done`：一个布尔值，指示迭代是否结束。

**示例：**

```javascript
const myIterable = {
  [Symbol.iterator]() {
    let index = 0;
    return {
      next() {
        if (index < 3) {
          return { value: index++, done: false };
        } else {
          return { done: true };
        }
      },
    };
  },
};

for (const value of myIterable) {
  console.log(value); // 输出 0, 1, 2
}
```

**内置可迭代对象：**

* 数组 (Array)
* 字符串 (String)
* Map
* Set
* arguments 对象

**可迭代协议的用途：**

* 使用 `for...of` 循环遍历可迭代对象。
* 使用扩展运算符 (`...`) 将可迭代对象展开为参数列表或数组元素。
* 使用解构赋值 (`[a, b] = iterable`) 从可迭代对象中提取值。
* 与其他迭代机制 (例如 `Array.from()`) 进行交互。

**可迭代协议的优势：**

* 提供了一种统一的方式来处理不同类型的数据集合。
* 简化了迭代代码，使其更易读、更易维护。
* 允许自定义对象实现迭代行为。

**总结：**

可迭代协议是一种重要的 JavaScript 机制，它定义了对象如何与迭代机制进行交互，为处理各种数据集合提供了一致的方式。



### 54、Nginx 使用 History 模式刷新页面保持状态

在 Nginx 使用 history 模式时，刷新页面可能会导致 404 错误，因为 Nginx 默认只会处理静态文件请求。为了确保页面在刷新时不丢失状态，需要进行以下配置：

**1. 配置 try_files 指令：**

在 Nginx 的 location 块中添加 `try_files` 指令，将所有请求都指向 index.html 文件。这样，即使请求的 URL 不存在，Nginx 也会返回 index.html，由前端路由处理实际的页面内容。

```nginx
location / {
  try_files $uri $uri/ /index.html;
}
```

**2. 配置 index 指令：**

确保 `index` 指令包含 index.html 文件。

```nginx
index index.html;
```

**3. 配置 error_page 指令 (可选):**

如果希望在找不到文件时返回自定义的错误页面，可以配置 `error_page` 指令。

```nginx
error_page 404 /404.html;
```

**4. 前端路由配置：**

确保前端路由使用 history 模式，并在路由配置中处理 404 错误。例如，在 Vue Router 中，可以使用 `*` 路径匹配所有未匹配的路由，并将其重定向到主页面或错误页面。

```javascript
const router = new VueRouter({
  mode: 'history',
  routes: [
    // ...其他路由配置
    { path: '*', component: NotFoundComponent } // 匹配所有未匹配的路由
  ]
})
```

**5. 部署静态文件：**

将前端构建生成的静态文件 (例如 index.html、JavaScript 文件、CSS 文件等) 部署到 Nginx 指定的目录下。

**示例配置：**

```nginx
server {
  listen 80;
  server_name example.com;

  root /path/to/your/app;
  index index.html;

  location / {
    try_files $uri $uri/ /index.html;
  }
}
```

**总结：**

通过以上配置，Nginx 会将所有请求都指向 index.html 文件，由前端路由处理实际的页面内容，从而确保页面在刷新时不丢失状态。

**注意：**

* 确保前端路由配置正确，能够处理所有可能的 URL。
* 如果使用自定义错误页面，确保其路径正确配置。
* 确保静态文件部署到 Nginx 指定的目录下。



### 55、mouseover与mouseenter的区别？

**触发时机：**

* **`mouseover`**: 鼠标进入目标元素或其**任何子元素**时触发。
* **`mouseenter`**: 鼠标进入目标元素时触发，**不包括子元素**。

**冒泡机制：**

* **`mouseover`**: 会冒泡，鼠标进入子元素时，父元素的 `mouseover` 事件也会触发。
* **`mouseenter`**: 不会冒泡，只在真正进入**目标元素**时触发。

**应用场景：**

* **`mouseover`**:  适合需要监听鼠标进入元素**及其子元素**的场景，比如：下拉菜单（鼠标在菜单里面移动的时候这个菜单不会收起）、工具提示。
* **`mouseenter`**:  适合只需监听鼠标进入元素**本身**的场景，比如：统计元素的鼠标进入次数、实现特定效果，尤其是不需要考虑子元素的场景。

总的来说，`mouseenter` 比 `mouseover` 更精确，因为它只关注目标元素本身的鼠标进入行为。 在实际应用中，需要根据具体需求选择合适的事件类型。



### 56、说一下apply、bind与call的区别？

首先这三个方法都会修改this的指向，具体的区别:

apply与call接受的参数是不同的，c**all接受的是逐个参数，apply接受的是一个参数数组**，返回的是函数执行后的值

bind，接受的参数也是逐个的参数，使用这个方法后，他的**返回值是一个函数**，需要我们去手动调用才可以得到最后的结果

具体的实现可以看下面的自定义的代码：

```javascript
//下面的代码是apply的自定义实现

Function.prototype.myApply = function (context, args) {
  console.log("输出传递的参数,", args);
  context = context || window;

  const key = Symbol();

  context[key] = this;

  //   这里的参数为什么不使用展开运算符,这个需要看你的this指向的函数接受的参数的数量吗,本例中,这个sayHello函数只接受一个参数,所以就不需要展开了
  //   ,如果使用展开运算符的话,我们需要确保数组里面的元素个数与函数接受的参数保持一致
  const result = context[key](args);

  delete context[key];

  return result;
};

function sayHello(message) {
  return `${message} ,${this.name}`;
}

const obj = {
  name: "jie",
};

const msg = sayHello.myApply(obj, ["hello", "早上好啊!", "sdhfiushiu"]);
console.log("输出msg:", msg);
```

下面是call方法的实现(仅仅供参考)

```javascript
Function.prototype.myCall = function (context, ...args) {
  context = context || globalThis;
  const key = Symbol();
  context[key] = this;
  const result = context[key](...args);
  delete context[key];
  return result;
};

function sayHello(message) {
  return `${message} ,年纪仅仅${this.age}的${this.name}`;
}

const person = {
  name: "jie",
  age: "18",
};
console.log(sayHello.myCall(person, "你好啊！")); //你好啊！ ,年纪仅仅18的jie

```

### 57、手写一下promise.all方法？

下面是一个简单的实现 `Promise.all` 方法的例子。在这个实现中，我们将创建一个名为 `promiseAll` 的函数，它接受一个 Promise 数组并返回一个新的 Promise，该 Promise 将在所有输入 Promise 完成时解决，或在其中一个 Promise 被拒绝时拒绝。

#### `promiseAll` 实现

```javascript
function promiseAll(promises) {
    return new Promise((resolve, reject) => {
        // 校验输入是否是数组
        if (!Array.isArray(promises)) {
            return reject(new TypeError('The argument must be an array.'));
        }

        let results = [];
        let completedCount = 0;

        promises.forEach((promise, index) => {
            // 确保每个元素都是一个 Promise
            Promise.resolve(promise)
                .then(value => {
                    results[index] = value; // 存储结果
                    completedCount++;

                    // 如果所有 Promise 都已完成，解决主 Promise
                    if (completedCount === promises.length) {
                        resolve(results);
                    }
                })
                .catch(reject); // 只要有一个 Promise 被拒绝，就拒绝主 Promise
        });

        // 处理空数组情况
        if (promises.length === 0) {
            resolve(results); // 返回一个空数组
        }
    });
}
```

#### 使用示例

以下是如何使用 `promiseAll` 的示例：

```javascript
const p1 = Promise.resolve(3);
const p2 = new Promise((resolve) => setTimeout(resolve, 100, 'foo'));
const p3 = new Promise((resolve, reject) => setTimeout(reject, 200, 'bar'));

promiseAll([p1, p2, p3])
    .then(result => {
        console.log(result); // 不会被调用，因为 p3 被拒绝
    })
    .catch(error => {
        console.error(error); // 输出：bar
    });

// 测试空数组
promiseAll([]).then(result => {
    console.log(result); // 输出：[]
});
```

#### 解释

1. **参数检查**：
   - 检查传入的参数是否为数组。如果不是，立即拒绝 Promise。

2. **结果存储**：
   - 使用 `results` 数组来存储每个 Promise 的结果，`completedCount` 用于跟踪已完成的 Promise 数量。

3. **遍历 Promise**：
   - 对每个 Promise 使用 `Promise.resolve` 来确保即使传入的不是 Promise，也能正常处理。
   - 在每个 Promise 成功时，将结果存入 `results` 数组，并增加 `completedCount`。
   - 当所有 Promise 都完成时，调用 `resolve(results)`。
   - 一旦任何 Promise 被拒绝，调用 `reject`，并停止进一步处理。

4. **处理空数组**：
   - 如果传入的是一个空数组，直接解决 Promise 并返回一个空数组。

这样就实现了一个简化版的 `Promise.all`。如果你还有其他问题或需要更详细的说明，请告诉我！






















