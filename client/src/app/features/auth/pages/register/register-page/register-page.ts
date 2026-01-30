import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthFacade } from '../../../../../core/services/auth/auth.facade';
import { RedirectWhenAuthenticatedDirective } from '../../../../../shared/directives/auth-redirect.directive';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
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
