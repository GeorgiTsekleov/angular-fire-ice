import { Component, inject, signal } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { selectCounter, selectTitle } from './core/state/app.selectors';
import { Store } from '@ngrx/store';
import { decrementCounter, incrementCounter, resetCounter } from './core/state/app.actions';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  private store = inject(Store);
  protected readonly title = this.store.selectSignal(selectTitle);
  protected readonly counter = this.store.selectSignal(selectCounter);

  incrementCounter() {
    console.log('incrementCounter');
    this.store.dispatch(incrementCounter());
  }

  decrementCounter() {
    console.log('decrementCounter');
    this.store.dispatch(decrementCounter());
  }

  resetCounter() {
    console.log('resetCounter');
    this.store.dispatch(resetCounter());
  }
}
