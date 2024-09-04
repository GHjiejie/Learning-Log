/*
 * @lc app=leetcode.cn id=34 lang=javascript
 *
 * [34] 在排序数组中查找元素的第一个和最后一个位置
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var searchRange = function (nums, target) {
  const searchLeft = (nums, target) => {
    let left = 0;
    let right = nums.length - 1;
    while (left <= right) {
      const mid = Math.floor((left + right) / 2);
      if (nums[mid] === target) {
        right = mid - 1;
      } else if (nums[mid] < target) {
        left = mid + 1;
      } else {
        right = mid - 1;
      }
    }
    return left;
  };

  const searchRight = (nums, target) => {
    let left = 0;
    let right = nums.length - 1;
    while (left <= right) {
      const mid = Math.floor((left + right) / 2);
      if (nums[mid] === target) {
        left = mid + 1;
      } else if (nums[mid] < target) {
        left = mid + 1;
      } else {
        right = mid - 1;
      }
    }
    return right;
  };

  const leftIndex = searchLeft(nums, target);
  const rightIndex = searchRight(nums, target);
  if (leftIndex <= rightIndex) {
    return [leftIndex, rightIndex];
  } else {
    return [-1, -1];
  }
};
// @lc code=end

// const nums = [5, 7, 7, 8, 8, 10];
const nums = [5, 7, 7, 8, 8, 10];
// const nums = [2, 2];
const target = 8;
console.log(searchRange(nums, target));
