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
 * @param {TreeNode} subRoot
 * @return {boolean}
 */
var isSubtree = function (root, subRoot) {
  if (!subRoot) return true;
  let helpQueue = [root];
  let targetNodeVal = subRoot.val;
  let res = false;

  while (helpQueue.length) {
    let len = helpQueue.length;
    for (let i = 0; i < len; i++) {
      let node = helpQueue.shift();
      if (node.val === targetNodeVal) {
        if (isSub(node, subRoot)) {
          res = true;
          break;
        }
      }
      node.left && helpQueue.push(node.left);
      node.right && helpQueue.push(node.right);
    }
    if (res) {
      break;
    }
  }

  function isSub(root, subRoot) {
    if (!root && !subRoot) {
      return true;
    }
    if (!root || !subRoot || root.val !== subRoot.val) {
      return false;
    }
    return isSub(root.left, subRoot.left) && isSub(root.right, subRoot.right);
  }
  return res;
};
