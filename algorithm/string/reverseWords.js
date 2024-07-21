/**
 * @param {string} s
 * @return {string}
 */
var reverseWords = function (s) {
  const str = Array.from(s);
  let newStr = removeExtraSpaces(str);
  newStr = newStr.join("").split(" ");
  return reverseStr(newStr).join(" ");
};

// 删除首部与重复的空格
function removeExtraSpaces(str) {
  let slowIndex = 0;
  let fastIndex = 0;

  while (fastIndex < str.length) {
    if (
      str[fastIndex] == " " &&
      (fastIndex == 0 || str[fastIndex - 1] == " ")
    ) {
      fastIndex++;
    } else {
      str[slowIndex++] = str[fastIndex++];
    }
  }
  str.length = str[slowIndex - 1] == " " ? slowIndex - 1 : slowIndex;
  return str;
}

// 单词反转
function reverseStr(str) {
  let slowIndex = 0;
  let fastIndex = str.length - 1;
  console.log(fastIndex);
  while (fastIndex >= slowIndex) {
    [str[slowIndex], str[fastIndex]] = [str[fastIndex], str[slowIndex]];
    fastIndex--;
    slowIndex++;
  }
  return str;
}

const s1 = "   the sky is    blue   ";
const s2 = "  hello  world  ";
const s3 = "  a good   example   ";

console.log(reverseWords(s1));
console.log(reverseWords(s2));
console.log(reverseWords(s3));
