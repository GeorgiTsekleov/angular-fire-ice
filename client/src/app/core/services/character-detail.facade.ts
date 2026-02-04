import { Injectable, inject, signal } from '@angular/core';
import { forkJoin, of, Subject } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { CharacterApiService } from './api/character-api.service';
import { IceAndFireApiService } from './ice-and-fire-api.service';
import { buildMetaRows } from '../utils/meta-rows.util';
import { Book } from '../models/book.model';
import { Character } from '../models/character.model';

const CHARACTER_META_ROWS: ReadonlyArray<{
  label: string;
  value: (c: Character) => string | null | undefined;
}> = [
  { label: 'Gender', value: (c) => c.gender || null },
  { label: 'Culture', value: (c) => c.culture || null },
  { label: 'Born', value: (c) => c.born || null },
  { label: 'Died', value: (c) => c.died || null },
  { label: 'Titles', value: (c) => (c.titles?.length ? c.titles.join(', ') : null) },
  { label: 'Aliases', value: (c) => (c.aliases?.length ? c.aliases.join(', ') : null) },
  { label: 'Father', value: (c) => c.father || null },
  { label: 'Mother', value: (c) => c.mother || null },
  { label: 'Spouse', value: (c) => c.spouse || null },
  { label: 'Allegiances', value: (c) => (c.allegiances?.length ? c.allegiances.join(', ') : null) },
  { label: 'TV series', value: (c) => (c.tvSeries?.length ? c.tvSeries.join(', ') : null) },
  { label: 'Played by', value: (c) => (c.playedBy?.length ? c.playedBy.join(', ') : null) },
];

@Injectable({ providedIn: 'root' })
export class CharacterDetailFacade {
  private readonly characterApi = inject(CharacterApiService);
  private readonly iceAndFireApi = inject(IceAndFireApiService);

  private readonly loadTrigger$ = new Subject<string>();

  readonly character = signal<Character | null>(null);
  readonly books = signal<Book[]>([]);
  readonly loading = signal(true);
  readonly error = signal<string | null>(null);

  constructor() {
    this.loadTrigger$
      .pipe(
        switchMap((characterId) => {
          this.loading.set(true);
          this.error.set(null);
          return this.characterApi.getCharacter(characterId).pipe(
            catchError((err) => {
              this.error.set(err?.message ?? 'Failed to load character');
              this.loading.set(false);
              return of(null);
            })
          );
        })
      )
      .subscribe((char) => {
        if (char) {
          this.character.set(char);
          this.loadBooksForCharacter(char);
        }
        this.loading.set(false);
      });
  }

  load(characterId: string): void {
    this.character.set(null);
    this.books.set([]);
    if (characterId) {
      this.loadTrigger$.next(characterId);
    } else {
      this.loading.set(false);
    }
  }

  private loadBooksForCharacter(character: Character): void {
    const urls = character.books ?? [];
    if (urls.length === 0) {
      this.books.set([]);
      return;
    }
    const ids = urls.map((url) => this.getBookId(url)).filter(Boolean);
    if (ids.length === 0) {
      this.books.set([]);
      return;
    }
    forkJoin(ids.map((id) => this.iceAndFireApi.getBook(id).pipe(catchError(() => of(null)))))
      .pipe(map((results) => results.filter((b): b is Book => b != null)))
      .subscribe((books) => this.books.set(books));
  }

  getBookId(bookUrl: string): string {
    return bookUrl.split('/').filter(Boolean).pop() ?? '';
  }

  getCharacterDisplayName(character: Character): string {
    return character.playedBy?.[0] ?? character.name ?? character.aliases?.[0] ?? '';
  }

  getMetaRows(character: Character): { label: string; value: string }[] {
    return buildMetaRows(character, CHARACTER_META_ROWS);
  }
}
