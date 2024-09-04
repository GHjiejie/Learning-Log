/*
 * @lc app=leetcode.cn id=14 lang=javascript
 *
 * [14] 最长公共前缀
 */

// @lc code=start
/**
 * @param {string[]} strs
 * @return {string}
 */
var longestCommonPrefix = function (strs) {
  // 想法是先找到最短的字符串，然后遍历这个字符串，看看其他字符串是否都有这个字符
  if (strs.length === 0) {
    return "";
  }
  let prefix = strs[0];
  for (let i = 1; i < strs.length; i++) {
    while (!strs[i].startsWith(prefix)) {
      prefix = prefix.substring(0, prefix.length - 1); //删除最后一个字符，直到找到公共前缀
      if (prefix === "") {
        return "";
      }
    }
  }
  return prefix;
};
// @lc code=end

// 测试用例
const strs = ["flower", "flowing", "flight"];
const result = longestCommonPrefix(strs);
console.log(result); // 输出: "fl"
