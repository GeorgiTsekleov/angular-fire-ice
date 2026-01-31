// client/src/app/core/services/api/open-library-api.service.ts

import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';

export type CoverQuality = 'S' | 'M' | 'L';

@Injectable({ providedIn: 'root' })
export class OpenLibraryApiService {
  getCoverUrl(isbn: string, quality: CoverQuality = 'L'): string {
    return `${environment.coverLibraryApiUrl}/${isbn}-${quality}.${environment.imageFailFormat}`;
  }
}
