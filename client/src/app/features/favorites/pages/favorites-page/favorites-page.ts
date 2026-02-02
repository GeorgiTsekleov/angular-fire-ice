import { Component, computed, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Book } from '../../../../core/models';
import { BooksFacade } from '../../../../core/services/books.facade';
import { FavoritesFacade } from '../../../../core/services/favorites.facade';
import { ContentCardComponent } from '../../../../shared/components/content-card/content-card/content-card';
import { ContentCardWrapper } from '../../../../shared/components/content-card/content-card-wrapper/content-card-wrapper';
import { LoadingGuard } from '../../../../shared/components/guards/loading/loading-guard';
import { ErrorGuard } from '../../../../shared/components/guards/error/error-guard/error-guard';
import { environment } from '../../../../../environments/environment.development';
import {
  getDisplayDescription,
  getDisplaySubtitle,
} from '../../../../core/utils/book-display.util';

@Component({
  selector: 'app-favorites-page',
  standalone: true,
  imports: [ContentCardComponent, ContentCardWrapper, LoadingGuard, ErrorGuard],
  templateUrl: './favorites-page.html',
  styleUrl: './favorites-page.scss',
})
export class FavoritesPage {
  private readonly favoritesFacade = inject(FavoritesFacade);
  private readonly booksFacade = inject(BooksFacade);
  private readonly router = inject(Router);

  protected readonly favoriteBookIds = this.favoritesFacade.favoriteBookIds;
  protected readonly books = this.booksFacade.books;
  protected readonly loading = this.booksFacade.loading;
  protected readonly error = this.booksFacade.error;

  protected readonly favoriteBooks = computed(() => {
    const favoriteBookIds = this.favoriteBookIds();
    const allBooks = this.books() ?? [];
    return allBooks.filter((book) => favoriteBookIds.includes(book.url));
  });

  ngOnInit(): void {
    this.booksFacade.loadBooks();
  }

  protected isFavorite(bookId: string): boolean {
    return this.favoritesFacade.isFavorite(bookId);
  }

  protected onToggleFavorite(book: Book): void {
    this.favoritesFacade.toggleFavorite(book);
  }

  protected onCardClick(book: Book): void {
    const id = book.url.split('/').filter(Boolean).pop() ?? book.url;
    this.router.navigate([environment.booksPath, id]);
  }

  protected getDescription(book: Book): string {
    return getDisplayDescription(book);
  }

  protected getSubtitle(book: Book): string {
    return getDisplaySubtitle(book);
  }
}
