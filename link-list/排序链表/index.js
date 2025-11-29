import { ListNode } from "../base.js";

/**
 * 合并两个有序链表（辅助函数）
 * 思路：
 * 1. 创建虚拟头结点，方便统一处理结果链表的拼接。
 * 2. 使用三个指针：`temp` 指向结果链表的尾部，`temp1` 和 `temp2` 分别指向两个待合并链表的当前节点。
 * 3. 比较两个链表的当前节点值，较小者接到结果链表的尾部，并推进相应链表的指针。
 * 4. 当一个链表遍历完后，将另一个链表的剩余部分直接接到结果链表尾部。
 * 时间复杂度 O(m+n)，空间复杂度 O(1)。
 * @param {ListNode|null} head1 第一个有序链表的头结点
 * @param {ListNode|null} head2 第二个有序链表的头结点
 * @returns {ListNode|null} 合并后的有序链表头结点
 */
function mergeTwoLists(head1, head2) {
  const dummyHead = new ListNode(0); // Step 0：创建虚拟头结点，方便统一处理
  let temp = dummyHead; // 指向结果链表的尾部，用于拼接新节点
  let temp1 = head1; // 指向第一个链表的当前节点
  let temp2 = head2; // 指向第二个链表的当前节点

  // Step 1：当两个链表都还有节点时，比较当前节点值并选择较小者
  while (temp1 && temp2) {
    if (temp1.val <= temp2.val) {
      // 第一个链表的节点值较小或相等，将其接到结果链表
      temp.next = temp1;
      temp1 = temp1.next; // 推进第一个链表的指针
    } else {
      // 第二个链表的节点值较小，将其接到结果链表
      temp.next = temp2;
      temp2 = temp2.next; // 推进第二个链表的指针
    }
    temp = temp.next; // 结果链表尾部指针前移
  }

  // Step 2：将剩余未遍历完的链表直接接到结果链表尾部
  temp.next = temp1 ? temp1 : temp2;

  return dummyHead.next; // 返回虚拟头结点后的真实头结点
}

/**
 * 使用快慢指针找到链表中点（递归实现辅助函数）
 * 思路：
 * 1. 使用快慢指针技巧：慢指针每次走一步，快指针每次走两步。
 * 2. 当快指针到达 `tail`（或超过）时，慢指针正好指向中点。
 * 3. 返回中节点，后续会在调用处断开链表。
 * 时间复杂度 O(n)，空间复杂度 O(1)。
 * @param {ListNode} head 链表的头结点
 * @param {ListNode|null} tail 链表的尾节点（不包含），用于限定查找范围
 * @returns {ListNode} 中点节点
 */
function findMiddleAndSplit(head, tail) {
  // 边界情况：空链表直接返回
  if (head === null) {
    return head;
  }
  // 边界情况：只有一个节点时，该节点就是中点，同时断开与 tail 的连接
  if (head.next === tail) {
    head.next = null;
    return head;
  }

  let slow = head; // 慢指针，每次走一步
  let fast = head; // 快指针，每次走两步

  // Step 1：快慢指针同时移动，直到快指针到达或超过 tail
  while (fast !== tail) {
    slow = slow.next; // 慢指针前进一步
    fast = fast.next; // 快指针先进一步
    if (fast !== tail) {
      fast = fast.next; // 快指针再前进一步（总共两步）
    }
  }

  // Step 2：当循环结束时，slow 指向中点
  const mid = slow;
  return mid;
}

/**
 * 递归排序链表（辅助函数）
 * 思路：
 * 1. 递归出口：空链表或单节点链表已经有序，直接返回。
 * 2. 使用快慢指针找到中点，将链表分成两部分。
 * 3. 递归排序左半部分（从 head 到 mid）。
 * 4. 递归排序右半部分（从 mid 到 tail）。
 * 5. 合并两个已排序的子链表。
 * 时间复杂度 O(n log n)，空间复杂度 O(log n)（递归栈深度）。
 * @param {ListNode} head 待排序链表的头结点
 * @param {ListNode|null} tail 待排序链表的尾节点（不包含），初始为 null
 * @returns {ListNode|null} 排序后的链表头结点
 */
function sortListRecursive(head, tail) {
  // Step 0：递归出口 - 空链表已经有序
  if (head === null) {
    return head;
  }
  // Step 0：递归出口 - 单节点链表已经有序，需要断开与 tail 的连接
  if (head.next === tail) {
    head.next = null;
    return head;
  }

  // Step 1：使用快慢指针找到链表中点
  const mid = findMiddleAndSplit(head, tail);

  // Step 2：递归排序左半部分（从 head 到 mid 之前）
  const left = sortListRecursive(head, mid);
  // Step 3：递归排序右半部分（从 mid 到 tail 之前）
  const right = sortListRecursive(mid, tail);

  // Step 4：合并两个已排序的子链表
  return mergeTwoLists(left, right);
}

/**
 * 排序链表 - 递归实现（自顶向下归并排序）
 * 思路：
 * 采用分治思想，类似于数组的归并排序：
 * 1. 使用快慢指针找到链表中点，将链表分成两部分。
 * 2. 递归排序左半部分（从 head 到中点之前）。
 * 3. 递归排序右半部分（从中点到末尾）。
 * 4. 合并两个已排序的子链表。
 * 
 * 与迭代实现的区别：
 * - 递归实现是自顶向下的，先分割到最小单元再合并。
 * - 需要 O(log n) 的递归栈空间。
 * 
 * 时间复杂度 O(n log n)，空间复杂度 O(log n)（递归栈空间）。
 * @param {ListNode|null} head 待排序链表的头结点
 * @returns {ListNode|null} 排序后的链表头结点
 */
export const sortListByRecursion = function (head) {
  return sortListRecursive(head, null);
};

/**
 * 排序链表 - 迭代实现（自底向上归并排序）
 * 思路：
 * 采用自底向上的归并策略，避免使用递归栈：
 * 1. 先计算链表总长度，确定需要合并的轮数。
 * 2. 从子链表长度为 1 开始（每个节点都是有序的），逐步增大子链表长度（1, 2, 4, 8...）。
 * 3. 在每一轮中，将链表分成若干对相邻的子链表，每对分别合并。
 * 4. 重复步骤 3 直到子链表长度达到或超过整个链表长度。
 * 
 * 示例过程（链表 [4,2,1,3]）：
 * - 第1轮（长度1）：[4] [2] -> [2,4], [1] [3] -> [1,3] -> [2,4,1,3]
 * - 第2轮（长度2）：[2,4] [1,3] -> [1,2,3,4] -> 完成
 * 
 * 与递归实现的区别：
 * - 迭代实现是自底向上的，先合并小的子链表，再逐步扩大。
 * - 只需要 O(1) 的额外空间。
 * 
 * 时间复杂度 O(n log n)，空间复杂度 O(1)。
 * @param {ListNode|null} head 待排序链表的头结点
 * @returns {ListNode|null} 排序后的链表头结点
 */
export const sortListByIteration = function (head) {
  // Step 0：边界情况 - 空链表直接返回
  if (!head) return head;

  // Step 1：计算链表长度，用于控制合并的轮数
  let length = 0;
  let node = head;
  while (node) {
    length++;
    node = node.next;
  }

  // Step 2：创建虚拟头结点，方便统一处理结果链表
  const dummyHead = new ListNode(0, head);

  // Step 3：从子链表长度为 1 开始，逐步增大（1, 2, 4, 8...）
  for (let subLength = 1; subLength < length; subLength <<= 1) {
    let prev = dummyHead; // 指向已合并部分链表的尾部
    let curr = dummyHead.next; // 指向当前待处理的节点

    // Step 4：在当前子链表长度下，遍历整个链表，将相邻的子链表对进行合并
    while (curr) {
      // Step 4.1：切出第一个子链表（长度为 subLength）
      let head1 = curr; // 第一个子链表的头
      for (let i = 1; i < subLength && curr.next; i++) {
        curr = curr.next; // 移动到第一个子链表的末尾
      }

      // Step 4.2：切出第二个子链表（长度为 subLength）
      let head2 = curr.next; // 第二个子链表的头
      curr.next = null; // 断开第一个子链表
      curr = head2; // 从第二个子链表的头开始
      for (let i = 1; i < subLength && curr && curr.next; i++) {
        curr = curr.next; // 移动到第二个子链表的末尾
      }

      // Step 4.3：保存下一对子链表的起始位置，并断开第二个子链表
      let next = null;
      if (curr) {
        next = curr.next; // 记录下一对子链表的起始位置
        curr.next = null; // 断开第二个子链表
      }

      // Step 4.4：合并两个子链表，并接到已合并部分的尾部
      prev.next = mergeTwoLists(head1, head2);

      // Step 4.5：将 prev 移动到合并后链表的末尾，为下一次合并做准备
      while (prev.next) {
        prev = prev.next;
      }

      // Step 4.6：移动到下一对子链表的起始位置
      curr = next;
    }
  }

  return dummyHead.next; // 返回虚拟头结点后的真实头结点
};
