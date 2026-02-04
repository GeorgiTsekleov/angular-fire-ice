import { Component, input } from '@angular/core';

@Component({
  selector: 'app-auth-form-error',
  standalone: true,
  imports: [],
  templateUrl: './auth-form-error.html',
  styleUrl: './auth-form-error.scss',
})
export class AuthFormError {
  readonly message = input<string | null | undefined>(null);
}
