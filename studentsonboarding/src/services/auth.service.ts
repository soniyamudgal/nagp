import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from 'src/model/user';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  //API call details
  BASE_URL = 'http://localhost:3000';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  //behavior subject to maintain user data
  users$: BehaviorSubject<User[]>=new BehaviorSubject([]);

  constructor(public http:HttpClient) { }

  //get all available users
  getAllUsers(){ 
    this.http.get<User[]>(`${this.BASE_URL}/users`).subscribe(data => { 
      this.users$.next(data);
    });
  }

  //get user details for the specified user name
  getUserDetails(userName:string){
    return this.http.get(`${this.BASE_URL}/users?username=${userName}`);
  }

  //get logged in user name
  getCurrentUser(){
    return localStorage.getItem('username');
  }

  //clear storage and logs the user out
  removeUser(){
    localStorage.clear();
  }

  //create new user
  createUser(user:User){
    const currentUsers = this.users$.getValue();
    //set user id
    let maxId:number = Math.max.apply(Math, currentUsers.map(function(s) { return s.id; }))
    user.id = (maxId > 0) ? (maxId + 1) : 1;
    const updatedData = [...currentUsers, user];
    this.users$.next(updatedData);

    this.http.post(`${this.BASE_URL}/users`,JSON.stringify(user),this.httpOptions).subscribe();
  }

}
