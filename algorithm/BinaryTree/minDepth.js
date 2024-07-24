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
// 我们先使用bsf
var minDepth_bfs = function (root) {
  if (!root) return 0;
  let minDepth = 0;
  let queue = [root];
  while (queue.length) {
    let length = queue.length;
    minDepth++;
    for (let i = 0; i < length; i++) {
      let node = queue.shift();
      if (!node.right && !node.left) {
        return minDepth;
      }
      node.left && queue.push(node.left);
      node.right && queue.push(node.right);
    }
  }
  return minDepth;
};

function minDepth(root) {
  if (!root) return 0;
  // 到叶子节点 返回 1
  if (!root.left && !root.right) return 1;
  // 只有右节点时 递归右节点
  if (!root.left) return 1 + minDepth(root.right);
  // 只有左节点时 递归左节点
  if (!root.right) return 1 + minDepth(root.left);
  return Math.min(minDepth(root.left), minDepth(root.right)) + 1;
}
