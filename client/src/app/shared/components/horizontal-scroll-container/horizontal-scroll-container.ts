import { Component } from '@angular/core';

@Component({
  selector: 'app-horizontal-scroll-container',
  standalone: true,
  template: `<div class="horizontal-scroll"><ng-content></ng-content></div>`,
  styleUrl: './horizontal-scroll-container.scss',
})
export class HorizontalScrollContainer {}
