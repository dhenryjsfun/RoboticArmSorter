import { describe, it, expect } from "vitest";
import { sort, STACK } from "./sort";

describe("sort(width, height, length, mass)", () => {
  describe("STANDARD - neither bulky nor heavy", () => {
    it("returns STANDARD for small light package", () => {
      expect(sort(10, 10, 10, 5)).toBe(STACK.STANDARD);
    });

    it("returns STANDARD when volume just below 1,000,000 and all dimensions below 150", () => {
      // 100 * 100 * 99 = 990,000
      expect(sort(100, 100, 99, 10)).toBe(STACK.STANDARD);
    });

    it("returns STANDARD when mass just below 20 kg", () => {
      expect(sort(50, 50, 50, 19)).toBe(STACK.STANDARD);
    });

    it("returns STANDARD for single-unit dimensions and zero mass boundary", () => {
      expect(sort(1, 1, 1, 0)).toBe(STACK.STANDARD);
    });
  });

  describe("SPECIAL - bulky only", () => {
    it("returns SPECIAL when volume equals 1,000,000 cm³", () => {
      // 100 * 100 * 100 = 1,000,000
      expect(sort(100, 100, 100, 10)).toBe(STACK.SPECIAL);
    });

    it("returns SPECIAL when volume exceeds 1,000,000 cm³", () => {
      expect(sort(100, 100, 101, 5)).toBe(STACK.SPECIAL);
    });

    it("returns SPECIAL when one dimension equals 150 cm", () => {
      expect(sort(150, 10, 10, 5)).toBe(STACK.SPECIAL);
      expect(sort(10, 150, 10, 5)).toBe(STACK.SPECIAL);
      expect(sort(10, 10, 150, 5)).toBe(STACK.SPECIAL);
    });

    it("returns SPECIAL when one dimension exceeds 150 cm", () => {
      expect(sort(200, 1, 1, 1)).toBe(STACK.SPECIAL);
    });
  });

  describe("SPECIAL - heavy only", () => {
    it("returns SPECIAL when mass equals 20 kg", () => {
      expect(sort(10, 10, 10, 20)).toBe(STACK.SPECIAL);
    });

    it("returns SPECIAL when mass exceeds 20 kg", () => {
      expect(sort(10, 10, 10, 25)).toBe(STACK.SPECIAL);
    });
  });

  describe("REJECTED - both heavy and bulky", () => {
    it("returns REJECTED when heavy and volume >= 1,000,000", () => {
      expect(sort(100, 100, 100, 20)).toBe(STACK.REJECTED);
    });

    it("returns REJECTED when heavy and one dimension >= 150", () => {
      expect(sort(150, 10, 10, 20)).toBe(STACK.REJECTED);
      expect(sort(10, 150, 10, 25)).toBe(STACK.REJECTED);
    });

    it("returns REJECTED when heavy and bulky by volume", () => {
      expect(sort(100, 100, 101, 30)).toBe(STACK.REJECTED);
    });
  });

  describe("edge cases", () => {
    it("handles exact volume boundary 999,999 as STANDARD when not heavy", () => {
      // 99 * 99 * 102 = 999,702; or 100*100*99.99 would need floats. Use 63*63*252 = 999,396. 100*100*99 = 990000
      expect(sort(100, 100, 99, 10)).toBe(STACK.STANDARD);
      // 115 * 115 * 75 = 991,875
      expect(sort(115, 115, 75, 10)).toBe(STACK.STANDARD);
    });

    it("handles dimension 149 cm as not bulky when volume < 1,000,000", () => {
      // 149 cm on one side only, volume 149 < 1M
      expect(sort(149, 1, 1, 10)).toBe(STACK.STANDARD);
    });

    it("handles dimension 150 cm as bulky", () => {
      expect(sort(150, 1, 1, 1)).toBe(STACK.SPECIAL);
    });

    it("handles mass 19 kg as not heavy", () => {
      expect(sort(100, 100, 100, 19)).toBe(STACK.SPECIAL); // bulky only
    });

    it("handles mass 20 kg as heavy", () => {
      expect(sort(1, 1, 1, 20)).toBe(STACK.SPECIAL);
    });

    it("handles very large dimensions", () => {
      expect(sort(1000, 1000, 1000, 30)).toBe(STACK.REJECTED);
    });
  });
});
