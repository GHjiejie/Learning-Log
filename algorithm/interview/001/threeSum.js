/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var threeSum = function (nums) {
  let res = [];
  let used = new Array(nums.length).fill(false);
  nums.sort((a, b) => a - b);
  function sum(arr) {
    let result = arr.reduce((pre, cur) => pre + cur);
    return result;
  }
  function backTrace(startIndex, combination) {
    if (combination.length == 3 && sum(combination) == 0) {
      res.push([...combination]);
      return;
    }
    for (let i = startIndex; i < nums.length; i++) {
      if (nums[i] == nums[i - 1] && !used[i - 1]) {
        continue;
      }
      used[i] = true;
      combination.push(nums[i]);
      backTrace(i + 1, combination);
      used[i] = false;
      combination.pop();
    }
  }
  backTrace(0, []);
  return res;
};

const nums = [-1, 0, 1, 2, -1, -4];
console.log(threeSum(nums));
