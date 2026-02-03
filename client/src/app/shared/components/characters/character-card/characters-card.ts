import { Component, effect, inject, input, signal } from '@angular/core';
import { Router } from '@angular/router';
import {
  WikipediaApiService,
  WikipediaSummary,
} from '../../../../core/services/api/wikipedia-api.service';
import { environment } from '../../../../../environments/environment.development';
import { Loader } from '../../loader/loader';

@Component({
  selector: 'app-characters-card',
  imports: [Loader],
  templateUrl: './character-card.html',
  styleUrl: './character-card.scss',
})
export class CharactersCard {
  characterName = input.required<string | undefined>();
  characterId = input<string>();
  bookId = input<string>();

  showExtract = input<boolean>(false);

  private wiki = inject(WikipediaApiService);
  private router = inject(Router);

  protected summary = signal<WikipediaSummary | null>(null);
  protected loading = signal(true);

  constructor() {
    effect(() => {
      const characterName = this.characterName();
      if (!characterName) {
        this.summary.set(null);
        this.loading.set(false);
        return;
      }
      this.loading.set(true);
      this.wiki.getSummary(characterName).subscribe({
        next: (data) => {
          this.summary.set(data);
          this.loading.set(false);
        },
        error: () => this.loading.set(false),
      });
    });
  }

  protected onSelect(): void {
    const characterId = this.characterId();
    const bookId = this.bookId();
    if (characterId && bookId) {
      this.router.navigate([
        `${environment.booksPath}`,
        bookId,
        environment.charactersPath,
        characterId,
      ]);
    }
  }
}
