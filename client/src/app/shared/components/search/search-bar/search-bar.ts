import { Component, inject, signal, computed } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { BooksFacade } from '../../../../core/services/books.facade';
import { Book } from '../../../../core/models';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './search-bar.html',
  styleUrl: './search-bar.scss',
})
export class SearchBarComponent {
  private readonly booksFacade = inject(BooksFacade);
  private readonly router = inject(Router);

  protected readonly query = signal('');
  protected readonly isOpen = signal(false);

  protected readonly results = computed(() => {
    const q = this.query().trim().toLowerCase();
    if (!q) return [];
    const books = this.booksFacade.books() ?? [];
    return books.filter((b) => b.name.toLowerCase().includes(q));
  });

  constructor() {
    this.booksFacade.loadBooks();
  }

  protected onInput(value: string): void {
    this.query.set(value);
    this.isOpen.set(value.length > 0);
  }

  protected onSelectBook(book: Book): void {
    const id = book.url.split('/').pop() ?? book.url;
    this.router.navigate(['/books', id]);
    this.query.set('');
    this.isOpen.set(false);
  }

  protected onBlur(): void {
    setTimeout(() => this.isOpen.set(false), 1000);
  }
}
