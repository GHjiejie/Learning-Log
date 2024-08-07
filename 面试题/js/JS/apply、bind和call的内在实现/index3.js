Function.prototype.myBind = function (context, ...args) {
  const fn = this;

  return function (...newArgs) {
    return fn.apply(context, [...args, ...newArgs]);
  };
};

function greet(greeting) {
  return `${greeting}, ${this.name}!`;
}

const obj = {
  name: "Alice",
};

// 使用自定义的 myBind 方法
const boundGreet = greet.myBind(obj, "Hello");
console.log(boundGreet()); // 输出: "Hello, Alice!"
console.log(boundGreet("Good morning!")); // 输出: "Good morning!, Alice!"
