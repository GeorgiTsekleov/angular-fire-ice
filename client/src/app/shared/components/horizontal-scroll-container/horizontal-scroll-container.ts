import { Component } from '@angular/core';

@Component({
  selector: 'app-horizontal-scroll-container',
  standalone: true,
  template: `<div class="horizontal-scroll">
    <ul>
      <ng-content></ng-content>
    </ul>
  </div>`,
  styleUrl: './horizontal-scroll-container.scss',
})
export class HorizontalScrollContainer {}
