// This module is disabled to avoid component declaration conflicts
// Components are now declared in AppModule

/*
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginContainerComponent } from './login-cont.component';
import { LoginPresenterComponent } from '../presenter/login-pres.component';

@NgModule({
  declarations: [
    LoginContainerComponent,
    LoginPresenterComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [
    LoginContainerComponent
  ]
})
export class LoginContainerModule { }
*/

// Dummy module to avoid import errors
import { NgModule } from '@angular/core';
@NgModule({})
export class LoginContainerModule { }
