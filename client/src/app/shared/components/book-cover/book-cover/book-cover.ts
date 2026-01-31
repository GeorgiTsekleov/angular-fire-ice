import { Component, computed, input, signal } from '@angular/core';

interface Quality {
  L: string;
  M: string;
  S: string;
}

@Component({
  selector: 'app-book-cover',
  imports: [],
  templateUrl: './book-cover.html',
  styleUrl: './book-cover.scss',
})
export class BookCover {
  isbn = input.required<string>();
  alt = input<string>('Book cover');
  quality = input<keyof Quality>('L' as keyof Quality);

  protected readonly status = signal<'loading' | 'loaded' | 'error'>('loading');

  protected readonly imageUrl = computed(
    () => `https://covers.openlibrary.org/b/isbn/${this.isbn()}-${this.quality()}.jpg`,
  );

  protected onLoad(): void {
    this.status.set('loaded');
  }

  protected onError(): void {
    this.status.set('error');
  }
}
