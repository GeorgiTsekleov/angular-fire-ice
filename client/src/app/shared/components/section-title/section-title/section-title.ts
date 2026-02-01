import { Component, input } from '@angular/core';

@Component({
  selector: 'app-section-title',
  standalone: true,
  templateUrl: './section-title.html',
  styleUrl: './section-title.scss',
})
export class SectionTitle {
  headingId = input.required<string>();
}
