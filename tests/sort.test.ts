import { sort } from "@/sort";

describe("sort", () => {
  // Test numbers
  describe("numbers", () => {
    it("sorts numbers in ascending order by default", () => {
      const numbers = [5, 3, 8, 1, 2];
      expect(sort(numbers)).toEqual([1, 2, 3, 5, 8]);
    });

    it("sorts numbers with custom comparison function", () => {
      const numbers = [5, 3, 8, 1, 2];
      expect(sort(numbers, (a, b) => a > b)).toEqual([1, 2, 3, 5, 8]);
      expect(sort(numbers, (a, b) => a < b)).toEqual([8, 5, 3, 2, 1]);
    });
  });

  // Test strings
  describe("strings", () => {
    it("sorts strings alphabetically by default", () => {
      const strings = ["banana", "apple", "cherry", "date"];
      expect(sort(strings)).toEqual(["apple", "banana", "cherry", "date"]);
    });

    it("sorts strings with custom comparison function", () => {
      const strings = ["banana", "apple", "cherry", "date"];
      expect(sort(strings, (a, b) => a > b)).toEqual(["apple", "banana", "cherry", "date"]);
      expect(sort(strings, (a, b) => a < b)).toEqual(["date", "cherry", "banana", "apple"]);
    });
  });

  // Test booleans
  describe("booleans", () => {
    it("sorts booleans", () => {
      const booleans = [true, false, true, false];
      expect(sort(booleans)).toEqual([false, false, true, true]);
    });
  });

  // Test objects
  describe("objects", () => {
    interface TestObject {
      id: number;
      name: string;
    }

    const objects: TestObject[] = [
      { id: 3, name: "Charlie" },
      { id: 1, name: "Alice" },
      { id: 2, name: "Bob" },
    ];

    it("sorts objects by number property", () => {
      expect(sort(objects, { by: "id" })).toEqual([
        { id: 1, name: "Alice" },
        { id: 2, name: "Bob" },
        { id: 3, name: "Charlie" },
      ]);
    });

    it("sorts objects by string property", () => {
      expect(sort(objects, { by: "name" })).toEqual([
        { id: 1, name: "Alice" },
        { id: 2, name: "Bob" },
        { id: 3, name: "Charlie" },
      ]);
    });

    it("sorts objects in descending order", () => {
      expect(sort(objects, { by: "id", order: "desc" })).toEqual([
        { id: 3, name: "Charlie" },
        { id: 2, name: "Bob" },
        { id: 1, name: "Alice" },
      ]);
    });
  });

  describe("handling nullish values and objects with different keys", () => {
    it("sorts objects with missing keys", () => {
      const objects = [{ id: 3, name: "Charlie" }, { id: 1 }, { name: "Bob" }, { id: 2, name: "Alice" }];
      const sortedById = sort(objects, { by: "id" });
      expect(sortedById).toEqual([
        { id: 1 },
        { id: 2, name: "Alice" },
        { id: 3, name: "Charlie" },
        { name: "Bob" }, // Object without 'id' should be at the end
      ]);

      const sortedByName = sort(objects, { by: "name" });
      expect(sortedByName).toEqual([
        { id: 2, name: "Alice" },
        { name: "Bob" },
        { id: 3, name: "Charlie" },
        { id: 1 }, // Object without 'name' should be at the end
      ]);
    });

    it("handles array with mixed types gracefully", () => {
      const mixedArray = [3, "2", null, { id: 1 }, undefined, [1, 2], true, false];
      const sorted = sort(mixedArray);
      // The exact order might depend on the implementation, but it should not throw an error
      expect(() => sort(mixedArray)).not.toThrow();
      expect(sorted.length).toBe(mixedArray.length);
    });
  });

  // New test group for equal elements
  describe("handling equal elements", () => {
    it("maintains order of equal numbers", () => {
      const numbers = [3, 1, 2, 2, 1, 3];
      const sorted = sort(numbers);
      expect(sorted).toEqual([1, 1, 2, 2, 3, 3]);
      // Check that the order of equal elements is maintained
      expect(sorted.indexOf(1)).toBeLessThan(sorted.lastIndexOf(1));
      expect(sorted.indexOf(2)).toBeLessThan(sorted.lastIndexOf(2));
      expect(sorted.indexOf(3)).toBeLessThan(sorted.lastIndexOf(3));
    });

    it("maintains order of equal strings", () => {
      const strings = ["b", "a", "c", "b", "a", "c"];
      const sorted = sort(strings);
      expect(sorted).toEqual(["a", "a", "b", "b", "c", "c"]);
      // Check that the order of equal elements is maintained
      expect(sorted.indexOf("a")).toBeLessThan(sorted.lastIndexOf("a"));
      expect(sorted.indexOf("b")).toBeLessThan(sorted.lastIndexOf("b"));
      expect(sorted.indexOf("c")).toBeLessThan(sorted.lastIndexOf("c"));
    });

    it("maintains order of equal objects when sorting by property", () => {
      const objects = [
        { id: 2, name: "Bob" },
        { id: 1, name: "Alice" },
        { id: 3, name: "Charlie" },
        { id: 2, name: "David" },
      ];
      const sorted = sort(objects, { by: "id" });
      expect(sorted).toEqual([
        { id: 1, name: "Alice" },
        { id: 2, name: "Bob" },
        { id: 2, name: "David" },
        { id: 3, name: "Charlie" },
      ]);
      // Check that the order of objects with equal 'id' is maintained
      const indexBob = sorted.findIndex((obj) => obj.name === "Bob");
      const indexDavid = sorted.findIndex((obj) => obj.name === "David");
      expect(indexBob).toBeLessThan(indexDavid);
    });

    it("custom comparison function handles equality correctly", () => {
      const numbers = [3, 1, 2, 2, 1, 3];
      const sorted = sort(numbers, (a, b) => a >= b);
      expect(sorted).toEqual([1, 1, 2, 2, 3, 3]);
      // Check that the order of equal elements is maintained
      expect(sorted.indexOf(1)).toBeLessThan(sorted.lastIndexOf(1));
      expect(sorted.indexOf(2)).toBeLessThan(sorted.lastIndexOf(2));
      expect(sorted.indexOf(3)).toBeLessThan(sorted.lastIndexOf(3));
    });
  });

  // Test edge cases
  describe("edge cases", () => {
    it("handles empty array", () => {
      expect(sort([])).toEqual([]);
    });

    it("handles array with one element", () => {
      expect(sort([1])).toEqual([1]);
    });

    it("handles array with two of the same element", () => {
      expect(sort([1, 1])).toEqual([1, 1]);
    });

    it("maintains original array immutability", () => {
      const original = [3, 1, 2];
      const sorted = sort(original);
      expect(sorted).toEqual([1, 2, 3]);
      expect(original).toEqual([3, 1, 2]);
    });
  });

  // Test mixed types (though not recommended in practice)
  describe("mixed types", () => {
    it("sorts mixed numbers and strings", () => {
      const mixed = [3, "2", 1, "4"];
      expect(sort(mixed)).toEqual([1, "2", 3, "4"]);
    });
  });
});
