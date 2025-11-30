/**
 * 环形链表 - 快慢指针法（Floyd 判圈算法）
 * 思路：
 * 1. 使用两个指针 `slow` 和 `fast`，`slow` 每次移动一步，`fast` 每次移动两步。
 * 2. 如果链表中存在环，快指针最终会追上慢指针（两者相遇）。
 * 3. 如果链表中不存在环，快指针会先到达链表末尾（`fast` 或 `fast.next` 为 null）。
 * 4. 循环条件为 `fast && fast.next`，确保快指针能安全地移动两步。
 * 时间复杂度 O(n)，其中 n 为链表长度。最坏情况下，快指针需要遍历整个链表。
 * 空间复杂度 O(1)，只使用了两个指针的额外空间。
 * @param {ListNode|null} head 链表的头结点
 * @returns {boolean} 如果链表中存在环返回 true，否则返回 false
 */
export const hasCycle = function (head) {
  if (!head || !head.next) return false; // Step 0：边界情况，空链表或单节点无环

  let slow = head; // Step 1：慢指针，每次移动一步
  let fast = head.next; // Step 2：快指针，每次移动两步

  // Step 3：遍历链表，直到快慢指针相遇或快指针到达末尾
  while (slow !== fast) {
    // Step 4：如果快指针到达末尾，说明无环
    if (!fast || !fast.next) return false;

    slow = slow.next; // Step 5：慢指针移动一步
    fast = fast.next.next; // Step 6：快指针移动两步
  }

  // Step 7：快慢指针相遇，说明存在环
  return true;
};

