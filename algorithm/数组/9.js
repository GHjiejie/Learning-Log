/**
 * @param {number[]} nums
 * @return {number[]}
 */
var sortedSquares = function (nums) {
  let startIndex = 0;
  let lastindex = nums.length - 1;
  let index = lastindex;
  let result = [];
  while (startIndex <= lastindex) {
    if (Math.abs(nums[startIndex]) > Math.abs(nums[lastindex])) {
      result[index--] = nums[startIndex] * nums[startIndex];
      startIndex++;
    } else if (Math.abs(nums[startIndex]) <= Math.abs(nums[lastindex])) {
      result[index--] = nums[lastindex] * nums[lastindex];
      lastindex--;
    }
  }
  return result;
};

const nums = [-4, -1, 0, 3, 10];
console.log(sortedSquares(nums));
