/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var permuteUnique = function (nums) {
  let res = [];
  const used = new Array(nums.length).fill(false);
  function backTrace(combination, used) {
    if (combination.length === nums.length) {
      res.push([...combination]);
      return;
    }
    let set = new Set();
    for (let i = 0; i < nums.length; i++) {
      if (used[i]) {
        continue;
      }
      if (set.has(nums[i])) {
        continue;
      }
      used[i] = true;
      set.add(nums[i]);
      combination.push(nums[i]);
      backTrace(combination, [...used]);
      used[i] = false;
      combination.pop();
    }
  }
  backTrace([], used);
  return res;
};

const nums = [1, 1, 2];
console.log(permuteUnique(nums));
