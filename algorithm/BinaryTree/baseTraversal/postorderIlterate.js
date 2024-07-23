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
var postorderIlterate = function (root) {
  if (root === null) {
    return [];
  }
  let cur = root;
  let stack = [root];
  let res = [];
  while (stack.length > 0) {
    cur = stack.pop();
    res.push(cur.val);
    cur.left && stack.push(cur.left);
    cur.right && stack.push(cur.right);
  }
  return res.reverse();
};

const root = [1, null, 2, 3];
console.log(postorderIlterate(root));
