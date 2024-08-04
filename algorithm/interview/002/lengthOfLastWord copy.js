/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLastWord = function (s) {
  s = s.trim();
  let count = 0;
  for (let i = s.length - 1; i > 0; i--) {
    if (s[i] == "") {
      break;
    } else {
      count++;
    }
  }
  return count;
};

const s = "Hello World";
console.log(s.split(" "));

console.log(lengthOfLastWord(s));
