/**
 * @param {string} s
 * @return {boolean}
 */
// var isValid = function (s) {
//   let arr = Array.from(s);
//   const len = s.length;
//   if (len % 2 != 0) {
//     return false;
//   }
//   let stack = [];
//   for (let i = 0; i < len; i++) {
//     if (arr[i] == "(" || arr[i] == "{" || arr[i] == "[") {
//       stack.push(arr[i]);
//     } else {
//       if (stack.length == 0) {
//         return false;
//       } else if (arr[i] == ")") {
//         if (stack.pop() !== "(") {
//           return false;
//         }
//       } else if (arr[i] == "}") {
//         if (stack.pop() !== "{") {
//           return false;
//         }
//       } else {
//         if (stack.pop() !== "[") {
//           return false;
//         }
//       }
//     }
//   }
//   return stack.length == 0 ? true : false;
// };
function isValid(s) {
  if (s.length % 2 !== 0) {
    return false;
  }
  const arr = Array.from(s);
  let stack = [];
  const bracketMap = {
    ")": "(",
    "}": "{",
    "]": "[",
  };
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] in bracketMap) {
      console.log(arr[i]);
      if (stack.length == 0 || stack.pop() !== bracketMap[arr[i]]) {
        return false;
      }
    } else {
      stack.push(arr[i]);
    }
  }
  return stack.length === 0;
}
const s4 = "(){}}{";
const s = "()[]{}";
const s2 = "(]";
const s3 = "({}";

console.log(isValid(s4));
