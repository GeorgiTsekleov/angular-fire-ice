import { Component, computed, input } from '@angular/core';

@Component({
  selector: 'app-error-guard',
  imports: [],
  templateUrl: './error-guard.html',
  styleUrl: './error-guard.scss',
})
export class ErrorGuard {
  readonly errorInput = input<string | null>(null);
  protected readonly error = computed(() => this.errorInput());
}
