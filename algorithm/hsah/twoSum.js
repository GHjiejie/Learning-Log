/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
// 实现双数之和
var twoSum = function (nums, target) {
  const hashMap = new Map();
  for (let i = 0; i < nums.length; i++) {
    if (hashMap.has(target - nums[i])) {
      return [i, hashMap.get(target - nums[i])];
    }
    hashMap.set(nums[i], i);
  }
  return [];
};

const nums = [2, 7, 11, 15];
const target = 9;
console.log(twoSum(nums, target));
