import { Component, input } from '@angular/core';

@Component({
  selector: 'app-content-card-meta',
  imports: [],
  templateUrl: './content-card-meta.html',
  styleUrl: './content-card-meta.scss',
})
export class ContentCardMeta {
  readonly row = input.required<{ label: string; value: string | null | undefined }>();
}
