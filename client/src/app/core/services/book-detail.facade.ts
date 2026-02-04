import { Injectable, inject, signal, computed } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { forkJoin, of, Subject } from 'rxjs';
import { catchError, filter, map, switchMap, take } from 'rxjs/operators';
import { BooksFacade } from './books.facade';
import { CharacterApiService } from './api/character-api.service';
import { Book } from '../models/book.model';
import { Character } from '../models/character.model';
import { getDisplayDescription } from '../utils/book-display.util';

const CHARACTERS_PER_BOOK = 6;

@Injectable({ providedIn: 'root' })
export class BookDetailFacade {
  private readonly booksFacade = inject(BooksFacade);
  private readonly characterApi = inject(CharacterApiService);

  private readonly bookId = signal('');
  private readonly loadTrigger$ = new Subject<string>();
  private readonly books$ = toObservable(this.booksFacade.books);

  readonly book = computed(() => {
    const id = this.bookId();
    return id ? this.booksFacade.getBookByUrl(id) ?? null : null;
  });
  readonly characters = signal<Character[]>([]);
  readonly loading = this.booksFacade.loading;
  readonly error = this.booksFacade.error;

  constructor() {
    this.loadTrigger$
      .pipe(
        switchMap((id) =>
          this.books$.pipe(
            filter((books) => books.length > 0),
            take(1),
            map(() => this.booksFacade.getBookByUrl(id)),
            filter((b): b is Book => b != null),
            switchMap((book) => this.fetchCharactersForBook(book))
          )
        )
      )
      .subscribe((chars) => this.characters.set(chars));
  }

  load(bookId: string): void {
    this.bookId.set(bookId);
    this.booksFacade.loadBooks();
    this.loadTrigger$.next(bookId);
  }

  private fetchCharactersForBook(book: Book) {
    const urls = book.characters?.slice(0, CHARACTERS_PER_BOOK) ?? [];
    if (urls.length === 0) return of([]);
    return forkJoin(
      urls.map((url) => this.characterApi.getCharacter(url).pipe(catchError(() => of(null))))
    ).pipe(map((chars) => chars.filter((c): c is Character => c != null)));
  }

  getBookId(bookUrl: string): string {
    return bookUrl.split('/').filter(Boolean).pop() ?? '';
  }

  getCharacterId(characterUrl: string): string {
    return characterUrl.split('/').filter(Boolean).pop() ?? '';
  }

  getCharacterDisplayName(character: Character): string | undefined {
    return character.playedBy?.[0] ?? character.name ?? character.aliases?.[0];
  }

  getDisplayableCharacters(characters: Character[]): Character[] {
    return (characters ?? []).filter((c) => c && this.getCharacterDisplayName(c));
  }

  getAuthors(book: Book): string {
    return book.authors?.length ? book.authors.join(', ') : '—';
  }

  getReleased(book: Book): string {
    if (!book.released) return '—';
    return new Date(book.released).toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  }

  getDescription(book: Book): string {
    return getDisplayDescription(book);
  }

  getMetaRows(book: Book): { label: string; value: string }[] {
    const rows: { label: string; value: string }[] = [
      { label: 'Authors', value: this.getAuthors(book) },
      { label: 'Released', value: this.getReleased(book) },
    ];
    if (book.publisher) rows.push({ label: 'Publisher', value: book.publisher });
    if (book.numberOfPages) rows.push({ label: 'Pages', value: String(book.numberOfPages) });
    if (book.country) rows.push({ label: 'Country', value: book.country });
    if (book.mediaType) rows.push({ label: 'Media type', value: book.mediaType });
    return rows;
  }
}
