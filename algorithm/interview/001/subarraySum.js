/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var subarraySum = function (nums, k) {
  let res = 0;
  function backTrace(startIndex, sum) {
    if (sum == k) {
      res++;
      return;
    }
    for (let i = startIndex; i < nums.length; i++) {
      sum = sum + nums[i];
      backTrace(i + 1, sum);
      sum = sum - nums[i];
    }
  }
  backTrace(0, 0);
  return res;
};
const nums = [1, 1, 1];
const k = 2;
console.log(subarraySum(nums, k));
