import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { CustomMaterialModule } from  '../material.module';

import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { RegistratonComponent } from './registraton/registraton.component';

@NgModule({
  declarations: [
    LoginComponent, 
    LogoutComponent, 
    RegistratonComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    CustomMaterialModule,
    RouterModule
  ]
})
export class AuthenticationModule { }
