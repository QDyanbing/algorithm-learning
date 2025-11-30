import { describe, it, expect } from "vitest";
import { hasCycle } from "./index.js";
import { createCycleList } from "../base.js";

describe("环形链表", () => {
  it("测试用例: [3,2,0,-4], pos = 1 (有环)", () => {
    const head = createCycleList([3, 2, 0, -4], 1);
    expect(hasCycle(head)).toBe(true);
  });

  it("测试用例: [1,2], pos = 0 (有环)", () => {
    const head = createCycleList([1, 2], 0);
    expect(hasCycle(head)).toBe(true);
  });

  it("测试用例: [1], pos = -1 (无环)", () => {
    const head = createCycleList([1], -1);
    expect(hasCycle(head)).toBe(false);
  });

  it("测试用例: [1,2,3,4,5], pos = -1 (无环)", () => {
    const head = createCycleList([1, 2, 3, 4, 5], -1);
    expect(hasCycle(head)).toBe(false);
  });

  it("测试用例: [] (空链表)", () => {
    expect(hasCycle(null)).toBe(false);
  });

  it("测试用例: [1,2,3,4,5], pos = 2 (有环)", () => {
    const head = createCycleList([1, 2, 3, 4, 5], 2);
    expect(hasCycle(head)).toBe(true);
  });
});

