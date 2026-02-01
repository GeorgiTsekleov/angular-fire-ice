import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Character } from '../../models/character.model';

@Injectable({ providedIn: 'root' })
export class CharacterApiService {
  private readonly http = inject(HttpClient);

  getCharacter(urlOrId: string): Observable<Character> {
    const id = urlOrId.includes('/') ? (urlOrId.split('/').pop() ?? urlOrId) : urlOrId;
    return this.http.get<Character>(`${environment.apiUrl}/${environment.charactersPath}/${id}`);
  }
}
