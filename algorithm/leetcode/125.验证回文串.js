/*
 * @lc app=leetcode.cn id=125 lang=javascript
 *
 * [125] 验证回文串
 */

// @lc code=start
/**
 * @param {string} s
 * @return {boolean}
 */
var isPalindrome = function (s) {
  // 1. 去掉空格和符号，转为小写(使用正则表达式)
  //   全局匹配非字母和数字的字符，将他们转为空字符串（replace方法的作用），并转为小写
  s = s.replace(/[^a-zA-Z0-9]/g, "").toLocaleLowerCase();
  console.log(s);
  // 2. 双指针
  let left = 0;
  let right = s.length - 1;
  while (left < right) {
    if (s[left] !== s[right]) {
      return false;
    }
    left++;
    right--;
  }
  return true;
};
// @lc code=end

// const s = "race a car";
const s = "A man, a plan, a canal: Panama";
const result = isPalindrome(s);
console.log(result); // 输出: false
