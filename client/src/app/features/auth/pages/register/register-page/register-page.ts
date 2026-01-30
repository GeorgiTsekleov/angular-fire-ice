import { Component, ChangeDetectionStrategy, inject, signal, effect } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthFacade } from '../../../../../core/services/auth/auth.facade';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './register-page.html',
  styleUrl: './register-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterPage {
  private readonly formBuilder = inject(FormBuilder);
  private readonly router = inject(Router);
  protected readonly authFacade = inject(AuthFacade);

  protected readonly form = this.formBuilder.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    name: [''],
  });

  constructor() {
    effect(() => {
      const status = this.authFacade.status();
      if (status === 'loaded') {
        this.router.navigate(['/']);
        alert('Registration successful');
      }
    });
  }

  protected onSubmit(): void {
    if (this.form.invalid) return;

    const { email, password, name } = this.form.getRawValue();
    this.authFacade.register({ email, password, name });
  }
}
