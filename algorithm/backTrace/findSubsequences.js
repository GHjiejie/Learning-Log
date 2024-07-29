/**
 * @param {number[]} nums
 * @return {number[][]}
 */

var findSubsequences = function (nums) {
  let res = [];
  function backTrace(index, combination) {
    if (combination.length > 1) {
      res.push([...combination]);
    }
    for (let i = index; i < nums.length; i++) {
      if (i > index && nums[i] == nums[i - 1]) {
        continue;
      }
      if (
        combination.length > 0 &&
        nums[i] < combination[combination.length - 1]
      ) {
        continue;
      }
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
