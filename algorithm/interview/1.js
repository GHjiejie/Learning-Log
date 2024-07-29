/**
 * @param {number[]} nums1
 * @param {number} m
 * @param {number[]} nums2
 * @param {number} n
 * @return {void} Do not return anything, modify nums1 in-place instead.
 */
var merge = function (nums1, m, nums2, n) {
  function moveElem(elem, index) {
    ozz;
    for (let i = index + 1; i < nums1.length; i++) {
      nums1[i++] = nums1[i];
    }
    nums1[index] = elem;
    nums1.length--;
  }
  for (let i = 0; i < n; i++) {
    if (nums2[i] < nums1[i]) {
      moveElem(nums2[i], i);
    }
  }
};

merge([1, 2, 3, 0, 0, 0], 3, [2, 5, 6], 3);
