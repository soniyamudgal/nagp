import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthenticationModule } from './authentication/authentication.module';
import { HomeModule } from './home/home.module';

import { AppComponent } from './app.component';
import { LoginComponent } from './authentication/login/login.component';
import { LogoutComponent } from './authentication/logout/logout.component';
import { InvalidPageComponent } from './invalid-page/invalid-page.component';
import { OnboardFormComponent } from './operations/onboard-form/onboard-form.component';
import { AllStudentsComponent } from './list-students/all-students/all-students.component';
import { AuthGuard } from './authentication/auth.guard';
import { RegistratonComponent } from './authentication/registraton/registraton.component';

const routes: Routes = [
  { path: 'register', component: RegistratonComponent },
  { path: 'login', component: LoginComponent },
  { path: 'logout', component: LogoutComponent, canActivate:[AuthGuard]},
  { path: 'default', component: AllStudentsComponent, canActivate:[AuthGuard] },
  { path: 'onboarding', component: OnboardFormComponent, canActivate:[AuthGuard] },
  { path: '', pathMatch: 'full', redirectTo: 'default', canActivate:[AuthGuard] },
  { path: '**', component: InvalidPageComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    AuthenticationModule,
    HomeModule
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
