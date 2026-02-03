import { Component, computed, inject, input, signal } from '@angular/core';
import {
  CoverQuality,
  OpenLibraryApiService,
} from '../../../../core/services/api/book-cover-api.service';
import { Loader } from '../../loader/loader';

type Status = 'loading' | 'loaded' | 'error';

@Component({
  selector: 'app-book-cover',
  imports: [Loader],
  templateUrl: './book-cover.html',
  styleUrl: './book-cover.scss',
})
export class BookCover {
  isbn = input.required<string>();
  alt = input<string>('Book cover');
  quality = input<CoverQuality>('L');

  protected readonly status = signal<Status>('loading');

  private readonly coverLibrary = inject(OpenLibraryApiService);

  protected readonly imageUrl = computed(() =>
    this.coverLibrary.getCoverUrl(this.isbn(), this.quality())
  );

  protected onLoad(): void {
    this.status.set('loaded');
  }

  protected onError(): void {
    this.status.set('error');
  }
}
