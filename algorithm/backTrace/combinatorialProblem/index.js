/**
 * @param {number} n
 * @param {number} k
 * @return {number[][]}
 */
var combine = function (n, k) {
  const res = [];
  function backTrace(index, combination) {
    if (combination.length == k) {
      res.push([...combination]);
      return;
    }
    for (let i = index; i <= n - (k - combination.length) + 1; i++) {
      combination.push(i);
      backTrace(i + 1, combination);
      combination.pop();
    }
  }
  backTrace(1, []);
  return res;
};

var combinationSum3 = function (k, n) {
  let res = [];
  function backTrace(index, currentSum, combination) {
    if (currentSum == n && combination.length == k) {
      res.push([...combination]);
      return;
    }
    for (let i = index; i <= 9; i++) {
      if (currentSum + i > n) {
        break;
      }
      combination.push(i);
      backTrace(i + 1, currentSum + i, combination);
      combination.pop();
    }
  }
  backTrace(1, 0, []);
  return res;
};

const n = 4;
const k = 2;

// console.log(combine(n, k));
console.log(combinationSum3(3, 9));
