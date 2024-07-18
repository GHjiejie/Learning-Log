/**
 * @param {string[]} strs
 * @return {string[][]}
 */
var groupAnagrams = function (strs) {
  const map = new Map();
  for (let str of strs) {
    const key = str.split("").sort().join("");
    const list = map.get(key) || [];
    list.push(str);
    map.set(key, list);
  }
  return Array.from(map.values());
};

const strs = ["eat", "tea", "tan", "ate", "nat", "bat"];

console.log(groupAnagrams(strs));
