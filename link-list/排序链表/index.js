import { ListNode } from "../base.js";

/**
 * 合并两个有序链表（辅助函数）
 * @param {ListNode|null} head1
 * @param {ListNode|null} head2
 * @returns {ListNode|null}
 */
function mergeTwoLists(head1, head2) {
  const dummyHead = new ListNode(0);
  let temp = dummyHead;
  let temp1 = head1;
  let temp2 = head2;

  while (temp1 && temp2) {
    if (temp1.val <= temp2.val) {
      temp.next = temp1;
      temp1 = temp1.next;
    } else {
      temp.next = temp2;
      temp2 = temp2.next;
    }
    temp = temp.next;
  }

  temp.next = temp1 ? temp1 : temp2;

  return dummyHead.next;
}

/**
 * 使用快慢指针找到链表中点，并将链表断开（递归实现辅助函数）
 * @param {ListNode} head
 * @param {ListNode|null} tail
 * @returns {ListNode|null}
 */
function findMiddleAndSplit(head, tail) {
  if (head === null) {
    return head;
  }
  if (head.next === tail) {
    head.next = null;
    return head;
  }

  let slow = head;
  let fast = head;

  while (fast !== tail) {
    slow = slow.next;
    fast = fast.next;
    if (fast !== tail) {
      fast = fast.next;
    }
  }

  const mid = slow;
  return mid;
}

/**
 * 递归排序链表（辅助函数）
 * @param {ListNode} head
 * @param {ListNode|null} tail
 * @returns {ListNode|null}
 */
function sortListRecursive(head, tail) {
  if (head === null) {
    return head;
  }
  if (head.next === tail) {
    head.next = null;
    return head;
  }

  const mid = findMiddleAndSplit(head, tail);
  return mergeTwoLists(
    sortListRecursive(head, mid),
    sortListRecursive(mid, tail)
  );
}

/**
 * 排序链表 - 递归实现（自顶向下归并排序）
 * 思路：
 * 1. 使用快慢指针找到链表中点，将链表分成两部分。
 * 2. 递归排序左右两部分。
 * 3. 合并两个有序链表。
 * 时间复杂度 O(n log n)，空间复杂度 O(log n)（递归栈空间）。
 * @param {ListNode|null} head
 * @returns {ListNode|null}
 */
export const sortListByRecursion = function (head) {
  return sortListRecursive(head, null);
};

/**
 * 排序链表 - 迭代实现（自底向上归并排序）
 * 思路：
 * 1. 先计算链表长度。
 * 2. 从子链表长度为 1 开始，逐步增大到整个链表长度。
 * 3. 每次将链表分成若干对子链表，分别合并。
 * 4. 重复步骤 3 直到整个链表排序完成。
 * 时间复杂度 O(n log n)，空间复杂度 O(1)。
 * @param {ListNode|null} head
 * @returns {ListNode|null}
 */
export const sortListByIteration = function (head) {
  if (!head) return head;

  // 计算链表长度
  let length = 0;
  let node = head;
  while (node) {
    length++;
    node = node.next;
  }

  const dummyHead = new ListNode(0, head);

  // 从子链表长度为 1 开始，逐步增大
  for (let subLength = 1; subLength < length; subLength <<= 1) {
    let prev = dummyHead;
    let curr = dummyHead.next;

    while (curr) {
      // 切出第一个子链表
      let head1 = curr;
      for (let i = 1; i < subLength && curr.next; i++) {
        curr = curr.next;
      }

      // 切出第二个子链表
      let head2 = curr.next;
      curr.next = null;
      curr = head2;
      for (let i = 1; i < subLength && curr && curr.next; i++) {
        curr = curr.next;
      }

      // 保存下一对的起始位置
      let next = null;
      if (curr) {
        next = curr.next;
        curr.next = null;
      }

      // 合并两个子链表
      prev.next = mergeTwoLists(head1, head2);

      // 将 prev 移动到合并后链表的末尾
      while (prev.next) {
        prev = prev.next;
      }

      curr = next;
    }
  }

  return dummyHead.next;
};
