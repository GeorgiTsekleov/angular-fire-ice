import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Book } from '../models';
import { environment } from '../../../environments/environment.development';

@Injectable({ providedIn: 'root' })
export class IceAndFireApiService {
  private http = inject(HttpClient);

  getAllBooks(page = 1, pageSize = 10): Observable<Book[]> {
    const params = { page: String(page), pageSize: String(pageSize) };
    const baseUrl = environment.apiUrl;
    const booksPath = environment.booksPath;

    if (!baseUrl || !booksPath) {
      throw new Error('Environment variables are not set');
    }

    const url = `${baseUrl}/${booksPath}`;
    return this.http.get<Book[]>(url, { params });
  }
}
