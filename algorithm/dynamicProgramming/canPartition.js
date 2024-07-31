/**
 * @param {number[]} nums
 * @return {boolean}
 */
var canPartition = function (nums) {
  let res = [];
  let map = new Map();

  function sumArr(arr) {
    let sum = arr.reduce((pre, cur) => cur + pre, 0);
    return sum;
  }
  function hasSameSum(arr) {
    let result = false;
    for (let i = 0; i < arr.length; i++) {
      if (map.get(sumArr(arr[i]))) {
        console.log("有相同的子集", arr[i]);
        result = true;
        break;
      }
      map.set(sumArr(arr[i]), true);
      console.log("map", map);
    }
    return result;
  }
  function backTrace(startIndex, combination) {
    res.push([...combination]);
    for (let i = startIndex; i < nums.length; i++) {
      if (i > startIndex && nums[i] === nums[i - 1]) {
        continue;
      }

      combination.push(nums[i]);
      backTrace(i + 1, combination);
      combination.pop();
    }
  }
  backTrace(0, []);
  console.log(res);
  return hasSameSum(res);
};
const nums = [1, 2, 3, 5];
// const nums = [1, 5, 11, 5];
console.log(canPartition(nums));
