interface Person {
    name: string;
    age: number;
}

// 可选属性
interface Person2 {
    name: string;
    age?: number;
}

// 只读属性
interface Person3 {
    readonly name: string;
    age: number;
}

// 同时也可以定义函数类型
interface GreetFunc {
    (name: string): string;//函数类型，接受一个变量(string类型)，返回一个变量(string类型)
}

const greet: GreetFunc = (name: string): string => {
    return '1'
}

// 也可以定义一个数组类型(因为js数组里面可以是任意变量类型，如果我们使用ts的话，是可以指定数组值的类型的)
interface StringArray {
    [index: number]: string; //定义一个数组类型，数组的元素是string类型
}

let arr: StringArray = ['1', '3']
// let arr2: StringArray = [1, 2] //报错，因为我们指定了数组的元素是string类型，但是实际传入的是number类型


// 也可以定义一个字典类型
interface StringDictionary {
    [key: string]: string; //定义一个字典类型，key是string类型，value是string类型 类似于js的对象
}

let dic: StringDictionary = {
    name: '1',
    age: '2'
}

// 类与接口
interface Animal {
    name: string;
    age: number;
    eat(): void;
}

// 因为类需要实现这个接口，所以要实现接口里面的所有的属性和方法
class Dog implements Animal {
    name: string;
    age: number;
    constructor(name: string, age: number) {
        this.name = name;
        this.age = age;
    }
    // 实现接口的方法
    eat() {
        console.log(`一只${this.age}岁大的${this.name}正在吃早饭`);
    }
}
let dog = new Dog('哈士奇', 6)
dog.eat();

// 接口继承
interface Animal2 {
    name: string;
    age: number;
    eat(): void;
}

interface Dog2 extends Animal2 {
    run(): void;
}

class Dog3 implements Dog2 {
    name: string;
    age: number;
    constructor(name: string, age: number) {
        this.name = name;
        this.age = age;
    }
    eat() {
        console.log(`一只${this.age}岁大的${this.name}正在吃早饭`);
    }
    run() {
        console.log(`一只${this.age}岁大的${this.name}正在跑步`);
    }
}
let dog2 = new Dog3('哈士奇', 6)
dog2.eat();
dog2.run();

