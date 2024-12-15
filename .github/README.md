[![NPM Version](https://img.shields.io/npm/v/snap-ts?style=flat-square?labelColor=black&color=navy)](https://npmjs.com/snap-ts/)
[![NPM Downloads](https://img.shields.io/npm/d18m/snap-ts?style=flat-square?labelColor=black&color=navy)](https://npmjs.com/snap-ts/)
[![NPM License](https://img.shields.io/npm/l/snap-ts?style=flat-square?labelColor=black&color=navy)](https://npmjs.com/snap-ts/)
[![npm bundle size](https://img.shields.io/bundlephobia/minzip/snap-ts?style=flat-square?labelColor=black&color=navy)](https://npmjs.com/snap-ts/)
[![NPM Type Definitions](https://img.shields.io/npm/types/snap-ts?style=flat-square?labelColor=black&color=navy)](https://npmjs.com/snap-ts/)

# snap-ts

🫰🍃 Snapping tools to ease data mutation for typescript.

## Installation

```bash
npm install snap-ts
```

---

## Documentation

For more in depth documentation about the features, check out [the full docs](https://github.com/m10rten/snap-ts/tree/main/docs).

---

## Features

### Functions and Classes

- **`merge`**: Combines objects or arrays.
- **`groupBy`**: Groups arrays of objects based on specified keys.

---

## API Specifications and Examples

### `merge`

Combines objects or arrays.

**Usage**:

```ts
import { merge } from "trykit";

const combined = merge({ a: 1 }, { b: 2 }); // { a: 1, b: 2 }
```

### `groupBy`

Groups arrays of objects based on specified keys.

**Usage**:

```ts
import { groupBy } from "snap-ts";

const data = [
  { id: 1, category: "A", value: 10 },
  { id: 2, category: "B", value: 20 },
  { id: 3, category: "A", value: 30 },
];

const grouped = groupBy(data, "category");
// [
//   [{ id: 1, category: "A", value: 10 }, { id: 3, category: "A", value: 30 }],
//   [{ id: 2, category: "B", value: 20 }]
// ]
```
