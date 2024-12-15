import { unique } from "@/unique";

describe("unique", () => {
  describe("T[]", () => {
    it("should return unique values from an array", () => {
      const input = [1, 2, 3, 2, 1, 4, 5];
      const result = unique(input);
      expect(result).toEqual([1, 2, 3, 4, 5]);
    });

    it("should return unique values from a Set", () => {
      const input = new Set([1, 2, 3, 2, 1, 4, 5]);
      const result = unique(input);
      expect(result).toEqual([1, 2, 3, 4, 5]);
    });

    it("should return unique objects based on a single key", () => {
      const input = [
        { id: 1, name: "Alice" },
        { id: 2, name: "Bob" },
        { id: 1, name: "Charlie" },
      ];
      const result = unique(input, ["id"]);
      expect(result).toEqual([
        { id: 1, name: "Alice" },
        { id: 2, name: "Bob" },
      ]);
    });

    it("should return unique objects based on multiple keys", () => {
      const input = [
        { id: 1, name: "Alice", age: 30 },
        { id: 2, name: "Bob", age: 25 },
        { id: 1, name: "Alice", age: 35 },
        { id: 3, name: "Charlie", age: 30 },
      ];
      const result = unique(input, ["name", "age"]);
      expect(result).toEqual([
        { id: 1, name: "Alice", age: 30 },
        { id: 2, name: "Bob", age: 25 },
        { id: 1, name: "Alice", age: 35 },
        { id: 3, name: "Charlie", age: 30 },
      ]);
    });

    it("should handle empty input", () => {
      const input: number[] = [];
      const result = unique(input);
      expect(result).toEqual([]);
    });

    it("should handle input with all unique values", () => {
      const input = [1, 2, 3, 4, 5];
      const result = unique(input);
      expect(result).toEqual([1, 2, 3, 4, 5]);
    });

    it("should handle input with all duplicate values", () => {
      const input = [1, 1, 1, 1, 1];
      const result = unique(input);
      expect(result).toEqual([1]);
    });
  });

  describe("Set<T>", () => {
    it("should return unique objects from a Set based on a single key", () => {
      const input = new Set([
        { id: 1, name: "Alice" },
        { id: 2, name: "Bob" },
        { id: 1, name: "Charlie" },
      ]);
      const result = unique(input, ["id"]);
      expect(result).toEqual([
        { id: 1, name: "Alice" },
        { id: 2, name: "Bob" },
      ]);
    });

    it("should return unique objects from a Set based on multiple keys", () => {
      const input = new Set([
        { id: 1, name: "Alice", age: 30 },
        { id: 2, name: "Bob", age: 25 },
        { id: 1, name: "Alice", age: 35 },
        { id: 3, name: "Charlie", age: 30 },
      ]);
      const result = unique(input, ["name", "age"]);
      expect(result).toEqual([
        { id: 1, name: "Alice", age: 30 },
        { id: 2, name: "Bob", age: 25 },
        { id: 1, name: "Alice", age: 35 },
        { id: 3, name: "Charlie", age: 30 },
      ]);
    });

    it("should handle empty input", () => {
      const input = new Set<number>();
      const result = unique(input);
      expect(result).toEqual([]);
    });

    it("should handle input with all unique values in a Set", () => {
      const input = new Set([1, 2, 3, 4]);
      const result = unique(input);
      expect(result).toEqual([1, 2, 3, 4]);
    });

    it("should handle input with all duplicate values in a Set", () => {
      const input = new Set([1, 1, 1, 1]);
      const result = unique(input);
      expect(result).toEqual([1]);
    });
  });
});
