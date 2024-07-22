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
var inorderTraversal = function (root) {
  function inOrder(root) {
    if (root === null) {
      return;
    }
    res.push(root);
    inOrder(root.left);
    inOrder(root.right);
  }

  const res = [];
  inOrder(root);
  return res;
};

const root = [1, null, 2, 3];

console.log(inorderTraversal(root));
