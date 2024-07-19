function removeDuplicates(nums) {
  if (nums.length === 0) {
    return 0;
  }

  let slow = 0; // 慢指针，指向下一个非重复元素的位置
  for (let fast = 1; fast < nums.length; fast++) {
    if (nums[fast] !== nums[slow]) {
      slow++; // 慢指针移动到下一个位置
      nums[slow] = nums[fast]; // 将非重复元素复制到慢指针指向的位置
    }
  }

  return slow + 1; // 返回唯一元素的个数
}

// const nums = [1, 1, 2];
const nums = [0, 0, 1, 1, 1, 2, 2, 3, 3, 4];
console.log(removeDuplicates(nums));
