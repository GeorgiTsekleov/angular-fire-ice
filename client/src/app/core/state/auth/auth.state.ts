import { UserDto } from '@angular-fire-ice/shared';

export type AuthStatus = 'idle' | 'loading' | 'loaded' | 'error';

export interface AuthState {
  user: UserDto | null;
  status: AuthStatus;
  error: string | null;
}

export const initialAuthState: AuthState = {
  user: null,
  status: 'idle',
  error: null,
};
