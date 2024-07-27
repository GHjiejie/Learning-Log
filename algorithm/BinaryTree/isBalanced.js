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
  function isMirror(left, right) {
    if (!left && !right) {
      return true;
    }
    if ((!left && right) || (left && !right)) {
      return false;
    }
    if (left.val !== right.val) {
      return false;
    }
    return isMirror(left.left, right.right) && isMirror(left.right, right.left);
  }
  return isMirror(root.left, root.right);
};
