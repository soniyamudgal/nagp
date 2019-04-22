import { Component, OnInit } from '@angular/core';
import { StudentsCRUDService } from 'src/services/students-crud.service';
import { AuthService } from 'src/services/auth.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(
    private studentService: StudentsCRUDService,
    private authService: AuthService) {
    this.studentService.changeSelectedTopNav(false);
  }

  ngOnInit() {
    //removes page header
    this.studentService.changeSelectedTopNav(false);
    
    //logout user
    this.authService.removeUser();
  }

}
