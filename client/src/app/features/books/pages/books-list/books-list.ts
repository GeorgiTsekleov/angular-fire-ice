import { Component, computed, inject } from '@angular/core';
import { BooksFacade } from '../../../../core/services/books.facade';
import { LoadingGuard } from '../../../../shared/components/guards/loading/loading-guard';
import { ErrorGuard } from '../../../../shared/components/guards/error/error-guard/error-guard';

@Component({
  selector: 'app-books-list',
  imports: [LoadingGuard, ErrorGuard],
  templateUrl: './books-list.html',
  styleUrl: './books-list.scss',
})
export class BooksList {
  protected readonly booksFacade = inject(BooksFacade);
  protected readonly books = computed(() => this.booksFacade.books() ?? []);

  ngOnInit(): void {
    this.booksFacade.loadBooks();
  }
}
