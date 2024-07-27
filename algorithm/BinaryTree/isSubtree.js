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
  let startNodeQueue = [];
  let helpQueue = [root];
  let targetNodeVal = subRoot.val;
  let res = false;

  while (helpQueue.length) {
    let len = helpQueue.length;
    for (let i = 0; i < len; i++) {
      let node = helpQueue.shift();
      if (node.val === targetNodeVal) {
        startNodeQueue.push(node);
      }
      node.left && helpQueue.push(node.left);
      node.right && helpQueue.push(node.right);
    }
  }

  function isSub(root, subRoot) {
    if (!root && !subRoot) {
      return true;
    }
    if ((!root && subRoot) || (!subRoot && root)) {
      return false;
    }

    if (root.val === subRoot.val) {
      return isSub(root.left, subRoot.left) && isSub(root.right, subRoot.right);
    }
  }

  for (let i = 0; i < startNodeQueue.length; i++) {
    if (isSub(startNodeQueue[i], subRoot)) {
      res = true;
      break;
    }
  }
  return res;
};
