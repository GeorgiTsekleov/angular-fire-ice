import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../../environments/environment.development';

export interface WikipediaSummary {
  title: string;
  extract?: string;
  extract_html?: string;
  thumbnail?: { source: string; width: number; height: number };
}

@Injectable({ providedIn: 'root' })
export class WikipediaApiService {
  private readonly http = inject(HttpClient);
  private readonly cache = new Map<string, Observable<WikipediaSummary | null>>();

  getSummary(pageTitle: string | null | undefined): Observable<WikipediaSummary | null> {
    const slug = this.toSlug(pageTitle);
    if (!slug) return of(null);

    if (!this.cache.has(slug)) {
      this.cache.set(
        slug,
        this.http
          .get<WikipediaSummary>(`${environment.wikipediaApiUrl}/${encodeURIComponent(slug)}`)
          .pipe(catchError(() => of(null))),
      );
    }
    return this.cache.get(slug)!;
  }

  private toSlug(name: string | null | undefined): string {
    if (name == null || typeof name !== 'string') return '';
    return name.trim().replace(/\s+/g, '_');
  }
}
