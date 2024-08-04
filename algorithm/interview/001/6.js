/**
 * @param {number[]} nums
 * @param {number} k
 * @return {void} Do not return anything, modify nums in-place instead.
 */
// var rotate = function (nums, k) {
//   let sliceIndex = nums.length - k;
//   let sliceArr = nums.splice(sliceIndex, k);
//   return sliceArr.concat(nums);
// };
var rotate = function (nums, k) {
  const n = nums.length;
  k = k % n;
  const newArr = new Array(n);

  for (let i = 0; i < n; i++) {
    newArr[(i + k) % n] = nums[i];
  }

  for (let i = 0; i < n; i++) {
    nums[i] = newArr[i];
  }
};
const nums = [-1, -100, 3, 99];
const k = 2;

console.log(rotate(nums, k));
