var longestCommonPrefix = function (strs) {
  if (strs.length === 0) {
    return "";
  }

  let prefix = strs[0]; // 将第一个字符串作为初始前缀
  for (let i = 1; i < strs.length; i++) {
    // 逐个比较其他字符串与 prefix
    while (!strs[i].startsWith(prefix)) {
      // 如果当前字符串不以 prefix 开头，则缩短 prefix
      prefix = prefix.substring(0, prefix.length - 1);
      if (prefix === "") {
        // 如果 prefix 为空，则没有公共前缀
        return "";
      }
    }
  }

  return prefix; // 返回最终的最长公共前缀
};

// 测试用例
const strs = ["flower", "flowing", "flight"];
const result = longestCommonPrefix(strs);
console.log(result); // 输出: "fl"
