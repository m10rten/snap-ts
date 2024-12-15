export function unique<T>(data: T[] | Set<T>, keys?: (T extends object ? keyof T : never)[]): T[] {
  if (!keys || keys?.length === 0) {
    return Array.from(new Set(data));
  }

  const seen = new Set<string>();
  const arr = Array.isArray(data) ? data : Array.from(data);
  return arr.filter((item) => {
    const key = keys.map((k) => item[k]).join("|");
    if (seen.has(key)) {
      return false;
    }
    seen.add(key);
    return true;
  });
}
