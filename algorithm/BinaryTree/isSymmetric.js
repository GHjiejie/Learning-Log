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
var isSymmetric = function (root) {
  if (!root) {
    return false;
  }
  const originRoot = root;
  function handle(root) {
    [root.left, root.right] = [root.right, root.left];
    handle(root.left);
    handle(root.right);
  }
  let afterRoot = handle(root);
  if (afterRoot === originRoot) {
    return true;
  } else {
    return false;
  }
};
