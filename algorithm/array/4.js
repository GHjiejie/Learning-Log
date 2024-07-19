/**
 * @param {number[]} nums
 * @param {number} val
 * @return {number}
 */
var removeElement = function (nums, val) {
  const length = nums.length;
  let k = 0;
  for (let i = 0; i < length; i++) {
    if (nums[i] !== val) {
      nums[k++] = nums[i];
    }
  }
  return k;
};

const nums = [3, 2, 2, 3];
const val = 3;
console.log(removeElement(nums, val));
