/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
function subarraySum(nums, k) {
  let count = 0;
  let sum = 0;
  const countMap = new Map();
  countMap.set(0, 1); // 初始化，表示前缀和为 0 出现了一次

  for (let i = 0; i < nums.length; i++) {
    sum += nums[i]; // 计算当前前缀和

    if (countMap.has(sum - k)) {
      count += countMap.get(sum - k); // 找到符合条件的子数组
    }

    countMap.set(sum, (countMap.get(sum) || 0) + 1); // 更新前缀和计数
  }

  return count;
}

// 测试用例
const nums = [1, 1, 1];
const k = 2;
console.log(subarraySum(nums, k)); // 输出：2
