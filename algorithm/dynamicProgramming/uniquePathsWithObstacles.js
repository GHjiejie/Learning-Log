/**
 * @param {number[][]} obstacleGrid
 * @return {number}
 */
var uniquePathsWithObstacles = function (obstacleGrid) {
  if (obstacleGrid.length === 0) {
    return 0; // 空网格，没有路径
  }

  let m = obstacleGrid.length;
  let n = obstacleGrid[0].length;
  let dp = Array(m)
    .fill()
    .map((item) => Array(n).fill(0)); // 初始化为 0

  // 初始化边界条件
  for (let i = 0; i < m; i++) {
    if (obstacleGrid[i][0] === 1) {
      // 遇到障碍物停止
      break;
    } else {
      dp[i][0] = 1;
    }
  }
  for (let i = 0; i < n; i++) {
    if (obstacleGrid[0][i] === 1) {
      // 遇到障碍物停止
      break;
    } else {
      dp[0][i] = 1;
    }
  }

  // 填充 DP 表格
  for (let i = 1; i < m; i++) {
    for (let j = 1; j < n; j++) {
      if (obstacleGrid[i][j] === 1) {
        dp[i][j] = 0; // 障碍物位置路径数为 0
      } else {
        dp[i][j] = dp[i - 1][j] + dp[i][j - 1];
      }
    }
  }

  return dp[m - 1][n - 1];
};
