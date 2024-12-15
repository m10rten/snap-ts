// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function groupBy<T extends Record<PropertyKey, any>, K extends keyof T>(data: T[], keys: K | K[]) {
  const groupedMap = new Map<string, T[]>();
  const keySet = new Set(Array.isArray(keys) ? keys : [keys]);

  for (const item of data) {
    const groupKey = Array.from(keySet)
      .map((key) => `${String(key)}:${String(item[key])}`)
      .join("|");

    if (!groupedMap.has(groupKey)) {
      groupedMap.set(groupKey, []);
    }
    groupedMap.get(groupKey)!.push(item);
  }

  return Array.from(groupedMap.values());
}
