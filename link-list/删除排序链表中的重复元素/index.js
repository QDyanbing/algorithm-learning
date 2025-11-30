/**
 * 删除排序链表中的重复元素
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

