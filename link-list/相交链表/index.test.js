import { describe, it, expect } from "vitest";
import {
  getIntersectionNodeByHashSet,
  getIntersectionNodeByTwoPointers,
} from "./index.js";
import { ListNode, listToLink } from "../base.js";

/**
 * 创建相交链表的辅助函数
 * @param {number[]} listA 链表 A 的节点值数组（包含相交部分）
 * @param {number[]} listB 链表 B 的节点值数组（包含相交部分）
 * @param {number} skipA 链表 A 在相交前的节点数
 * @param {number} skipB 链表 B 在相交前的节点数
 * @returns {[ListNode|null, ListNode|null, ListNode|null]} 返回 [headA, headB, intersectionNode]
 */
function createIntersectedLists(listA, listB, skipA, skipB) {
  // 如果 skipA 和 skipB 都为 0，说明不相交
  if (skipA >= listA.length || skipB >= listB.length) {
    return [listToLink(listA), listToLink(listB), null];
  }

  // 创建链表 A 的前缀部分（不相交部分）
  let headA = null;
  let currentA = null;
  for (let i = 0; i < skipA; i++) {
    const node = new ListNode(listA[i]);
    if (!headA) {
      headA = node;
      currentA = node;
    } else {
      currentA.next = node;
      currentA = currentA.next;
    }
  }

  // 创建链表 B 的前缀部分（不相交部分）
  let headB = null;
  let currentB = null;
  for (let i = 0; i < skipB; i++) {
    const node = new ListNode(listB[i]);
    if (!headB) {
      headB = node;
      currentB = node;
    } else {
      currentB.next = node;
      currentB = currentB.next;
    }
  }

  // 创建共享的相交部分
  let intersectionNode = null;
  let currentIntersection = null;
  const intersectLength = listA.length - skipA;

  for (let i = skipA; i < listA.length; i++) {
    const node = new ListNode(listA[i]);
    if (!intersectionNode) {
      intersectionNode = node;
      currentIntersection = node;
    } else {
      currentIntersection.next = node;
      currentIntersection = currentIntersection.next;
    }
  }

  // 将链表 A 连接到共享部分
  if (headA && currentA) {
    currentA.next = intersectionNode;
  } else if (!headA) {
    headA = intersectionNode;
  }

  // 将链表 B 连接到共享部分
  if (headB && currentB) {
    currentB.next = intersectionNode;
  } else if (!headB) {
    headB = intersectionNode;
  }

  return [headA, headB, intersectionNode];
}

describe("相交链表 - 哈希集合法", () => {
  it("示例1: 相交节点值为8", () => {
    const [headA, headB, expectedIntersection] = createIntersectedLists(
      [4, 1, 8, 4, 5],
      [5, 0, 1, 8, 4, 5],
      2,
      3
    );
    const result = getIntersectionNodeByHashSet(headA, headB);
    expect(result).toBe(expectedIntersection);
    expect(result?.val).toBe(8);
  });

  it("示例2: 相交节点值为2", () => {
    const [headA, headB, expectedIntersection] = createIntersectedLists(
      [0, 9, 1, 2, 4],
      [3, 2, 4],
      3,
      1
    );
    const result = getIntersectionNodeByHashSet(headA, headB);
    expect(result).toBe(expectedIntersection);
    expect(result?.val).toBe(2);
  });

  it("示例3: 不相交", () => {
    const [headA, headB] = createIntersectedLists([2, 6, 4], [1, 5], 3, 2);
    const result = getIntersectionNodeByHashSet(headA, headB);
    expect(result).toBeNull();
  });

  it("边界情况: 链表A为空", () => {
    const headB = listToLink([1, 2, 3]);
    const result = getIntersectionNodeByHashSet(null, headB);
    expect(result).toBeNull();
  });

  it("边界情况: 链表B为空", () => {
    const headA = listToLink([1, 2, 3]);
    const result = getIntersectionNodeByHashSet(headA, null);
    expect(result).toBeNull();
  });

  it("边界情况: 两个链表都为空", () => {
    const result = getIntersectionNodeByHashSet(null, null);
    expect(result).toBeNull();
  });

  it("边界情况: 从第一个节点开始相交", () => {
    const sharedPart = listToLink([8, 4, 5]);
    const [headA, headB, expectedIntersection] = [
      sharedPart,
      sharedPart,
      sharedPart,
    ];
    const result = getIntersectionNodeByHashSet(headA, headB);
    expect(result).toBe(expectedIntersection);
    expect(result?.val).toBe(8);
  });

  it("边界情况: 链表A只有相交部分", () => {
    const [headA, headB, expectedIntersection] = createIntersectedLists(
      [2, 4],
      [1, 2, 4],
      0,
      2
    );
    const result = getIntersectionNodeByHashSet(headA, headB);
    expect(result).toBe(expectedIntersection);
    expect(result?.val).toBe(2);
  });

  it("边界情况: 链表B只有相交部分", () => {
    // 手动创建：链表A: 1->2->4, 链表B: 2->4（共享节点2和4）
    const sharedNode2 = new ListNode(2);
    const sharedNode4 = new ListNode(4);
    sharedNode2.next = sharedNode4;

    const headA = new ListNode(1);
    headA.next = sharedNode2;

    const headB = sharedNode2;

    const result = getIntersectionNodeByHashSet(headA, headB);
    expect(result).toBe(sharedNode2);
    expect(result?.val).toBe(2);
  });

  it("边界情况: 相交节点在末尾", () => {
    const [headA, headB, expectedIntersection] = createIntersectedLists(
      [1, 2, 3, 8],
      [4, 5, 6, 8],
      3,
      3
    );
    const result = getIntersectionNodeByHashSet(headA, headB);
    expect(result).toBe(expectedIntersection);
    expect(result?.val).toBe(8);
  });

  it("边界情况: 单节点相交", () => {
    const [headA, headB, expectedIntersection] = createIntersectedLists(
      [1, 2, 3],
      [4, 5, 3],
      2,
      2
    );
    const result = getIntersectionNodeByHashSet(headA, headB);
    expect(result).toBe(expectedIntersection);
    expect(result?.val).toBe(3);
  });
});

describe("相交链表 - 双指针法", () => {
  it("示例1: 相交节点值为8", () => {
    const [headA, headB, expectedIntersection] = createIntersectedLists(
      [4, 1, 8, 4, 5],
      [5, 0, 1, 8, 4, 5],
      2,
      3
    );
    const result = getIntersectionNodeByTwoPointers(headA, headB);
    expect(result).toBe(expectedIntersection);
    expect(result?.val).toBe(8);
  });

  it("示例2: 相交节点值为2", () => {
    const [headA, headB, expectedIntersection] = createIntersectedLists(
      [0, 9, 1, 2, 4],
      [3, 2, 4],
      3,
      1
    );
    const result = getIntersectionNodeByTwoPointers(headA, headB);
    expect(result).toBe(expectedIntersection);
    expect(result?.val).toBe(2);
  });

  it("示例3: 不相交", () => {
    const [headA, headB] = createIntersectedLists([2, 6, 4], [1, 5], 3, 2);
    const result = getIntersectionNodeByTwoPointers(headA, headB);
    expect(result).toBeNull();
  });

  it("边界情况: 链表A为空", () => {
    const headB = listToLink([1, 2, 3]);
    const result = getIntersectionNodeByTwoPointers(null, headB);
    expect(result).toBeNull();
  });

  it("边界情况: 链表B为空", () => {
    const headA = listToLink([1, 2, 3]);
    const result = getIntersectionNodeByTwoPointers(headA, null);
    expect(result).toBeNull();
  });

  it("边界情况: 两个链表都为空", () => {
    const result = getIntersectionNodeByTwoPointers(null, null);
    expect(result).toBeNull();
  });

  it("边界情况: 从第一个节点开始相交", () => {
    const sharedPart = listToLink([8, 4, 5]);
    const [headA, headB, expectedIntersection] = [
      sharedPart,
      sharedPart,
      sharedPart,
    ];
    const result = getIntersectionNodeByTwoPointers(headA, headB);
    expect(result).toBe(expectedIntersection);
    expect(result?.val).toBe(8);
  });

  it("边界情况: 链表A只有相交部分", () => {
    const [headA, headB, expectedIntersection] = createIntersectedLists(
      [2, 4],
      [1, 2, 4],
      0,
      2
    );
    const result = getIntersectionNodeByTwoPointers(headA, headB);
    expect(result).toBe(expectedIntersection);
    expect(result?.val).toBe(2);
  });

  it("边界情况: 链表B只有相交部分", () => {
    // 手动创建：链表A: 1->2->4, 链表B: 2->4（共享节点2和4）
    const sharedNode2 = new ListNode(2);
    const sharedNode4 = new ListNode(4);
    sharedNode2.next = sharedNode4;

    const headA = new ListNode(1);
    headA.next = sharedNode2;

    const headB = sharedNode2;

    const result = getIntersectionNodeByTwoPointers(headA, headB);
    expect(result).toBe(sharedNode2);
    expect(result?.val).toBe(2);
  });

  it("边界情况: 相交节点在末尾", () => {
    const [headA, headB, expectedIntersection] = createIntersectedLists(
      [1, 2, 3, 8],
      [4, 5, 6, 8],
      3,
      3
    );
    const result = getIntersectionNodeByTwoPointers(headA, headB);
    expect(result).toBe(expectedIntersection);
    expect(result?.val).toBe(8);
  });

  it("边界情况: 单节点相交", () => {
    const [headA, headB, expectedIntersection] = createIntersectedLists(
      [1, 2, 3],
      [4, 5, 3],
      2,
      2
    );
    const result = getIntersectionNodeByTwoPointers(headA, headB);
    expect(result).toBe(expectedIntersection);
    expect(result?.val).toBe(3);
  });
});
