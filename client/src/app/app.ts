import { Component, computed, inject } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { AppFacade } from './core/services/app.facade';
import { FavoritesFacade } from './core/services/favorites.facade';

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

  protected readonly favoritesCount = inject(FavoritesFacade);

  protected readonly headerFavoritesCount = computed(() => this.favoritesCount.favoritesCount());

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
