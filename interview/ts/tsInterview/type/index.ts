// 1.类型别名
type Age = number;
let myAge: Age = 25;

// 2.对象类型
type Person = {
    name: string;
    age: number;
}
let person: Person = {
    name: 'Alice',
    age: 40
}

// 3.联合类型
type ID = string | number;
let userId: ID = 123;
let userId2: ID = '123';

// 4.交叉类型 实现的效果和接口继承类似
type Cat = {
    name: string;
    run(): void;
}
type Fish = {
    name: string;
    swim(): void;
}
type Mermaid = Cat & Fish;
let mermaid: Mermaid = {
    name: 'mermaid',
    run() { console.log('running') },
    swim() { console.log('swimming') }
}

type isNum = number;
let num: isNum = 7;
console.log(typeof num)

type Test1 = {
    name: string;
}
type Test2 = {
    age: number;
}
let person1: Test1 & Test2 = {
    name: 'jie',
    age: 28
}

console.log(person1)