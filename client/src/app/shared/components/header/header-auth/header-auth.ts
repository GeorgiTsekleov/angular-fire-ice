import { Component, inject, output, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LogIn, LucideAngularModule, User, X } from 'lucide-angular';
import { AuthFacade } from '../../../../core/services/auth/auth.facade';

@Component({
  selector: 'app-header-auth',
  standalone: true,
  imports: [RouterLink, LucideAngularModule],
  templateUrl: './header-auth.html',
  styleUrl: './header-auth.scss',
})
export class HeaderAuthComponent {
  private readonly authFacade = inject(AuthFacade);

  readonly headerClick = output<string>();

  readonly userMenuOpen = signal(false);

  readonly isAuthenticated = () =>
    this.authFacade.status() === 'loaded' && this.authFacade.user() !== null;
  readonly user = this.authFacade.user;

  readonly loginIcon = LogIn;
  readonly userIcon = User;
  readonly closeIcon = X;

  constructor() {
    this.authFacade.checkAuth();
  }

  protected onLoginClick(): void {
    this.headerClick.emit('login icon');
  }

  protected toggleUserMenu(): void {
    this.userMenuOpen.update((open) => !open);
    this.headerClick.emit('user profile icon');
  }

  protected closeUserMenu(): void {
    this.userMenuOpen.set(false);
  }

  protected logout(): void {
    this.authFacade.logout();
    this.userMenuOpen.set(false);
    this.headerClick.emit('Log Out button');
  }
}
