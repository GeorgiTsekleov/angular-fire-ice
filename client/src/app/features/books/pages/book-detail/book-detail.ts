import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { selectCounter } from '../../../../core/state/app.selectors';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-book-detail',
  imports: [],
  templateUrl: './book-detail.html',
  styleUrl: './book-detail.scss',
})
export class BookDetail {
  private route = inject(ActivatedRoute);
  private store = inject(Store);
  protected readonly counter = this.store.selectSignal(selectCounter);
  protected readonly bookId = this.route.snapshot.paramMap.get('id') || '';
}
