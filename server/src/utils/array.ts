export function mergeUniqueIds(a: string[], b: string[]): string[] {
  const seen = new Set<string>();

  return [...a, ...b].reduce((acc, id) => {
    if (!seen.has(id)) {
      seen.add(id);
      acc.push(id);
    }
    return acc;
  }, [] as string[]);
}
