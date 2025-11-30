/**
 * 环形链表 - 快慢指针法（Floyd 判圈算法）
 * 思路：
 * 1. 使用两个指针 `slow` 和 `fast`，`slow` 每次移动一步，`fast` 每次移动两步。
 * 2. 如果链表中存在环，快指针最终会追上慢指针（两者相遇）。
 * 3. 如果链表中不存在环，快指针会先到达链表末尾（`fast` 或 `fast.next` 为 null）。
 * 4. 循环条件为 `fast && fast.next`，确保快指针能安全地移动两步。
 * 时间复杂度 O(n)，其中 n 为链表长度。最坏情况下，快指针需要遍历整个链表。
 * 空间复杂度 O(1)，只使用了两个指针的额外空间。
 * @param {ListNode|null} head 链表的头结点
 * @returns {boolean} 如果链表中存在环返回 true，否则返回 false
 */
export const hasCycle = function (head) {
  if (!head || !head.next) return false; // Step 0：边界情况，空链表或单节点无环

  let slow = head; // Step 1：慢指针，每次移动一步
  let fast = head.next; // Step 2：快指针，每次移动两步

  // Step 3：遍历链表，直到快慢指针相遇或快指针到达末尾
  while (slow !== fast) {
    // Step 4：如果快指针到达末尾，说明无环
    if (!fast || !fast.next) return false;

    slow = slow.next; // Step 5：慢指针移动一步
    fast = fast.next.next; // Step 6：快指针移动两步
  }

  // Step 7：快慢指针相遇，说明存在环
  return true;
};

/**
 * 环形链表 - 哈希表法
 * 思路：
 * 1. 使用 Set 存储已访问过的节点。
 * 2. 遍历链表，对于每个节点，检查是否已在 Set 中。
 * 3. 如果节点已在 Set 中，说明存在环；否则将节点加入 Set 并继续遍历。
 * 4. 如果遍历到链表末尾（null），说明不存在环。
 * 时间复杂度 O(n)，每个节点最多被访问一次。
 * 空间复杂度 O(n)，最坏情况下需要存储所有节点。
 * @param {ListNode|null} head 链表的头结点
 * @returns {boolean} 如果链表中存在环返回 true，否则返回 false
 */
export const hasCycleByHashSet = function (head) {
  const visited = new Set(); // Step 0：创建 Set 存储已访问的节点
  let current = head; // Step 1：初始化指针指向链表头部

  // Step 2：遍历链表
  while (current) {
    if (visited.has(current)) {
      // Step 3：节点已访问过，说明存在环
      return true;
    }
    visited.add(current); // Step 4：将当前节点加入 Set
    current = current.next; // Step 5：指针前移
  }

  // Step 6：遍历到末尾，说明不存在环
  return false;
};

/**
 * 环形链表 - 标记法
 * 思路：
 * 1. 遍历链表，为每个访问过的节点添加一个标记属性（如 `visited = true`）。
 * 2. 如果遇到已标记的节点，说明存在环。
 * 3. 如果遍历到链表末尾，说明不存在环。
 * 注意：此方法会修改原链表节点，但不需要额外空间存储节点引用。
 * 时间复杂度 O(n)，每个节点最多被访问一次。
 * 空间复杂度 O(1)，只使用了标记属性，不占用额外空间。
 * @param {ListNode|null} head 链表的头结点
 * @returns {boolean} 如果链表中存在环返回 true，否则返回 false
 */
export const hasCycleByMarking = function (head) {
  let current = head; // Step 0：初始化指针指向链表头部

  // Step 1：遍历链表
  while (current) {
    if (current.visited) {
      // Step 2：节点已被标记，说明存在环
      // 恢复原链表（可选，清除标记）
      let temp = head;
      while (temp) {
        delete temp.visited;
        temp = temp.next;
      }
      return true;
    }
    current.visited = true; // Step 3：标记当前节点
    current = current.next; // Step 4：指针前移
  }

  // Step 5：遍历到末尾，说明不存在环
  return false;
};

