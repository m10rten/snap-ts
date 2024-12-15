function toArray<V, T>(data: T[] | Set<T> | Map<V, T>): T[] {
  if (Array.isArray(data)) {
    return data;
  } else if (data instanceof Set) {
    return Array.from(data);
  } else if (data instanceof Map) {
    return Array.from(data.values());
  } else {
    throw new Error("Unsupported data type");
  }
}

export function unique<T>(data: T[], keys?: (T extends object ? keyof T : never)[]): T[];
export function unique<T>(data: Set<T>, keys?: (T extends object ? keyof T : never)[]): Set<T>;
export function unique<K, V>(data: Map<K, V>, keys?: (V extends object ? keyof V : never)[]): Map<K, V>;

export function unique<K, T>(
  data: T[] | Set<T> | Map<K, T>,
  keys?: (T extends object ? keyof T : never)[],
): T[] | Set<T> | Map<K, T> {
  const seen = new Set<string>();
  const arr = toArray(data);

  const filter = (item: T): boolean => {
    const key = keys ? keys.map((k) => item[k]).join("|") : (item as unknown as string);
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  };

  const uniqueValues = arr.filter(filter);

  if (Array.isArray(data)) {
    return uniqueValues;
  } else if (data instanceof Set) {
    return new Set(uniqueValues);
  } else {
    const uniqueMap = new Map<K, T>();
    for (const value of uniqueValues) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const entry = [...data.entries()].find(([_, v]) => v === value);
      if (entry) uniqueMap.set(entry[0], entry[1]);
    }
    return uniqueMap;
  }
}
