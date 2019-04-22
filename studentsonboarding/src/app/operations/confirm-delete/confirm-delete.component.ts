import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormBuilder } from '@angular/forms';

import { StudentsCRUDService } from 'src/services/students-crud.service';

@Component({
  selector: 'app-confirm-delete',
  templateUrl: './confirm-delete.component.html',
  styleUrls: ['./confirm-delete.component.css']
})
export class ConfirmDeleteComponent implements OnInit {

  form: FormGroup;
  
  constructor(
    private formBuilder: FormBuilder, 
    private dialogRef: MatDialogRef<ConfirmDeleteComponent>,
    public studentService: StudentsCRUDService,
    @Inject(MAT_DIALOG_DATA) private data
  ) { }

  ngOnInit() {
    //sets id of student to be deleted
    this.form = this.formBuilder.group({
      id: this.data.id
    })
  }


  submit() {
    //deletes the student details and clear dialog reference
    this.studentService.removeStudent(this.form.value.id);
    this.dialogRef.close();
    this.dialogRef = null;
  }
}
