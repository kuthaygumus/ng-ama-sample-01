// This module is disabled to avoid component declaration conflicts
// Components are now declared in AppModule

/*
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileContainerComponent } from './profile-cont.component';
import { ProfilePresenterComponent } from '../presenter/profile-pres.component';
import { UpperCasePipe, SlicePipe } from '@angular/common';

@NgModule({
  declarations: [
    ProfileContainerComponent,
    ProfilePresenterComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ProfileContainerComponent
  ]
})
export class ProfileContainerModule { }
*/

// Dummy module to avoid import errors
import { NgModule } from '@angular/core';
@NgModule({})
export class ProfileContainerModule { }
