import { Component, OnInit } from '@angular/core';
import { StudentsCRUDService } from 'src/services/students-crud.service';
import { SearchPipe } from '../../pipes/search.pipe';
import { Categories } from 'src/model/categories';

@Component({
  selector: 'app-all-students',
  templateUrl: './all-students.component.html',
  styleUrls: ['./all-students.component.css']
})

export class AllStudentsComponent implements OnInit {
  
  //property for setting category filter 
  selectedCategory: string = 'all';

  //available filter categories
  categories: Categories[] = [
    {value: 'all', viewValue: 'All'},
    {value: 'indian', viewValue: 'Indian'},
    {value: 'international', viewValue: 'International'}
  ];

  constructor(public studentService: StudentsCRUDService) {
    //get all students
    this.studentService.fetchStudents(); 
  }

  ngOnInit() {
    //shows page header
    this.studentService.changeSelectedTopNav(true);
  }
  
}
