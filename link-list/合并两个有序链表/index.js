import { ListNode } from "../base.js";

/**
 * 递归合并两个有序链表
 * 思路：
 * 1. 递归出口：任一链表为空时，直接返回另一条链表作为尾部。
 * 2. 对比当前结点值，较小者作为本轮链表头。
 * 3. 将较小节点的 next 指向递归调用的结果，相当于把剩余部分合并后挂到该节点之后。
 * 4. 每次递归都返回当前选择的节点，最终串联成完整有序链表。
 * 时间复杂度 O(m+n)，空间复杂度 O(m+n)（递归栈）。
 */
export const mergeTwoListsByRecursion = function (list1, list2) {
  // Step 0：若任一链表为空，直接返回另一条作为剩余部分
  if (!list1) return list2;
  if (!list2) return list1;

  // Step 1：选择当前较小的节点作为本层结果
  if (list1.val < list2.val) {
    // Step 2：递归处理 list1 剩余部分，并挂到当前节点之后
    list1.next = mergeTwoListsByRecursion(list1.next, list2);
    // Step 3：返回当前节点交给上一层链接
    return list1;
  } else {
    list2.next = mergeTwoListsByRecursion(list1, list2.next);
    return list2;
  }
};

/**
 * 迭代合并两个有序链表
 * 思路：
 * 1. 准备虚拟头结点 `newList` 以及指针 `temp`，方便统一处理头部拼接。
 * 2. 当两条链表都非空时，比较当前节点值，小者接到 `temp.next`，并向前推进相应链表。
 * 3. `temp` 指针同步前移，保持其指向结果链表的尾部。
 * 4. 循环结束后若尚有剩余节点，直接全部接到 `temp.next`。
 * 最终返回虚拟头的 next 即合并后的有序链表。时间复杂度 O(m+n)，额外空间 O(1)。
 */
export const mergeTwoListsByIteration = function (list1, list2) {
  const newList = new ListNode(-1); // Step 0：创建虚拟头避免处理首节点边界
  let temp = newList; // Step 1：维护结果链表尾指针

  while (list1 && list2) {
    // Step 2：挑选较小节点挂到 temp 之后
    if (list1.val < list2.val) {
      temp.next = list1;
      list1 = list1.next;
    } else {
      temp.next = list2;
      list2 = list2.next;
    }

    temp = temp.next; // Step 3：尾指针向前移动，准备下一次拼接
  }

  temp.next = list1 ? list1 : list2; // Step 4：把剩余未处理的链表直接接上

  return newList.next; // Step 5：返回虚拟头之后的真实头结点
};
