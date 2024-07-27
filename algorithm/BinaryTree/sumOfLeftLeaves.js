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
// 下面这个代码是求所有的左侧节点之和，叶子节点和非叶子节点
// var sumOfLeftLeaves = function (root) {
//   if (!root) {
//     return 0;
//   }
//   let sum = 0;

//   function leftSum(node, arr) {
//     if (!node) {
//       return;
//     }
//     if (node.left) {
//       arr.push(node.left);
//       sum += node.left.val;
//     }
//     leftSum(node.left, arr);
//     leftSum(node.right, arr);
//     arr.pop();
//   }

//   leftSum(root, []);
//   return sum;
// };

// 求左侧的所有的非叶子节点的和
function sumOfLeftLeaves(root) {
  if (!root) {
    return 0;
  }
  let sum = 0;
  function getSum(node) {
    if (!node) {
      return;
    }
    if (node.left && !node.left.left && !node.left.right) {
      sum += node.left.val;
    }
    getSum(node.left);
    getSum(node.right);
  }
  getSum(root);
  return sum;
}
