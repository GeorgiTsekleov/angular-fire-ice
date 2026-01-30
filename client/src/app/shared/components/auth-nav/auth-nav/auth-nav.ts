import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthFacade } from '../../../../core/services/auth/auth.facade';

@Component({
  selector: 'app-auth-nav',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './auth-nav.html',
  styleUrl: './auth-nav.scss',
})
export class AuthNavComponent {
  protected readonly authFacade = inject(AuthFacade);
  protected readonly user = this.authFacade.user;
  protected readonly status = this.authFacade.status;
  protected readonly isAuthenticated = () =>
    this.authFacade.status() === 'loaded' && this.authFacade.user() !== null;

  constructor() {
    this.authFacade.checkAuth();
  }

  protected onLogout(): void {
    console.log('logout');
  }
}
