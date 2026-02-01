import { Component, computed, inject } from '@angular/core';
import { BooksFacade } from '../../../../core/services/books.facade';
import { LoadingGuard } from '../../../../shared/components/guards/loading/loading-guard';
import { ErrorGuard } from '../../../../shared/components/guards/error/error-guard/error-guard';
import { Book } from '../../../../core/models';
import { FavoritesFacade } from '../../../../core/services/favorites.facade';
import { BookCover } from '../../../../shared/components/book-cover/book-cover/book-cover';
import { Router } from '@angular/router';
import { environment } from '../../../../../environments/environment.development';

@Component({
  selector: 'app-books-list',
  imports: [LoadingGuard, ErrorGuard, BookCover],
  templateUrl: './books-list.html',
  styleUrl: './books-list.scss',
})
export class BooksList {
  protected readonly booksFacade = inject(BooksFacade);
  protected readonly favoritesFacade = inject(FavoritesFacade);
  protected readonly router = inject(Router);
  protected readonly books = computed(() => this.booksFacade.books() ?? []);

  protected readonly isFavorite = (bookId: string): boolean => {
    return this.favoritesFacade.isFavorite(bookId);
  };

  protected readonly onToggleFavorite = (book: Book) => {
    this.favoritesFacade.toggleFavorite(book);
  };

  ngOnInit(): void {
    this.booksFacade.loadBooks();
  }

  protected readonly onBookClick = (book: Book) => {
    const id = book.url.split('/').pop() ?? book.url;
    this.router.navigate([`${environment.booksPath}`, id]);
  };
}
