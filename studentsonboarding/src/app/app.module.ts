import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CustomMaterialModule } from  './material.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InvalidPageComponent } from './invalid-page/invalid-page.component';

import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { ConfirmDeleteComponent } from './operations/confirm-delete/confirm-delete.component';

import { HttpClientModule } from '@angular/common/http';

import { HomescreenModule } from './homescreen/homescreen.module';
import { OperationsModule } from './operations/operations.module';
import { AuthGuard } from './authentication/auth.guard';

@NgModule({
  declarations: [
    AppComponent,
    InvalidPageComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    CustomMaterialModule,
    FlexLayoutModule,
    HttpClientModule,
    HomescreenModule,
    OperationsModule,
    AppRoutingModule
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent],
  entryComponents: [ConfirmDeleteComponent]
})
export class AppModule { }
