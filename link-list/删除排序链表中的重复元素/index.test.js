import { describe, it, expect } from "vitest";
import {
  deleteDuplicates,
  deleteDuplicatesByRecursion,
  deleteDuplicatesByTwoPointers,
} from "./index.js";
import { listToLink, linkToList } from "../base.js";

const testCases = [
  { input: [1, 1, 2], expected: [1, 2] },
  { input: [1, 1, 2, 3, 3], expected: [1, 2, 3] },
  { input: [1, 1, 1], expected: [1] },
  { input: [1, 2, 3, 4, 5], expected: [1, 2, 3, 4, 5] },
  { input: [], expected: null },
  { input: [1], expected: [1] },
];

describe("删除排序链表中的重复元素 - 单指针迭代法", () => {
  testCases.forEach(({ input, expected }) => {
    it(`测试用例: [${input.join(",")}]`, () => {
      const head = input.length > 0 ? listToLink(input) : null;
      const result = deleteDuplicates(head);
      if (expected === null) {
        expect(result).toBeNull();
      } else {
        expect(linkToList(result)).toEqual(expected);
      }
    });
  });
});

describe("删除排序链表中的重复元素 - 递归法", () => {
  testCases.forEach(({ input, expected }) => {
    it(`测试用例: [${input.join(",")}]`, () => {
      const head = input.length > 0 ? listToLink(input) : null;
      const result = deleteDuplicatesByRecursion(head);
      if (expected === null) {
        expect(result).toBeNull();
      } else {
        expect(linkToList(result)).toEqual(expected);
      }
    });
  });
});

describe("删除排序链表中的重复元素 - 双指针法", () => {
  testCases.forEach(({ input, expected }) => {
    it(`测试用例: [${input.join(",")}]`, () => {
      const head = input.length > 0 ? listToLink(input) : null;
      const result = deleteDuplicatesByTwoPointers(head);
      if (expected === null) {
        expect(result).toBeNull();
      } else {
        expect(linkToList(result)).toEqual(expected);
      }
    });
  });
});

