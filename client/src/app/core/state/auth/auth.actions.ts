import { createAction, props } from '@ngrx/store';
import { RegisterBody, UserDto } from '@angular-fire-ice/shared';

export const register = createAction('[Auth] Register', props<{ credentials: RegisterBody }>());

export const registerSuccess = createAction('[Auth] Register Success', props<{ user: UserDto }>());

export const registerFailure = createAction('[Auth] Register Failure', props<{ error: string }>());
