/*
 * @lc app=leetcode.cn id=9 lang=javascript
 *
 * [9] 回文数
 */

// @lc code=start
/**
 * @param {number} x
 * @return {boolean}
 */
var isPalindrome = function (x) {
  let str = x.toString();
  str = Array.from(str);
  while (str.length > 1) {
    if (str.pop() !== str.shift()) {
      return false;
    }
  }
  return true;
};
// @lc code=end

const x = -121;
const result = isPalindrome(x);
console.log(result); // 输出: true
