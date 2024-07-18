const nums = [-1, 0, 3, 5, 9, 12];
const target = 9;

function binarySearch(nums, target) {
  let left = 0;
  let right = nums.length - 1;
  let mid;
  while (left <= right) {
    mid = left + ((right - left) >> 1);
    if (target < nums[mid]) {
      right = mid - 1;
    } else if (target > nums[mid]) {
      left = mid + 1;
    } else {
      return mid;
    }
  }
  return -1;
}

console.log(binarySearch(nums, target));
