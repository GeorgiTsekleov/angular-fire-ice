import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthFacade } from '../../../../../core/services/auth/auth.facade';
import { RouterLink } from '@angular/router';
import { RedirectWhenAuthenticatedDirective } from '../../../../../shared/directives/auth-redirect.directive';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login-page.html',
  styleUrl: './login-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  hostDirectives: [RedirectWhenAuthenticatedDirective],
})
export class LoginPage {
  private readonly fb = inject(FormBuilder);
  protected readonly authFacade = inject(AuthFacade);

  protected readonly form = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  protected onSubmit(): void {
    if (this.form.invalid) return;

    const { email, password } = this.form.getRawValue();
    this.authFacade.login({ email, password });
  }
}
