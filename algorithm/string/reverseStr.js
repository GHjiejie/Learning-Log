/**
 * @param {string} s
 * @param {number} k
 * @return {string}
 */
var reverseStr = function (s, k) {
  let newS = s.split("");
  for (let i = 0; i < s.length; i += 2 * k) {
    let left = i - 1;
    let right = i + k > s.length ? s.length : i + k;
    while (++left < --right) {
      [newS[left], newS[right]] = [newS[right], newS[left]];
    }
  }
  return newS.join("");
};

const s = "abcdefg";
const k = 2;
console.log(reverseStr(s, k));
