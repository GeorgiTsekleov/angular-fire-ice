import { Injectable, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectUser, selectAuthStatus, selectAuthError } from '../../state/auth/auth.selectors';
import { checkAuth, register } from '../../state/auth/auth.actions';
import { RegisterBody } from '@angular-fire-ice/shared';

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
}
