/**
 * @param {string} s
 * @param {number} k
 * @return {string}
 */
var reverseStr = function (s, k) {
  //  const newS=Array.from(s)
  let newS = [];
  const arrlength = Math.floor((s.length % 2) * k);
  for (let i = 0; i < arrlength; i++) {
    newS.push(s.slice());
  }
};

const s = "abcdefg";
const k = 2;
console.log(reverseStr(s, k));
