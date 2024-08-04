// function findAnagrams(s, p) {
//   function getAll() {
//     let used = new Array(p.length).fill(false);
//     let res = new Map();
//     function backTrace(combination) {
//       if (combination.length == p.length) {
//         res.set([...combination].join(""), true);
//         return;
//       }
//       for (let i = 0; i < p.length; i++) {
//         if (used[i]) {
//           continue;
//         }
//         used[i] = true;
//         combination.push(p[i]);
//         backTrace(combination);
//         used[i] = false;
//         combination.pop();
//       }
//     }
//     backTrace([]);
//     return res;
//   }
//   let pArr = getAll();
//   let left = 0;
//   let right = p.length - 1;
//   let res = [];
//   while (right < s.length) {
//     if (pArr.get(s.slice(left, right + 1))) {
//       res.push(left);
//     }
//     left++;
//     right++;
//   }
//   return res;
// }

// const s = "cbaebabacd";

function findAnagrams(s, p) {
  const pCount = new Array(26).fill(0);
  const sCount = new Array(26).fill(0);
  const aCharCode = "a".charCodeAt(0);

  for (let char of p) {
    pCount[char.charCodeAt(0) - aCharCode]++;
  }

  let result = [];
  for (let i = 0; i < s.length; i++) {
    sCount[s[i].charCodeAt(0) - aCharCode]++;
    if (i >= p.length) {
      sCount[s[i - p.length].charCodeAt(0) - aCharCode]--;
    }
    if (pCount.every((count, idx) => count === sCount[idx])) {
      result.push(i - p.length + 1);
    }
  }

  return result;
}

// const s = "cbaebabacd";
const s = "abab";
const p = "ab";
console.log(findAnagrams(s, p)); // Output: [0, 1, 2]
