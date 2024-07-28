/**
 * @param {number} n
 * @param {number} k
 * @return {number[][]}
 */
// function combine(n, k) {
//   const result = [];

//   function backtrack(start, combination) {
//     if (combination.length === k) {
//       result.push([...combination]); //  注意：需要创建副本
//       return;
//     }

//     for (let i = start; i <= n; i++) {
//       combination.push(i);
//       backtrack(i + 1, combination);
//       combination.pop();
//     }
//   }

//   backtrack(1, []);
//   return result;
// }

var combine = function (n, k) {
  let res = [];
  function backtrack(startIndex, combination) {
    if (combination.length == k) {
      res.push([...combination]);
      return;
    }
    // 下面的循环是经过剪枝优化处理（i的右边界是不断调整的）的，可以避免不必要的回溯，
    for (let i = startIndex; i <= n - (k - combination.length) + 1; i++) {
      combination.push(i);
      backtrack(i + 1, combination);
      combination.pop();
    }
  }
  backtrack(1, []);
  return res;
};
// 测试用例
console.log(combine(4, 2)); //  输出：[[1, 2], [1, 3], [1, 4], [2, 3], [2, 4], [3, 4]]
