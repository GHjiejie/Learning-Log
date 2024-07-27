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
 * @return {string[]}
 */
var binaryTreePaths = function (root) {
  if (!root) return [];
  let res = [];
  function getPath(node, path) {
    if (!node) {
      return;
    }
    path += node.val.toString();
    //单层递归的终止条件，
    if (!node.left && !node.right) {
      res.push(path);
      return;
    }
    path = "->";
    getPath(node.left, path);
    getPath(node.right, path);
  }
  getPath(root, "");
  return res;
};
