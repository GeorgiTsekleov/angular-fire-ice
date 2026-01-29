import { Component, computed, input } from '@angular/core';

@Component({
  selector: 'app-loading-guard',
  imports: [],
  templateUrl: './loading-guard.html',
  styleUrl: './loading-guard.scss',
})
export class LoadingGuard {
readonly loadingInput = input.required<boolean>();

protected readonly loading = computed(() => this.loadingInput());
}
