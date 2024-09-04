/*
 * @lc app=leetcode.cn id=28 lang=javascript
 *
 * [28] 找出字符串中第一个匹配项的下标
 */

// @lc code=start
/**
 * @param {string} haystack
 * @param {string} needle
 * @return {number}
 */
var strStr = function (haystack, needle) {
  if (needle === "") {
    return 0;
  }
  if (needle.length > haystack.length) {
    return -1;
  }
  if (needle.length === haystack.length) {
    return needle === haystack ? 0 : -1;
  }
  for (let i = 0; i < haystack.length; i++) {
    if (haystack[i] === needle[0]) {
      if (haystack.slice(i, i + needle.length) === needle) {
        return i;
      }
    }
  }
  return -1;
};
// @lc code=end

const haystack = "hello";
const needle = "ll";
const result = strStr(haystack, needle);
console.log(result); //
