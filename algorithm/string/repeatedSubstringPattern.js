/**
 * @param {string} s
 * @return {boolean}
 */
// var repeatedSubstringPattern = function (s) {
//   const str = Array.from(s + s)
//     .slice(1, -1)
//     .join("");
//   if (str.includes(s)) {
//     return true;
//   }
//   return false;
// };
// 上面的代码可以优化，提取字符串指定索引之间的字符，可以使用subString方法
// substring(startIndex,endIndex)
// const s = "aba";

var repeatedSubstringPattern = function (s) {
  const str = (s + s).substring(1, (s + s).length - 1);
  if (str.includes(s)) {
    return true;
  }
  return false;
};
const s = "abab";
console.log(repeatedSubstringPattern(s));
