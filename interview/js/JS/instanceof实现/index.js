function myInstanceof(left, right) {
  if (typeof left !== "object" || left === null) return false;
  let proto = Object.getPrototypeOf(left);
  let prototype = right.prototype;
  while (true) {
    if (proto === null) return false;
    if (proto === prototype) return true;
    proto = Object.getPrototypeOf(proto);
  }
}

function Person(name) {
  this.name = name;
}
let p = new Person("wn");
console.log(myInstanceof(1, Person)); // true
console.log(myInstanceof(p, Object)); // true
