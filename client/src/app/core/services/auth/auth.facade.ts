import { Injectable, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectUser, selectAuthStatus, selectAuthError } from '../../state/auth/auth.selectors';
import { checkAuth, register, logout, login } from '../../state/auth/auth.actions';
import { LoginBody, RegisterBody } from '@angular-fire-ice/shared';

@Injectable({ providedIn: 'root' })
export class AuthFacade {
  private readonly store = inject(Store);

  readonly user = this.store.selectSignal(selectUser);
  readonly status = this.store.selectSignal(selectAuthStatus);
  readonly error = this.store.selectSignal(selectAuthError);

  register({ email, password, name }: RegisterBody): void {
    this.store.dispatch(register({ credentials: { email, password, name } }));
  }

  checkAuth(): void {
    this.store.dispatch(checkAuth());
  }

  logout(): void {
    this.store.dispatch(logout());
  }

  login({ email, password }: LoginBody): void {
    this.store.dispatch(login({ credentials: { email, password } }));
  }
}
