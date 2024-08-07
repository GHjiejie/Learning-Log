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
console.log(sayHello.myCall(person, "你好啊！"));
