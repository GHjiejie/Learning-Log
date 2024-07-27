/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root1
 * @param {TreeNode} root2
 * @return {TreeNode}
 */
var mergeTrees = function (root1, root2) {
  if (!root1 && !root2) {
    return [];
  }
  function merge(node1, node2) {
    if (!node1 && !node2) {
      return;
    }
    if (node1.left == null && node2.left != null) {
      node1.left = node2.left;
    } else if (node1.right == null && node2.right != null) {
      node1.right = node2.right;
    } else {
      node1.val += node2.val;
    }

    mergeTrees(node1.left, node2.left);
    mergeTrees(node1.right, node2.right);
  }
  merge(root1, root2);

  return root1;
};
