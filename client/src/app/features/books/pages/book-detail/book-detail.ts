import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppFacade } from '../../../../core/services/app.facade';

@Component({
  selector: 'app-book-detail',
  imports: [],
  templateUrl: './book-detail.html',
  styleUrl: './book-detail.scss',
})
export class BookDetail {
  private route = inject(ActivatedRoute);
  private appFacade = inject(AppFacade);
  protected readonly counter = this.appFacade.counter;
  protected readonly bookId = this.route.snapshot.paramMap.get('id') || '';

  incrementCounter() {
    this.appFacade.incrementCounter();
  }

  decrementCounter() {
    this.appFacade.decrementCounter();
  }

  resetCounter() {
    this.appFacade.resetCounter();
  }
}
