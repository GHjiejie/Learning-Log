/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
var topKFrequent = function (nums, k) {
  // 构建大顶堆
  function buildMaxHeap(arr, n, i) {
    let max = i;
    let left = i * 2 + 1;
    let right = i * 2 + 2;
    if (right < n && arr[right] > arr[max]) {
      max = right;
    }
    if (left < n && arr[left] > arr[max]) {
      max = left;
    }
    if (i !== max) {
      [arr[i], arr[max]] = [arr[max], arr[i]];
      buildMaxHeap(arr, n, max);
    }
  }
  let helperMap = new Map();
  for (let num of nums) {
    helperMap.set(num, (helperMap.get(num) || 0) + 1);
  }

  const arr = Array.from(helperMap.values());
  let len = arr.length;
  let t = k;
  for (let i = Math.floor(len / 2) - 1; i >= 0; i--) {
    buildMaxHeap(arr, len, i);
  }

  for (let i = len - 1; i >= 0 && t > 0; i--, t--) {
    [arr[0], arr[i]] = [arr[i], arr[0]];
    len--;
    buildMaxHeap(arr, len, 0);
  }

  const result = [];
  for (let i = arr.length - k; i < arr.length; i++) {
    for (let [key, value] of helperMap.entries()) {
      if (value === arr[i]) {
        result.push(key);
        helperMap.delete(key);
        break;
      }
    }
  }
  return result;
};

const nums = [1, 1, 1, 2, 2, 3, 5, 5, 5, 5];
const k = 2;
console.log(topKFrequent(nums, k));
