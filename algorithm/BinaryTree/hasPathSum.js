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
 * @param {number} targetSum
 * @return {boolean}
 */
// var hasPathSum = function (root, targetSum) {
//   if (!root) {
//     return false;
//   }
//   let res = false;
//   function getPathSum(node, sum) {
//     if (!node) {
//       return;
//     }
//     sum += node.val;
//     if (!node.left && !node.right && sum == targetSum) {
//       res = true;
//       return;
//     } else {
//       getPathSum(node.left, sum);
//       getPathSum(node.right, sum);
//     }
//   }
//   getPathSum(root, 0);
//   return res;
// };

// 下面是GPT对代码的优化
// 思路，既然是寻找是否有符合条件的路径，那么我们只需要左子树或者右子树有一个城里即可，不需要左右都遍历
function hasPathSum(root) {
  if (!root) {
    return false;
  }
  function getPathSum(node, sum) {
    if (!node) {
      return false;
    }
    sum += node.val;
    if (!node.left && !node.right && sum === targetSum) {
      return true;
    }
    return getPathSum(node.left, sum) || getPathSum(node.right, sum);
  }
  return getPathSum(root, 0);
}
