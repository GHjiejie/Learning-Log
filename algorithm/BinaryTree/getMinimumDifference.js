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
 * @return {number}
 */
var getMinimumDifference = function (root) {
  if (!root) {
    return 0;
  }
  let pre = null;
  let min = Infinity;
  function inOrder(node) {
    if (!node) {
      return;
    }
    inOrder(node.left);
    if (pre) {
      min = Math.min(min, Math.abs(pre.val - node.val));
    }
    pre = node;

    inOrder(node.right);
  }
  inOrder(root);
  return min;
};
