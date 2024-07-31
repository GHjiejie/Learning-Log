/**
 * @param {number[]} nums
 * @return {number}
 */
var removeDuplicates = function (nums) {
  let map = new Map();
  let res = [];
  for (let i = 0; i < nums.length; i++) {
    map.set(nums[i], (map.get(nums[i]) || 0) + 1);
    if (map.get(nums[i]) <= 2) {
      res.push(nums[i]);
    }
  }
  return res;
};

// const nums = [1, 1, 1, 2, 2, 2, 2, 3];
const nums = [0, 0, 1, 1, 1, 1, 2, 3, 3];
console.log(removeDuplicates(nums));
