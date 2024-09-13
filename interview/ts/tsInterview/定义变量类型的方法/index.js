//  第一个方法是类型注解
var num = 1;
var str = 'hello';
var bool = true;
console.log(typeof num); // number
console.log(typeof str); // string  
console.log(typeof bool); // boolean
//  第二个方法是类型推断(就是代码在编译的时候会自动判断变量的类型)
var num1 = 1;
var str1 = 'hello';
console.log(typeof num1); // number
console.log(typeof str1); // string 
