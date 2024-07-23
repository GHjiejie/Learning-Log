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
 * @return {number[]}
 */
var averageOfLevels = function (root) {
  if (!root) return [];
  let res = [];
  let queue = [root];
  while (queue.length) {
    let levelSum = 0;
    let length = queue.length;
    for (let i = 0; i < length; i++) {
      let node = queue.shift();
      levelSum += node.val;
      node.right && queue.push(node.right);
      node.left && queue.push(node.left);
    }
    res.push((levelSum / length).toFixed(5));
  }
  return res;
};
