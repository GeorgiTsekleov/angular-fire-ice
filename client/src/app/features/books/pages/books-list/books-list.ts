import { Component, computed, inject } from '@angular/core';
import { Book } from '../../../../core/models';
import { BooksFacade } from '../../../../core/services/books.facade';
import { FavoritesFacade } from '../../../../core/services/favorites.facade';
import { ContentCardComponent } from '../../../../shared/components/content-card/content-card/content-card';
import { ErrorGuard } from '../../../../shared/components/guards/error/error-guard/error-guard';
import { LoadingGuard } from '../../../../shared/components/guards/loading/loading-guard';
import { Router } from '@angular/router';
import { environment } from '../../../../../environments/environment.development';
import {
  getDisplayDescription,
  getDisplaySubtitle,
} from '../../../../core/utils/book-display.util';
import { ContentCardWrapper } from '../../../../shared/components/content-card/content-card-wrapper/content-card-wrapper';

@Component({
  selector: 'app-books-list',
  imports: [LoadingGuard, ErrorGuard, ContentCardComponent, ContentCardWrapper],
  templateUrl: './books-list.html',
  styleUrl: './books-list.scss',
})
export class BooksList {
  protected readonly booksFacade = inject(BooksFacade);
  protected readonly favoritesFacade = inject(FavoritesFacade);
  private readonly router = inject(Router);
  protected readonly books = computed(() => this.booksFacade.books() ?? []);

  protected isFavorite(bookId: string): boolean {
    return this.favoritesFacade.isFavorite(bookId);
  }

  protected onToggleFavorite(book: Book): void {
    this.favoritesFacade.toggleFavorite(book);
  }

  ngOnInit(): void {
    this.booksFacade.loadBooks();
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
