import { Component, OnInit } from '@angular/core';
import { StudentsCRUDService } from 'src/services/students-crud.service';

@Component({
  selector: 'app-tabview',
  templateUrl: './tabview.component.html',
  styleUrls: ['./tabview.component.css']
})
export class TabviewComponent implements OnInit {

  constructor(private studentService: StudentsCRUDService) { }

  ngOnInit() {
    //show page header
    this.studentService.changeSelectedTopNav(true);
  }

}
