import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class FormSetupService {

  BASE_URL = 'http://localhost:3000';

  public documents$: BehaviorSubject<Document[]> = new BehaviorSubject([]);

  constructor(private http:HttpClient) { }

  fetchDocuments(category:string) {

    this.http.get<Document[]>(`${this.BASE_URL}/${category}Docs`).subscribe(data => { 
      this.documents$.next(data);
    });
  }

}
