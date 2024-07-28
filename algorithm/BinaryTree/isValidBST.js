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
 * @return {boolean}
 */
// 只检查了当前节点与其直接子节点的关系:

// 代码只比较了当前节点与其左右子节点的值大小关系，而没有考虑子树中其他节点的约束。
// 在 BST 中，每个节点的值都必须大于其左子树中所有节点的值，并且小于其右子树中所有节点的值。
// 仅仅比较直接子节点是不够的。
// 边界条件处理不完整:

// 代码在判断左右子节点时，缺少对空节点的处理。
// 例如，if (!node.left && node.right.val <= node.val) 这行代码，如果 node.right 为空，就会抛出错误。
var isValidBST = function (root) {
  if (!root) {
    return;
  }
  let res = true;
  function isValid(node) {
    if (!node) {
      return;
    }
    if (!node.left && !node.right) {
      return;
    }
    if (!node.left && node.right.val <= node.val) {
      res = false;
    }
    if (!node.right && node.left.val >= node.val) {
      res = false;
    }
    if (
      (node.left && node.left.val >= node.val) ||
      (node.right && node.right.val <= node.val)
    ) {
      res = false;
    }
    isValid(node.left);
    isValid(node.right);
  }
  isValid(root);
  return res;
};

// 前序遍历
var isValidBST = function (root) {
  function isValid(node, min = -Infinity, max = Infinity) {
    if (!node) {
      return true; // 空节点视为有效
    }
    if (node.val <= min || node.val >= max) {
      return false; // 当前节点值超出边界，无效
    }
    // 递归检查左右子树，更新边界条件
    return (
      isValid(node.left, min, node.val) && isValid(node.right, node.val, max)
    );
  }
  return isValid(root);
};
// 中序遍历+指针优化
// 提出疑问：这样操作我们会将所有的节点全部push到数组里面，但是我们是不是可以在节点push到数组之前判断这个节点的值与前一个节点的值的大小
var isValidBST = function (root) {
  let pre = null; // 记录前一个访问的节点值

  function inorder(node) {
    if (!node) {
      return true; // 空节点视为有效
    }

    // 中序遍历：左子树 -> 当前节点 -> 右子树
    if (!inorder(node.left)) {
      // 如果左子树不是 BST，直接返回 false
      return false;
    }

    if (pre !== null && node.val <= pre) {
      // 判断当前节点是否大于前一个节点
      return false;
    }
    pre = node.val; // 更新 pre 为当前节点的值

    return inorder(node.right); // 检查右子树
  }

  return inorder(root);
};
var isValidBST = function (root) {
  if (!root) {
    return true;
  }
  let stack = [];
  let res = true;
  function getInOrderArr(node) {
    if (!node) {
      return;
    }
    getInOrderArr(node.left);
    stack.push(node.val);
    getInOrderArr(node.right);
  }
  getInOrderArr(root);
  for (let i = 0; i < stack.length - 1; i++) {
    let slowIndex = i;
    let fastIndex = i + 1;
    if (stack[fastIndex] <= stack[slowIndex] && fastIndex < stack.length) {
      res = false;
      break;
    }
  }
  return res;
};
