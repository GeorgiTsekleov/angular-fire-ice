import { Component, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Heart, LogIn, LucideAngularModule, Menu, Search, User } from 'lucide-angular';
import { AppFacade } from '../../../../core/services/app.facade';
import { AuthFacade } from '../../../../core/services/auth/auth.facade';
import { FavoritesFacade } from '../../../../core/services/favorites.facade';
import { SearchModalService } from '../../../../core/services/search-modal.service';
import { SearchBarComponent } from '../../search/search-bar/search-bar';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, LucideAngularModule, SearchBarComponent],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class HeaderComponent {
  private readonly favoritesFacade = inject(FavoritesFacade);
  private readonly appFacade = inject(AppFacade);
  private readonly authFacade = inject(AuthFacade);

  protected readonly counter = this.appFacade.counter;
  readonly favoritesCount = computed(() => this.favoritesFacade.favoritesCount());
  readonly userMenuOpen = signal(false);

  readonly isAuthenticated = () =>
    this.authFacade.status() === 'loaded' && this.authFacade.user() !== null;
  readonly user = this.authFacade.user;

  readonly heartIcon = Heart;
  readonly userIcon = User;
  readonly loginIcon = LogIn;
  readonly menuIcon = Menu;

  constructor() {
    this.favoritesFacade.loadFavorites();
    this.authFacade.checkAuth();
  }

  protected onHeaderClick(source: string): void {
    console.log(`click at ${source}`);
  }

  protected toggleUserMenu(): void {
    this.userMenuOpen.update((open) => !open);
    this.onHeaderClick('user profile icon');
  }

  protected closeUserMenu(): void {
    this.userMenuOpen.set(false);
  }

  protected logout(): void {
    this.authFacade.logout();
    this.closeUserMenu();
    this.onHeaderClick('Log Out button');
  }
}
