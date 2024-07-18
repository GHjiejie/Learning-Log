function insertNode(nums, target) {
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
  return left;
}

const nums = [1, 3, 5, 6];
const target = 2;
console.log(insertNode(nums, target));
