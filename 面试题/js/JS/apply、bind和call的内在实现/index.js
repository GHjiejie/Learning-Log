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

// const arr = ["111", "222", "333"];
// console.log(...arr);
