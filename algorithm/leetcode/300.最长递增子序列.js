/*
 * @lc app=leetcode.cn id=300 lang=javascript
 *
 * [300] 最长递增子序列
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */

var lengthOfLIS = function (nums) {
  const n = nums.length;
  if (n === 0) return 0;
  const dp = new Array(n).fill(1);
  let res = 1;
  for (let i = 1; i < n; i++) {
    for (let j = 0; j < i; j++) {
      if (nums[i] > nums[j]) {
        dp[i] = Math.max(dp[i], dp[j] + 1);
      }
    }
    res = Math.max(res, dp[i]);
  }
  return res;
};

// @lc code=end

// const nums = [10, 9, 2, 5, 3, 7, 101, 18];
const nums = [0, 1, 0, 3, 2, 3];
// const nums = [7, 7, 7, 7, 7, 7, 7];
console.log(lengthOfLIS(nums)); // 4
