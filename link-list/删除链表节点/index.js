/**
 * 使用虚拟头节点删除指定值
 * 思路：
 * 1. 创建 dummy 节点指向 head，统一处理头节点被删除的场景。
 * 2. 用 prev 指针遍历，只要 prev.next 存在就比较目标值。
 * 3. 命中目标节点后将其跳过（prev.next = prev.next.next）并结束循环。
 * 4. 返回 dummy.next 即最新的头结点。
 *
 * 时间复杂度 O(n)，空间复杂度 O(1)。
 * @param {ListNode|null} head
 * @param {number} val
 * @returns {ListNode|null}
 */
export const deleteNodeByDummy = function (head, val) {
  const dummy = { next: head }; // Step 0：虚拟头节点
  let prev = dummy;

  while (prev.next) {
    if (prev.next.val === val) {
      prev.next = prev.next.next; // Step 1：跳过目标节点
      break;
    }
    prev = prev.next; // Step 2：继续向前搜索
  }

  return dummy.next;
};

/**
 * 双指针（前驱 + 当前）删除指定值
 * 思路：
 * 1. 若要删除的是头节点，直接返回 head.next。
 * 2. 使用 prev 指向前驱、curr 指向当前节点，同步向前遍历。
 * 3. 一旦 curr 命中目标值，让 prev.next 指向 curr.next 即可删除。
 * 4. 若遍历结束未找到，原链表保持不变。
 *
 * 时间复杂度 O(n)，空间复杂度 O(1)。
 * @param {ListNode|null} head
 * @param {number} val
 * @returns {ListNode|null}
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
    prev = curr; // Step 2：同步前进
    curr = curr.next;
  }

  return head;
};

