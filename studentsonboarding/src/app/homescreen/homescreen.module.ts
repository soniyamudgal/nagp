import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';

import { CustomMaterialModule } from  '../material.module';

import { ListStudentsModule } from '../list-students/list-students.module';

import { TopnavComponent } from './topnav/topnav.component';
import { TabviewComponent } from './tabview/tabview.component';


@NgModule({
  declarations: [
    TopnavComponent,
    TabviewComponent
  ],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    CustomMaterialModule,
    FlexLayoutModule,
    ListStudentsModule,
    RouterModule
  ],
  exports: [
    TopnavComponent,
    TabviewComponent
  ]
})
export class HomescreenModule { }
