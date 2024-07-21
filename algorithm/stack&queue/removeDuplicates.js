/**
 * @param {string} s
 * @return {string}
 */

// 因为我们现在的话所有的有关于字符串的我们全部转换成为了数组
// 但是实际上我们不需要这么做
// var removeDuplicates = function (s) {
//   let stack = [];
//   const strArr = Array.from(s);
//   let j = 0;
//   stack.push(strArr[0]);
//   for (let i = 1; i < s.length; i++) {
//     if (stack[j] == strArr[i]) {
//       stack.pop();
//       j--;
//     } else {
//       stack.push(strArr[i]);
//       j++;
//     }
//   }
//   return stack.join("");
// };

function removeDuplicates(s) {
  let stack = [];
  for (let char of s) {
    if (char == stack.at(-1)) {
      stack.pop();
    } else {
      stack.push(char);
    }
  }
  return stack.join("");
}
const s = "acbbcaca";

console.log(removeDuplicates(s));
