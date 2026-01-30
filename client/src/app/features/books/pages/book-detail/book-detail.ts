import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
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
  protected readonly bookId = toSignal(
    this.route.paramMap.pipe(map((params) => params.get('id') ?? '')),
    { initialValue: '' },
  );

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
