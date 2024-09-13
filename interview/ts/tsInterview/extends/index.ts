// 下面会详细介绍一下ts里面的extends关键字的作用
// exxtends关键字会基础接口所有的属性和方法
// 接口继承
// interface Animal {
//     name: string;
//     age: number;
//     eat(): void;
// }

// interface Dog extends Animal {
//     run(): void
// }
// let dog: Dog = {
//     name: '哈士奇',
//     age: 6,
//     eat() {
//         console.log(`一只${this.age}岁大的${this.name}正在吃早饭`);
//     },
//     run() {
//         console.log(`一只${this.age}岁大的${this.name}正在跑步`);
//     }
// }

// console.log(dog);
// 需要知道的是，interface可以继承多个接口的
// 比如
// interface Person {
//     name: string;
// }

// interface Worker {
//     jobTitle: string;
// }

// interface Employee extends Person, Worker {
//     employeeId: number;
// }

// let employee: Employee = {
//     name: "John",
//     jobTitle: "Developer",
//     employeeId: 12345
// };

// 类的继承
class Animal {
    name: string;
    constructor(name: string) {
        this.name = name;
    }
    makeSound(): void {
        console.log(`${this.name}在叫！`)
    }
}

class Dog extends Animal {
    age: number;
    constructor(name: string, age: number) {
        super(name);//使用super 作用：调用父类的构造函数
        this.name = name;
    }
    run(): void {
        console.log(`一只${this.age}岁的${this.name}在跑步！`)
    }
}

const dog = new Dog("哈士奇", 8);
dog.makeSound();
dog.run();