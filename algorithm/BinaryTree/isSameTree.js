/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {boolean}
 */
var isSameTree = function (p, q) {
  function isSame(pNode, qNode) {
    if (!pNode && !qNode) {
      return true;
    }
    if ((!pNode && qNode) || (!qNode && pNode)) {
      return false;
    }
    if (pNode.val != qNode.val) {
      return false;
    }
    return isSame(pNode.left, qNode.left) && isSame(pNode.right, qNode.right);
  }
  return isSame(p, q);
};
