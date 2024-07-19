/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var moveZeroes = function (nums) {
  const length = nums.length;
  if (length === 0) {
    return nums;
  }
  let slow;
  for (let i = 0; i < length; i++) {
    if (nums[i] == 0) {
      slow = i;
      break;
    }
  }

  for (let fast = slow + 1; fast < length; fast++) {
    if (nums[fast] !== 0) {
      nums[slow] = nums[fast];
      nums[fast] = 0;
      slow++;
    }
  }
  return nums;
};

const nums1 = [2, 1];
const nums2 = [1, 0, 1];
const nums3 = [1];
console.log(moveZeroes(nums1));
console.log(moveZeroes(nums2));
console.log(moveZeroes(nums3));
