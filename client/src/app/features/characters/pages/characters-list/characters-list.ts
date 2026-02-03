import { Component, inject } from '@angular/core';
import { CharactersCard } from '../../../../shared/components/characters/character-card/characters-card';
import { BooksWithCharactersFacade } from '../../../../core/services/books-with-characters.facade';
import { Character } from '../../../../core/models/character.model';
import { LoadingGuard } from '../../../../shared/components/guards/loading/loading-guard';
import { ErrorGuard } from '../../../../shared/components/guards/error/error-guard/error-guard';
import { SectionTitle } from '../../../../shared/components/section-title/section-title/section-title';
import { HorizontalScrollContainer } from '../../../../shared/components/horizontal-scroll-container/horizontal-scroll-container';

const CHARACTERS_PER_BOOK = 6;

@Component({
  selector: 'app-characters-list',
  imports: [CharactersCard, LoadingGuard, ErrorGuard, SectionTitle, HorizontalScrollContainer],
  templateUrl: './characters-list.html',
  styleUrl: './characters-list.scss',
})
export class CharactersList {
  protected readonly booksWithCharactersFacade = inject(BooksWithCharactersFacade);

  protected readonly booksWithCharacters = this.booksWithCharactersFacade.booksWithCharacters;
  protected readonly loading = this.booksWithCharactersFacade.loading;
  protected readonly error = this.booksWithCharactersFacade.error;

  ngOnInit(): void {
    this.booksWithCharactersFacade.loadBooksWithCharacters(CHARACTERS_PER_BOOK);
  }

  protected getBookId(bookUrl: string): string {
    return bookUrl.split('/').filter(Boolean).pop() ?? '';
  }

  protected getCharacterId(characterUrl: string): string {
    return characterUrl.split('/').filter(Boolean).pop() ?? '';
  }

  protected getCharacterDisplayName(character: Character): string | undefined {
    return character.playedBy?.[0] ?? character.name ?? character.aliases?.[0];
  }

  protected getDisplayableCharacters(characters: Character[]): Character[] {
    return (characters ?? []).filter((c) => c && this.getCharacterDisplayName(c));
  }
}
