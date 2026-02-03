import { Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BooksFacade } from '../../../../core/services/books.facade';
import { BookCover } from '../../book-cover/book-cover/book-cover';
import { SecondaryButton } from '../../buttons/secondary-button/secondary-button';
import { SectionTitle } from '../../section-title/section-title/section-title';
import { HorizontalScrollContainer } from '../../horizontal-scroll-container/horizontal-scroll-container';

const SAGA_BOOKS_COUNT = 10;

@Component({
  selector: 'app-landing-saga',
  imports: [RouterLink, BookCover, SecondaryButton, SectionTitle, HorizontalScrollContainer],
  templateUrl: './landing-saga.html',
  styleUrl: './landing-saga.scss',
})
export class LandingSaga {
  private readonly booksFacade = inject(BooksFacade);

  protected readonly books = computed(() =>
    (this.booksFacade.books() ?? []).slice(0, SAGA_BOOKS_COUNT)
  );

  ngOnInit(): void {
    this.booksFacade.loadBooks();
  }

  protected getBookId(bookUrl: string): string {
    return bookUrl.split('/').filter(Boolean).pop() ?? '';
  }
}
