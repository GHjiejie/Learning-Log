/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var subsetsWithDup = function (nums) {
  const res = [];
  const subset = [];
  nums.sort((a, b) => a - b);

  function backTrace(index) {
    res.push([...subset]);

    for (let i = index; i < nums.length; i++) {
      if (i > index && nums[i] == nums[i - 1]) {
        continue;
      }
      subset.push(nums[i]);
      backTrace(i + 1);
      subset.pop();
    }
  }

  backTrace(0);
  return res;
};

const nums = [1, 2, 2];
// const nums = [4, 4, 4, 1, 4];
console.log(subsetsWithDup(nums));
