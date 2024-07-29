/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var subsets = function (nums) {
  const res = [];
  const subset = [];
  function backTrace(index) {
    res.push([...subset]);
    for (let i = index; i < nums.length; i++) {
      subset.push(nums[i]);
      backTrace(i + 1);
      subset.pop();
    }
  }
  backTrace(0);
  return res;
};
nums = [1, 2, 3];
console.log(subsets(nums));
