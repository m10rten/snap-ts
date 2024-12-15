type CompareFunction<T> = (a: T, b: T) => boolean;

interface SortOptions<T> {
  by?: keyof T;
  order?: "asc" | "desc";
}

export function sort<T>(array: T[], filter?: CompareFunction<T> | SortOptions<T>): T[] {
  const copy = [...array]; // Create a copy to ensure immutability

  if (typeof filter === "function") {
    return copy.sort((a, b) => (filter(a, b) ? 1 : -1));
  }

  const options = filter as SortOptions<T>;

  if (options && options.by) {
    const key = options.by;
    const order = options.order || "asc";
    return copy.sort((a, b) => {
      if (!a?.[key]) return 1;
      if (!b?.[key]) return -1;
      if (a[key] < b[key]) return order === "asc" ? -1 : 1;
      if (a[key] > b[key]) return order === "asc" ? 1 : -1;
      return 0;
    });
  }

  // Default sorting (works for numbers and strings)
  return copy.sort((a, b) => (a > b ? 1 : a < b ? -1 : 0));
}
