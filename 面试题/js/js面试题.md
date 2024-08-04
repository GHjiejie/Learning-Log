---

---

#### 1、js的数据类型有哪些，他们有什么区别？

基本数据类型：String、Number、boolean、BigInt、null、undefined、Symbol

引用数据类型：Object、Array、Date、RegExp、Function、map、set等

基本数据类型是存储在栈里面的，引用数据类型是存储在堆里面的。

请判断代码的输出结果？

```javascript
let a={name:'Jie'};
let b=a;
a={};
console.log(b);
请问输出结果是什么？
结果是{name:'Jie'}
```



#### 2、如何判断js的数据类型？

判断基本数据类型：typeof(这个其实是实际开发中使用最多的方法，因为简单)

判断引用数据类型：instaceof,那么，你可以自己实现一个instanceof吗？

**首先你需要知道instanceof是如何实现的？**

- instanceof是通过不断在原型链里面查找实现的，如果找到，返回true，如果找不到，返回false

```javascript
function myInstaceof(obj, classObj) {
      if (obj === null || obj === undefined) {
        return false;
      }
      let proto = obj.__proto__;
      let classObj_prototype = classObj.prototype;
      while (true) {
        if (proto === null) {
          return false;
        } if (proto === classObj_prototype){
          return true;
        }
        proto = proto.__proto__;
      }
    }
```

也可以使用construct方法来实现，但是有一个缺点，就是看可以随意设置一个类型的的构造器。

**我们同时提出问题：谈谈你对construct的看法？**

最实用的方法：Object.prototype.toSting.call();

**那么为什么他可以判断基本上所有的数据类型？**

在js里面，万物皆对象，

**如果是引用数据类型**，那么我们一直顺着他的原型链去找，最终的原型一定是Object，因为Object.__proto__的值为null(是杠杠proto杠杠)，而Object里面一定是含有toString方法，这个方法Object.prototype.toSting的作用是返回对象类型的字符串表示

**如果是基本数据类型**，那么就是涉及应该概念，就是自动装箱（AutoBoxing)。

#### 3、什么是自动装箱（AutoBoxing)?

我们知道基本数据类型有七种：Number  String  Symbol  BigInt undefined null Boolean

##### 除了null和undefined外，都可以实现自动装箱

那么自动装箱是如何实现的呢？

首先需要知道，如果没有使用对应的方法或者属性的时候，那么js就不会对这个变量实现自动装箱。

那么实现自动装箱的步骤如下(以String为例子)：

```javascript
const str='hello';
console.log(str.length);//输出5

//那么实际上js对他做了什么呢？
const str=new String('hello');
console.log(str.length);//输出5
```

其他的基本类型的变量的自动装箱的实现类比如上



#### 4、当你使用new操作符的时候，实际上发生了什么？你可以自己封装一个new方法吗？

我们为什么要使用new操作符，使用new操作符实际上是实例化一个构造函数的实例，而我们要实例化一个构造函数的话，那么这个构造函数的内部就不可以有显示的返回值，否则使用new操作符的意义就失去了（而我们实际上这个构造函数是有返回的值的，是隐式的返回this,所以我们需要在自定义的方法里面，修改this的指向，指向构造函数创建的实例对象。基本思路如上，下面看步骤：

- 创建一个空的对象
- 将这个空的对象的原型指向构造函数的原型
- 将构造函数里面的this指向指向为实例化的对象，同时设置变量接受这个值
- 判断变量是否是Object的实例，如果是，直接返回，如果不是，直接返回我们第一步声明的对象

实例代码如下：

```javascript
function myNew(Func,...args){
    let obj={}；
    obj.__proto__=Func.prototype;
    //也可以将上面两步合并为一步
    let obj=Object.create(Func.prototype);//Object.create(arg1)方法就是将定义的变量的原型指向arg1，是的obj可以继承Func的属性和方法
    let result=Func.apply(obj,args);
    return result instanceof Object ? result :obj;
}
function Person(name){
    this.name=name;
    //return this  这一步其实不用写，会隐式返回。
 }
const p=myNew(Person,'Jie');
console.log(p);//{name:'Jie'}
```

#### 5、剩余参数和arguments都是类数组吗？

是的，他们都是类数组，为什么呢？

- 他们有与数组相同的结构
- 可以通过下标访问到
- 有length属性
- 他们没有真正的数组对象所具有的方法，比如pop()、push()等，也访问不到Array原型链上面的方法

#### 6、你是如何理解临时死区的？

临时死区就是在let或者const声明变量之前对其的访问，造成程序报错（我们引入临时死区的话就是提升安全性，避免变量在未声明之前就访问），如果使用var是实现的话，就不存在这样的情况，因为var会将变量的声明提升到块级作用域的顶部 

#### 7、创建函数的方式有哪些？

- 直接使用关键字function 

  ```javascript
  function add(a,b){
      return a+b;
  }
  ```

- 使用构造函数(使用场景最少，我还没有见过)

  ```javascript
  const add=new Function('a','b','return a+b');
  ```

- 使用箭头函数

  ```javascript
  const add=(a,b)=>{
  	return a+b;
  }
  ```

  

#### 8、如何判断一个函数是不是通过new关键字调用的？(或者说判断一个函数是否作为构造函数被调用？)

使用instanceof判断，但是有局限性，就是我可以修改函数的原型，比如下面的代码：

```javascript
function Person(name){
    if(this instanceof Person){
        this.name=name;
    }else{
        throw new Error('必须通过new关键字来调用Person');
    }
}
const test=new Person('Jie');//代码不报错
const test2=Person('xiaoming');//代码报错
//但是可以修改原型，因为我们知道instanceof检测数类型实际上是在原型链里面遍历搜索，所以我们可以使用bind、apply、call来修改test2的this指向
const test3=Person.call(Person,'Xiaohu');//代码不报错
```

所以基于上面的缺陷，我们有一个更加完美的方法，使用new.target(我们称之为元素属性)实现判断

那么什么是new.target，主要用途就在这，我们将上面的判断条件换位new.target===Person即可,这样即使使用call、bind、apply修改this指向，代码也会报错。

#### 9、bind、apply与call的区别？

首先，这三个方法都可以实现对this指向的修改

区别：call(thisArg,arg1,arg2,.......)

apply(thisArg,[argsArray])

bind(thisArg,arg1,arg2,....)

call()与bind()接受的参数完全相同，不同点是使用call()的话会同时进行对函数的调用，而使用bind()的化实际上是修改完里面的this指向后返回一新个函数，我们可以使用变量接受他，最后在需要是调用即可。

apply()与call()的区别主要是接受的参数不同(第一个的thisArg都是一样的),thisArg之后的参数，call()是直接接受，而apply()是以数组接受。

我们以代码来说明：

```javascript
//call
function Person(name,age){
    this.name=name;
    this.age=age;
}
 function greet() {
      console.log(`Hello, I'm ${this.name}, I'm ${this.age} years old.`);
}

const person=new Person('Jie',18);

//使用apply
greet.apply(person,['Jie',18]);

//使用call
greet.call(person,'Jie',18);

//使用bind
const greetPerson=greet.bind(person,name,age);
greetperson();//输出：Hello, I'm Jie, I'm 18 years old.

```

#### 10、你可以自己封装一下bind、apply、call三个函数吗？

#### 11、js实现继承的方法有哪些？

#### 12、怎么判断两个对象是否相等？如何判断空对象？

如何判断两个对象是否相等：

- 因为对象里面的内容是存放在堆内存里面的，可以判断两个对象是否指向同一个内存地址
- 使用lodash库里面的isEqual方法
- 自己编写一个递归函数，比较里面的属性是否相等

如何判断空对象：

- 对象具有可枚举属性，可以通过Object.keys()来取出一个对象的所有可枚举属性，这个函数返回的是一个数组，我们可以通过判断数组的长度是不是0来判断这个对象是不是为空，代码如下：

```javascript
const testObj={
    name:'jie';
}

function obj_null(Obj){
    if(Object.keys(obj).length==0){
        console.log('对象为空')
    }else{
        console.log('对象不为空')
    }
}
obj_null(testObj);
```

- 也可以通过json.stringify()来判断，如果是空对象的话，那么返回的是一个{}，判断返回的字符串的长度是不是2或者判断返回的字符串是不是{}即可。
- 最佳方法：使用Reflect.ownKeys()方法判断(为什么呢，因为上面的方法**不会检测到symbol类型**的数据)

#### 13、0.1+0.2为什么不等于0.3？

在js里面，小数是以双精度浮点数格式·表示数字，当十进制的0.1与0.2转换为二进制是，他们都是一个无限循环的小数，所以会发生精度丢失，导致最后的结果不为0.3.

#### 14、强制类型转换、隐式类型转换分别是什么，列举场景说明？

强制类型转换又称之为显式类型转换，

隐式类型转换是js在运行过程中根据上下文进行的自动类型转换

#### 15、==与===的区别？

=== :

- 会先比较两个数据的类型，如过数据类型不同的话，会直接return false,如果相同，再会比较他们的值，如果值也相同，就return true,否则return false

==:

- 首先会比较需要比较的两个数据的数据类型，如果数据类型不同，会发生隐式类型转换，再比较他们的值，如果值相同的话，就return true ，否则return false.

那么面试官再问，隐式类型转换是怎么转的，比如说一下代码：

```javascript
console.log(true == 1);//true
console.log('1' == 1);//true
```

#### 16、隐式类型转换的规则？

- 如果任意一个操作数是布尔值，那么会先将其转换为数值再进行比较

- 如果有字符串和数值，那么会将字符串转换为数值，这个字符串内容必须是数字或者是以科学计数法表示的数字字符串，这样将其装换为数字后才可以与另一个数值进行比较。

  ```javascript
  console.log(12=="1w") //false
   
  我们分析一下这个转换的过程？？
  实际上者这个不会转换，因为另一个操作符里面含有非数字的字符串，其实在转换过程中，就会变为NaN，not a number,那么这个NaN与任何数据类型进行比较，最后返回的都是false
  ```

- 如果有一个操作符是对象，另一个操作符不是，那么会调用valueOf()方法获取对象的原始值，再根据前面的规则进行比较,那么这种情况下应该怎么解释呢？

- null和undefined相等
- null和undefined不可以转换为其他的类型再进行比较

补充：valueOf是一些包装类型和引用数据类型都具有的方法，用于返回对象的原始值

#### 17、当a=?时，下面的条件成立？

```javascript
if(a == 1 && a == 2 && a == 3){
    console.log('Hello World!');
}
```

这个题实际上就是问valueOf()方法

首先判断所有的基本数据类型都满足不了上面的条件。所以a一定时引用数据类型，是一个对象

```javascript
const a={
    value:0,
    valueOf(){
        return this.value++;
    }
}
```

#### 18、javascript创建对象的几种方式？

- 使用对象字面量直接创建

```javascript
const obj={
    name:'Jie'
}
```

- 使用构造函数创建

```javascript
const obj =new Object();
obj.name='jie'
```

- 使用构造函数创建

```javascript
function Person(name){
    this.name=name;
}
const person=new Person('Jie');
```

- 使用class关键字

```javascript
class Person{
    construct(name,age){
        this.name=name;
        this.age=age;
    }
    greet(){
        console.log('helle'+this.name);
    }
}

const person=new Person('Jie',18);
person.greet();
```

#### 19、列举宿主对象、内置对象、原生对象并说明其定义？

宿主对象：是由宿主环境(如node环境和浏览器环境)提供的对象，不属于ECMAscript标准规范中的对象.

内置对象：是js语言核心提供的对象，包括全局对象和函数对象(由 JavaScript 语言规范提供，可以直接使用，无需额外引入。)

原生对象：是js语言本身提供的对象，属于标准的一部分(由 JavaScript 语言规范提供，用于处理基本数据类型和操作。)

#### 20、null与undefined的区别？

null表示无论是在栈内存还是堆内存中，都没有存放他的地址（或者说是一个空指针），undefined表示被定义，但是没有被赋值

#### 21、什么情况下会返回undefined值？

- 变量声明但是没有初始化
- 函数没有显示返回值
- 数组越界
- 访问的对象属性不存在
- ...

#### 22、如何区分数组和对象？

- 通过construct访问他的构造函数

```javascript
const arr=[1,2,3];

const obj={
	name:'Jie'
}

console.log(arr.constructor==obj.constructor);//false
```

- 看能不能访问到数组特有的方法
- 通过原型判断

```javascript
const arr=[1,2,3];
const obj={
    name:'Jie'
}
  if (arr.__proto__ == Array.prototype) {
      console.log('数组')
    }
  if (obj.__proto__ == Object.prototype) {
      console.log('对象')
    }
```

- 通过instanceOf判断
- 通过Array.isArray()判断

```javascript
const arr=[1,2,3];
const obj={
    name:'jie'
}

console.log(Array.isArray(arr));//true
console.log(Array.isArray(obj));//false
```

#### 23、多维数组如何降维？

如果是二维数组降维到一维：

- 使用展开运算符搭配contact将数组连接(最外面使用一个空数组作为接受)，请看我的表演：

```javascript
const arr1=[1,2,3,[4,5,6]];
//在最外层需要使用空数组接受使用concat连接的数组
const newArr=[].contact(...arr1);
console.log(newArr);//[1,2,3,4,5,6]
```

- 使用reduces实现

```javascript
const arr=[1,2,3,[4,5,6]];
const newArr=arr.reduce((acc,curr)=>acc.contact(curr),[]);
console.log(newArr);//[1,2,3,4,5,6];
```

显然，上面的两种方法只可以实现对二维数组的降维，接下来我们实现对多维数组的降维：

- **使用flat**:**`flat(depth)`** 方法创建一个新的数组，并根据指定深度递归地将所有子数组元素拼接到新的数组中。其中depth参数指定要提取的嵌套数组的结构深度，默认为1

```javascript
const arr=[1,2,3,[4,5,[6,7,8]]];
const newArr=arr.flat(2);//由于我们是三维降到一维(也就是数组里面嵌套了两层数组),所以depth为2
//不理解的话直接用维度相减即可，3-1=2
console.log(newArr);//[1,2,3,4,5,6,7,8];
```

- 使用递归+reduce

```javascript
const arr=[1,2,3,[4,5,[6,7]]];
function DR(array){
    return array.reduce((acc,curr)=>acc.concat(Array.isArry(curr) ? DR(curr) : curr),[]);
}
const newArr=DR(arr);
console.log(newArr);
```

#### 24、怎么获取当前日期（年-月-日 时：分：秒）？

主要就是使用正则表达式将原来的/换为-

```javascript
const date=new Date();
let mydate=date.toLocaleString();
mydate=mydate.replace(new RegExp(/\//g),'-');
console.log(mydate);
```

#### 25、什么是类数组（伪数组），如何将其转换为真实数组？

伪数组就是这个数据具有与数组类似的结构，可以通过下标访问，也有length属性，但是却访问不到Array原型上的方法，比如pop,forEach,shift等

转换方法以(arguments为例)：

- 使用Array.from(arguments)
- 将Array.prototype.slice.call里面的this转为arguments
- 使用展开运算符

#### 26、如何遍历对象的属性？

- 使用Object.keys()访问对象的所有可枚举属性（缺点，symbol不会被显示出来）
- 使用Reflect.ownKeys(obj)遍历，这个没有缺点，是完美的
- 使用for  in遍历
- 使用Object.getOwnPropettyNames(),返回一个数组，里面包括了这个对象的可枚举属性和不可枚举属性
- 使用Object.entries(),返回一个二维数组，里面的每一个数组包括对象的键和值，所以我们可以使用key,value来清楚的
- 看到里面的结构

#### 27、如何给一个按钮绑定两个onclick事件？

- 直接到DOM元素上注册一个点击事件，然后通过js获取这个DOM元素，使用addEventListener注册点击事件
- 或者直接使用addEventListener直接为元素绑定多个点击事件

#### 28、变量提升是什么，与函数提升的区别？

在es6之前，我们会使用var关键字来声明和初始化一个变量，但是，使用var关键字在声明变量的时候声明会被提前到块级作用域的顶端（同时会被初始化为undefined），变量的初始化不会被提升。es6后，使用const  let关键字就不会有变量的提升情况出现

函数提升是什么情况？当我们使用function关键字创建一个函数时，函数的的声明也会被提升，并且提升的优先级：**函数提升>变量提升**

#### 29、什么是作用域链？如何延长？

作用域链：就是从当前上下文对象开始，如果当前上下文中不存在，就会向上一层的上下文对象查找，直到找到这个变量或者全局上下文为止，这个查找过程中由上下文对象组成的链表结构就是作用域链

延长作用域链的方法：

- 使用嵌套函数（或者说是使用闭包）
- 使用with
- 使用eval

#### 30、如何实现数组的随机排序？

#### 31、dom节点的Attribute和Property有什么区别？

**Attribute**:

- 是HTML标签上定义的属性，是对属性的静态描述
- 我们可以通过setAttribute()和getAttribute()方法来设置或者获取HTML元素上面的属性
- 这些属性都是以字符串的存在的

**Property:**

- 是DOM对象上的属性，以对象的形式存在，

- 动态变化，随着js的操作而改变

#### 32、DOM结构操作怎样添加、移动、复制、创建和查找节点？

创建与添加：使用document.createElement()来创建一个节点，然后通过element.appendChild()来将节点添加到指定的位置

复制节点：使用element.cloneNode(true)来允许一个元素接受element复制后的节点

移动节点：怎么移动？？？

#### 33、什么是事件冒泡，他是如何工作的？如何阻止事件冒泡？

首先我们需要知道什么是**事件流**：

**事件流描述了页面接受事件的顺序**：事件捕获、到达目标、事件冒泡

当我们为一个元素（比如说div）添加一个点击事件的时候

```html
<div class="child"></div>
<script>
const child=document.querySelect('.child');
    child.addEventListener('click',()=>{
        console.log('child');
    })
</script>
```

那么实际上事件是如何传播的呢？

- 首先child节点会等待**事件被捕获**

  事件捕获的过程和事件冒泡的过程是相反的，在本例子中。事件捕获会沿着  docment ->html ->body ->div(child),当事件到达目标元素的时候，就是事件流的第二个阶段：**目标到达**

- 事件到达后，就是**事件冒泡**了，当我们点击这个div的时候，事件会沿着 div(child) ->body->html->docment传播，如果有祖先元素也注册了和div一样的点击事件，那么他们也会被执行

上面我们先说明了什么是事件流，所以接下来回答问题：**什么是事件冒泡？**

事件冒泡就是当我们当前的元素进行dom操作时，这个事件会沿着他的祖先元素传递至docment,如果他的祖先元素也注册了和这个元素一样的事件，那么，事件将依次被触发。

##### 那么，我们如何阻止事件冒泡呢？

- 在目标对象上的事件里面添加e.stopPropagation();

  我们需要为注册的事件传递事件对象e/event

```javascript
<div class="child"></div>
<script>
const child=document.querySelect('.child');
    child.addEventListener('click',(e)=>{
        e.stopPropagation();//阻止事件冒泡
        console.log('child');
    });
</script>
```

##### 有人说可以设置注册事件的第三个参数来阻止事件冒泡，可以吗？

结果是不可以

addEventListener(type,listener,useCapture)

第三个参数只是决定事件是在捕获阶段执行还是在冒泡阶段执行，默认是false,在冒泡阶段执行

设置为true，值表示事件在捕获阶段执行，并不可以阻止事件冒泡

参考以下代码：

```javascript
<body>
  <div id="parent">
    <div id="child">Click me</div>
  </div>

</body>
<script>
  const parent = document.getElementById('parent');
  const child = document.getElementById('child');

  // 捕获阶段事件处理程序
  parent.addEventListener('click', function (event) {
    console.log('捕获阶段 - Parent Element Clicked');
  }, true); // 设置为true，表示在捕获阶段触发

  // 冒泡阶段事件处理程序
  child.addEventListener('click', function (event) {
    console.log('冒泡阶段 - Child Element Clicked');
  });

  parent.addEventListener('click', function (event) {
    console.log('冒泡阶段 - Parent Element Clicked');
  });

  // 其他父元素事件处理程序（冒泡阶段）
  document.body.addEventListener('click', function (event) {
    console.log('冒泡阶段 - Body Element Clicked');
  });

</script>

//点击后输出的结果是
捕获阶段 - Parent Element Clicked
冒泡阶段 - Child Element Clicked
冒泡阶段 - Parent Element Clicked
冒泡阶段 - Body Element Clicked

所以证明了上面的观点！！！
```

#### 34、什么是事件捕获，他是如何工作的 ?

事件捕获就是从文档对象开始，（即docment），沿着dom树一直向下遍历、直到找到目标元素

#### 35、如何让事件先冒泡，后捕获？

无法实现

#### 36、JavaScript动画与CSS3动画有什么区别？

##### CSS3动画：

- 利用硬件加速：利用GPU加速，在支持硬件加速的浏览器中，动画效果会显得更加流畅
- 实现简单：只需要使用少量的代码就可以实现一些常见的动画效果

##### JavaScript动画：

- 灵活性强：可以使用js代码实现复杂的动画效果
- 可定制：可以根据用户的需求或者元素的状态来实现动画的是实现
- 性能开销比较大：使用js实现复杂的动画效果时，性能开销会比较大，可能会导致页面卡顿

#### 37、dom事件模型？

事件、事件目标、事件流、事件类型、事件处理程序

#### 38、事件三要素是什么？

**事件源**：触发事件的具体对象或元素

补充，那么我们如何获取事件源？，我们知道js里面的事件对象是e/event,这个对象里面有一个属性为target,所以我们使用e.target或者event.target就可以获取事件源（通常是一个dom元素）

**事件类型**：就是事件的种类什么的，比如click,mouseover什么的

**事件处理程序**：事件发生时应该执行的操作或者逻辑

#### 39、如何获取元素的位置？

- 使用element.**getBoundingClientRect()**方法：这个方法返回的是一个DOMRect对象，里面包含元素相对与视口的位置与元素自身的大小
- 通过js获取元素后，通过属性访问

#### 40、如何绑定事件，如何解除事件？

绑定事件：

- 直接在元素上注册事件
- 使用addEventListener()注册事件

解除事件：

- 使用removeEventListener(type,listener,useCapture)

  注意,我们在注册事件时，如果设置了useCapture分别为false与true的情况下，我们需要分别解除对这两次事件的绑定

#### 41、对事件委托的理解？

事件委托就是将需要绑定在子元素身上的事件绑定到父元素身上，通过对事件源的判断，执行正确的逻辑与操作，如果子元素很多，那么我们就可以减少很多事件绑定，从而提高性能。

#### 42、setTimeout与setInterval的区别与用法是什么？

**setTimeout(functionRef, delay):**是延迟delay秒后执行functionRef里面的代码

**setInterval(callback, interval)**:每过interval秒后执行代码（代码的重复执行）

总结：如果只需要在延迟时间后只执行一次任务，使用setTimeout，如果是重复执行任务，使用setInterval

需要注意的是，用于js是单线程，所以可能会存在时间上的细小误差。

#### 43、岗位轮换setTimeout()来实现setInterval()?

#### 44、document.write与innerHTML有什么区别？

执行document.write时会清空页面上的所有结点，然后将内容插入页面，会导致页面的重绘和重排，影响性能，所以通常会在页面加载期间使用，如果在页面加载后使用，就会导致上面的情况发生。

使用innerHTML就不会发生这种情况，他可以在页面加载的任何过程使用，但是存在安全性问题，就是他插入的字符串会被当作HTML代码，如果这个代码是不受信任的，那么可能会造成安全问题。

**使用时机：**

- **`document.write()`：** 只能在页面加载阶段使用。如果在页面加载完成后使用，它会覆盖整个页面内容。
- **`innerHTML`：** 可以在页面加载完成后使用，并且只会更新指定元素的内容，不会影响整个页面。

**2. 内容类型：**

- **`document.write()`：** 可以插入任何 HTML 内容，包括文本、标签、脚本等。
- **`innerHTML`：** 主要用于插入 HTML 标签和文本内容。如果插入脚本，默认情况下不会执行。

**3. 性能：**

- **`document.write()`：** 会阻塞页面的渲染，直到所有内容都写入完成。这可能会导致页面加载速度变慢。
- **`innerHTML`：** 不会阻塞页面的渲染，因为它只会更新指定元素的内容。

**4. 安全性：**

- **`document.write()`：** 如果插入不受信任的内容，可能会导致跨站脚本攻击 (XSS)。
- **`innerHTML`：** 也存在 XSS 攻击的风险，但可以通过一些方法来缓解，例如使用 `textContent` 属性或对内容进行转义。

**5. 用途：**

- **`document.write()`：** 主要用于动态生成页面内容，例如广告或第三方脚本。
- **`innerHTML`：** 主要用于更新页面内容，例如显示数据、创建元素或修改样式。

**总结：**

`innerHTML` 通常是更安全、更高效的选择，因为它可以在页面加载完成后使用，并且不会覆盖整个页面内容。`document.write()` 则主要用于动态生成页面内容，但需要注意安全性和性能问题。

#### 45、元素拖动如何实现，原理是什么样的？

元素的拖拽是HTML5新增的API,我们只需要在需要开启拖拽的元素上设置draggable=" true"就可以实现元素的拖拽，但是，浏览器默认是不允许元素在页面上的位置存放的。所以，我们需要阻止浏览器的默认行为，同时设置

target元素，用于存放被拖拽的元素。上面仅仅是使用HTML5新增的API,我们也可以自己实现：

```javascript
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Drag and Drop</title>
  <style>
    #draggable {
      width: 100px;
      height: 100px;
      background-color: #ccc;
      position: absolute;
      cursor: move;
    }
  </style>
</head>

<body>

  <div id="draggable"></div>

  <script>
    var draggable = document.getElementById('draggable');
    var offsetX, offsetY;
    // PC端的拖拽事件
    draggable.addEventListener('mousedown', startDrag);

    // 移动端的拖拽事件
    draggable.addEventListener('touchstart', startDrag);

    function startDrag(e) {
      e.preventDefault();

      if (e.type === 'mousedown') {
        offsetX = e.clientX - draggable.getBoundingClientRect().left;
        offsetY = e.clientY - draggable.getBoundingClientRect().top;
        window.addEventListener('mousemove', drag);
        window.addEventListener('mouseup', stopDrag);
      }
      else if (e.type === 'touchstart') {
        var touch = e.touches[0];
        offsetX = touch.clientX - draggable.getBoundingClientRect().left;
        offsetY = touch.clientY - draggable.getBoundingClientRect().top;
        window.addEventListener('touchmove', drag);
        window.addEventListener('touchend', stopDrag);
      }
    }

    function drag(e) {
      e.preventDefault();

      if (e.type === 'mousemove') {
        draggable.style.left = e.clientX - offsetX + 'px';
        draggable.style.top = e.clientY - offsetY + 'px';
      }
      else if (e.type === 'touchmove') {
        var touch = e.touches[0];
        draggable.style.left = touch.clientX - offsetX + 'px';
        draggable.style.top = touch.clientY - offsetY + 'px';
      }
    }

    function stopDrag(e) {
      if (e.type === 'mouseup') {
        window.removeEventListener('mousemove', drag);
        window.removeEventListener('mouseup', stopDrag);
      }
      else if (e.type === 'touchend') {
        window.removeEventListener('touchmove', drag);
        window.removeEventListener('touchend', stopDrag);
      }
    }
  </script>

</body>

</html>
```

#### 46、延迟加载的方式有哪些？

- 使用async与defer来加载script脚本
- 图片懒加载
- 页面无限滚动，
- 对长列表或大数据实现分页加载

#### 47、垃圾回收机制有哪些？具体如何实现？

- 引用计数器：通过跟踪对象的引用计数来判断何时回收内存。当对象的引用计数为0时，说明没有指向该对象的引用，可以安全的释放内存。
- 标记清除：通过从根对象开始标记能够被访问到的对象，然后清除未标记的对象来释放内存。

#### 48、什么是内存泄漏？

内存泄漏就是指在程序运行的过程中，有些没有被使用的变量没有被垃圾回收机制回收或者被释放，仍然贮存在内存中。

**危害**：如果大量的内存泄漏，会导致系统的可用内存减少，导致系统的性能下降设置崩溃。

内存泄漏的常见原因：

- 未释放对象的引用
- 未关闭资源
- 未清除定时器
- 事件监听器未移除

#### 49、数组遍历的方法有哪些，分别有什么特点，性能如何？

for循环、for  in   、for  of  、forEach

从性能上来说，for循环>for of >forEach>for in

特点：

**for循环：**没有突出的特点，性能最好，适合大多数简单的遍历

**for in:**遍历的实际上是数组的下标，需要通过[]语法来访问数组值（补充：for in 遍历的是对象的可枚举属性，不仅限于当前的对象，还会涉及到原型链上的遍历，所以这个方法的性能是最差的）

**for of **:访问的直接是数组里面的值，只有具有可迭代属性才可以使用for of 

**forEach:**也是直接获得数组的值，但是不会被break或者return打断

#### 50、ES5和ES6的区别，ES6新增了什么？

ES6新增的有：

- let于const 
- proxy代理对象
- class类
- Symbol数据类型
- Promise
- 迭代器于生成器
- 箭头函数
- set与map集合
- .........

ES5与ES6的区别：ES6新增了很多语法糖，是对ES5的全面升级，使js开发变得更加便捷，可以在更加复杂的应用场景下使用。

#### 51、ES6的继承和ES5的继承有什么区别？

在ES5使，我们基本上都是通过原型链与修改this的绑定来实现继承，任意出现原型污染和数据共享问题

ES6后，由于引入了class关键字，我们可以使用extends关键字与super实现继承

#### 52、var 、let与const 的区别？暂时性死区如何理解？

使用var设置的变量在全局作用域下都生效，并且变量的声明会被提升，

使用let与const声明的变量都是在其块级作用域生效，并且不会有变量提升，

暂时性死区就是使用在未声明变量之前就访问，尤指使用const和let声明的变量

#### 53、class 、extends是什么，有什么作用？

class是ES6新提出来的关键字，用于定义一个类，extends用于对类的继承。

#### 54、7层是指OSI七层协议模型，主要是：应用层（Application）、表示层（Presentation）、会话层（Session）、传输层（Transport）、网络层（Network）、数据链路层（Data Link）、物理层（Physical）。

#### 55、JavaScript 中的原型与原型链

在 JavaScript 中，原型和原型链是理解面向对象编程的重要概念。它们用于实现继承和代码复用。

##### 原型 (Prototype)

- 每个 JavaScript 对象都有一个原型对象，可以通过 `__proto__` 属性访问。
- 原型对象也是一个对象，它包含了可以被该对象继承的属性和方法。
- 当访问一个对象的属性或方法时，如果该对象自身没有定义，就会沿着原型链向上查找，直到找到为止。

##### 原型链 (Prototype Chain)

- 原型链是由一系列原型对象组成的链式结构。
- 每个对象的原型对象都指向它的构造函数的原型对象，而构造函数的原型对象又指向其构造函数的原型对象，以此类推，直到指向 `null` 为止。
- 当访问一个对象的属性或方法时，JavaScript 引擎会沿着原型链向上查找，直到找到该属性或方法为止。如果最终没有找到，则返回 `undefined`。

#### 56、npm 、yarn 与pnpm有什么区别？

57里面详细说了

[pnpm 是凭什么对 npm 和 yarn 降维打击的](https://juejin.cn/post/7127295203177676837?from=search-suggest)

[幽灵依赖所引出的知识！](https://juejin.cn/post/7226610046833442872)

[幽灵依赖是什么，pnpm出现的意义](https://blog.csdn.net/weixin_59816940/article/details/131395326?utm_medium=distribute.pc_relevant.none-task-blog-2~default~baidujs_baidulandingword~default-0-131395326-blog-140209460.235^v43^pc_blog_bottom_relevance_base9&spm=1001.2101.3001.4242.1&utm_relevant_index=1)

#### 57 .什么是幽灵依赖，怎么解决幽灵依赖?

比如有以下情况，项目安装了包A，包A里面有的功能依赖于包B，我们并没有在项目里面显示安装包B,但是却可以使用包B的功能，这种情况就是幽灵依赖。

我们总结的说，就是  在项目里面使用了，**但是没有在 `package.json`里面显示声明的依赖**！

##### 示例说明

举个例子来说，比如你要初始化一个vue项目，你需要使用 `npm`或者其他的包管理工具去安装 `vue`，这个时候就会在你运行的目录下生成一个 `node_mouldes`，按照常规来说，我的 `package-json`里面的 `dependencies`只有 `vue`这一个包的定义，但是你实际打开 `node_mouldes`，你会发现，里面有许多其他的包，这些包我们并没有在 

`package-json`里面定义，为什么却下载了呢？？？

**最新包管理工具全部使用便扁平化，导致幽灵依赖无法避免**

是因为 `vue`这个包内部依赖其他包，比如A,然后包A又依赖包B........，我们在执行 `npm i vue`的时候，就是将其所依赖的所有包全部下载安装，同时扁平化，全部放到 `node_mouldes`文件夹下面，这里我们就要理解什么是扁平化，在了解之前我们需要了解 npm 、yarn、pnpm的发展历史。

##### npm发展历史于yarn和pnpm的引入

在早期的npm（npm < 3）时，如果我的package-json里面定义了包A和包B，我们在执行npm i 的时候就会去下载他们的依赖，比如A里面依赖C和D,B里面依赖C和E,那么我们在node_modules里面看到的依赖包的文件夹实际只有两个，一个是A,一个是B,但是A和B目录下面还又node_moudles,里面又C和D等，这个时候我们就会发现其实C这个包被安装了两次，如果我们其他的包里面还依赖了C这个包，那么实际上就一直在重复操作，也就是说C这个包会被反复安装，这样就会浪费极大的内存资源（如果项目非常大的话。(可以借助二叉树来辅助思考，每一个根节点是你package-json里面定义的依赖包，下面的分支是这个依赖包所依赖的包，每个节点都是独立的)

所以 `faceBook`就开发了 `yarn`这个包管理工具，那么这个这个管理工具的优点相比于之前的npm是什么呢？就是实现扁平化，yarn团队将这些依赖全部放在node_module下，如果我们其他的包依赖的包已经在node_module下时，就不会再去重新下载这个包了，如果从树的角度去思考的话，就是说这个树的高度只有2。

后面npm团队也使用了这种扁平化的想法(npm > 3)，（实际上里面其实还有嵌套的node_moudles,因为一个包是可能有多个版本的，提升只能提升一个，所以后面再遇到相同包的不同版本，依然还是用嵌套的方式。）但是他们都有一个问题，那就是**幽灵依赖**

那么如何去解决幽灵依赖呢？

我们可以使用pnpm这个包管理工具,我们可以使用npm安装一下vue，然后看一下node_modules文件夹，

这个文件夹下面只有 `.pnpm .modules.yaml 和你在package-json里面的依赖包的名称（或者说项目的直接依赖） `，

这个时候我们需要理解这三个文件的作用

**`./node_modules/.pnpm`:virture store 就是我们所说的虚拟store**

**`.modules.yaml`:配置文件，里面记录了虚拟store的位置，全局store的位置，需要注意，全局store一般是存储在本地的文件夹里面的，这个文件是有说明的**

**`package-json定义的直接依赖包`**

虚拟store里面的依赖包是直接存放在全局store的，都是这些包的依赖包是通过软连接来实现相互依赖的

也就是说，所有的依赖都是从全局 store 硬连接到了 node_modules/.pnpm 下，然后之间通过软链接来相互依赖。

**所以我们使用pnpm这个包管理工具就可以解决幽灵依赖与重复下载相同的包的问题**

![](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/326a2090786e4d16b2d6fce25e876680~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

![](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/93da1a4ff7a0465d83afb4eee88e9464~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

幽灵依赖的缺点：

- 如果包A更新后移除了对包B的引入，但是自己的项目里面还是使用到了包B的某些功能，那么就会导致代码报错。

怎么解决幽灵依赖？





















