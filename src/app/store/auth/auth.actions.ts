import { createAction, props } from '@ngrx/store';
import { User, LoginRequest } from '../../models/user.model';

// Auth Actions
export const login = createAction(
  '[Auth] Login',
  props<{ credentials: LoginRequest }>()
);

export const loginSuccess = createAction(
  '[Auth] Login Success',
  props<{ user: User }>()
);

export const loginFailure = createAction(
  '[Auth] Login Failure',
  props<{ error: string }>()
);

export const logout = createAction(
  '[Auth] Logout'
);

export const clearError = createAction(
  '[Auth] Clear Error'
);
