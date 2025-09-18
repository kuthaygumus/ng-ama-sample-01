import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, catchError, delay, switchMap, tap } from 'rxjs/operators';
import * as AuthActions from './auth.actions';
import { User } from '../../models/user.model';

@Injectable()
export class AuthEffects {

  constructor(
    private actions$: Actions,
    private router: Router
  ) {}

  // Mock login effect - simulates API call
  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.login),
      delay(1000), // Simulate network delay
      switchMap(({ credentials }) => {
        // Mock authentication logic
        if (credentials.email && credentials.password) {
          let mockUser: User;

          // Create different users based on email
          if (credentials.email === 'gold@amadeus.com') {
            mockUser = {
              id: '1',
              firstName: 'John',
              lastName: 'Gold',
              email: credentials.email,
              status: 'Gold',
              miles: 50000
            };
          } else if (credentials.email === 'silver@amadeus.com') {
            mockUser = {
              id: '2',
              firstName: 'Emma',
              lastName: 'Silver',
              email: credentials.email,
              status: 'Silver',
              miles: 25000
            };
          } else if (credentials.email === 'bronze@amadeus.com') {
            mockUser = {
              id: '3',
              firstName: 'Mark',
              lastName: 'Bronze',
              email: credentials.email,
              status: 'Bronze',
              miles: 10000
            };
          } else if (credentials.email === 'basic@amadeus.com') {
            mockUser = {
              id: '4',
              firstName: 'Sarah',
              lastName: 'Basic',
              email: credentials.email,
              status: 'Basic',
              miles: 2500
            };
          } else {
            // Default user for any other email
            mockUser = {
              id: '5',
              firstName: 'Guest',
              lastName: 'User',
              email: credentials.email,
              status: 'Basic',
              miles: 1000
            };
          }

          return of(AuthActions.loginSuccess({ user: mockUser }));
        } else {
          return of(AuthActions.loginFailure({ error: 'Invalid credentials' }));
        }
      }),
      catchError(error => of(AuthActions.loginFailure({ error: error.message })))
    )
  );

  // Navigate after successful login
  loginSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.loginSuccess),
      tap(() => {
        // Navigate to the dashboard page after successful login
        this.router.navigate(['/dashboard']);
      })
    ),
    { dispatch: false }
  );

  // Navigate after logout
  logout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.logout),
      tap(() => {
        // Navigate to the login page after logout
        this.router.navigate(['/login']);
      })
    ),
    { dispatch: false }
  );
}
