import { Injectable, Output, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {map, tap} from 'rxjs/operators';
import {Observable,of, from, BehaviorSubject, Subject } from 'rxjs';
import { Student } from '../model/student';

@Injectable({
  providedIn: 'root'
})
export class StudentsCRUDService {

  //APT call details
  url = 'http://localhost:3000/students';
  
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };

  //display or hide page header
  private showTopNav:Subject<boolean>= new Subject();
  selectedTopNav$ = this.showTopNav.asObservable();

  changeSelectedTopNav(status: boolean): void{
    this.showTopNav.next(status);
  }

  //to maintain students details
  students$: BehaviorSubject<Student[]> = new BehaviorSubject([]);
  
  constructor(private http:HttpClient) { }

  //retreive all students data
  fetchStudents() {
    this.http.get<Student[]>(this.url).subscribe(data => { 
      this.students$.next(data);
    });
  }

  //add a new student
  addNewStudent(student: Student) {
    const currentData = this.students$.getValue();
    let maxId = Math.max.apply(Math, currentData.map(function(s) { return s.id; }))
    student.id = maxId + 1;
    const updatedData = [...currentData, student];
    this.students$.next(updatedData);

    this.http.post(this.url,JSON.stringify(student),this.httpOptions).subscribe();
  }

  //update existing student details
  editStudent(student: Student,id:number) {
    this.http.get<Student[]>(this.url).subscribe(data => { 
      const currentData = data;
      let currIdx:number = currentData.indexOf(currentData.find(s=>s.id==id));
      student.id=id;
      student.studentName = currentData[currIdx].studentName;
      currentData[currIdx] = student;
      const updatedData = currentData;
      this.students$.next(updatedData);
      
      this.http.put(`${this.url}/${id}`, student, this.httpOptions).subscribe();
    });
  }

  //delete student record
  removeStudent(id:number){

    let idx = this.students$.getValue().indexOf(this.students$.getValue().find(s=>s.id==id));
    const currentData = this.students$.getValue();
    currentData.splice(idx,1);
    this.students$.next(currentData);
    
    this.http.delete(`${this.url}/${id}`, this.httpOptions).subscribe();
  }

  //get details of a particular student by id
  getItemById(id): Observable<Student> {
    return this.http.get<Student>(`${this.url}/${id}`);
  }

}