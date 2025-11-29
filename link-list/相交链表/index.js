import { ListNode } from "../base.js";

/**
 * 相交链表 - 哈希集合法
 * 思路：
 * 1. 遍历链表 A，将所有节点存入 Set 集合中。
 * 2. 遍历链表 B，检查当前节点是否在 Set 中。
 * 3. 如果在 Set 中找到相同节点，说明找到了相交节点，返回该节点。
 * 4. 如果遍历完链表 B 都没有找到，说明两个链表不相交，返回 null。
 * 
 * 时间复杂度 O(m + n)，空间复杂度 O(m)，其中 m 和 n 分别是两个链表的长度。
 * @param {ListNode} headA 链表 A 的头节点
 * @param {ListNode} headB 链表 B 的头节点
 * @returns {ListNode|null} 相交节点，如果不相交返回 null
 */
export const getIntersectionNodeByHashSet = function (headA, headB) {
  // Step 0：创建 Set 集合用于存储链表 A 的节点
  const visited = new Set();
  let temp = headA;

  // Step 1：遍历链表 A，将所有节点存入 Set
  while (temp) {
    visited.add(temp);
    temp = temp.next;
  }

  // Step 2：遍历链表 B，检查是否存在相交节点
  temp = headB;
  while (temp) {
    // Step 3：如果当前节点在 Set 中，说明找到了相交节点
    if (visited.has(temp)) {
      return temp;
    }
    temp = temp.next;
  }

  // Step 4：遍历完链表 B 都没有找到相交节点，返回 null
  return null;
};

/**
 * 相交链表 - 双指针法
 * 思路：
 * 1. 使用两个指针 `pA` 和 `pB`，分别从链表 A 和链表 B 的头节点开始遍历。
 * 2. 当 `pA` 遍历到链表 A 的末尾时，将其重新指向链表 B 的头节点。
 * 3. 当 `pB` 遍历到链表 B 的末尾时，将其重新指向链表 A 的头节点。
 * 4. 如果两个链表相交，两个指针会在相交节点相遇；如果不相交，最终都会指向 `null`。
 * 
 * 原理：
 * - 假设链表 A 的长度为 a，链表 B 的长度为 b，相交部分长度为 c。
 * - 指针 pA 走的总路程：a + (b - c)
 * - 指针 pB 走的总路程：b + (a - c)
 * - 由于 a + (b - c) = b + (a - c)，两个指针会在相交点相遇。
 * - 如果两个链表不相交（c = 0），最终两个指针都会指向 `null`。
 * 
 * 时间复杂度 O(m + n)，空间复杂度 O(1)。
 * @param {ListNode} headA 链表 A 的头节点
 * @param {ListNode} headB 链表 B 的头节点
 * @returns {ListNode|null} 相交节点，如果不相交返回 null
 */
export const getIntersectionNodeByTwoPointers = function (headA, headB) {
  // Step 0：边界情况 - 如果任一链表为空，不可能相交
  if (!headA || !headB) return null;

  let pA = headA; // 指向链表 A 的指针
  let pB = headB; // 指向链表 B 的指针

  // Step 1：当两个指针不相等时继续遍历
  // 如果相交，会在相交节点相遇；如果不相交，最终都会指向 null
  while (pA !== pB) {
    // Step 2：如果 pA 到达链表 A 的末尾，将其指向链表 B 的头节点
    pA = pA === null ? headB : pA.next;
    // Step 3：如果 pB 到达链表 B 的末尾，将其指向链表 A 的头节点
    pB = pB === null ? headA : pB.next;
  }

  // Step 4：返回相交节点（如果相交）或 null（如果不相交）
  return pA;
};
