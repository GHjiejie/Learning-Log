/**
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 */
// 我的代码，没有去重
// var combinationSum2 = function (candidates, target) {
//   let res = [];
//   function backtracking(startIndex, currentSum, combination) {
//     if (currentSum == target) {
//       res.push([...combination]);
//       return;
//     }
//     for (let i = startIndex; i < candidates.length; i++) {
//       combination.push(candidates[i]);
//       backtracking(i + 1, currentSum + candidates[i], combination);
//       combination.pop();
//     }
//   }
//   backtracking(0, 0, []);
//   return res;
// };

// 正确的代码且去重
var combinationSum2 = function (candidates, target) {
  let res = [];
  candidates.sort((a, b) => a - b); // 排序

  function backtracking(startIndex, currentSum, combination) {
    if (currentSum === target) {
      res.push([...combination]);
      return;
    }
    for (let i = startIndex; i < candidates.length; i++) {
      if (i > startIndex && candidates[i] === candidates[i - 1]) {
        continue; // 跳过重复元素
      }
      if (currentSum + candidates[i] > target) {
        break; // 剪枝
      }
      combination.push(candidates[i]);
      backtracking(i + 1, currentSum + candidates[i], combination);
      combination.pop();
    }
  }

  backtracking(0, 0, []);
  return res;
};

const candidates = [10, 1, 2, 7, 6, 1, 5];
const target = 8;
console.log(combinationSum2(candidates, target));
