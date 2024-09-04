/*
 * @lc app=leetcode.cn id=647 lang=javascript
 *
 * [647] 回文子串
 */

// @lc code=start
/**
 * @param {string} s
 * @return {number}
 */
var countSubstrings = function (s) {
  let n = s.length;
  let dp = new Array(n).fill(0).map(() => new Array(n).fill(false));
  let res = 0;

  for (let i = n - 1; i >= 0; i--) {
    for (let j = i; j < n; j++) {
      if (s[i] === s[j]) {
        if (j - i <= 1) {
          dp[i][j] = true;
          res++;
        } else if (dp[i + 1][j - 1]) {
          dp[i][j] = true;
          res++;
        }
      }
    }
  }

  return res;
};
// @lc code=end
