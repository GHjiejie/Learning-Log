/**
 * @param {string} s
 * @return {boolean}
 */
// 最原始的方法
// var isPalindrome = function (s) {
//   let result = true;
//   s = s.toLocaleLowerCase();
//   s = s.split("");
//   let res = [];

//   for (let i = 0; i < s.length; i++) {
//     if (
//       (s[i].charCodeAt() >= 97 && s[i].charCodeAt() <= 122) ||
//       (s[i].charCodeAt() >= 48 && s[i].charCodeAt() <= 57)
//     ) {
//       res.push(s[i]);
//     }
//   }
//   console.log(res);
//   let right = res.length - 1;
//   let left = 0;
//   while (right > left) {
//     if (res[right] != res[left]) {
//       result = false;
//       break;
//     }
//     right--;
//     left++;
//   }
//   return result;
// };

var isPalindrome = function (s) {
  s = s.toLocaleLowerCase().replace(/[^a-z0-9]/g, "");
  let right = s.length - 1;
  let left = 0;
  while (right > left) {
    if (s[right] != s[left]) {
      return false;
    }
    right--;
    left++;
  }
  return true;
};

// const s = "A man, a plan, a canal: Panama";
const s = "0P";
console.log(isPalindrome(s));
