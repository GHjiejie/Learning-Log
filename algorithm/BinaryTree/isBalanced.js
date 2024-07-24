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
 * @return {boolean}
 */
// 高度，向树一样，根节点就是树尖
// 深度，就是反过来看，根节点深度是1
var isBalanced = function (root) {
  if (!root) return true;
  if (!root.left || !root.right) {
    return false;
  }

  let left = root.left;
  let right = root.right;
  let leftDepth = 0;
  let rightDepth = 0;
  while (left) {
    left = left.left;
    leftDepth++;
  }
  while (right) {
    right = right.right;
    rightDepth++;
  }
  if (Math.abs(rightDepth - leftDepth) <= 1) {
    return true;
  } else {
    return false;
  }
};
