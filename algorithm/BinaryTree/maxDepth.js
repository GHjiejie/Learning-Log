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

// 递归实现最大深度
// var maxDepth = function (root) {
//   if (root === null) {
//     return 0;
//   }
//   function dfs(node) {
//     if (node === null) {
//       return 0;
//     }
//     let leftDepth = dfs(node.left);
//     let rightDepth = dfs(node.right);
//     return Math.max(leftDepth, rightDepth) + 1;
//   }
//   return dfs(root);
// };

// 迭代实现最大深度
// function maxDepth(root) {
//   if (!root) {
//     return 0;
//   }
//   let depth = 0;
//   let queue = [root];
//   while (queue.length) {
//     let length = queue.length;
//     for (let i = 0; i < length; i++) {
//       let node = queue.shift();
//       node.left && queue.push(node.left);
//       node.right && queue.push(node.right);
//     }
//     ++depth;
//   }
//   return depth;
// }

function maxDepth(root) {
  if (!root) {
    return 0;
  }
  let leftDepth = maxDepth(root.left);
  let rightDepth = maxDepth(root.right);

  return leftDepth > rightDepth ? leftDepth + 1 : rightDepth + 1;
}
