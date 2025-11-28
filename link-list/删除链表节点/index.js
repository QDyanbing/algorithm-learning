/**
 * 使用虚拟头节点删除指定值
 * 思路拆解：
 * - 引入 dummy 节点是为了把“删除头节点”与“删除中间节点”统一处理，避免每次都写 if 判断。
 * - prev 指针始终指向“已确认保留的节点”，prev.next 则指向待检查节点。
 * - 一旦命中目标节点，通过 prev.next = prev.next.next 将其跳过，相当于删除。
 * - dummy 并不会出现在最终链表中，最终返回 dummy.next 才是真实的头节点。
 *
 * 时间复杂度 O(n)，需要一次线性扫描；空间复杂度 O(1)。
 * @param {ListNode|null} head 原链表头结点
 * @param {number} val 要删除的节点值（保证唯一）
 * @returns {ListNode|null} 删除后的链表头
 */
export const deleteNodeByDummy = function (head, val) {
  const dummy = { next: head }; // Step 0：虚拟头节点
  let prev = dummy;

  while (prev.next) {
    if (prev.next.val === val) {
      prev.next = prev.next.next; // Step 1：跳过目标节点，原节点由 GC 回收
      break;
    }
    prev = prev.next; // Step 2：继续向前搜索，直到链表末尾
  }

  return dummy.next;
};

/**
 * 双指针（前驱 + 当前）删除指定值
 * 思路拆解：
 * - 这是最直接的手法：使用两个指针 prev（前驱）和 curr（当前），同步向前扫描。
 * - 在进入循环前，先特判 head 即目标值的情况，此时直接返回 head.next。
 * - 循环中若发现 curr.val === val，只需要把 prev.next 指向 curr.next，即可在 O(1) 时间删除 curr。
 * - 若遍历到链表末尾仍未找到目标，则说明链表无需改动，直接返回原 head。
 *
 * 时间复杂度 O(n)，空间复杂度 O(1)。
 * @param {ListNode|null} head 原链表头结点
 * @param {number} val 要删除的节点值
 * @returns {ListNode|null} 删除后的头结点
 */
export const deleteNodeByTwoPointers = function (head, val) {
  if (!head) return null;
  if (head.val === val) return head.next; // Step 0：处理删除头节点

  let prev = head;
  let curr = head.next;

  while (curr) {
    if (curr.val === val) {
      prev.next = curr.next; // Step 1：删除当前节点
      break;
    }
    prev = curr; // Step 2：同步前进，维持前驱关系
    curr = curr.next;
  }

  return head;
};

