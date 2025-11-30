export class ListNode {
  constructor(val, next = null) {
    this.val = val;
    this.next = next;
  }
}

// [1,2,3,4,5] => 1->2->3->4->5
export function listToLink(params) {
  let head = new ListNode(params[0]);
  let current = head;
  for (let i = 1; i < params.length; i++) {
    current.next = new ListNode(params[i]);
    current = current.next;
  }
  return head;
}

// 1->2->3->4->5 => [1,2,3,4,5]
export function linkToList(head) {
  let result = [];
  let current = head;
  while (current) {
    result.push(current.val);
    current = current.next;
  }
  return result;
}

/**
 * 创建带环的链表
 * @param {number[]} values 节点值数组
 * @param {number} pos 环的入口位置（-1 表示无环）
 * @returns {ListNode|null} 链表的头结点
 */
export function createCycleList(values, pos) {
  if (values.length === 0) return null;

  const nodes = values.map((val) => new ListNode(val));
  for (let i = 0; i < nodes.length - 1; i++) {
    nodes[i].next = nodes[i + 1];
  }

  if (pos >= 0 && pos < nodes.length) {
    nodes[nodes.length - 1].next = nodes[pos];
  }

  return nodes[0];
}
