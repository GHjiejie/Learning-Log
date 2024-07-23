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
// 使用迭代实现二叉树的中序遍历

function preorderIterate(root) {
  if (root == null) {
    return [];
  }
  let current = root;
  const stack = [root];
  let res = [];
  while (stack.length > 0) {
    current = stack.pop();
    res.push(current.val);
    current.right && stack.push(current.right);
    current.left && stack.push(current.left);
  }
  return res;
}
