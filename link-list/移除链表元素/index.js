/**
 * 删除链表中所有值等于 val 的节点
 * 
 * 核心思路：使用虚拟头节点，让删除操作统一化
 * 
 * 为什么需要虚拟头节点？
 * - 如果要删除的节点是头节点，需要特殊处理（改变 head 的指向）
 * - 使用虚拟头节点后，所有节点都变成"中间节点"，删除操作统一
 * 
 * 执行过程：
 * 1. 创建一个虚拟头节点，让它指向原链表的头节点
 * 2. 用一个指针 current 从虚拟头节点开始遍历
 * 3. 检查 current.next 的值是否等于 val
 *    - 如果等于：删除这个节点（让 current.next 指向 current.next.next）
 *    - 如果不等于：保留这个节点，current 向前移动
 * 4. 返回虚拟头节点的 next（即新的头节点）
 * 
 * 示例：删除 [1,2,6,3,4,5,6] 中的 6
 * 初始：dummy -> 1 -> 2 -> 6 -> 3 -> 4 -> 5 -> 6 -> null
 * 步骤1：检查 1，保留，current 移动到 1
 * 步骤2：检查 2，保留，current 移动到 2
 * 步骤3：检查 6，删除，current 不动（继续检查下一个）
 * 步骤4：检查 3，保留，current 移动到 3
 * ... 以此类推
 * 
 * 时间复杂度：O(n)，其中 n 是链表的长度，需要遍历整个链表一次
 * 空间复杂度：O(1)，只使用了常数额外空间（虚拟头节点和指针）
 * 
 * @param {ListNode|null} head 原链表头结点
 * @param {number} val 要删除的节点值
 * @returns {ListNode|null} 删除后的链表头
 */
export const removeElements = function (head, val) {
  // 创建虚拟头节点，让它指向原链表的头节点
  // 这样原链表的头节点就变成了"中间节点"，可以统一处理
  const dummyHead = { next: head };
  
  // current 指针从虚拟头节点开始
  let current = dummyHead;
  
  // 遍历链表，检查每个节点的下一个节点
  while (current.next !== null) {
    // 检查下一个节点的值是否等于要删除的值
    if (current.next.val === val) {
      // 如果等于，删除这个节点
      // 让 current.next 跳过这个节点，指向下一个节点
      current.next = current.next.next;
      // 注意：删除后 current 不移动，因为新的 current.next 可能也需要删除
      // 例如：[7,7,7] 删除 7，需要连续删除
    } else {
      // 如果不等于，保留这个节点，current 向前移动
      current = current.next;
    }
  }
  
  // 返回虚拟头节点的 next，即新的头节点
  return dummyHead.next;
};

/**
 * 递归删除链表中所有值等于 val 的节点
 * 
 * 核心思路：先处理后面的链表，再决定当前节点是否保留
 * 
 * 递归思想：
 * - 假设我们已经知道如何删除后续链表中所有值为 val 的节点
 * - 那么只需要决定当前节点是否保留
 * 
 * 执行过程：
 * 1. 如果链表为空，直接返回 null（递归终止条件）
 * 2. 递归处理 head.next，删除后续链表中所有值为 val 的节点
 * 3. 处理完后续链表后，检查当前节点 head 的值
 *    - 如果 head.val === val：不保留当前节点，返回处理后的后续链表
 *    - 如果 head.val !== val：保留当前节点，让 head.next 指向处理后的后续链表
 * 
 * 示例：删除 [1,2,6,3,6] 中的 6
 * removeElements([1,2,6,3,6], 6)
 *   -> 当前节点是 1，不等于 6，保留
 *   -> 递归处理 [2,6,3,6]
 *     -> 当前节点是 2，不等于 6，保留
 *     -> 递归处理 [6,3,6]
 *       -> 当前节点是 6，等于 6，不保留，返回 [3,6] 的处理结果
 *         -> 递归处理 [3,6]
 *           -> 当前节点是 3，不等于 6，保留
 *           -> 递归处理 [6]
 *             -> 当前节点是 6，等于 6，不保留，返回 null
 *           -> 返回 3 -> null
 *       -> 返回 3 -> null
 *     -> 返回 2 -> 3 -> null
 *   -> 返回 1 -> 2 -> 3 -> null
 * 
 * 时间复杂度：O(n)，其中 n 是链表的长度，需要递归处理每个节点
 * 空间复杂度：O(n)，递归调用栈的深度为链表的长度，最坏情况下需要 O(n) 的栈空间
 * 
 * @param {ListNode|null} head 原链表头结点
 * @param {number} val 要删除的节点值
 * @returns {ListNode|null} 删除后的链表头
 */
export const removeElementsRecursive = function (head, val) {
  // 递归终止条件：如果链表为空，直接返回 null
  if (head === null) {
    return null;
  }
  
  // 先递归处理后续链表，删除后续链表中所有值为 val 的节点
  // 处理完后，head.next 指向的就是处理后的后续链表
  head.next = removeElementsRecursive(head.next, val);
  
  // 检查当前节点是否需要删除
  if (head.val === val) {
    // 如果当前节点的值等于 val，不保留当前节点
    // 直接返回处理后的后续链表（跳过当前节点）
    return head.next;
  } else {
    // 如果当前节点的值不等于 val，保留当前节点
    // 返回当前节点，它的 next 已经指向处理后的后续链表
    return head;
  }
};

/**
 * 迭代删除链表中所有值等于 val 的节点（不使用虚拟头节点）
 * 
 * 核心思路：分两步处理
 * 1. 先处理头节点（可能连续多个头节点都需要删除）
 * 2. 再处理中间节点
 * 
 * 为什么分两步？
 * - 头节点的删除需要改变 head 的指向，比较特殊
 * - 中间节点的删除只需要改变前一个节点的 next，逻辑统一
 * 
 * 执行过程：
 * 第一步：删除所有需要删除的头节点
 *   - 如果 head 存在且 head.val === val，让 head 指向 head.next
 *   - 重复这个过程，直到 head 为 null 或 head.val !== val
 * 
 * 第二步：删除中间节点
 *   - 使用两个指针：prev（前一个节点）和 current（当前节点）
 *   - prev 从 head 开始，current 从 head.next 开始
 *   - 遍历链表，如果 current.val === val，删除 current
 *   - 删除方法：让 prev.next 指向 current.next（跳过 current）
 * 
 * 示例：删除 [7,7,1,2,7] 中的 7
 * 第一步：删除头节点
 *   [7,7,1,2,7] -> [7,1,2,7] -> [1,2,7]
 * 第二步：删除中间节点
 *   prev 在 1，current 在 2，保留
 *   prev 在 2，current 在 7，删除 7
 *   结果：[1,2]
 * 
 * 时间复杂度：O(n)，其中 n 是链表的长度，需要遍历整个链表一次
 * 空间复杂度：O(1)，只使用了常数额外空间（两个指针）
 * 
 * @param {ListNode|null} head 原链表头结点
 * @param {number} val 要删除的节点值
 * @returns {ListNode|null} 删除后的链表头
 */
export const removeElementsIterative = function (head, val) {
  // 第一步：删除所有需要删除的头节点
  // 如果头节点的值等于 val，就删除它，让 head 指向下一个节点
  // 重复这个过程，直到 head 为 null 或 head.val !== val
  while (head !== null && head.val === val) {
    head = head.next;
  }
  
  // 如果删除完头节点后，链表为空，直接返回 null
  if (head === null) {
    return null;
  }
  
  // 第二步：删除中间节点
  // 现在 head 肯定不是要删除的节点了，可以安全地开始遍历
  let prev = head;        // prev 指向当前已确认保留的节点
  let current = head.next; // current 指向待检查的节点
  
  // 遍历链表，检查每个节点
  while (current !== null) {
    if (current.val === val) {
      // 如果当前节点需要删除，让 prev.next 跳过 current，指向 current.next
      prev.next = current.next;
      // 注意：删除后 prev 不移动，因为新的 prev.next 可能也需要删除
    } else {
      // 如果当前节点保留，prev 向前移动
      prev = current;
    }
    // current 始终向前移动，检查下一个节点
    current = current.next;
  }
  
  return head;
};

