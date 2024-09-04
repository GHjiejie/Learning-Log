/*
 * @lc app=leetcode.cn id=3 lang=javascript
 *
 * [3] 无重复字符的最长子串
 */

// @lc code=start
/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function (s) {
  // 用于存储字符的索引
  const map = {};
  // 左指针
  let left = 0;
  // 最长子串的长度
  let max = 0;
  for (let i = 0; i < s.length; i++) {
    // 如果当前字符已经出现过，那么左指针移动到该字符的下一个字符
    if (map[s[i]] >= left) {
      left = map[s[i]] + 1;
    }
    // 更新字符的索引
    map[s[i]] = i;
    // 更新最长子串的长度
    max = Math.max(max, i - left + 1);
  }
  return max;
};
// @lc code=end

const s = "abcabcbb";
console.log(lengthOfLongestSubstring(s)); // 3
