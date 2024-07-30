/**
 * @param {number} n
 * @return {number}
 */
var fib = function (n) {
  if (n === 0) {
    return 0;
  }
  if (n === 1) {
    return 1;
  }
  //   dp数组初始化
  let dp = new Array(n + 1);
  dp[0] = 0;
  dp[1] = 1;
  // 确定遍历顺序
  for (let i = 2; i <= n; i++) {
    dp[i] = dp[i - 1] + dp[i - 2];
  }
  return dp[n];
};
console.log(fib(3));
