Function.prototype.myBind = function (context, ...args) {
  // 获取调用 myBind 的原始函数
  const fn = this;

  // 返回一个新的函数
  return function (...newArgs) {
    // 通过 apply 调用原始函数，并将上下文设置为 context
    return fn.apply(context, [...args, ...newArgs]);
  };
};
