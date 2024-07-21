/**
 * @param {string} haystack
 * @param {string} needle
 * @return {number}
 */
var strStr = function (haystack, needle) {
  const getNext = () => {
    // 设置一个next数组
    const next = [];
    // 设置一个变量记录前缀末尾
    let j = 0;
    next.push(j);
    // 下面是代码的关键，获取next数组
    for (let i = 1; i < needle.length; i++) {
      while (j > 0 && needle[i] !== needle[j]) {
        j = next[j - 1];
      }
      if (needle[i] == needle[j]) {
        j++;
      }
      next.push(j);
    }
    return next;
  };
  const next = getNext(needle);
  let j = 0;
  for (let i = 0; i < haystack.length; i++) {
    while (j > 0 && haystack[i] !== needle[j]) {
      j = next[j - 1];
    }
    if (haystack[i] == needle[j]) {
      j++;
    }
    if (j == needle.length) {
      return i - needle.length + 1;
    }
  }
  return -1;
};

const haystack = "aabaabaaf";
const needle = "aabaaf";
console.log(strStr(haystack, needle));
// strStr(haystack, needle);
