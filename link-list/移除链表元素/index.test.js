import { describe, it, expect } from "vitest";
import { removeElements } from "./index.js";
import { listToLink, linkToList } from "../base.js";

describe("移除链表元素", () => {
  it("示例 1: head = [1,2,6,3,4,5,6], val = 6 => [1,2,3,4,5]", () => {
    const head = listToLink([1, 2, 6, 3, 4, 5, 6]);
    const result = removeElements(head, 6);
    expect(linkToList(result)).toEqual([1, 2, 3, 4, 5]);
  });

  it("示例 2: head = [], val = 1 => []", () => {
    const result = removeElements(null, 1);
    expect(result).toBeNull();
    expect(linkToList(result)).toEqual([]);
  });

  it("示例 3: head = [7,7,7,7], val = 7 => []", () => {
    const head = listToLink([7, 7, 7, 7]);
    const result = removeElements(head, 7);
    expect(linkToList(result)).toEqual([]);
  });

  it("删除头节点", () => {
    const head = listToLink([1, 2, 3]);
    const result = removeElements(head, 1);
    expect(linkToList(result)).toEqual([2, 3]);
  });

  it("值不存在时保持不变", () => {
    const head = listToLink([1, 2, 3]);
    const result = removeElements(head, 4);
    expect(linkToList(result)).toEqual([1, 2, 3]);
  });

  it("删除连续节点", () => {
    const head = listToLink([1, 2, 2, 3, 2, 4]);
    const result = removeElements(head, 2);
    expect(linkToList(result)).toEqual([1, 3, 4]);
  });
});

