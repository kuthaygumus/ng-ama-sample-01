import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subject, of } from 'rxjs';
import { takeUntil, take, map } from 'rxjs/operators';
import { AuthService } from '../../../services/auth.service';
import { AppState } from '../../../store/app.state';
import * as AuthActions from '../../../store/auth/auth.actions';
import { ProfileContainerData, DetailedProfileData, PaymentMethod } from '../models/profile.model';

@Component({
  selector: 'app-profile-container',
  templateUrl: './profile-cont.template.html'
})
export class ProfileContainerComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  containerData$: Observable<ProfileContainerData>;
  detailedProfileData$: Observable<DetailedProfileData | null> = of(null);

  isDetailedView = false;

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
    private route: ActivatedRoute,
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
    // Check if we're in detailed view by checking the route
    this.route.url.pipe(
      takeUntil(this.destroy$)
    ).subscribe(segments => {
      this.isDetailedView = segments.length > 0 && segments[0].path === 'details';
      console.log('URL segments:', segments.map(seg => seg.path), 'isDetailedView:', this.isDetailedView);

      // If we're in detailed view, make sure to load the detailed data
      if (this.isDetailedView) {
        this.loadDetailedProfileData();
      }
    });

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

  loadDetailedProfileData(): void {
    // Mock data for detailed profile view
    console.log('Loading detailed profile data');
    this.detailedProfileData$ = this.containerData$.pipe(
      map(basicProfile => {
        if (!basicProfile) {
          console.log('No basic profile data available');
          return null;
        }

        console.log('Creating detailed profile from basic profile:', basicProfile);

        // Örnek kredi kartı verileri
        const mockPaymentMethods: PaymentMethod[] = [
          {
            id: '1',
            type: 'credit',
            cardNumber: '4532111122223333',
            cardHolder: basicProfile.fullName,
            expiryDate: '12/25',
            isDefault: true
          },
          {
            id: '2',
            type: 'debit',
            cardNumber: '5412751234567890',
            cardHolder: basicProfile.fullName,
            expiryDate: '09/26',
            isDefault: false
          }
        ];

        // Detaylı profil verisi dönüşümü
        const detailedProfile: DetailedProfileData = {
          ...basicProfile,
          phoneNumber: '+1 (555) 123-4567',
          birthDate: new Date(1985, 6, 15),
          nationality: 'United States',
          passportNumber: 'US123456789',
          passportExpiry: new Date(2028, 5, 30),

          address: {
            street: '123 Main Street, Apt 4B',
            city: 'New York',
            state: 'NY',
            zipCode: '10001',
            country: 'United States'
          },

          paymentMethods: mockPaymentMethods,

          memberSince: new Date(2015, 2, 10),
          statusExpiryDate: new Date(2025, 11, 31),
          statusProgress: basicProfile.status === 'Gold' ? 100 : (basicProfile.status === 'Silver' ? 70 : 40),
          nextStatus: basicProfile.status === 'Gold' ? undefined : (basicProfile.status === 'Silver' ? 'Gold' : 'Silver'),
          milesNeededForNextStatus: basicProfile.status === 'Gold' ? 0 : (basicProfile.status === 'Silver' ? 30000 : 15000),

          milesEarnedThisYear: 24500,
          milesSpentThisYear: 18000,
          milesExpiringThisYear: 5000,

          preferences: {
            seatType: 'window',
            mealPreference: 'Vegetarian',
            specialAssistance: false
          }
        };

        console.log('Returning detailed profile:', detailedProfile);
        return detailedProfile;
      })
    );
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
