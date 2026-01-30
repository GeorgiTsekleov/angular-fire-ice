import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse, RegisterBody, UserDto } from '@angular-fire-ice/shared';
import { environment } from '../../../../environments/environment.development';

@Injectable({ providedIn: 'root' })
export class AuthApiService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl =
    (environment as { serverApiUrl?: string }).serverApiUrl ?? 'http://localhost:8080';

  register(credentials: RegisterBody): Observable<ApiResponse<UserDto>> {
    return this.http.post<ApiResponse<UserDto>>(
      `${this.baseUrl}/${environment.authPath}/${environment.register}`,
      credentials,
      {
        withCredentials: true,
      },
    );
  }
  
  getMe(): Observable<ApiResponse<UserDto>> {
    return this.http.get<ApiResponse<UserDto>>(`${this.baseUrl}/${environment.authPath}/${environment.me}`, {
      withCredentials: true,
    });
  }
}
