Function.prototype.myApply = function (context, args) {
  context = context || window;
  const key = Symbol();
  context[key] = this;
  const result = context[key](args);
  delete context[key];
  return result;
};

function hello(msg) {
  return `${msg},我是${this.name}`;
}

let perosn = {
  name: "jie",
};
const text = hello.myApply(perosn, ["hello,我是奥特曼"]);
console.log(text);
