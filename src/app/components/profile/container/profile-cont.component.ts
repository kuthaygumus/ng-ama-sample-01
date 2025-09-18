import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { takeUntil, take } from 'rxjs/operators';
import { AuthService } from '../../../services/auth.service';
import { AppState } from '../../../store/app.state';
import * as AuthActions from '../../../store/auth/auth.actions';
import { ProfileContainerData } from '../models/profile.model';

@Component({
  selector: 'app-profile-container',
  templateUrl: './profile-cont.template.html'
})
export class ProfileContainerComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  containerData$: Observable<ProfileContainerData>;

  profileData: ProfileContainerData = {
    fullName: '',
    email: '',
    status: '',
    miles: 0,
    isAuthenticated: false
  };

  constructor(
    private authService: AuthService,
    private router: Router,
    private store: Store<AppState>
  ) {
    // Get user data from the store instead of local observable
    this.containerData$ = this.store.select(state => {
      const user = state.auth.user;
      if (user) {
        return {
          fullName: `${user.firstName} ${user.lastName}`,
          email: user.email,
          status: user.status || 'Basic',
          miles: user.miles || 0,
          isAuthenticated: true
        };
      } else {
        // No user in store, try getting from auth service
        const serviceUser = this.authService.getCurrentUser();
        if (serviceUser) {
          return {
            fullName: `${serviceUser.firstName} ${serviceUser.lastName}`,
            email: serviceUser.email,
            status: 'Basic', // Default value
            miles: 0,
            isAuthenticated: true
          };
        }
        return this.profileData;
      }
    });
  }

  ngOnInit(): void {
    this.loadProfileData();
  }

  loadProfileData(): void {
    // Check if user is authenticated via store
    this.store.select(state => state.auth.isAuthenticated).pipe(
      takeUntil(this.destroy$),
      take(1)
    ).subscribe(isAuthenticated => {
      if (!isAuthenticated) {
        // No user in store, navigate to login
        this.router.navigate(['/login']);
      }
    });
  }

  onLogout(): void {
    // Using NgRx store action instead of direct service call
    // This will also trigger navigation via effect
    this.store.dispatch(AuthActions.logout());
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
