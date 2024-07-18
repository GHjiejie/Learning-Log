/**
 * @param {string} ransomNote
 * @param {string} magazine
 * @return {boolean}
 */
var canConstruct = function (ransomNote, magazine) {
  const base = "a".charCodeAt();
  const hashArr = Array(26).fill(0);

  for (i of ransomNote) {
    hashArr[i.charCodeAt() - base]++;
  }

  for (i of magazine) {
    hashArr[i.charCodeAt() - base]--;
  }

  for (let i = 0; i < 26; i++) {
    if (hashArr[i] > 0) {
      return false;
    }
  }
  return true;
};

const ransomNote = "aa";
const magazine = "aab";
console.log(canConstruct(ransomNote, magazine));
