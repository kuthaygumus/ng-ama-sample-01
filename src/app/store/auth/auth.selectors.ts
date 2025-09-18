import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from '../../models/user.model';

export const selectAuthState = createFeatureSelector<AuthState>('auth');

export const selectUser = createSelector(
  selectAuthState,
  (state: AuthState) => state.user
);

export const selectIsAuthenticated = createSelector(
  selectAuthState,
  (state: AuthState) => state.isAuthenticated
);

export const selectIsLoading = createSelector(
  selectAuthState,
  (state: AuthState) => state.isLoading
);

export const selectAuthError = createSelector(
  selectAuthState,
  (state: AuthState) => state.error
);

export const selectUserFullName = createSelector(
  selectUser,
  (user) => user ? `${user.firstName} ${user.lastName}` : ''
);

export const selectUserStatus = createSelector(
  selectUser,
  (user) => user?.status || 'Basic'
);

export const selectUserMiles = createSelector(
  selectUser,
  (user) => user?.miles || 0
);
