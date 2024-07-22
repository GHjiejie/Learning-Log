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
var inorderIterate = function (root) {
  const res = [];
  const stack = root;
  console.log(stack);
  let cur = null;
  while (stack.length) {
    cur = stack.pop();
    res.push(cur);
    if (cur.right !== null) {
      res.push(cur.right);
    }
    if (cur.left !== null) {
      res.push(cur.left);
    }
  }
  return res;
};

const root = [1, 4, 2, 3, 6];

console.log(inorderIterate(root));
