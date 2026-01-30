import { Component, computed, inject } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { AppFacade } from './core/services/app.facade';
import { FavoritesFacade } from './core/services/favorites.facade';
import { AuthFacade } from './core/services/auth/auth.facade';

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

  protected readonly headerFavoritesCount = computed(() => this.favoritesFacade.favoritesCount());

  private favoritesFacade = inject(FavoritesFacade);
  protected readonly authFacade = inject(AuthFacade);

  protected readonly user = computed(() => this.authFacade.user());

  constructor() {
    this.favoritesFacade.loadFavorites();
    this.authFacade.checkAuth();
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
