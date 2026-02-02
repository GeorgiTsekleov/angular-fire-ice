import { Component, input, output } from '@angular/core';
import { LucideAngularModule, Heart, ChevronDown } from 'lucide-angular';
import { BookCover } from '../../book-cover/book-cover/book-cover';

@Component({
  selector: 'app-content-card',
  standalone: true,
  imports: [LucideAngularModule, BookCover],
  templateUrl: './content-card.html',
  styleUrl: './content-card.scss',
})
export class ContentCardComponent {
  readonly title = input.required<string>();
  readonly subtitle = input<string>('');
  readonly description = input<string>('');
  readonly isbn = input<string>('');
  readonly imageUrl = input<string>('');
  readonly isFavorite = input<boolean>(false);
  readonly showActionButton = input<boolean>(false);
  readonly alt = input<string>('');

  readonly favoriteClick = output<void>();
  readonly actionClick = output<void>();
  readonly cardClick = output<void>();

  readonly heartIcon = Heart;
  readonly chevronIcon = ChevronDown;

  protected onFavoriteClick(event: Event): void {
    event.stopPropagation();
    this.favoriteClick.emit();
  }

  protected onActionClick(event: Event): void {
    event.stopPropagation();
    this.actionClick.emit();
  }

  protected onCardClick(): void {
    this.cardClick.emit();
  }
}
