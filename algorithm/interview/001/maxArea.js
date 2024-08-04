/**
 * @param {number[]} height
 * @return {number}
 */
// 下面是使用回溯算法，但是超时了
// var maxArea = function (height) {
//   let res = 0;
//   function backTrace(startIndex, combination) {
//     if (combination.length == 2) {
//       let currentS =
//         Math.min(combination[0][1], combination[1][1]) *
//         (combination[1][0] - combination[0][0]);
//       res = currentS > res ? currentS : res;
//       return;
//     }
//     for (let i = startIndex; i < height.length; i++) {
//       combination.push([i, height[i]]);
//       backTrace(i + 1, combination);
//       combination.pop();
//     }
//   }
//   backTrace(0, []);
//   return res;
// };

// 使用双指针
var maxArea = function (height) {
  let left = 0;
  let right = height.length - 1;
  let maxArea = 0;

  while (left < right) {
    let width = right - left;
    let currentHeight = Math.min(height[left], height[right]);
    let currentArea = width * currentHeight;
    maxArea = Math.max(maxArea, currentArea);
    if (height[left] < height[right]) {
      left++;
    } else {
      right--;
    }
  }

  return maxArea;
};

const height = [1, 8, 6, 2, 5, 4, 8, 3, 7];
console.log(maxArea(height));
