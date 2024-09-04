/*
 * @lc app=leetcode.cn id=459 lang=javascript
 *
 * [459] 重复的子字符串
 */

// @lc code=start
/**
 * @param {string} s
 * @return {boolean}
 */
var repeatedSubstringPattern = function(s) {
    // 这里需要知道一个结论：如果一个字符串 s 包含一个重复的子字符串，那么 s+s 中必然会包含 s，这是因为 s = n * t，s+s = 2n * t，其中 n >= 2。
    // 还有一个就是熟悉的字符串切片方法：slice(start, end)，返回一个新的字符串，包含从 start 到 end（不包括该元素）的原字符串的一部分。
    return (s + s).slice(1, -1).includes(s);

};
// @lc code=end

