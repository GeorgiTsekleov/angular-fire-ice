import { Component, inject, OnInit } from '@angular/core';
import { LucideAngularModule, Heart } from 'lucide-angular';
import { BookDetailFacade } from '../../../../core/services/book-detail.facade';
import { FavoritesFacade } from '../../../../core/services/favorites.facade';
import { routeParam } from '../../../../core/utils/route-param.util';
import { Book } from '../../../../core/models/book.model';
import { Character } from '../../../../core/models/character.model';
import { LoadingGuard } from '../../../../shared/components/guards/loading/loading-guard';
import { ErrorGuard } from '../../../../shared/components/guards/error/error-guard/error-guard';
import { BookCover } from '../../../../shared/components/book-cover/book-cover/book-cover';
import { CharactersCard } from '../../../../shared/components/characters/character-card/characters-card';
import { SectionTitle } from '../../../../shared/components/section-title/section-title/section-title';
import { HorizontalScrollContainer } from '../../../../shared/components/horizontal-scroll-container/horizontal-scroll-container';
import { ContentDetailsCard } from '../../../../shared/components/content-card/content-details-card/content-details-card';
import { ContentCardMeta } from '../../../../shared/components/content-card/content-card-meta/content-card-meta';

@Component({
  selector: 'app-book-detail',
  imports: [
    LucideAngularModule,
    LoadingGuard,
    ErrorGuard,
    BookCover,
    CharactersCard,
    SectionTitle,
    HorizontalScrollContainer,
    ContentDetailsCard,
    ContentCardMeta,
  ],
  templateUrl: './book-detail.html',
  styleUrl: './book-detail.scss',
})
export class BookDetail implements OnInit {
  protected readonly facade = inject(BookDetailFacade);
  private readonly favoritesFacade = inject(FavoritesFacade);

  protected readonly heartIcon = Heart;

  protected readonly bookId = routeParam('id');
  protected readonly loading = this.facade.loading;
  protected readonly error = this.facade.error;
  protected readonly book = this.facade.book;
  protected readonly characters = this.facade.characters;

  ngOnInit(): void {
    const id = this.bookId();
    if (id) this.facade.load(id);
  }

  protected isFavorite(bookId: string): boolean {
    return this.favoritesFacade.isFavorite(bookId);
  }

  protected onToggleFavorite(book: Book): void {
    this.favoritesFacade.toggleFavorite(book);
  }

  protected getMetaRows(book: Book) {
    return this.facade.getMetaRows(book);
  }

  protected getBookId(bookUrl: string): string {
    return this.facade.getBookId(bookUrl);
  }

  protected getCharacterId(characterUrl: string): string {
    return this.facade.getCharacterId(characterUrl);
  }

  protected getCharacterDisplayName(character: Character): string | undefined {
    return this.facade.getCharacterDisplayName(character);
  }

  protected getDisplayableCharacters(characters: Character[]): Character[] {
    return this.facade.getDisplayableCharacters(characters);
  }
}
