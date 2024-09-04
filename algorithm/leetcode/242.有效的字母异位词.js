/*
 * @lc app=leetcode.cn id=242 lang=javascript
 *
 * [242] 有效的字母异位词
 */

// @lc code=start
/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
var isAnagram = function (s, t) {
  // 1. 如果两个字符串长度不相等，直接返回false
  if (s.length !== t.length) {
    return false;
  }
  // 2. 两个字符串排序后比较是否相等
  return s.split("").sort().join("") === t.split("").sort().join("");
};
// @lc code=end

const s = "anagram";
const t = "nagaram";
const result = isAnagram(s, t);
console.log(result); // 输出: true
