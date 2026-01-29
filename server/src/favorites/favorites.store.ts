export function addToStore(store: string[], bookId: string): string[] {
  if (store.includes(bookId)) return store;
  return [...store, bookId];
}

export function removeFromStore(store: string[], bookId: string): string[] {
  return store.filter((id) => id !== bookId);
}
