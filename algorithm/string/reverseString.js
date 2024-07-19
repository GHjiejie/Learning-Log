/**
 * @param {character[]}
 * @return {void} Do not return anything, modify s in-place instead.
 */
var reverseString = function (s) {
  let left = 0;
  let right = s.length - 1;
  while (right > left) {
    [s[left], s[right]] = [s[right], s[left]];
    left++;
    right--;
  }
  return s;
};

const s = ["h", "e", "l", "l", "o"];
console.log(reverseString(s));
