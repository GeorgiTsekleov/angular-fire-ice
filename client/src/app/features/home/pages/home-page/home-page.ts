import { Component, computed, inject } from '@angular/core';
import { FavoritesFacade } from '../../../../core/services/favorites.facade';
import { AppFacade } from '../../../../core/services/app.facade';

@Component({
  selector: 'app-home-page',
  imports: [],
  templateUrl: './home-page.html',
  styleUrl: './home-page.scss',
})
export class HomePage {
  private appFacade = inject(AppFacade);
  protected readonly title = this.appFacade.title;
  protected readonly counter = this.appFacade.counter;

  protected readonly headerFavoritesCount = computed(() => this.favoritesFacade.favoritesCount());

  private favoritesFacade = inject(FavoritesFacade);

  constructor() {
    this.favoritesFacade.loadFavorites();
  }

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
