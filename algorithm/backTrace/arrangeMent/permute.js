/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var permute = function (nums) {
  let res = [];
  let used = new Array(nums.length).fill(false);

  function backTrace(combination, used) {
    if (combination.length === nums.length) {
      res.push([...combination]);
      return;
    }

    for (let i = 0; i < nums.length; i++) {
      if (!used[i]) {
        combination.push(nums[i]);
        used[i] = true;
        backTrace(combination, [...used]);
        used[i] = false;
        combination.pop();
      }
    }
  }

  backTrace([], used);
  return res;
};

const nums = [1, 2, 3];
console.log(permute(nums));
