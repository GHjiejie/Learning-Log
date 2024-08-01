var searchRange = function (nums, target) {
  const findLeftBound = (nums, target) => {
    let left = 0;
    let right = nums.length - 1;
    while (left <= right) {
      let mid = Math.floor((left + right) / 2);
      if (nums[mid] === target) {
        // 找到目标值时，继续向左搜索，寻找左边界
        right = mid - 1;
      } else if (nums[mid] < target) {
        left = mid + 1;
      } else {
        right = mid - 1;
      }
    }
    // 检查 left 是否越界，以及 left 位置的元素是否等于 target
    if (left >= nums.length || nums[left] !== target) {
      return -1;
    }
    return left;
  };

  const findRightBound = (nums, target) => {
    let left = 0;
    let right = nums.length - 1;
    while (left <= right) {
      let mid = Math.floor((left + right) / 2);
      if (nums[mid] === target) {
        // 找到目标值时，继续向右搜索，寻找右边界
        left = mid + 1;
      } else if (nums[mid] < target) {
        left = mid + 1;
      } else {
        right = mid - 1;
      }
    }
    // 检查 right 是否越界，以及 right 位置的元素是否等于 target
    if (right < 0 || nums[right] !== target) {
      return -1;
    }
    return right;
  };

  return [findLeftBound(nums, target), findRightBound(nums, target)];
};

const nums = [5, 7, 7, 8, 8, 10];
const target = 8;
const result = searchRange(nums, target);
console.log(result); // [3, 4]
