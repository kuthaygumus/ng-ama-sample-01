import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginContainerComponent } from './components/login/container/login-cont.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'login', component: LoginContainerComponent },
  {
    path: 'profile',
    loadChildren: () => import('./components/profile/profile.module').then(m => m.ProfileModule)
  },
  // Dashboard component - content is shown in app.component.html conditionally
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'flight-history',
    loadChildren: () => import('./features/flight-history/flight-history.module').then(m => m.FlightHistoryModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'mile-tracker',
    loadChildren: () => import('./features/mile-tracker/mile-tracker.module').then(m => m.MileTrackerModule),
    canActivate: [AuthGuard]
  },
  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
