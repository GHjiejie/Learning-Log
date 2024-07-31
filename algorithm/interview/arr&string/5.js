/**
 * @param {number[]} nums
 * @return {number}
 */
var majorityElement = function (nums) {
  let res = [];
  let map = new Map();
  for (let i = 0; i < nums.length; i++) {
    map.set(nums[i], (map.get(nums[i]) || 0) + 1);
  }

  for (let [key, value] of map) {
    if (value > Math.floor(nums.length / 2)) {
      res.push(key);
    }
  }
  return res[0];
};

const nums = [3, 2, 3];
console.log(majorityElement(nums));
