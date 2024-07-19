/**
 * @param {number} target
 * @param {number[]} nums
 * @return {number}
 */
// 长度最小的子数组(下面是暴力枚举的方法，leetcode会超时)
// var minSubArrayLen = function (target, nums) {
//   let result = Infinity;
//   let sum;
//   let subLength = 0;
//   for (let i = 0; i < nums.length; i++) {
//     sum = 0;
//     for (let j = i; j < nums.length; j++) {
//       sum += nums[j];
//       if (sum >= target) {
//         subLength = j - i + 1;
//         result = Math.min(result, j - i + 1);
//       }
//     }
//   }
//   return result === Infinity ? 0 : result;
// };

// 使用滑动窗口（双指针）
var minSubArrayLen = function (target, nums) {
  let result = Infinity;
  let sum = 0;
  // 滑动窗口的起始位置
  let i = 0;
  // 滑动窗口的长度
  let subLength = 0;
  for (let j = 0; j < nums.length; j++) {
    sum += nums[j];
    while (sum >= target) {
      subLength = j - i + 1;
      result = Math.min(result, subLength);
      // 改变滑动窗口的起始位置
      sum -= nums[i++];
    }
  }
  return result == Infinity ? 0 : result;
};
const nums = [2, 3, 1, 2, 4, 3];
const target = 7;
console.log(minSubArrayLen(target, nums));
