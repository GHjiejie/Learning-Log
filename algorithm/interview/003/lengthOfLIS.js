function lengthOfLIS(nums) {
  let dp = Array(nums.length).fill(1);
  let res = 1;
  for (let i = 1; i < nums.length; i++) {
    for (let j = 0; j < i; j++) {
      if (nums[i] > nums[j]) {
        dp[i] = Math.max(dp[i], dp[j] + 1);
      }
    }
    res = Math.max(res, dp[i]);
  }
  return res;
}

// const nums = [10, 9, 2, 5, 3, 7, 101, 18];
const nums = [0, 1, 0, 3, 2, 3];
// const nums = [7, 7, 7, 7, 7, 7, 7];
console.log(lengthOfLIS(nums)); // 4
