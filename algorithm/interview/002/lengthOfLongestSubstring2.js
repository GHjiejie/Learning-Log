function lengthOfLongestSubstring(s) {
  let left = 0;
  let right = 0;
  let maxLength = 0;
  let set = new Set();
  while (right < s.length) {
    if (!set.has(s[right])) {
      set.add(s[right]);
      maxLength = Math.max(maxLength, right - left + 1);
      right++;
    } else {
      set.delete(s[left]);
      left++;
    }
  }
  return maxLength;
}

// const s = "abcabcbb";
const s = "pwwkew";
console.log(lengthOfLongestSubstring(s));
