// 这里说一下new关键字的作用是什么
// 1. 创建一个空对象
// 2. 将空对象的原型指向构造函数的原型
// 3. 将构造函数的this指向这个空对象
// 4. 返回这个空对象
// console.log('Person Construct:', Person.prototype)
// const person = new Person('jie', 18);
// console.log('person', person);
// console.log(person.age);
// console.log(person.name)
function myNew(Func, ...args) {
  let obj = Object.create(Func.prototype);
  let result = Func.apply(obj, args);
  return result instanceof Object ? result : obj;
}

// 测试用例
function Person(name, age) {
  this.name = name;
  this.age = age;
}

const person1 = myNew(Person, "Alice", 30);

console.log(person1.name); // 输出: Alice
console.log(person1.age); // 输出: 30
