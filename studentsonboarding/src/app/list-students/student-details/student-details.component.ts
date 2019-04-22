import { Component, OnInit, Input } from '@angular/core';
import { ConfirmDeleteComponent } from '../../operations/confirm-delete/confirm-delete.component';

import { Router } from '@angular/router';

import { MatDialog, MatDialogRef } from '@angular/material';
import { Student } from 'src/model/student';
import { StudentsCRUDService } from 'src/services/students-crud.service';

@Component({
  selector: 'app-student-details',
  templateUrl: './student-details.component.html',
  styleUrls: ['./student-details.component.css']
})

export class StudentDetailsComponent implements OnInit {
  @Input() student: Student;
  
  //Angular material dialog for delete confirmation
  confirmDeleteDialogRef: MatDialogRef<ConfirmDeleteComponent>;

  //property for setting color based on category
  backgroundColor: string = '';
  
  constructor(
    private dialog: MatDialog,
    private studentService: StudentsCRUDService,
    private router: Router
  ) { }

  ngOnInit() {
    //set color property according to category
    this.backgroundColor = this.student.category.toLowerCase() === 'indian' ? 'orange' : 'blue';
  }

  //opens delete confirmation dialog 
  confirmDeleteDialog(id:number) {
    this.confirmDeleteDialogRef = this.dialog.open(ConfirmDeleteComponent, {
      data: {
        id
      }
    })
  }

  //redirects to view or edit page as required
  navigateReqPage(url, id){
    this.router.navigateByUrl(`${url}/${id}`).then();
  }
}
