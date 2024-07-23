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
var levelOrder = function (root) {
  if (!root) {
    return [];
  }
  let queue = [root];
  let res = [];
  while (queue.length) {
    let levelArr = [];
    let queueLen = queue.length;
    for (let i = 0; i < queueLen; i++) {
      const node = queue.shift();
      levelArr.push(node.val);
      node.left && queue.push(node.left);
      node.right && queue.push(node.right);
    }
    res.push(levelArr);
  }
  return res;
};
