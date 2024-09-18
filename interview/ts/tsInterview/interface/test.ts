interface Animal {
    name: string;
    age: number;
}

interface Cat extends Animal {
    sex: string;
    run(): string
}

//声明了接口，我们一定是要实现的(属性和方法)
//接下来我们要使用类来实现这个接口
class Cat1 implements Cat {
    //实现接口里面的属性
    name: string;
    age: number;
    sex: string;
    constructor(name: string, age: number, sex: string) {
        this.name = name;
        this.age = age;
        this.sex = sex;
    }
    //实现接口里面的方法
    run(): string {
        return `一只${this.age}岁的${this.name}在奔跑！！！`
    }
}
let cat = new Cat1('jie', 18, 'male');
console.log(cat.run())