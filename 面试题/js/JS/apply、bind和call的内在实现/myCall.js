Function.prototype.myCall = function (context, ...args) {
  // 如果没有传入context，则默认为window
  context = context || window;
  //   创建一个唯一的键，以避免属性冲突
  const uniqueID = Symbol();
  // 我们尝试输出里面的this,发现this指向的是调用myCall的函数，而不是myCall函数本身

  console.log("输出里面的this", this);
  //   在上下文中添加一个属性，将函数赋值给这个属性
  context[uniqueID] = this;

  console.log("输出greet", context);
  // 调用函数

  const result = context[uniqueID](...args);
  // 删除属性

  delete context[uniqueID];
  // 返回函数执行的结果
  return result;
};

// 测试
function greet(message) {
  console.log(`${message}, ${this.name}`);
}

const person = {
  name: "Tom",
};

greet.myCall(person, "你好"); // Hello, Tom
