/**
 * 删除排序链表中的重复元素 - 单指针迭代法
 * 思路：
 * 1. 由于链表已按升序排列，重复元素必然相邻出现，无需额外排序或哈希表。
 * 2. 使用单指针 `current` 遍历链表，始终比较当前节点与下一个节点的值。
 * 3. 若 `current.val === current.next.val`，说明发现重复，将 `current.next` 指向 `current.next.next`，跳过重复节点。
 * 4. 若值不同，说明当前节点唯一，将 `current` 前移到 `current.next`，继续检查后续节点。
 * 5. 循环条件为 `current && current.next`，确保能安全访问 `current.next.val`。
 * 时间复杂度 O(n)，其中 n 为链表长度，每个节点最多被访问一次。
 * 空间复杂度 O(1)，只使用了常数额外空间。
 * @param {ListNode|null} head 排序链表的头结点
 * @returns {ListNode|null} 删除重复元素后的链表头结点
 */
export const deleteDuplicates = function (head) {
  let current = head; // Step 0：初始化指针指向链表头部

  // Step 1：遍历链表，直到到达末尾或倒数第二个节点
  while (current && current.next) {
    if (current.val === current.next.val) {
      // Step 2：发现重复值，跳过下一个节点（删除重复节点）
      current.next = current.next.next;
    } else {
      // Step 3：值不同，当前节点唯一，指针前移继续检查
      current = current.next;
    }
  }

  // Step 4：返回处理后的链表头（头结点不会被删除，直接返回原 head）
  return head;
};

/**
 * 删除排序链表中的重复元素 - 递归法
 * 思路：
 * 1. 递归出口：空链表或单节点链表，直接返回 head。
 * 2. 递归处理 `head.next`，得到已去重的子链表。
 * 3. 比较 `head.val` 与 `head.next.val`（子链表的头节点值）。
 * 4. 若值相同，说明 head 是重复节点，跳过 head 返回子链表。
 * 5. 若值不同，说明 head 是唯一节点，将 head.next 指向递归结果，返回 head。
 * 时间复杂度 O(n)，每个节点被访问一次。
 * 空间复杂度 O(n)，递归调用栈的深度为链表长度。
 * @param {ListNode|null} head 排序链表的头结点
 * @returns {ListNode|null} 删除重复元素后的链表头结点
 */
export const deleteDuplicatesByRecursion = function (head) {
  // Step 0：递归出口，空链表或单节点直接返回
  if (!head || !head.next) return head;

  // Step 1：递归处理后续节点，得到已去重的子链表
  head.next = deleteDuplicatesByRecursion(head.next);

  // Step 2：比较当前节点与子链表头节点的值
  if (head.val === head.next.val) {
    // Step 3：值相同，当前节点重复，跳过当前节点返回子链表
    return head.next;
  } else {
    // Step 4：值不同，当前节点唯一，返回当前节点
    return head;
  }
};

/**
 * 删除排序链表中的重复元素 - 双指针法
 * 思路：
 * 1. 使用 `slow` 指向已处理部分的尾部，`fast` 用于遍历剩余节点。
 * 2. `fast` 向前移动，跳过所有与 `slow` 值相同的节点。
 * 3. 当 `fast.val !== slow.val` 时，说明遇到新值，将 `slow.next` 指向 `fast`，`slow` 前移。
 * 4. 最后将 `slow.next` 置为 null，断开后续连接。
 * 时间复杂度 O(n)，每个节点最多被访问一次。
 * 空间复杂度 O(1)，只使用了常数额外空间。
 * @param {ListNode|null} head 排序链表的头结点
 * @returns {ListNode|null} 删除重复元素后的链表头结点
 */
export const deleteDuplicatesByTwoPointers = function (head) {
  if (!head || !head.next) return head; // Step 0：边界情况处理

  let slow = head; // Step 1：慢指针指向已处理部分的尾部
  let fast = head.next; // Step 2：快指针用于遍历剩余节点

  while (fast) {
    if (slow.val !== fast.val) {
      // Step 3：遇到新值，将 slow 的下一个节点指向 fast
      slow.next = fast;
      slow = slow.next; // Step 4：slow 前移，指向新的尾部
    }
    fast = fast.next; // Step 5：fast 继续向前遍历
  }

  slow.next = null; // Step 6：断开 slow 之后的连接，去除可能的重复节点

  return head; // Step 7：返回处理后的链表头
};
