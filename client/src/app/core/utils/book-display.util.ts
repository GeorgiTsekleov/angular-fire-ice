import { Book } from '../models';

export function getDisplayDescription(book: Book): string {
  if (book.released) {
    const date = new Date(book.released).toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
    return `Released ${date}`;
  }
  return book.publisher ? `Published by ${book.publisher}` : '';
}

export function getDisplaySubtitle(book: Book): string {
  const authors = book.authors?.length ? book.authors.join(', ') : '—';
  const pages = book.numberOfPages ? `${book.numberOfPages} pages` : '';
  return [authors, pages].filter(Boolean).join(' · ');
}
