import { describe, it, expect } from "vitest";
import {
  deleteNodeByDummy,
  deleteNodeByTwoPointers,
} from "./index.js";
import { listToLink, linkToList } from "../base.js";

describe("删除链表节点 - 虚拟头节点", () => {
  it("删除中间节点", () => {
    const head = listToLink([4, 5, 1, 9]);
    const result = deleteNodeByDummy(head, 5);
    expect(linkToList(result)).toEqual([4, 1, 9]);
  });

  it("删除头节点", () => {
    const head = listToLink([1, 2, 3]);
    const result = deleteNodeByDummy(head, 1);
    expect(linkToList(result)).toEqual([2, 3]);
  });

  it("值不存在时保持不变", () => {
    const head = listToLink([1, 2]);
    const result = deleteNodeByDummy(head, 3);
    expect(linkToList(result)).toEqual([1, 2]);
  });
});

describe("删除链表节点 - 双指针", () => {
  it("删除中间节点", () => {
    const head = listToLink([4, 5, 1, 9]);
    const result = deleteNodeByTwoPointers(head, 1);
    expect(linkToList(result)).toEqual([4, 5, 9]);
  });

  it("删除头节点", () => {
    const head = listToLink([7, 8, 9]);
    const result = deleteNodeByTwoPointers(head, 7);
    expect(linkToList(result)).toEqual([8, 9]);
  });

  it("值不存在时保持不变", () => {
    const head = listToLink([2, 3]);
    const result = deleteNodeByTwoPointers(head, 1);
    expect(linkToList(result)).toEqual([2, 3]);
  });
});

