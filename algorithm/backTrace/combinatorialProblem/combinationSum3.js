/**
 * @param {number} k
 * @param {number} n
 * @return {number[][]}
 */
var combinationSum3 = function (k, n) {
  let res = [];

  function backtracking(startIndex, combination, currentSum) {
    if (combination.length == k && currentSum == n) {
      res.push([...combination]);
      return;
    }
    for (let i = startIndex; i <= 9; i++) {
      if (currentSum + i > n) break;
      combination.push(i);
      backtracking(i + 1, combination, currentSum + i);
      combination.pop();
    }
  }
  backtracking(1, [], 0);
  return res;
};

console.log(combinationSum3(5, 30));
