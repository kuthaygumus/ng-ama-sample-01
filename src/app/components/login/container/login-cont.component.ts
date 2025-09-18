import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { AppState } from '../../../store/app.state';
import { LoginRequest } from '../../../models/user.model';
import { LoginContainerData } from '../models/login.model';
import * as AuthActions from '../../../store/auth/auth.actions';
import { selectIsLoading, selectAuthError, selectIsAuthenticated } from '../../../store/auth/auth.selectors';

@Component({
  selector: 'app-login-container',
  templateUrl: './login-cont.template.html'
})
export class LoginContainerComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();

  containerData$: Observable<LoginContainerData>;

  constructor(private store: Store<AppState>) {
    this.containerData$ = this.store.select(state => ({
      isLoading: selectIsLoading(state),
      error: selectAuthError(state),
      isAuthenticated: selectIsAuthenticated(state)
    }));
  }

  ngOnInit(): void {
    this.store.dispatch(AuthActions.clearError());
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onLogin(credentials: LoginRequest): void {
    this.store.dispatch(AuthActions.login({ credentials }));
  }
}
