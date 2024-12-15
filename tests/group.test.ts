import { groupBy } from "@/group";

describe("groupBy", () => {
  interface TestItem {
    id: number;
    name: string;
    category: string;
  }

  const testData: TestItem[] = [
    { id: 1, name: "Item 1", category: "A" },
    { id: 2, name: "Item 2", category: "B" },
    { id: 3, name: "Item 3", category: "A" },
    { id: 4, name: "Item 4", category: "C" },
    { id: 5, name: "Item 5", category: "B" },
  ];

  it("groups by a single key", () => {
    const result = groupBy(testData, "category");
    expect(result).toHaveLength(3);
    expect(result).toContainEqual([
      { id: 1, name: "Item 1", category: "A" },
      { id: 3, name: "Item 3", category: "A" },
    ]);
    expect(result).toContainEqual([
      { id: 2, name: "Item 2", category: "B" },
      { id: 5, name: "Item 5", category: "B" },
    ]);
    expect(result).toContainEqual([{ id: 4, name: "Item 4", category: "C" }]);
  });

  it("groups by multiple keys", () => {
    const result = groupBy(testData, ["category", "id"]);
    expect(result).toHaveLength(5);
    expect(result).toContainEqual([{ id: 1, name: "Item 1", category: "A" }]);
    expect(result).toContainEqual([{ id: 2, name: "Item 2", category: "B" }]);
    expect(result).toContainEqual([{ id: 3, name: "Item 3", category: "A" }]);
    expect(result).toContainEqual([{ id: 4, name: "Item 4", category: "C" }]);
    expect(result).toContainEqual([{ id: 5, name: "Item 5", category: "B" }]);
  });

  it("handles empty array", () => {
    const result = groupBy([], "category");
    expect(result).toHaveLength(0);
  });

  it("handles array with single item", () => {
    const singleItemData = [{ id: 1, name: "Single Item", category: "X" }];
    const result = groupBy(singleItemData, "category");
    expect(result).toHaveLength(1);
    expect(result[0]).toEqual(singleItemData);
  });

  it("groups correctly when some items have undefined values for the grouping key", () => {
    const dataWithUndefined = [
      { id: 1, name: "Item 1", category: "A" },
      { id: 2, name: "Item 2", category: undefined },
      { id: 3, name: "Item 3", category: "B" },
    ];
    const result = groupBy(dataWithUndefined, "category");
    expect(result).toHaveLength(3);
    expect(result).toContainEqual([{ id: 1, name: "Item 1", category: "A" }]);
    expect(result).toContainEqual([{ id: 3, name: "Item 3", category: "B" }]);
    expect(result).toContainEqual([{ id: 2, name: "Item 2", category: undefined }]);
  });

  it("groups correctly with numeric keys", () => {
    const result = groupBy(testData, "id");
    expect(result).toHaveLength(5);
    testData.forEach((item) => {
      expect(result).toContainEqual([item]);
    });
  });

  it("groups correctly with multiple keys including numeric values", () => {
    const data = [
      { a: 2, b: 3 },
      { b: 3, a: 1 },
    ];
    const result = groupBy(data, ["b", "a"]);
    expect(result).toHaveLength(2);
    expect(result).toContainEqual([{ a: 2, b: 3 }]);
    expect(result).toContainEqual([{ b: 3, a: 1 }]);
  });
});
