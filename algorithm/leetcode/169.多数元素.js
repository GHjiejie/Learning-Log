/*
 * @lc app=leetcode.cn id=169 lang=javascript
 *
 * [169] 多数元素
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */
var majorityElement = function (nums) {
  let map = new Map();
  let len = nums.length;
  for (let i = 0; i < len; i++) {
    if (map.has(nums[i])) {
      map.set(nums[i], map.get(nums[i] || 0) + 1);
    } else {
      map.set(nums[i], 1);
    }
  }
  for (let [key, value] of map) {
    if (value > len / 2) {
      return key;
    }
  }
};
// @lc code=end

const nums = [2, 2, 1, 1, 1, 2, 2];
const result = majorityElement(nums);
console.log(result);
