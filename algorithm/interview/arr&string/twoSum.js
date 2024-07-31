/**
 * @param {number[]} numbers
 * @param {number} target
 * @return {number[]}
 */

// hsah表的做法
// var twoSum = function (numbers, target) {
//   let map = new Map();
//   let res = [];
//   for (let i = 0; i < numbers.length; i++) {
//     if (map.get(target - numbers[i]) !== undefined) {
//       res.push(map.get(target - numbers[i]) + 1);
//       res.push(i + 1);
//       break;
//     }
//     map.set(numbers[i], i);
//   }
//   return res;
// };

// 双指针的做法
var twoSum = function (numbers, target) {
  let left = 0;
  let right = numbers.length - 1;
  while (right > left) {
    sum = numbers[right] + numbers[left];
    if (sum == target) {
      return [left + 1, right + 1];
    } else if (sum > target) {
      right--;
    } else {
      left++;
    }
  }
};
const numbers = [2, 7, 11, 15];
const target = 9;
console.log(twoSum(numbers, target));
