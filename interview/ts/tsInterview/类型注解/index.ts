// 下面会详细介绍一下ts的类型注解
// 简单的来说，就是在变量定义的时候，给变量指定一个类型，这样在后续的使用中，就会根据这个类型来进行类型检查
// 例如下面的代码
let a: number = 1;
let b: string = 'hello';

// 如果是函数的话，我们还需要指定函数的参数和返回值的类型
function sum(a: number, b: number): number {
    // return 'hhh'; //报错，因为我们指定了返回值的类型是number，但是实际返回的是string
    return a + b;
}

// sum(1, '3'); 这个也报错，因为我们指定了参数的类型是number，但是实际传入的是string
sum(1, 3);

