import { Component, computed, input } from '@angular/core';
type LoaderSize = 'sm' | 'md' | 'lg';

@Component({
  selector: 'app-loader',
  standalone: true,
  template: `
    <div
      [class]="
        'inline-block rounded-full border-4 border-solid border-current border-e-transparent animate-spin mx-20 ' +
        sizeClass()
      "
      role="status"
      aria-label="Loading"
    ></div>
  `,
})
export class Loader {
  size = input<LoaderSize>('md');

  protected sizeClass = computed(() => {
    const s = this.size();
    return s === 'sm' ? 'h-5 w-5' : s === 'lg' ? 'h-12 w-12' : 'h-8 w-8';
  });
}
