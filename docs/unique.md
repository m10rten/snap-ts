# snap-ts: `unique`

The `unique` utility in the `snap-ts` package provides a flexible way to filter unique elements from an array or Set, with optional key-based uniqueness for object types.

> The `unique` function returns the type that was used as input, `Set<T>` or `Array<T>` or `Map<T>`.

---

## Description

The `unique` function offers:

- Filtering of unique elements from an array or Set.
- Optional key-based uniqueness for object types.
- Support for single or multiple keys for determining uniqueness.
- Type-safe implementation with TypeScript.

---

## API Specification

### Function Signature

```ts
/**
 * Returns an array of unique elements from the input data.
 *
 * @template T The type of elements in the input data.
 * @param data The input data, which can be an Array, Map or a Set.
 * @param keys Optional. An array of keys to use for determining uniqueness.
 *             This parameter is only allowed when T is an object type.
 * @returns An array containing unique elements from the input data.
 */
export function unique<K, T>(
  data: T[] | Set<T> | Map<K, T>,
  keys?: (T extends object ? keyof T : never)[],
): T[] | Set<T> | Map<K, T>;
```

---

## Usage

### Example 1: Unique Values from an Array

```ts
import { unique } from "snap-ts";

const numbers = [1, 2, 2, 3, 4, 4, 5];
const uniqueNumbers = unique(numbers);

console.log(uniqueNumbers);
// Output: [1, 2, 3, 4, 5]
```

### Example 2: Unique Objects Based on a Single Key

```ts
import { unique } from "snap-ts";

const users = [
  { id: 1, name: "Alice" },
  { id: 2, name: "Bob" },
  { id: 1, name: "Charlie" },
];

const uniqueUsers = unique(users, ["id"]);

console.log(uniqueUsers);
// Output: [{ id: 1, name: "Alice" }, { id: 2, name: "Bob" }]
```

### Example 3: Unique Objects Based on Multiple Keys

```ts
import { unique } from "snap-ts";

const data = [
  { id: 1, name: "Alice", age: 30 },
  { id: 2, name: "Bob", age: 25 },
  { id: 3, name: "Alice", age: 30 },
  { id: 4, name: "Charlie", age: 35 },
];

const uniqueData = unique(data, ["name", "age"]);

console.log(uniqueData);
// Output: [
//   { id: 1, name: "Alice", age: 30 },
//   { id: 2, name: "Bob", age: 25 },
//   { id: 4, name: "Charlie", age: 35 }
// ]
```

---

## Key Features

1. **Flexible Input**: Accepts both arrays and Sets as input.
2. **Key-based Uniqueness**: Allows specifying one or more keys for object uniqueness.
3. **Type Safety**: Utilizes TypeScript to ensure type correctness and prevent misuse.
4. **Efficient Implementation**: Uses Set for fast uniqueness checks.
5. **Preserves Original Structure**: Returns an array of unique elements while maintaining the original object structure.

---

## Best Practices

- Use the `keys` parameter only when working with object types and when uniqueness should be determined by specific properties.
- When using multiple keys, consider the order of importance for uniqueness.
- For large datasets, be mindful of memory usage as the function creates a new array of unique elements.
- Ensure that specified keys exist in all objects to avoid unexpected results.

---

## Installation

To install `snap-ts`, run:

```
npm install snap-ts
```
