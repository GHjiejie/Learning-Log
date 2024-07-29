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
// var combinationSum2 = function (candidates, target) {
//   let res = [];
//   candidates.sort((a, b) => a - b); // 排序

//   function backtracking(startIndex, currentSum, combination) {
//     if (currentSum === target) {
//       res.push([...combination]);
//       return;
//     }
//     for (let i = startIndex; i < candidates.length; i++) {
//       if (i > startIndex && candidates[i] === candidates[i - 1]) {
//         continue; // 跳过重复元素
//       }
//       if (currentSum + candidates[i] > target) {
//         break; // 剪枝
//       }
//       combination.push(candidates[i]);
//       backtracking(i + 1, currentSum + candidates[i], combination);
//       combination.pop();
//     }
//   }

//   backtracking(0, 0, []);
//   return res;
// };

function combinationSum2(candidates, target) {
  let res = [];
  candidates.sort((a, b) => a - b);
  let used = new Array(candidates.length).fill(0);
  function backTrace(startIndex, currentSum, combination) {
    if (currentSum == target) {
      res.push([...combination]);
      return;
    }
    for (let i = startIndex; i < candidates.length; i++) {
      if (i > 0 && candidates[i] == candidates[i - 1] && used[i - 1] == 0) {
        continue;
      }
      if (currentSum + candidates[i] > target) {
        break;
      }
      used[i] = 1;
      combination.push(candidates[i]);
      backTrace(i + 1, currentSum + candidates[i], combination);
      used[i] = 0;
      combination.pop();
    }
  }
  backTrace(0, 0, []);
  return res;
}

// const candidates = [10, 1, 2, 7, 6, 1, 5];
const candidates = [5, 4, 5, 1, 5, 3, 1, 4, 5, 5, 4];
const target = 10;
console.log(combinationSum2(candidates, target));
