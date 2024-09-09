function splitStringIntoGroups(str) {
  const result = [];

  for (let i = 0; i < str.length; i += 3) {
    result.push(str.substring(i, i + 3));
  }

  return result;
}

// 示例
const input = "abcdefghijk";
const output = splitStringIntoGroups(input);
console.log(output); // 输出: ['abc', 'def', 'ghi', 'jk']
