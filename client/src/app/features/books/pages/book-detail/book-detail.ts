import { Component, inject } from '@angular/core';
import { AppFacade } from '../../../../core/services/app.facade';
import { routeParam } from '../../../../core/utils/route-param.util';

@Component({
  selector: 'app-book-detail',
  imports: [],
  templateUrl: './book-detail.html',
  styleUrl: './book-detail.scss',
})
export class BookDetail {
  private appFacade = inject(AppFacade);
  protected readonly counter = this.appFacade.counter;
  protected readonly bookId = routeParam('id');

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
