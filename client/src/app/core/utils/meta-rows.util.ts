export function buildMetaRows<T>(
  entity: T,
  definitions: ReadonlyArray<{ label: string; value: (entity: T) => string | null | undefined }>
): { label: string; value: string }[] {
  return definitions
    .map(({ label, value }) => {
      const resolved = value(entity);
      return resolved ? { label, value: resolved } : null;
    })
    .filter((row): row is { label: string; value: string } => row !== null);
}
