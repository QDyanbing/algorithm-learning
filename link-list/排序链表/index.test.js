import { describe, it, expect } from "vitest";
import { sortListByRecursion, sortListByIteration } from "./index.js";
import { listToLink, linkToList } from "../base.js";

describe("排序链表 - 递归实现", () => {
  it("示例1: [4,2,1,3] => [1,2,3,4]", () => {
    const head = listToLink([4, 2, 1, 3]);
    const result = sortListByRecursion(head);
    expect(linkToList(result)).toEqual([1, 2, 3, 4]);
  });

  it("示例2: [-1,5,3,4,0] => [-1,0,3,4,5]", () => {
    const head = listToLink([-1, 5, 3, 4, 0]);
    const result = sortListByRecursion(head);
    expect(linkToList(result)).toEqual([-1, 0, 3, 4, 5]);
  });

  it("示例3: [] => []", () => {
    const result = sortListByRecursion(null);
    expect(result).toBeNull();
  });

  it("单节点链表 [1] => [1]", () => {
    const head = listToLink([1]);
    const result = sortListByRecursion(head);
    expect(linkToList(result)).toEqual([1]);
  });

  it("两个节点 [2,1] => [1,2]", () => {
    const head = listToLink([2, 1]);
    const result = sortListByRecursion(head);
    expect(linkToList(result)).toEqual([1, 2]);
  });

  it("已经有序的链表 [1,2,3,4,5] => [1,2,3,4,5]", () => {
    const head = listToLink([1, 2, 3, 4, 5]);
    const result = sortListByRecursion(head);
    expect(linkToList(result)).toEqual([1, 2, 3, 4, 5]);
  });

  it("倒序链表 [5,4,3,2,1] => [1,2,3,4,5]", () => {
    const head = listToLink([5, 4, 3, 2, 1]);
    const result = sortListByRecursion(head);
    expect(linkToList(result)).toEqual([1, 2, 3, 4, 5]);
  });

  it("包含重复元素 [3,1,2,3,1] => [1,1,2,3,3]", () => {
    const head = listToLink([3, 1, 2, 3, 1]);
    const result = sortListByRecursion(head);
    expect(linkToList(result)).toEqual([1, 1, 2, 3, 3]);
  });

  it("包含负数 [4,-1,2,-3,0] => [-3,-1,0,2,4]", () => {
    const head = listToLink([4, -1, 2, -3, 0]);
    const result = sortListByRecursion(head);
    expect(linkToList(result)).toEqual([-3, -1, 0, 2, 4]);
  });
});

describe("排序链表 - 迭代实现", () => {
  it("示例1: [4,2,1,3] => [1,2,3,4]", () => {
    const head = listToLink([4, 2, 1, 3]);
    const result = sortListByIteration(head);
    expect(linkToList(result)).toEqual([1, 2, 3, 4]);
  });

  it("示例2: [-1,5,3,4,0] => [-1,0,3,4,5]", () => {
    const head = listToLink([-1, 5, 3, 4, 0]);
    const result = sortListByIteration(head);
    expect(linkToList(result)).toEqual([-1, 0, 3, 4, 5]);
  });

  it("示例3: [] => []", () => {
    const result = sortListByIteration(null);
    expect(result).toBeNull();
  });

  it("单节点链表 [1] => [1]", () => {
    const head = listToLink([1]);
    const result = sortListByIteration(head);
    expect(linkToList(result)).toEqual([1]);
  });

  it("两个节点 [2,1] => [1,2]", () => {
    const head = listToLink([2, 1]);
    const result = sortListByIteration(head);
    expect(linkToList(result)).toEqual([1, 2]);
  });

  it("已经有序的链表 [1,2,3,4,5] => [1,2,3,4,5]", () => {
    const head = listToLink([1, 2, 3, 4, 5]);
    const result = sortListByIteration(head);
    expect(linkToList(result)).toEqual([1, 2, 3, 4, 5]);
  });

  it("倒序链表 [5,4,3,2,1] => [1,2,3,4,5]", () => {
    const head = listToLink([5, 4, 3, 2, 1]);
    const result = sortListByIteration(head);
    expect(linkToList(result)).toEqual([1, 2, 3, 4, 5]);
  });

  it("包含重复元素 [3,1,2,3,1] => [1,1,2,3,3]", () => {
    const head = listToLink([3, 1, 2, 3, 1]);
    const result = sortListByIteration(head);
    expect(linkToList(result)).toEqual([1, 1, 2, 3, 3]);
  });

  it("包含负数 [4,-1,2,-3,0] => [-3,-1,0,2,4]", () => {
    const head = listToLink([4, -1, 2, -3, 0]);
    const result = sortListByIteration(head);
    expect(linkToList(result)).toEqual([-3, -1, 0, 2, 4]);
  });
});
