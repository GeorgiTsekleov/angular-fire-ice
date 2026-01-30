import { createReducer, on } from '@ngrx/store';
import { initialAuthState } from './auth.state';
import { register, registerSuccess, registerFailure } from './auth.actions';

export const authReducer = createReducer(
  initialAuthState,
  on(register, (state) => ({
    ...state,
    status: 'loading',
    error: null,
  })),
  on(registerSuccess, (state, { user }) => ({
    ...state,
    user,
    status: 'loaded',
    error: null,
  })),
  on(registerFailure, (state, { error }) => ({
    ...state,
    status: 'error',
    error,
  })),
);
