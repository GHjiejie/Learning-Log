/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
var maxSlidingWindow = function (nums, k) {
  const result = [];
  const maxHeap = []; // 使用最大堆

  // 初始化堆
  for (let i = 0; i < k; i++) {
    maxHeap.push([nums[i], i]); // 存储 [值, 索引] 对
  }
  maxHeap.sort((a, b) => b[0] - a[0]); // 按值降序排序
  result.push(maxHeap[0][0]);

  // 滑动窗口
  for (let i = k; i < nums.length; i++) {
    maxHeap.push([nums[i], i]);
    while (maxHeap[0][1] <= i - k) {
      console.log("maxHeap[0][1] :", maxHeap[0][1]);

      // 删除堆顶超出窗口范围的元素
      maxHeap.shift();
    }
    maxHeap.sort((a, b) => b[0] - a[0]); // 重新排序
    result.push(maxHeap[0][0]);
  }

  return result;
};

const nums = [1, 3, -1, -3, 5, 3, 6, 7];
const k = 3;
console.log(maxSlidingWindow(nums, k));
