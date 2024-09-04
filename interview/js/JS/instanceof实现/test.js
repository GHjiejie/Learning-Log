function myInstanceof(left, right) {
  if (typeof left !== "object" || left === null) {
    return false;
  }
  let proto = Object.getPrototypeOf(left);
  let prototype = right.prototype;
  while (true) {
    if (proto === null) {
      return false;
    }
    if (proto === prototype) {
      return true;
    }
    // 如果都不匹配的话,我们在取left原型的原型
    proto = Object.getPrototypeOf(proto);
  }
}

function Person(name, age) {
  this.name = name;
  this.age = age;
}

let person = new Person("jie", 18);

console.log(myInstanceof(person, Person));
