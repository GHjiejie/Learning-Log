/**
 * @param {number[]} nums
 * @return {number[][]}
 */

var findSubsequences = function (nums) {
  let res = [];
  function backTrace(startIndex, combination) {
    if (combination.length > 1) {
      res.push([...combination]);
    }
    let used = new Set();
    for (let i = startIndex; i < nums.length; i++) {
      if (used.has(nums[i])) {
        continue;
      }
      if (
        combination.length > 0 &&
        nums[i] < combination[combination.length - 1]
      ) {
        continue;
      }
      used.add(nums[i]);
      combination.push(nums[i]);
      backTrace(i + 1, combination);
      combination.pop();
    }
  }
  backTrace(0, []);
  return res;
};

const nums = [4, 4, 6, 7, 4];

console.log(findSubsequences(nums));
