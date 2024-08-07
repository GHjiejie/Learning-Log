Function.prototype.myApply = function (context, args) {
  // 首先判断是否传入了对象,如果没有的话.就默认为全局
  context = context || window;

  //   然后我们需要为这个对象里面添加一个函数,为了防止与原有的变量的属性的冲突,我们使用一个es6之后引入的数据类型,Symbol

  const key = Symbol();

  //   这里面的this指向就是他的上下文,什么意思呢?就是谁调用了这个方法,这里面的this就指向谁,我们以构造函数来举例的话就会好理解很多,
  //   所以这段代码执行后就是为这个context(在本例里面或者说叫obj对象)里面添加了一个临时的方法

  context[key] = this;

  //   执行上面的代码后我们的obj变成了下面的样子
  //   obj = {
  //     name: "Alice",
  //     [Symbol()]: function greet(greeting, punctuation) {
  //         return `${greeting}, ${this.name}${punctuation}`;
  //     }
  // }
  //   然后我们就需要调用这里面的方法,所以我们就需要将参数传递进去,因为最后需要返回的是一个结果,所以我们要使用一个变量来接受这个结果
  // 这个也是apply call与bind的区别,
  // apply实现的效果与call一样,唯一不同就是接受的参数是不同的,apply是多个arg,而call是一个数组

  const result = context[key](...args);

  //   然后我们需要将这个方法删除,因为原来的对象里面是没有这个方法的

  delete context[key];

  //   执行完上面的代码后,我们的obj对象就变成了下面的样子(回到最初的样子)
  //   obj = {
  //     name: "Alice",
  //   }

  //   返回函数调用的结果

  return result;
};

function greet(greeting, punctuation) {
  return `${greeting}, ${this.name}${punctuation}`;
}

const obj = {
  name: "Alice",
};

// 使用自定义的 myApply 方法
const message = greet.myApply(obj, ["Hello", "!"]);
console.log(message); // 输出: "Hello, Alice!"
