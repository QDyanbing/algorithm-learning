import { describe, it, expect } from "vitest";
import {
  hasCycle,
  hasCycleByHashSet,
  hasCycleByMarking,
} from "./index.js";
import { createCycleList } from "../base.js";

const testCases = [
  { input: [3, 2, 0, -4], pos: 1, expected: true },
  { input: [1, 2], pos: 0, expected: true },
  { input: [1], pos: -1, expected: false },
  { input: [1, 2, 3, 4, 5], pos: -1, expected: false },
  { input: [], pos: -1, expected: false },
  { input: [1, 2, 3, 4, 5], pos: 2, expected: true },
];

describe("环形链表 - 快慢指针法", () => {
  testCases.forEach(({ input, pos, expected }) => {
    it(`测试用例: [${input.join(",")}], pos = ${pos}`, () => {
      const head = input.length > 0 ? createCycleList(input, pos) : null;
      expect(hasCycle(head)).toBe(expected);
    });
  });
});

describe("环形链表 - 哈希表法", () => {
  testCases.forEach(({ input, pos, expected }) => {
    it(`测试用例: [${input.join(",")}], pos = ${pos}`, () => {
      const head = input.length > 0 ? createCycleList(input, pos) : null;
      expect(hasCycleByHashSet(head)).toBe(expected);
    });
  });
});

describe("环形链表 - 标记法", () => {
  testCases.forEach(({ input, pos, expected }) => {
    it(`测试用例: [${input.join(",")}], pos = ${pos}`, () => {
      const head = input.length > 0 ? createCycleList(input, pos) : null;
      expect(hasCycleByMarking(head)).toBe(expected);
    });
  });
});

