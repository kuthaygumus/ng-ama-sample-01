import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { ProfilePresenterComponent } from './presenter/profile-pres.component';
import { ProfileDetailPresenterComponent } from './presenter/profile-detail-pres.component';
import { ProfileContainerComponent } from './container/profile-cont.component';

const routes: Routes = [
  { path: '', redirectTo: 'details', pathMatch: 'full' },
  { path: 'details', component: ProfileContainerComponent }
];

@NgModule({
  declarations: [
    ProfileContainerComponent,
    ProfilePresenterComponent,
    ProfileDetailPresenterComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatIconModule,
    MatTabsModule,
    MatProgressBarModule,
    MatCardModule,
    MatButtonModule,
    MatDividerModule
  ],
  exports: [
    ProfileContainerComponent,
    ProfilePresenterComponent,
    ProfileDetailPresenterComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ProfileModule { }
