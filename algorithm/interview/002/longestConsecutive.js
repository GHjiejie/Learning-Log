/**
 * @param {number[]} nums
 * @return {number}
 */
// var longestConsecutive = function (nums) {
//   nums = nums.sort((a, b) => a - b);
//   let max = 0;
//   let count = 1;
//   arr = [...new Set(nums)];
//   for (let i = 1; i < arr.length; i++) {
//     if (arr[i] == arr[i - 1] + 1) {
//       count++;
//     } else {
//       max = count > max ? count : max;
//       count = 1;
//     }
//   }
//   max = Math.max(max, count);
//   return max;
// };

var longestConsecutive = function (nums) {
  let set = new Set(nums);
  let maxLength = 0;

  for (let num of set) {
    if (!set.has(num - 1)) {
      let currentNum = num;
      let currentStreak = 1;
      while (set.has(currentNum + 1)) {
        currentNum++;
        currentStreak++;
      }
      maxLength = Math.max(maxLength, currentStreak);
    }
  }
  return maxLength;
};

const nums = [100, 4, 200, 1, 1, 3, 2];
// const nums = [9, 1, 4, 7, 3, -1, 0, 5, 8, -1, 6];
console.log(longestConsecutive(nums));
