/*
 * @lc app=leetcode.cn id=136 lang=javascript
 *
 * [136] 只出现一次的数字
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */
var singleNumber = function(nums) {
    let res = 0;
    for (let i = 0; i < nums.length; i++) {
        res ^= nums[i];
    }
    return res;
};
// @lc code=end
const nums = [2, 2, 1];
const result = singleNumber(nums);
console.log(result); // 输出: 1

