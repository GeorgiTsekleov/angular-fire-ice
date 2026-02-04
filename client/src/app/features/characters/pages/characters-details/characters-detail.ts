import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Book } from '../../../../core/models/book.model';
import { Character } from '../../../../core/models/character.model';
import { CharacterDetailFacade } from '../../../../core/services/character-detail.facade';
import { environment } from '../../../../../environments/environment.development';
import { ErrorGuard } from '../../../../shared/components/guards/error/error-guard/error-guard';
import { LoadingGuard } from '../../../../shared/components/guards/loading/loading-guard';
import { ContentDetailsCard } from '../../../../shared/components/content-card/content-details-card/content-details-card';
import { ContentCardMeta } from '../../../../shared/components/content-card/content-card-meta/content-card-meta';
import { HorizontalScrollContainer } from '../../../../shared/components/horizontal-scroll-container/horizontal-scroll-container';
import { BookCover } from '../../../../shared/components/book-cover/book-cover/book-cover';
import { CharactersCard } from '../../../../shared/components/characters/character-card/characters-card';
import { routeParam } from '../../../../core/utils/route-param.util';

@Component({
  selector: 'app-characters-detail',
  imports: [
    RouterLink,
    LoadingGuard,
    ErrorGuard,
    ContentDetailsCard,
    ContentCardMeta,
    HorizontalScrollContainer,
    BookCover,
    CharactersCard,
  ],
  templateUrl: './characters-detail.html',
  styleUrl: './characters-detail.scss',
})
export class CharactersDetail implements OnInit {
  protected readonly facade = inject(CharacterDetailFacade);

  protected readonly bookId = routeParam('id');
  protected readonly characterId = routeParam('characterId');
  protected readonly loading = this.facade.loading;
  protected readonly error = this.facade.error;
  protected readonly character = this.facade.character;
  protected readonly books = this.facade.books;
  protected readonly booksPath = '/' + environment.booksPath;

  ngOnInit(): void {
    const id = this.characterId();
    if (id) this.facade.load(id);
  }

  protected getCharacterDisplayName(character: Character): string {
    return this.facade.getCharacterDisplayName(character);
  }

  protected getMetaRows(character: Character): { label: string; value: string }[] {
    return this.facade.getMetaRows(character);
  }

  protected getBookId(book: Book): string {
    return this.facade.getBookId(book.url);
  }
}
