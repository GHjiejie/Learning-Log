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
 * @return {number[][]}
 */

// 这道题是第一次接触到回溯
var pathSum = function (root, targetSum) {
  if (!root) {
    return [];
  }
  let res = [];

  function getPath(node, arr, sum) {
    if (!node) {
      return;
    }

    sum += node.val;
    arr.push(node.val);

    if (!node.left && !node.right && sum === targetSum) {
      res.push([...arr]); // 注意这里需要创建arr的副本
    }

    getPath(node.left, arr, sum);
    getPath(node.right, arr, sum);

    arr.pop(); // 回溯，移除当前节点的值
  }

  getPath(root, [], 0);
  return res;
};
