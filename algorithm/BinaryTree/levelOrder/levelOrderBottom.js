/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[][]}
 */
var levelOrderBottom = function (root) {
  if (!root) return [];
  let queue = [root];
  let res = [];
  while (queue.length) {
    let levelArr = [];
    let currentLevelLength = queue.length;
    for (let i = 0; i < currentLevelLength; i++) {
      let node = queue.shift();
      levelArr.push(node.val);
      node.left && queue.push(node.left);
      node.right && queue.push(node.right);
    }
    res.push(levelArr);
  }
  function reserveArr(arr) {
    let slowIndex = 0;
    let fastIndex = arr.length - 1;
    while (fastIndex > slowIndex) {
      [arr[fastIndex], arr[slowIndex]] = [arr[slowIndex], arr[fastIndex]];
      slowIndex++;
      f;
      fastIndex--;
    }
    return arr;
  }

  return reserveArr(res);
};
