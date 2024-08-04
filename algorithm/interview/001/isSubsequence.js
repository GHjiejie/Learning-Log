/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */

// 使用回溯超时
// var isSubsequence = function (s, t) {
//   let res = false;
//   function backTrace(startIndex, combination) {
//     if (combination.length == s.length && combination.join("") == s) {
//       res = true;
//       return;
//     }
//     let set = new Set();
//     for (let i = startIndex; i < t.length; i++) {
//       if (res) {
//         break;
//       }
//       if (set.has(t[i])) {
//         continue;
//       }
//       set.add(t[i]);
//       combination.push(t[i]);
//       backTrace(i + 1, combination);
//       combination.pop();
//     }
//   }
//   backTrace(0, []);
//   return res;
// };

var isSubsequence = function (s, t) {
  let sIndex = 0;
  for (let i = 0; i < t.length; i++) {
    if (s[sIndex] == t[i]) {
      sIndex++;
    }
  }
  if (sIndex < s.length) {
    return false;
  } else {
    return true;
  }
};
