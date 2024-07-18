/**
 * @param {string} s
 * @param {string} p
 * @return {number[]}
 */
// 找到字符串中所有字母异位词
// var findAnagrams = function (s, p) {
//   const p_length = p.length;
//   const result = [];
//   const key = p.split("").sort().join("");
//   for (let i = 0; i < s.length; i++) {
//     if (
//       s
//         .slice(i, p_length + i)
//         .split("")
//         .sort()
//         .join("") === key
//     ) {
//       result.push(i);
//     }
//   }
//   return result;
// };

function findAnagrams(s, p) {}

const s = "cbaebabacd";
const p = "abc";
console.log(findAnagrams(s, p));
