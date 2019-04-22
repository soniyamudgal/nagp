import { Component, OnInit } from '@angular/core';
import { User } from 'src/model/user';
import { Router } from '@angular/router';
import { AuthService } from 'src/services/auth.service';
import { StudentsCRUDService } from 'src/services/students-crud.service';
import { FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-registraton',
  templateUrl: './registraton.component.html',
  styleUrls: ['./registraton.component.css']
})
export class RegistratonComponent implements OnInit {

  getUserFromService: User;
  messageToDisplay: string;
  registerError: boolean = false;
  
  constructor(
    private studentService: StudentsCRUDService,
    private authService: AuthService,
    private router:Router
  ) { }

  ngOnInit() {
    //removes page header
    this.studentService.changeSelectedTopNav(false);

    //fetch users
    this.authService.getAllUsers();
  }

  //initializes registration form
  registerForm: FormGroup = new FormGroup({
    email: new FormControl('',[Validators.required,Validators.email,Validators.minLength(8),Validators.maxLength(25)]),
    username: new FormControl('',[Validators.required,Validators.minLength(4),Validators.maxLength(15)]),
    password: new FormControl('',[Validators.required,Validators.minLength(8),Validators.maxLength(15)])
  });

  //getters of form fields
  get email() { return this.registerForm.get('email'); }
  get username() { return this.registerForm.get('username'); }
  get password() { return this.registerForm.get('password'); }

  //registering new user
  submit() {
    if (this.registerForm.valid) {
      this.messageToDisplay ='';
      this.registerError = false;
      
      //creates new user
      this.authService.createUser(this.registerForm.value),error=> { 
        this.messageToDisplay = error;
        this.registerError = true;
      }
      
      if(this.registerError){
        this.router.navigateByUrl('/register');
      }

      //after successful user creation takes user to login page
      else{
        alert("You have successfully registered.");
        this.router.navigateByUrl('/login');
      }
    }
  }

}
