/**
 * @param {character[]}
 * @return {void} Do not return anything, modify s in-place instead.
 */
var reverseString = function (k, s) {
  if (s.length < k) {
    return s;
  }
  const length = s.length;
  let str = Array.from(s);
  const arr = [];
  const beginStr = str.splice(length - k);
  const afterStr = str.splice(0, length - k);
  return arr.concat(beginStr, afterStr).join("");
};

const k = 1;
const s = "abcdefg";

console.log(reverseString(k, s));
