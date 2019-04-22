import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/services/auth.service';

@Component({
  selector: 'app-topnav',
  templateUrl: './topnav.component.html',
  styleUrls: ['./topnav.component.css']
})
export class TopnavComponent implements OnInit {

  username: string = '';
  constructor(private authService: AuthService) { }

  ngOnInit() {
    //get user name of logged in user
    this.username = this.authService.getCurrentUser();
  }

}
