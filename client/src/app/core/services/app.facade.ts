import { Injectable, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectCounter, selectTitle } from '../state/app.selectors';
import * as AppActions from '../state/app.actions';

@Injectable({ providedIn: 'root' })
export class AppFacade {
  private store = inject(Store);

  readonly title = this.store.selectSignal(selectTitle);
  readonly counter = this.store.selectSignal(selectCounter);

  setTitle(title: string): void {
    this.store.dispatch(AppActions.setTitle({ title }));
  }

  incrementCounter(): void {
    this.store.dispatch(AppActions.incrementCounter());
  }

  decrementCounter(): void {
    this.store.dispatch(AppActions.decrementCounter());
  }

  resetCounter(): void {
    this.store.dispatch(AppActions.resetCounter());
  }
}
