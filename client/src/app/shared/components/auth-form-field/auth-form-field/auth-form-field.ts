import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Component, input } from '@angular/core';

@Component({
  selector: 'app-auth-form-field',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './auth-form-field.html',
  styleUrl: './auth-form-field.scss',
})
export class AuthFormField {
  readonly label = input.required<string>();
  readonly controlName = input.required<string>();
  readonly control = input.required<FormControl<string>>();
  readonly type = input<string>('text');
  readonly placeholder = input<string>('');
  readonly autocomplete = input<string>('off');
  readonly errorMessage = input<string>('');
}
