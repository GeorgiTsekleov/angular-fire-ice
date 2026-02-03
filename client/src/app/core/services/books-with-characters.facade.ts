import { Injectable, inject, signal } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { forkJoin, of, Subject } from 'rxjs';
import { catchError, filter, map, switchMap, take } from 'rxjs/operators';
import { BooksFacade } from './books.facade';
import { CharacterApiService } from './api/character-api.service';
import { Book } from '../models/book.model';
import { Character } from '../models/character.model';

export interface BookWithCharacters {
  book: Book;
  characters: Character[];
}

const DEFAULT_CHARACTERS_PER_BOOK = 6;

@Injectable({ providedIn: 'root' })
export class BooksWithCharactersFacade {
  private readonly booksFacade = inject(BooksFacade);
  private readonly characterApi = inject(CharacterApiService);
  private readonly loadTrigger$ = new Subject<number>();
  private readonly books$ = toObservable(this.booksFacade.books);

  readonly booksWithCharacters = signal<BookWithCharacters[]>([]);
  readonly loading = this.booksFacade.loading;
  readonly error = this.booksFacade.error;

  constructor() {
    this.loadTrigger$
      .pipe(
        switchMap((charactersPerBook) =>
          this.books$.pipe(
            filter((books) => books.length > 0),
            take(1),
            switchMap((bookList) => this.fetchBooksWithCharacters(bookList, charactersPerBook))
          )
        )
      )
      .subscribe({
        next: (data) => this.booksWithCharacters.set(data),
        error: () => this.booksWithCharacters.set([]),
      });
  }

  loadBooksWithCharacters(charactersPerBook: number = DEFAULT_CHARACTERS_PER_BOOK): void {
    this.booksFacade.loadBooks();
    this.loadTrigger$.next(charactersPerBook);
  }

  private fetchBooksWithCharacters(bookList: Book[], charactersPerBook: number) {
    return forkJoin(
      bookList.map((book) => {
        const urls = book.characters?.slice(0, charactersPerBook) ?? [];
        if (urls.length === 0) {
          return of({ book, characters: [] as Character[] });
        }
        return forkJoin(
          urls.map((url) => this.characterApi.getCharacter(url).pipe(catchError(() => of(null))))
        ).pipe(
          map((characters) => ({
            book,
            characters: characters.filter((c): c is Character => c != null),
          }))
        );
      })
    );
  }
}
