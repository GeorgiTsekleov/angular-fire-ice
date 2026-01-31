import { Component, computed, inject, signal, DestroyRef } from '@angular/core';
import { CharactersCard } from '../../../../../shared/components/characters/character-card/characters-card';
import { BooksFacade } from '../../../../../core/services/books.facade';
import { routeParam } from '../../../../../core/utils/route-param.util';
import { CharacterApiService } from '../../../../../core/services/api/character-api.service';
import { Character } from '../../../../../core/models/character.model';
import { HttpErrorResponse } from '@angular/common/http';
import { LoadingGuard } from '../../../../../shared/components/guards/loading/loading-guard';
import { ErrorGuard } from '../../../../../shared/components/guards/error/error-guard/error-guard';

@Component({
  selector: 'app-characters-list',
  imports: [CharactersCard, LoadingGuard, ErrorGuard],
  templateUrl: './characters-list.html',
  styleUrl: './characters-list.scss',
})
export class CharactersList {
  private readonly destroyRef = inject(DestroyRef);
  protected readonly booksFacade = inject(BooksFacade);
  private readonly characterApi = inject(CharacterApiService);

  protected readonly bookId = routeParam('id');
  protected readonly book = computed(() => this.booksFacade.getBookByUrl(this.bookId()));
  protected readonly characterUrls = computed(() => this.book()?.characters.slice(0, 6) ?? []);
  protected readonly charactersList = signal<Character[]>([]);
  protected readonly loading = signal(false);
  protected readonly error = signal<string | null>(null);

  ngOnInit(): void {
    const urls = this.characterUrls();
    if (urls.length === 0) {
      this.charactersList.set([]);
      return;
    }

    this.loading.set(true);
    this.error.set(null);

    urls.forEach((url) => {
      this.characterApi.getCharacter(url).subscribe({
        next: (character: Character) => {
          this.charactersList.set([...this.charactersList(), character]);
        },
        error: (err: HttpErrorResponse) => {
          this.error.set(err?.message ?? 'Failed to load characters');
        },
        complete: () => {
          this.loading.set(false);
          console.log('Characters list =>>> ', this.charactersList());
        },
      });
    });

    this.loading.set(false);
  }
}
