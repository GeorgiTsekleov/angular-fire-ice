import { Component, computed, inject } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { AppFacade } from './core/services/app.facade';
import { FavoritesFacade } from './core/services/favorites.facade';
import { AuthNavComponent } from './shared/components/auth-nav/auth-nav/auth-nav';
import { SearchBarComponent } from './shared/components/search/search-bar/search-bar';
// import { BooksFacade } from './core/services/books.facade';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, AuthNavComponent, SearchBarComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  private appFacade = inject(AppFacade);
  protected readonly title = this.appFacade.title;
  protected readonly counter = this.appFacade.counter;

  protected readonly headerFavoritesCount = computed(() => this.favoritesFacade.favoritesCount());

  private favoritesFacade = inject(FavoritesFacade);
  // private booksFacade = inject(BooksFacade);

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
