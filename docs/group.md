# snap-ts: `groupBy`

The `groupBy` utility in the `snap-ts` package provides a powerful way to group an array of objects based on one or more specified keys.

---

## Description

The `groupBy` function offers:

- Grouping of an array of objects based on one or more specified keys.
- Flexible key specification: single key or multiple keys.
- Returns an array of grouped arrays, maintaining the original object structure.

---

## API Specification

### Function Signature

```typescript
/**
 * Groups an array of objects based on specified key(s).
 *
 * @param data - Array of objects to be grouped.
 * @param keys - Key or array of keys to group by.
 * @returns - An array of grouped arrays.
 */
export function groupBy<T extends Record<PropertyKey, any>, K extends keyof T>(data: T[], keys: K | K[]): T[][];
```

---

## Usage

### Example 1: Grouping by a Single Key

```typescript
import { groupBy } from "snap-ts";

const data = [
  { id: 1, category: "A", value: 10 },
  { id: 2, category: "B", value: 20 },
  { id: 3, category: "A", value: 30 },
];

const result = groupBy(data, "category");

console.log(result);
// Output:
// [
//   [
//     { id: 1, category: "A", value: 10 },
//     { id: 3, category: "A", value: 30 }
//   ],
//   [
//     { id: 2, category: "B", value: 20 }
//   ]
// ]
```

---

### Example 2: Grouping by Multiple Keys

```typescript
import { groupBy } from "snap-ts";

const data = [
  { id: 1, category: "A", subCategory: "X", value: 10 },
  { id: 2, category: "B", subCategory: "Y", value: 20 },
  { id: 3, category: "A", subCategory: "X", value: 30 },
  { id: 4, category: "B", subCategory: "Z", value: 40 },
];

const result = groupBy(data, ["category", "subCategory"]);

console.log(result);
// Output:
// [
//   [
//     { id: 1, category: "A", subCategory: "X", value: 10 },
//     { id: 3, category: "A", subCategory: "X", value: 30 }
//   ],
//   [
//     { id: 2, category: "B", subCategory: "Y", value: 20 }
//   ],
//   [
//     { id: 4, category: "B", subCategory: "Z", value: 40 }
//   ]
// ]
```

---

## Key Features

1. **Flexible Grouping**: Supports grouping by a single key or multiple keys.
2. **Preserves Original Structure**: Grouped items maintain their original object structure.
3. **Efficient Implementation**: Uses a Map for fast grouping operations.
4. **Type Safety**: Maintains correct TypeScript typings for input and output.
5. **Handles Various Data Types**: Works with any property types, converting them to strings for grouping.

---

## Best Practices

- Use `groupBy` when you need to organize an array of objects into subgroups based on common properties.
- When grouping by multiple keys, consider the order of keys as it affects the grouping hierarchy.
- Ensure that the specified grouping keys exist in all objects of the input array to avoid unexpected results.
- For large datasets, be mindful of memory usage as the function creates a new array for each unique group.

---

## Installation

To install `snap-ts`, run:

```bash
npm install snap-ts
```
