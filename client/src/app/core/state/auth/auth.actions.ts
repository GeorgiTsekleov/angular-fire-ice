import { createAction, props } from '@ngrx/store';
import { RegisterBody, UserDto } from '@angular-fire-ice/shared';

export const register = createAction('[Auth] Register', props<{ credentials: RegisterBody }>());

export const registerSuccess = createAction('[Auth] Register Success', props<{ user: UserDto }>());

export const registerFailure = createAction('[Auth] Register Failure', props<{ error: string }>());

export const checkAuth = createAction('[Auth] Check Auth');

export const checkAuthSuccess = createAction(
  '[Auth] Check Auth Success',
  props<{ user: UserDto | null }>(),
);

export const checkAuthFailure = createAction(
  '[Auth] Check Auth Failure',
  props<{ error: string }>(),
);

export const logout = createAction('[Auth] Logout');

export const logoutSuccess = createAction('[Auth] Logout Success');

export const logoutFailure = createAction('[Auth] Logout Failure', props<{ error: string }>());
