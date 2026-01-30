import { createReducer, on } from '@ngrx/store';
import { initialAuthState } from './auth.state';
import {
  register,
  registerSuccess,
  registerFailure,
  checkAuthFailure,
  checkAuth,
  checkAuthSuccess,
} from './auth.actions';

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
  on(checkAuth, (state) => ({
    ...state,
    status: 'loading',
    error: null,
  })),
  on(checkAuthSuccess, (state, { user }) => ({
    ...state,
    user,
    status: 'loaded',
    error: null,
  })),
  on(checkAuthFailure, (state, { error }) => ({
    ...state,
    status: 'error',
    error,
  })),
);
