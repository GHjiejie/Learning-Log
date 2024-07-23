// 统一写法实现前中后序遍历（非递归）

class Traversal {
  constructor(root) {
    this.root = root;
  }
  preorder(root) {
    if (!root) {
      return [];
    }
    let stack = [root];
    let res = [];
    while (stack.length) {
      let node = stack.pop();
      if (!node) {
        res.push(stack.pop().val);
        continue;
      }
      node.right && stack.push(node.right);
      node.left && stack.push(node.left);
      stack.push(node);
      stack.push(null);
    }
    return res;
  }
  inorder(root) {
    if (!root) {
      return [];
    }
    let stack = [root];
    let res = [];
    while (stack.length) {
      let node = stack.pop();
      if (!node) {
        res.push(stack.pop().val);
        continue;
      }
      node.right && stack.push(node.right);
      stack.push(node);
      stack.push(null);
      node.left && stack.push(node.left);
    }
    return res;
  }
  postorder(root) {
    if (!root) {
      return [];
    }
    let stack = [root];
    let res = [];
    while (stack.length) {
      let node = stack.pop();
      if (!node) {
        res.push(stack.pop().val);
        continue;
      }
      stack.push(node);
      stack.push(null);
      node.right && stack.push(node.right);
      node.left && stack.push(node.left);
    }
    return res;
  }
}
