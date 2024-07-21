/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */

// 下面这个是原始的方法
// var topKFrequent = function (nums, k) {
//   const hashMap = new Map();
//   let result = [];
//   for (let i = 0; i < nums.length; i++) {
//     if (hashMap.get(nums[i])) {
//       hashMap.set(nums[i], (hashMap.get(nums[i]) || 0) + 1);
//     } else {
//       hashMap.set(nums[i], (hashMap.get(nums[i]) || 0) + 1);
//     }
//   }
//   const mapEntries = Array.from(hashMap.entries());
//   // 这个方法真的是太秒了
//   mapEntries.sort((a, b) => b[1] - a[1]);
//   for (let i = 0; i < k; i++) {
//     result.push(mapEntries[i][0]);
//   }
//   return result;
// };

// const nums = [1, 1, 1, 2, 2, 3, 8, 8, 8, 8];
// const k = 2;

// 这个是我的方法优化后的代码
function topKFrequent(nums, k) {
  const hashMap = new Map();
  for (let num of nums) {
    hashMap.set(num, (hashMap.get(num) || 0) + 1);
  }
  const mapEntries = Array.from(hashMap.entries());
  mapEntries.sort((a, b) => b[1] - a[1]);
  return mapEntries.slice(0, k).map((num) => num[0]);
}
const nums = [-1, -1];
const k = 1;

console.log(topKFrequent(nums, k));
