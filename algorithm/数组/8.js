/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
var backspaceCompare = function (s, t) {
  return exec(s) === exec(t);
};

function exec(str) {}

const s = "ab#c";
const t = "ad#c";

console.log(backspaceCompare(s, t));
