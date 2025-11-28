/**
 * 迭代版链表反转
 * 思路：
 * 1. 维护两个指针 `prev`、`current`，分别指向已完成反转的链表头与当前遍历节点。
 * 2. 循环中先缓存 `current.next`，确保断开指针后仍能访问剩余链表。
 * 3. 将 `current.next` 指向 `prev`，等价于把当前节点插到已反转链表头部。
 * 4. 将 `prev`、`current` 向前推进，直到原链表遍历完毕。
 * 当 `current` 走到 null 时，`prev` 即新链表的头结点。
 * @param {ListNode|null} head 原链表头结点
 * @returns {ListNode|null} 反转后的头结点
 */
export const reverseListByIteration = function (head) {
  let prev = null; // 已反转部分的头节点
  let current = head; // 当前遍历到的节点

  while (current) {
    const next = current.next; // 暂存后继节点，避免链表断开
    current.next = prev; // 将当前节点指向已反转链表
    prev = current; // prev 前移，成为新的反转头
    current = next; // 继续处理原链表剩余部分
  }

  return prev; // prev 即最终的新头结点
};

/**
 * 递归版链表反转
 * 思路：
 * 1. 递归终止于空链或单节点，此时该节点天然是反转后的头。
 * 2. 对 `head.next` 做递归调用，会返回子链表反转后的头结点 `newHead`。
 * 3. 回溯阶段把 `head.next.next` 指回 `head`，相当于把当前节点追加到子链尾部。
 * 4. 断开 `head.next`，让当前节点成为新的尾结点，防止形成环。
 * 整个递归都会返回 `newHead`，于是最初调用即可得到反转结果。
 * @param {ListNode|null} head 原链表头结点
 * @returns {ListNode|null} 反转后的头结点
 */
export const reverseListByRecursion = function (head) {
  if (!head || !head.next) return head; // 递归出口：空链或单节点

  const newHead = reverseListByRecursion(head.next); // 递归到子链尾部

  head.next.next = head; // 回溯阶段把后继节点指向当前节点
  head.next = null; // 当前节点作为尾部，需断开原有指向

  return newHead; // 始终返回最初递归得到的新头
};
