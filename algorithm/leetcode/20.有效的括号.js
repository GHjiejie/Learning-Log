/*
 * @lc app=leetcode.cn id=20 lang=javascript
 *
 * [20] 有效的括号
 */

// @lc code=start
/**
 * @param {string} s
 * @return {boolean}
 */
var isValid = function (s) {
  let stack = [];
  // 使用栈的思想，遇到左括号就入栈，遇到右括号就出栈，如果出栈的括号和当前括号不匹配，就返回false
  for (let i = 0; i < s.length; i++) {
    if (s[i] == "(" || s[i] == "{" || s[i] == "[") {
      stack.push(s[i]);
    }
    if (s[i] == ")" && stack.pop() != "(") {
      return false;
    }
    if (s[i] == "}" && stack.pop() != "{") {
      return false;
    }
    if (s[i] == "]" && stack.pop() != "[") {
      return false;
    }
  }
  if (stack.length !== 0) {
    return false;
  }
  return true;
};
// @lc code=end
const s = "([]{}";
const result = isValid(s);
console.log(result); // 输出: true
