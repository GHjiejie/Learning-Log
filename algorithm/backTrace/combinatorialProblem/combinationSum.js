/**
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 */
var combinationSum = function (candidates, target) {
  let res = [];
  candidates.sort((a, b) => a - b);
  function backtracking(startIndex, currentSum, combination) {
    if (currentSum == target) {
      res.push([...combination]);
      return;
    }
    for (let i = startIndex; i < candidates.length; i++) {
      if (currentSum + candidates[i] > target) {
        break;
      }
      combination.push(candidates[i]);
      backtracking(i, currentSum + candidates[i], combination);
      combination.pop();
    }
  }
  backtracking(0, 0, []);
  return res;
};

const candidates = [2, 3, 6, 7];
const target = 7;
console.log(combinationSum(candidates, target));
