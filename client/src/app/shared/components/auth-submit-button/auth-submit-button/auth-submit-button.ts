import { Component, input } from '@angular/core';

@Component({
  selector: 'app-auth-submit-button',
  standalone: true,
  imports: [],
  templateUrl: './auth-submit-button.html',
  styleUrl: './auth-submit-button.scss',
})
export class AuthSubmitButton {
  readonly label = input.required<string>();
  readonly loadingLabel = input.required<string>();
  readonly loading = input<boolean>(false);
  readonly disabled = input<boolean>(false);
}
