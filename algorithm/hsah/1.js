/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
var isAnagram = function (s, t) {
  const hashArr = Array(26).fill(0);
  const base = "a".charCodeAt();
  let result = true;
  for (let i = 0; i < s.length; i++) {
    hashArr[s[i].charCodeAt() - base]++;
  }
  for (let i = 0; i < t.length; i++) {
    hashArr[t[i].charCodeAt() - base]--;
  }
  for (let i = 0; i < 26; i++) {
    if (hashArr[i] !== 0) {
      result = false;
      break;
    }
  }
  return result;
};

const s = "rat";
const t = "car";
console.log(isAnagram(s, t));
