import { describe, it, expect } from "vitest";
import { deleteDuplicates } from "./index.js";
import { listToLink, linkToList } from "../base.js";

describe("删除排序链表中的重复元素", () => {
  it("测试用例: [1,1,2]", () => {
    const head = listToLink([1, 1, 2]);
    const result = deleteDuplicates(head);
    expect(linkToList(result)).toEqual([1, 2]);
  });

  it("测试用例: [1,1,2,3,3]", () => {
    const head = listToLink([1, 1, 2, 3, 3]);
    const result = deleteDuplicates(head);
    expect(linkToList(result)).toEqual([1, 2, 3]);
  });

  it("测试用例: [1,1,1]", () => {
    const head = listToLink([1, 1, 1]);
    const result = deleteDuplicates(head);
    expect(linkToList(result)).toEqual([1]);
  });

  it("测试用例: [1,2,3,4,5]", () => {
    const head = listToLink([1, 2, 3, 4, 5]);
    const result = deleteDuplicates(head);
    expect(linkToList(result)).toEqual([1, 2, 3, 4, 5]);
  });

  it("测试用例: []", () => {
    const result = deleteDuplicates(null);
    expect(result).toBeNull();
  });

  it("测试用例: [1]", () => {
    const head = listToLink([1]);
    const result = deleteDuplicates(head);
    expect(linkToList(result)).toEqual([1]);
  });
});

