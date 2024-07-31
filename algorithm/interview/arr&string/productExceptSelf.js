/**
 * @param {number[]} nums
 * @return {number[]}
 */

// 时间复杂度为O(n^2)
var productExceptSelf = function (nums) {
  let res = [];
  for (let i = 0; i < nums.length; i++) {
    let sum = 1;
    let j = 0;
    while (j < nums.length) {
      if (j == i) {
        j++;
        continue;
      }
      sum = sum * nums[j];
      j++;
    }
    res.push(sum);
  }
  return res;
};

var productExceptSelf = function (nums) {
  let n = nums.length;
  let res = new Array(n).fill(1);

  // 前缀乘积
  let prefix = 1;
  for (let i = 0; i < n; i++) {
    res[i] = prefix;
    prefix *= nums[i];
  }
  console.log(res);

  // 后缀乘积
  let suffix = 1;
  for (let i = n - 1; i >= 0; i--) {
    res[i] *= suffix;
    suffix *= nums[i];
  }

  return res;
};

// 测试用例
const nums = [1, 2, 3, 4];
console.log(productExceptSelf(nums)); // 输出: [24, 12, 8, 6]

// // let nums = [1, 2, 3, 4];
// let nums = [-1, 1, 0, -3, 3];
// console.log(productExceptSelf(nums));
