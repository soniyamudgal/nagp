import { Component, OnInit, OnChanges, AfterViewChecked, OnDestroy } from '@angular/core';
import { StudentsCRUDService } from 'src/services/students-crud.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy{
  
  title = 'Students Onboarding App';
  
  topNavSubscription: Subscription;  

  showTopNav: boolean = false;

  constructor(private studentService: StudentsCRUDService){ }

  ngOnInit(){
    //subscribe for page header
    this.topNavSubscription = this.studentService.selectedTopNav$.subscribe(
      selectedValue => this.showTopNav = selectedValue
    );
  }

  ngOnDestroy(){
    //unsubscribe header
    this.topNavSubscription.unsubscribe();
  }
}
