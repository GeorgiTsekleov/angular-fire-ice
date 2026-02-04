import { Component, Input } from '@angular/core';

type JustifyContent = 'start' | 'center' | 'end';

@Component({
  selector: 'app-horizontal-scroll-container',
  standalone: true,
  template: `<div class="horizontal-scroll">
    <ul [class]="justifyContent">
      <ng-content></ng-content>
    </ul>
  </div>`,
  styleUrl: './horizontal-scroll-container.scss',
})
export class HorizontalScrollContainer {
  @Input() justifyContent: JustifyContent = 'start';
}
