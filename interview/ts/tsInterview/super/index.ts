// 接下来就介绍一下super在继承的当中发挥的作用

// 1、调用父类的构造函数
// 在子类的构造函数里面，如果要调用super,必须在访问this之前去调用
// 也就是说，super()必须是子类构造函数最早被调用的方法
// 在子类中，this 的初始化依赖于父类的构造函数。
// 在 JavaScript 的继承机制中，父类的构造函数必须先执行，才能确保子类可以正常访问到继承自父类的属性和方法。
// 换句话说，子类的实例必须先通过父类的构造函数进行初始化，子类才能在自己的构造函数中安全地使用 this。
// class Animal {
//     name: string;

//     constructor(name: string) {
//         this.name = name;
//     }
// }

// class Dog extends Animal {
//     breed: string;
//     // 'super' must be called before accessing 'this' in the constructor of a derived class.
//     constructor(name: string, breed: string) {
//         // this.breed = breed;  // 错误：在调用 super() 之前使用了 this
//         // super(name);         // 应该先调用 super()，再使用 this
//         super(name);
//         this.breed = breed;
//     }
// }

// 2.调用父类的方法先调用自己的方法，然后可以在方法里面添加自己的逻辑),这个是没有顺序的
class Animal {
    name: string;
    constructor(name: string) {
        this.name = name;
    }
    run(): void {
        console.log('running!')
    }
}

class Dog extends Animal {
    age: number;
    constructor(name: string, age: number) {
        super(name);
        this.name = name;
    }
    run(): void {
        console.log('the dog is running!')
        super.run();
    }
}
let dog = new Dog('hashiqi', 9);
dog.run();




