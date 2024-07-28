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
 * @param {number} val
 * @return {TreeNode}
 */

// 使用的是层序遍历
// var searchBST = function (root, val) {
//   if (!root) {
//     return [];
//   }
//   let queue = [root];
//   let res = [];
//   while (queue.length) {
//     let len = queue.length;
//     for (let i = 0; i < len; i++) {
//       let node = queue.shift();
//       if (node.val === val) {
//         res.push(node);
//       }
//       node.left && queue.push(node.left);
//       node.right && queue.push(node.right);
//     }
//   }
//   return res.length !== 0 ? res[0] : null;
// };

// 使用递归遍历

// function searchBST(root, val) {
//   if (!root) {
//     return null;
//   }
//   let res = [];
//   function searchNode(node) {
//     if (!node) {
//       return;
//     }
//     if (node.val === val) {
//       res.push(node);
//     }
//     return searchNode(node.left) || searchNode(node.right);
//   }
//   searchNode(root);
//   return res.length ? res[0] : null;
// }

// 使用递归+搜索二叉树的特点
function searchBST(root, val) {
  if (!root) {
    return null;
  }
  if (root.val == val) {
    return root;
  } else if (root.val > val) {
    return searchBST(root.left, val);
  } else {
    return searchBST(root.right, val);
  }
}
