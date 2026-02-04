import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthFacade } from '../../../../../core/services/auth/auth.facade';
import { RedirectWhenAuthenticatedDirective } from '../../../../../shared/directives/auth-redirect.directive';
import { GlassCard } from '../../../../../shared/components/glass-card/glass-card/glass-card';
import { AuthFormField } from '../../../../../shared/components/auth-form-field/auth-form-field/auth-form-field';
import { AuthFormError } from '../../../../../shared/components/auth-form-error/auth-form-error/auth-form-error';
import { AuthSubmitButton } from '../../../../../shared/components/auth-submit-button/auth-submit-button/auth-submit-button';
import { AuthFooterLink } from '../../../../../shared/components/auth-footer-link/auth-footer-link/auth-footer-link';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    GlassCard,
    AuthFormField,
    AuthFormError,
    AuthSubmitButton,
    AuthFooterLink,
  ],
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
