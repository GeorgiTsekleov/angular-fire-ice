import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';

export interface FavoritesApiResponse {
  favoriteBookIds: string[];
}

@Injectable({ providedIn: 'root' })
export class FavoritesApiService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl =
    (environment as { serverApiUrl?: string }).serverApiUrl ?? 'http://localhost:8080';
  private readonly favoritesPath =
    (environment as { favoritesPath?: string }).favoritesPath ?? 'api/favorites';

  private get url(): string {
    return `${this.baseUrl}/${this.favoritesPath}`;
  }

  getFavorites(): Observable<FavoritesApiResponse> {
    return this.http.get<FavoritesApiResponse>(this.url);
  }

  addFavorite(bookId: string): Observable<FavoritesApiResponse> {
    return this.http.post<FavoritesApiResponse>(this.url, { bookId });
  }

  removeFavorite(bookId: string): Observable<FavoritesApiResponse> {
    return this.http.delete<FavoritesApiResponse>(`${this.url}/${encodeURIComponent(bookId)}`);
  }
}
