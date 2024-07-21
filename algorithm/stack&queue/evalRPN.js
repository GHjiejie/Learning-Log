/**
 * @param {string[]} tokens
 * @return {number}
 */
// var evalRPN = function (tokens) {
//   let helperStack = [];
//   let calculateStack = [];
//   let result = 0;
//   if (tokens.length == 1) {
//     return parseFloat(tokens[0]);
//   }

//   const calculate = (arr) => {
//     let result = 0;
//     const operand1 = arr[0];
//     const operand2 = parseFloat(arr[1]);
//     const operand3 = parseFloat(arr[2]);

//     switch (operand1) {
//       case "+":
//         result = operand3 + operand2;
//         break;
//       case "-":
//         result = operand3 - operand2;
//         break;
//       case "*":
//         result = operand3 * operand2;
//         break;
//       case "/":
//         result = Math.trunc(operand3 / operand2);
//         break;
//       default:
//         break;
//     }
//     return result;
//   };
//   for (let char of tokens) {
//     helperStack.push(char);
//     if (isNaN(char)) {
//       for (let i = 0; i < 3; i++) {
//         calculateStack.push(helperStack.pop());
//       }
//       result = calculate(calculateStack);
//       helperStack.push(result);
//       calculateStack = [];
//     }
//   }
//   return result;
// };

// 下面是使用单栈来实现

function evalRPN(tokens) {
  let stack = [];

  for (let char of tokens) {
    if (!isNaN(char)) {
      stack.push(char);
    } else {
      const num1 = parseInt(stack.pop());
      const num2 = parseInt(stack.pop());
      let result = 0;
      switch (char) {
        case "+":
          result = num1 + num2;
          break;
        case "-":
          result = num2 - num1;
          break;
        case "*":
          result = num2 * num1;
          break;
        case "/":
          result = Math.trunc(num2 / num1);
          break;
        default:
          break;
      }
      stack.push(result);
    }
  }
  return stack[0];
}

const tokens = [
  "10",
  "6",
  "9",
  "3",
  "+",
  "-11",
  "*",
  "/",
  "*",
  "17",
  "+",
  "5",
  "+",
];
console.log(evalRPN(tokens));
