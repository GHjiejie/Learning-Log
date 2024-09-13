

//  第一个方法是类型注解
let num: number = 1;
let str: string = 'hello';
let bool: boolean = true;
console.log(typeof num); // number
console.log(typeof str); // string  
console.log(typeof bool); // boolean

//  第二个方法是类型推断(就是代码在编译的时候会自动判断变量的类型)
let num1 = 1;
let str1 = 'hello';
console.log(typeof num1); // number
console.log(typeof str1); // string 


