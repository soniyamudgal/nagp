import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/services/auth.service';
import { StudentsCRUDService } from 'src/services/students-crud.service';
import { User } from 'src/model/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  getUserFromService: User;
  username: string;
  password: string;
  messageToDisplay: string;
  
  constructor(
    private studentService: StudentsCRUDService,
    private authService: AuthService,
    private router:Router
  ) { }

  ngOnInit() {
    //if user is already logged in take to default page other opens login page
    const currentUser = this.authService.getCurrentUser();
    if (currentUser) {
      this.router.navigateByUrl('/default');
    }
    else{
      //removes page header
      this.studentService.changeSelectedTopNav(false);
      //fetch users
      this.authService.getAllUsers();
    }
  }

  //initializes form
  loginForm: FormGroup = new FormGroup({
    username: new FormControl('',[Validators.required,Validators.minLength(4),Validators.maxLength(15)]),
    password: new FormControl('',[Validators.required,Validators.minLength(8),Validators.maxLength(15)])
  });

  //when user submit login form
  submit() {
    if (this.loginForm.valid) {
      this.messageToDisplay ='';
      this.authenticateUser();
    }
  }

  //authentication of login credentials
  authenticateUser()
  {
    let userNameFromForm = this.loginForm.value.username;
    let passwordFromForm = this.loginForm.value.password;

    if (userNameFromForm === null || passwordFromForm == null) {
      this.messageToDisplay = "UserID or Password Cannot be Blank"
    } 
    else {
      this.authService.getUserDetails(userNameFromForm).subscribe((userFromService:User) => {
        if (userFromService[0] && userFromService[0].id) {
          this.password = userFromService[0].password;
          if(this.password == passwordFromForm) {
            localStorage.setItem('username', userFromService[0].username);
            this.router.navigateByUrl("/default");
          } 
          else {
            this.messageToDisplay = "Password is incorrect"
          }          
        } 
        else {
         this.messageToDisplay = "User Does Not Exist";
        }
      },
      error=>{
        this.messageToDisplay=error;
        console.log(error);
      });
    }
  }
  

}
