/**
 * @param {number} n
 * @return {number[][]}
 */
var generateMatrix = function (n) {
  let startX = 0;
  let startY = 0;
  let loop = Math.floor(n / 2);
  let mid = Math.floor(n / 2);
  // 设置偏移量
  let offset = 1;
  // 设置起始的填充数
  let count = 1;
  let res = new Array(n).fill(0).map(() => new Array(n).fill(0));
  while (loop--) {
    let row = startX;
    let col = startY;
    for (; col < n - offset; col++) {
      res[row][col] = count++;
    }
    for (; row < n - offset; row++) {
      res[row][col] = count++;
    }
    for (; col > startY; col--) {
      res[row][col] = count++;
    }
    for (; row > startX; row--) {
      res[row][col] = count++;
    }
    startX++;
    startY++;
    offset += 1;
  }
  if (n % 2 !== 0) {
    res[mid][mid] = count++;
  }
  return res;
};

const n = 3;
console.log(generateMatrix(n));
