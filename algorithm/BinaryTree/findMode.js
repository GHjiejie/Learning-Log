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
var findMode = function (root) {
  if (!root) {
    return [];
  }
  let queue = [root];
  let res = [];
  let map = new Map();
  while (queue.length) {
    let length = queue.length;
    for (let i = 0; i < length; i++) {
      let node = queue.shift();
      map.set(node.val, (map.get(node.val) || 0) + 1);
      node.left && queue.push(node.left);
      node.right && queue.push(node.right);
    }
  }
  // 寻找map数组里面values的最大值
  let maxValue = Math.max(...map.values());
  // 寻找最大值对应的key值
  for (let [key, value] of map) {
    if (value === maxValue) {
      res.push(key);
    }
  }
  return res;
};

// GPT对代码的优化，使用dfs
var findMode = function (root) {
  if (!root) {
    return [];
  }

  let current = null;
  let count = 0;
  let maxCount = 0;
  let modes = [];

  function inOrder(node) {
    if (!node) {
      return;
    }
    inOrder(node.left);

    if (current !== node.val) {
      current = node.val;
      count = 0;
    }
    count++;
    if (count > maxCount) {
      maxCount = count;
      modes = [current];
    } else if (count === maxCount) {
      modes.push(current);
    }

    inOrder(node.right);
  }

  inOrder(root);
  return modes;
};
