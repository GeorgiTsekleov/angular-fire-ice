import { Component, inject, signal, computed, effect } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule, Search, X } from 'lucide-angular';
import { BooksFacade } from '../../../../core/services/books.facade';
import { Book } from '../../../../core/models';
import { SearchModalService } from '../../../../core/services/search-modal.service';
import { environment } from '../../../../../environments/environment.development';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [FormsModule, LucideAngularModule],
  templateUrl: './search-bar.html',
  styleUrl: './search-bar.scss',
})
export class SearchBarComponent {
  protected readonly searchModal = inject(SearchModalService);

  private readonly booksFacade = inject(BooksFacade);
  private readonly router = inject(Router);

  protected readonly searchIcon = Search;

  protected readonly closeIcon = X;

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

    effect((onCleanup) => {
      if (typeof document === 'undefined') return;
      const open = this.searchModal.isOpen();
      document.body.style.overflow = open ? 'hidden' : '';

      onCleanup(() => {
        document.body.style.overflow = '';
      });
    });
  }

  protected onInput(value: string): void {
    this.query.set(value);
    this.isOpen.set(value.length > 0);
  }

  protected onSelectBook(book: Book): void {
    const id = book.url.split('/').pop() ?? book.url;
    this.router.navigate([`${environment.booksPath}`, id]);
    this.query.set('');
    this.isOpen.set(false);
    this.searchModal.close();
  }

  protected onBlur(): void {
    setTimeout(() => this.isOpen.set(false), 1000);
  }

  protected closeModal(): void {
    this.searchModal.close();
  }
}
