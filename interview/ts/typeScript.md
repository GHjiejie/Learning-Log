### Typescript 与JavaScript的主要区别？

- 类型不同

  `javaScript`是动态类型的脚本语言，当你为变量赋值的时候，变量的类型会在代码运行时确定，因为`js`他时没有编译时的。

  `typescript`是静态类型的编译语言，他是`javascript`语言的超集。浏览器或者node是无法直接去识别ts代码的，所以会对代码在代码运行时会先进行代码的编译，而变量类型的检查，就会在编译阶段去执行，也就是说，在编译阶段，你就可以发现代码的错误！

- ts可以使用接口，即`interface`和`class`来和实现继承，`js`是使用原型链与`class`来实现继承

- 生态系统，javascript的生态系统要比typescript更大

  js诞生于1995，至今有30年了，生态强大，同时node.js的出现让js同时可以进行服务端开发

### Ts定义变量类型的方法？

- 类型注解（就像go和java一样，在声明变量的时候主动

  `let num:number=6`

  `let str:string='hello world!'`

- 类型断言(代码字编译时会自动推断变量的类型)

  `let num=5`

  `let str='hello'`

### ts中的类型注解（`type annotation`）你怎么看？

- 可以声明变量的类型

- 可以声明函数参数的类型和返回值的类型

- 可以使用类型别名定义对象的结构

  ```typescript
  type Person{
  	name:string;
  	age:number
  }
  ```

### ts里面类型别名和交叉类型

**类型别名**：

可以使用类型别名来定义对象的结构，在使用的时候直接使用这个别名就可以了

```typescript
type Person{
	name:string;
	age:number;
}

//我们直接使用类型别名Person
let perosn:Person={
    name:'jie';
    age:18
}


例子2：
type isNum=number;
let num:isNum=7;
console.log(typeof num) //最后输出number
```

**交叉类型：**

交叉类型实现的效果就和interface差不多，主要用于继承，但是通常不使用type来实现继承

```typescript
type Test1={
	name:string;
}
type Test2={
	age:number;
}
let Person:Test1&Test2={
    name:'jie',
    age:28
}
```

### ts中接口和他们的用途？

ts中的接口即`interface`,interface的主要作用就是实现继承

- 我们可以重复声明一个相同的interface，最后可以将他们合并

```typescript
interface Person{
    name:string;
}

interface Person{
    age:number;
}

interface Person{
    name:string;
    age:number;
}
```

- 可以使用interface搭配extends实现继承

```typescript
interface Animal{
    name:string;
    age:number;
}

interface Cat extends Animal{
    sex:string;
    run():string
}

//声明了接口，我们一定是要实现的(属性和方法)
//接下来我们要使用类来实现这个接口
class cat implements Cat{
    //实现接口里面的属性
    name:string;
    age:number;
    sex:string;
    constructor(name:string,age:number,sex:string){
        this.name=name;
        this.age=age;
        this.sex=sex;
    }
    //实现接口里面的方法
    run():string{
        return `一只${this.age}岁的${this.name}在奔跑！！！`
    }
}
let cat=new Cat('jie',18,'male');
console.log(cat.run())
```

