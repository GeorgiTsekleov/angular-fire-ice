import { Directive, effect, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthFacade } from '../../core/services/auth/auth.facade';

@Directive({ standalone: true })
export class RedirectWhenAuthenticatedDirective {
  private readonly authFacade = inject(AuthFacade);
  private readonly router = inject(Router);

  constructor() {
    effect(() => {
      const status = this.authFacade.status();
      const user = this.authFacade.user();
      if (status === 'loaded' && user !== null) {
        this.router.navigate(['/']);
      }
    });
  }
}
