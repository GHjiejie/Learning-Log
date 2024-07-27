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
// var sumNumbers = function (root) {
//   if (!root) {
//     return 0;
//   }
//   let sum = 0;
//   let sumArr = [];
//   function getPath(node, res) {
//     if (!node) {
//       return;
//     }
//     res.push(node.val);
//     if (!node.left && !node.right) {
//       const pathSum = res.reduce((acc, cur) => acc * 10 + cur, 0);
//       sumArr.push(pathSum);
//     }

//     getPath(node.left, [...res]);
//     getPath(node.right, [...res]);
//     res.pop();
//   }
//   getPath(root, []);
//   for (let i = 0; i < sumArr.length; i++) {
//     sum += sumArr[i];
//   }
//   return sum;
// };
var sumNumbers = function (root) {
  let sum = 0;

  function getPath(node, currentSum) {
    if (!node) {
      return;
    }
    currentSum = currentSum * 10 + node.val;
    if (!node.left && !node.right) {
      sum += currentSum;
      return;
    } else {
      getPath(node.left, currentSum);
      getPath(node.right, currentSum);
    }
  }

  getPath(root, 0);
  return sum;
};
