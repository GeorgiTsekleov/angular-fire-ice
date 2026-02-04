import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-auth-footer-link',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './auth-footer-link.html',
  styleUrl: './auth-footer-link.scss',
})
export class AuthFooterLink {
  readonly text = input.required<string>();
  readonly linkText = input.required<string>();
  readonly link = input.required<string>();
}
