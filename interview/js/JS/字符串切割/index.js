function splitStringIntoGroups(str) {
  const origin = ["def", "ghi", "jk", "abc"];
  const result = [];
  let ans = [];

  for (let i = 0; i < str.length; i += 3) {
    result.push(str.substring(i, i + 3));
  }

  for (let i = 0; i < origin.length; i++) {
    // 输出索引
    let index = result.indexOf(origin[i]);
    if (index !== -1) {
      ans.push(index);
    }
  }

  return ans;
}

// 示例
const input = "abcdefghijk";
const output = splitStringIntoGroups(input);
console.log(output); // 输出: ['abc', 'def', 'ghi', 'jk']
