import { Component, input, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { LucideAngularModule, X, Menu } from 'lucide-angular';

@Component({
  selector: 'app-header-nav',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, LucideAngularModule],
  templateUrl: './header-nav.html',
  styleUrl: './header-nav.scss',
})
export class HeaderNavComponent {
  readonly isOpen = signal<boolean>(false);
  readonly favoritesCount = input<number>(0);

  readonly closeIcon = X;
  readonly menuIcon = Menu;

  readonly navItems: { label: string; routerLink: string }[] = [
    { label: 'Home', routerLink: '/' },
    { label: 'Books', routerLink: '/books' },
    { label: 'Characters', routerLink: '/books/characters' },
  ];

  protected onNavLinkClick(): void {
    this.isOpen.set(!this.isOpen());
  }
}
