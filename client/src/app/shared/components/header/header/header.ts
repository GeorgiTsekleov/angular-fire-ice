import { Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Heart, LucideAngularModule } from 'lucide-angular';
import { FavoritesFacade } from '../../../../core/services/favorites.facade';
import { HeaderAuthComponent } from '../header-auth/header-auth';
import { HeaderNavComponent } from '../header-nav/header-nav';
import { SearchBarComponent } from '../../search/search-bar/search-bar';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    RouterLink,
    LucideAngularModule,
    SearchBarComponent,
    HeaderAuthComponent,
    HeaderNavComponent,
  ],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class HeaderComponent {
  private readonly favoritesFacade = inject(FavoritesFacade);
  readonly favoritesCount = computed(() => this.favoritesFacade.favoritesCount());

  readonly heartIcon = Heart;

}
