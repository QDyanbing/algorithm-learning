/**
 * 判断链表是否回文
 * 思路：
 * 1. 使用快慢指针定位链表中点，slow 最终落在后半部分起点（奇数长度时在正中）。
 * 2. 原地反转从 slow 开始的后半段，使其方向与前半段一致，方便逐节点比较。
 * 3. 使用两个指针从头部和反转后的后半段同时出发，逐一比较数值。
 * 4. 任意一对不相等立即返回 false；若全部匹配则回文成立。
 * 若需保持链表原状，可在比较后再次反转后半段（此处省略）。
 */
export const isPalindrome = function (head) {
  // Step 0：快慢指针寻找中点，fast 每次走两步，slow 走一步
  let slow = head;
  let fast = head;
  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
  }

  // Step 1：从 slow 开始反转后半部分
  let prev = null;
  let curr = slow;
  while (curr) {
    const next = curr.next; // 暂存后继，避免链表断开
    curr.next = prev; // 指针反向
    prev = curr; // 前移反转链表头
    curr = next; // 继续处理剩余节点
  }

  // Step 2：比较前半部分与反转后的后半部分
  let left = head;
  let right = prev; // prev 当前是反转后半段的头
  while (left && right) {
    if (left.val !== right.val) return false; // Step 3：遇到不等直接失败
    left = left.next;
    right = right.next;
  }

  return true; // Step 4：全部匹配则为回文
};
