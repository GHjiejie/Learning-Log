Function.prototype.myBind = function (context, ...args) {
  const fn = this;
  return function (...newArgs) {
    return fn.apply(context, [...args, ...newArgs]);
  };
};

function sayHello(arg1, arg2) {
  return `${arg1}+${arg2}+我是${this.name}`;
}
const obj = {
  name: "jie",
};

const text = sayHello.myBind(obj, "hello", "Good Morning");
console.log(text());
