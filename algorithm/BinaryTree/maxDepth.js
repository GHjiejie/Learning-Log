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
var maxDepth = function (root) {
  if (root === null) {
    return 0;
  }
  function dfs(node) {
    if (node === null) {
      return 0;
    }
    let leftDepth = dfs(node.left);
    let rightDepth = dfs(node.right);
    return Math.max(leftDepth, rightDepth) + 1;
  }
  return dfs(root);
  // function dfs(node, currentLength) {
  //   let length = currentLength;
  //   if (node.right && node.left) {
  //     let leftDepth = dfs(node.left, length);
  //     let rightDepth = dfs(node.right, length);
  //     let maxDepth = rightDepth > leftDepth ? rightDepth : leftDepth;
  //     length += maxDepth;
  //   } else {
  //     length++;
  //   }
  //   return length;
  // }
  // let leftDepth = dfs(root.left, 1);
  // let rightDepth = dfs(root.right, 1);
  // let maxDepth = rightDepth > leftDepth ? rightDepth : leftDepth;
  // return maxDepth;
};
