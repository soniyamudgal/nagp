import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { CustomMaterialModule } from  '../material.module';

import { OnboardFormComponent } from './onboard-form/onboard-form.component';
import { ConfirmDeleteComponent } from './confirm-delete/confirm-delete.component';
import { AuthGuard } from '../authentication/auth.guard';

@NgModule({
  declarations: [
    OnboardFormComponent, 
    ConfirmDeleteComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CustomMaterialModule,
    RouterModule.forChild([
      { path: 'onboarding/:action/:id', component: OnboardFormComponent, canActivate:[AuthGuard]  }
    ])
  ],
  exports: [
    OnboardFormComponent
  ]
})
export class OperationsModule { }
