function myInstanceof(left, right) {}

function Person(name) {
  this.name = name;
}
let person = new Person("jie");

myInstanceof(person, Person);
