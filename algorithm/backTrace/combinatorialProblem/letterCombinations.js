/**
 * @param {string} digits
 * @return {string[]}
 */
// var letterCombinations = function (digits) {
//   if (digits === "") {
//     return [];
//   }
//   let map = new Map();
//   map.set("1", "");
//   map.set("2", "abc");
//   map.set("3", "def");
//   map.set("4", "ghi");
//   map.set("5", "jkl");
//   map.set("6", "mno");
//   map.set("7", "pqrs");
//   map.set("8", "tuv");
//   map.set("9", "wxyz");
//   let mapArr = [];
//   for (let i = 0; i < digits.length; i++) {
//     mapArr.push(map.get(digits[i]));
//   }
//   let res = [];

//   function backtracking(startIndex, combination, n) {
//     if (combination.length == n) {
//       res.push([...combination].join(""));
//       return;
//     }

//     for (let i = startIndex; i < mapArr.length; i++) {
//       for (let j = 0; j < mapArr[i].length; j++) {
//         combination.push(mapArr[i][j]);
//         backtracking(i + 1, combination, n);
//         combination.pop();
//       }
//     }
//   }
//   backtracking(0, [], digits.length);
//   return res;
// };
var letterCombinations = function (digits) {
  if (digits === "") {
    return [];
  }

  const map = {
    2: "abc",
    3: "def",
    4: "ghi",
    5: "jkl",
    6: "mno",
    7: "pqrs",
    8: "tuv",
    9: "wxyz",
  };

  const res = [];
  const n = digits.length;

  function backtrack(index, combination) {
    if (combination.length === n) {
      res.push(combination.join(""));
      return;
    }

    const letters = map[digits[index]];
    for (let i = 0; i < letters.length; i++) {
      combination.push(letters[i]);
      backtrack(index + 1, combination);
      combination.pop();
    }
  }

  backtrack(0, []);
  return res;
};
const digits = "23";
console.log(letterCombinations(digits));
