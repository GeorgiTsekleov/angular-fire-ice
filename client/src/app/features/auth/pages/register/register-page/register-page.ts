import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { AuthFacade } from '../../../../../core/services/auth/auth.facade';
import { RedirectWhenAuthenticatedDirective } from '../../../../../shared/directives/auth-redirect.directive';
import { GlassCard } from '../../../../../shared/components/glass-card/glass-card/glass-card';
import { AuthFormField } from '../../../../../shared/components/auth-form-field/auth-form-field/auth-form-field';
import { AuthFormError } from '../../../../../shared/components/auth-form-error/auth-form-error/auth-form-error';
import { AuthSubmitButton } from '../../../../../shared/components/auth-submit-button/auth-submit-button/auth-submit-button';
import { AuthFooterLink } from '../../../../../shared/components/auth-footer-link/auth-footer-link/auth-footer-link';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    GlassCard,
    AuthFormField,
    AuthFormError,
    AuthSubmitButton,
    AuthFooterLink,
  ],
  templateUrl: './register-page.html',
  styleUrl: './register-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  hostDirectives: [RedirectWhenAuthenticatedDirective],
})
export class RegisterPage {
  private readonly formBuilder = inject(FormBuilder);
  protected readonly authFacade = inject(AuthFacade);

  protected readonly form = this.formBuilder.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    name: [''],
  });

  protected onSubmit(): void {
    if (this.form.invalid) return;

    const { email, password, name } = this.form.getRawValue();
    this.authFacade.register({ email, password, name });
  }
}
