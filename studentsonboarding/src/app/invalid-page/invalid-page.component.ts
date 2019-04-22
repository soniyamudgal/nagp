import { Component, OnInit } from '@angular/core';
import { StudentsCRUDService } from 'src/services/students-crud.service';

@Component({
  selector: 'app-invalid-page',
  templateUrl: './invalid-page.component.html',
  styleUrls: ['./invalid-page.component.css']
})
export class InvalidPageComponent implements OnInit {

  constructor(private studentService: StudentsCRUDService) { }

  ngOnInit() {
    //removes page header
    this.studentService.changeSelectedTopNav(false);
  }

}
