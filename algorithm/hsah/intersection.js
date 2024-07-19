/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number[]}
 */
// var intersection = function (nums1, nums2) {
//   return Array.from(new Set(nums1.filter((i) => nums2.includes(i))));
// };

function intersection(nums1, nums2) {
  let originSet = new Set(nums1);
  let resultSet = new Set();
  for (const num of nums2) {
    if (originSet.has(num)) {
      resultSet.add(num);
    }
  }
  return [...resultSet];
}

// function intersection(nums1, nums2) {
//   const set1 = new Set(nums1);
//   const set2 = new Set(nums2);
//   return [...set1.intersection(set2)];
// }

const nums1 = [1, 2, 2, 1];
const nums2 = [2, 2];
console.log(intersection(nums1, nums2));
