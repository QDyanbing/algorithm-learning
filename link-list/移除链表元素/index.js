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


