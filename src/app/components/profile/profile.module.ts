import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ProfilePresenterComponent } from './presenter/profile-pres.component';
import { ProfileContainerComponent } from './container/profile-cont.component';

const routes: Routes = [
  { path: '', component: ProfileContainerComponent }
];

@NgModule({
  declarations: [
    ProfileContainerComponent,
    ProfilePresenterComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    ProfileContainerComponent,
    ProfilePresenterComponent
  ]
})
export class ProfileModule { }
