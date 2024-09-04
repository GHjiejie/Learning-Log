/*
 * @lc app=leetcode.cn id=674 lang=javascript
 *
 * [674] 最长连续递增序列
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */
var findLengthOfLCIS = function (nums) {
  let dp = new Array(nums.length).fill(1);
  for (let i = 0; i < nums.length - 1; i++) {
    if (nums[i] < nums[i + 1]) {
      dp[i + 1] = dp[i] + 1;
    }
  }
  return Math.max(...dp);
};
// @lc code=end

const nums = [1, 3, 5, 4, 7];
console.log(findLengthOfLCIS(nums)); // 3
