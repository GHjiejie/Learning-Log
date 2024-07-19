/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @param {number[]} nums3
 * @param {number[]} nums4
 * @return {number}
 */
var fourSumCount = function (nums1, nums2, nums3, nums4) {
  const hashMap = new Map();
  let count = 0;
  let sum;
  for (let n1 of nums1) {
    for (let n2 of nums2) {
      sum = n1 + n2;
      hashMap.set(sum, (hashMap.get(sum) || 0) + 1);
    }
  }
  for (let n1 of nums3) {
    for (let n2 of nums4) {
      sum = n1 + n2;
      if (hashMap.get(0 - sum)) {
        count += hashMap.get(0 - sum);
      }
    }
  }
  return count;
};

const nums1 = [1, 2];
const nums2 = [-2, -1];
const nums3 = [-1, 2];
const nums4 = [0, 2];

console.log(fourSumCount(nums1, nums2, nums3, nums4));
