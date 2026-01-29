import { Component, inject, signal } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { selectCounter, selectTitle } from './core/state/app.selectors';
import { Store } from '@ngrx/store';
import { decrementCounter, incrementCounter, resetCounter } from './core/state/app.actions';
import { AppFacade } from './core/services/app.facade';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  private appFacade = inject(AppFacade);
  protected readonly title = this.appFacade.title;
  protected readonly counter = this.appFacade.counter;

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
