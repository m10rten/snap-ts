import { unique } from "@/unique";

describe("unique", () => {
  it("should throw with unsupported type (string|number|object|boolean)", () => {
    expect(() => unique({} as never)).toThrow();
    expect(() => unique(true as never)).toThrow();
    expect(() => unique(false as never)).toThrow();
    expect(() => unique(void 0 as never)).toThrow();
    expect(() => unique(0 as never)).toThrow();
    expect(() => unique(1 as never)).toThrow();
    expect(() => unique("" as never)).toThrow();
    expect(() => unique("hello" as never)).toThrow();
  });
  it("test types", () => {
    // @ts-expect-error string>number
    unique<number>([""]);

    // @ts-expect-error string>number
    unique<number>(new Set(["string"]));

    // @ts-check should not error
    unique<string, number>(new Map([["str", 1]]));

    // @ts-expect-error no object
    unique<number>([1], ["id"]);
  });

  describe("T[]", () => {
    it("should return unique values from an array", () => {
      const input = [1, 2, 3, 2, 1, 4, 5];
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
    it("should return unique values from a Set", () => {
      const input = new Set([1, 2, 3, 2, 1, 4, 5]);
      const result = unique(input);
      expect(result).toEqual(new Set([1, 2, 3, 4, 5]));
    });

    it("should return unique objects from a Set based on a single key", () => {
      const input = new Set([
        { id: 1, name: "Alice" },
        { id: 2, name: "Bob" },
        { id: 1, name: "Charlie" },
      ]);
      const result = unique(input, ["id"]);
      expect(result).toEqual(
        new Set([
          { id: 1, name: "Alice" },
          { id: 2, name: "Bob" },
        ]),
      );
    });

    it("should return unique objects from a Set based on multiple keys", () => {
      const input = new Set([
        { id: 1, name: "Alice", age: 30 },
        { id: 2, name: "Bob", age: 25 },
        { id: 1, name: "Alice", age: 35 },
        { id: 3, name: "Charlie", age: 30 },
      ]);
      const result = unique(input, ["name", "age"]);
      expect(result).toEqual(
        new Set([
          { id: 1, name: "Alice", age: 30 },
          { id: 2, name: "Bob", age: 25 },
          { id: 1, name: "Alice", age: 35 },
          { id: 3, name: "Charlie", age: 30 },
        ]),
      );
    });

    it("should handle empty input", () => {
      const input = new Set<number>();
      const result = unique(input);
      expect(result).toEqual(new Set([]));
    });

    it("should handle input with all unique values in a Set", () => {
      const input = new Set([1, 2, 3, 4]);
      const result = unique(input);
      expect(result).toEqual(new Set([1, 2, 3, 4]));
    });

    it("should handle input with all duplicate values in a Set", () => {
      const input = new Set([1, 1, 1, 1]);
      const result = unique(input);
      expect(result).toEqual(new Set([1]));
    });
  });

  describe("Map<K,V>", () => {
    it("should return unique values from a Map based on value uniqueness", () => {
      const input = new Map<number, string>([
        [1, "a"],
        [2, "b"],
        [3, "a"],
        [4, "c"],
      ]);
      const result = unique(input);
      expect(result).toEqual(
        new Map<number, string>([
          [1, "a"],
          [2, "b"],
          [4, "c"],
        ]),
      );
    });

    it("should return unique objects from a Map based on a single key when keys are objects", () => {
      const input = new Map<number, { id: number; name: string }>([
        [1, { id: 1, name: "Alice" }],
        [2, { id: 2, name: "Bob" }],
        [3, { id: 1, name: "Charlie" }],
      ]);
      const result = unique(input, ["id"]);
      expect(result).toEqual(
        new Map([
          [1, { id: 1, name: "Alice" }],
          [2, { id: 2, name: "Bob" }],
        ]),
      );
    });

    it("should return unique objects from a Map based on multiple keys when keys are objects", () => {
      const input = new Map<number, { id: number; name: string }>([
        [1, { id: 1, name: "Alice" }],
        [2, { id: 2, name: "Bob" }],
        [3, { id: 1, name: "Alice" }],
        [4, { id: 3, name: "Charlie" }],
      ]);
      const result = unique(input, ["name"]);
      expect(result).toEqual(
        new Map([
          [1, { id: 1, name: "Alice" }],
          [2, { id: 2, name: "Bob" }],
          [4, { id: 3, name: "Charlie" }],
        ]),
      );
    });

    it("should handle empty Map input", () => {
      const input = new Map<number, string>();
      const result = unique(input);
      expect(result).toEqual(new Map());
    });
  });
});
