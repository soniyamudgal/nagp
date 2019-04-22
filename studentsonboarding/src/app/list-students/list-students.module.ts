import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { CustomMaterialModule } from  '../material.module';

import { SearchPipe } from '../pipes/search.pipe';
import { FilterPipe } from '../pipes/filter.pipe';

import { StudentDetailsComponent } from './student-details/student-details.component';
import { AllStudentsComponent } from './all-students/all-students.component';

@NgModule({
  declarations: [
    StudentDetailsComponent, 
    AllStudentsComponent, 
    SearchPipe, 
    FilterPipe
  ],
  imports: [
    CommonModule,
    CustomMaterialModule,
    FormsModule
  ],
  exports:[AllStudentsComponent]
})
export class ListStudentsModule { }
