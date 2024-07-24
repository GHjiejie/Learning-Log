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
// var countNodes = function (root) {
//   //利用完全二叉树的特点
//   if (root === null) {
//     return 0;
//   }
//   let left = root.left;
//   let right = root.right;
//   let leftDepth = 0,
//     rightDepth = 0;
//   while (left) {
//     left = left.left;
//     leftDepth++;
//   }
//   while (right) {
//     right = right.right;
//     rightDepth++;
//   }
//   if (leftDepth == rightDepth) {
//     return Math.pow(2, leftDepth + 1) - 1;
//   }
//   return countNodes(root.left) + countNodes(root.right) + 1;
// };

// 老老实实bfs好了
function countNodes(root) {
  if (!root) return 0;
  let nodes = 0;
  let queue = [root];
  while (queue.length) {
    let length = queue.length;
    for (let i = 0; i < length; i++) {
      let node = queue.shift();
      nodes++;
      node.left && queue.push(node.left);
      node.right && queue.push(node.right);
    }
  }
  return nodes;
}
