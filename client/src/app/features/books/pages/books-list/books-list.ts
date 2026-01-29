import { Component, inject } from '@angular/core';
import { BooksFacade } from '../../../../core/services/books.facade';

@Component({
  selector: 'app-books-list',
  imports: [],
  templateUrl: './books-list.html',
  styleUrl: './books-list.scss',
})
export class BooksList {
  protected readonly booksFacade = inject(BooksFacade);

  ngOnInit(): void {
    this.booksFacade.loadBooks();
  }
}
