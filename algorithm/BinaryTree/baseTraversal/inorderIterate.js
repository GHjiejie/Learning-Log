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

function inorderIterate(root) {
  // 设置一个变量指向根节点
  let current = root;
  // 设置一个辅助栈
  const stack = [];
  // 设置一个中序遍历后的数组
  let res = [];
  while (current !== null || stack.length > 0) {
    while (current !== null) {
      stack.push(current);
      current = current.left;
    }
    // 将最左边的元素的根元素pop出去,因为此时这个元素已经没有左子树了
    // stack.pop(current);这段代码是错误的原因
    current = stack.pop();
    // 将元素加入到最后的结果数组里面
    res.push(current.val);
    // 再去处理这个根节点的右孩子;
    current = current.right;
  }
  return res;
}
