/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
var maxSlidingWindow = function (nums, k) {
  class MonoQueue {
    queue;
    constructor() {
      this.queue = [];
    }
    // 入队
    enqueue(value) {
      let back = this.queue[this.queue.length - 1];
      while (back !== undefined && back < value) {
        this.queue.pop();
        back = this.queue[this.queue.length - 1];
      }
      this.queue.push(value);
    }

    // 出队
    dequeue(value) {
      if (value == this.front()) {
        this.queue.shift();
      }
    }

    // 获取对头元素最大值
    front() {
      return this.queue[0];
    }
  }

  let helperQueue = new MonoQueue();
  let i = 0;
  let j = 0;
  let resArr = [];
  while (j < k) {
    helperQueue.enqueue(nums[j++]);
  }
  resArr.push(helperQueue.front());
  console.log("输出滑动窗口的最大值", resArr);
  while (j < nums.length) {
    helperQueue.enqueue(nums[i]);
    helperQueue.dequeue(nums[i]);
    resArr.push(helperQueue.front());
    i++, j++;
  }
  return resArr;
};

// const nums = [1, 3, -1, -3, 5, 3, 6, 7];
// const nums = [1, -1];
// const nums = [7, 4, 2];
const nums = [1, 3, 1, 2, 0, 5];
// const nums = [4, 12, 11];
const k = 3;
console.log(maxSlidingWindow(nums, k));
