/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var swapPairs = function (head) {
  const ret = new ListNode(0, head);
  // temp实际上是这个链表的一个复制
  let temp = ret;
  while (temp.next && temp.next.next) {
    let cur = temp.next.next;
    let pre = temp.next;
  }
};

const head = [1, 2, 3, 4];
