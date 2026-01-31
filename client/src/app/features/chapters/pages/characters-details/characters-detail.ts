import { Component, inject, signal } from '@angular/core';
import { CharactersCard } from '../../../../shared/components/characters/character-card/characters-card';

import { routeParam } from '../../../../core/utils/route-param.util';
import { CharacterApiService } from '../../../../core/services/api/character-api.service';
import { Character } from '../../../../core/models/character.model';
import { ErrorGuard } from '../../../../shared/components/guards/error/error-guard/error-guard';
import { LoadingGuard } from '../../../../shared/components/guards/loading/loading-guard';

@Component({
  selector: 'app-characters-detail',
  imports: [CharactersCard, LoadingGuard, ErrorGuard],
  templateUrl: './characters-detail.html',
  styleUrl: './characters-detail.scss',
})
export class CharactersDetail {
  private readonly characterApi = inject(CharacterApiService);

  protected readonly bookId = routeParam('id');
  protected readonly characterId = routeParam('characterId');
  protected readonly character = signal<Character | null>(null);

  protected readonly loading = signal(false);
  protected readonly error = signal<string | null>(null);

  ngOnInit(): void {
    const id = this.characterId();
    if (id) {
      this.loading.set(true);
      this.error.set(null);
      this.characterApi.getCharacter(id).subscribe({
        next: (character: Character) => {
          this.character.set(character);
          this.loading.set(false);
        },
        error: (error) => {
          this.error.set(error.message);
          this.loading.set(false);
        },
        complete: () => {
          this.loading.set(false);
        },
      });
    }
    this.loading.set(false);
  }
}
