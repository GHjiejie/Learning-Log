Function.prototype.myCall = function (context, ...args) {
  context = context || window;
  const key = Symbol();
  context[key] = this;
  const result = context[key](...args);
  delete context[key];
  return result;
};

function sayHello(arg1, arg2) {
  return `${arg1}+${arg2}+我是${this.name}`;
}
const obj = {
  name: "jie",
};

const text = sayHello.myCall(obj, "hello", "Good Morning");
console.log(text);
