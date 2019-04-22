import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, FormArray, Validators, ValidatorFn } from '@angular/forms';
import { StudentsCRUDService } from 'src/services/students-crud.service';
import { ActivatedRoute } from '@angular/router';
import { FormType } from '../../enums/enums'
import { FormSetupService } from 'src/services/form-setup.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-onboard-form',
  templateUrl: './onboard-form.component.html',
  styleUrls: ['./onboard-form.component.css']
})

export class OnboardFormComponent implements OnInit {
  public form: FormGroup;
  public formTitle: string;
  public btnOnboard: string;
  public currentStudentId:number;
  documents = [];
  selectedDocs = [];
  controlArr = [];

  //getters of form fields
  get lastClassScore() { return this.form.get('lastClassScore'); }

  constructor(private fb: FormBuilder, private route: ActivatedRoute, private studentService: StudentsCRUDService, private formSetupService: FormSetupService) {
    
    this.form = this.fb.group({
      studentName: ['', Validators.required],
      category: ['', Validators.required],
      documents: this.fb.array([this.fb.control(''),
                                this.fb.control(''),
                                this.fb.control(''),
                                this.fb.control(''),
                                this.fb.control(''),
                                this.fb.control('')]
                              ),
      dob: ['', Validators.required],
      fatherName: ['', Validators.required],
      motherName: ['', Validators.required],
      lastClassScore: ['', Validators.required]
    }); 
    //populate documents data
    this.setDocumentList('indian');

    //set default form values
    this.route.params.subscribe(param=>{
      this.form.reset();
      this.formTitle = 'Onboarding Form'
      this.btnOnboard = 'Onboard';
    });
    
  }

  ngOnInit() {
    // show page header
    this.studentService.changeSelectedTopNav(true);
    
    this.route.params.subscribe(param=>{
      if(param.action){
         //populate form with student details
         if(param.action.toLowerCase() == FormType.Edit.toLowerCase() || param.action.toLowerCase() == FormType.View.toLowerCase()){
          this.currentStudentId = param.id;
          this.studentService.getItemById(this.currentStudentId).subscribe(
              student => {
                this.form.setValue({ studentName: student.studentName,
                    category: student.category,
                    documents: [this.fb.control(''),
                                this.fb.control(''),
                                this.fb.control(''),
                                this.fb.control(''),
                                this.fb.control(''),
                                this.fb.control('')
                              ],
                    dob: student.dob,
                    fatherName: student.fatherName,
                    motherName: student.motherName,
                    lastClassScore: student.lastClassScore
                  });
                  this.setDocuments(student.documents,param.action.toLowerCase());
                }
          )
          //if form is open in view mode
          if(param.action.toLowerCase() == FormType.View.toLowerCase()){
            this.formTitle ='Onboarding Form (View)';
            this.form.disable();
          }
          //if form is open in edit mode
          else if(param.action.toLowerCase() == FormType.Edit.toLowerCase()){
            this.formTitle ='Onboarding Form (Edit)';
            this.btnOnboard = 'Update';
            this.form.controls['studentName'].disable();
          }
        }
      }
    });
  }

  onSubmit() {
    if(this.btnOnboard.toLowerCase() == 'update'){
      this.studentService.editStudent(this.form.value,this.currentStudentId);
    }
    else{
      this.form.value.documents = this.getSelectedDoc();
      this.studentService.addNewStudent(this.form.value);
    }
    this.form.reset();
  }


  getSelectedDoc(){
      this.selectedDocs = [];
      this.form.controls['documents'].controls.forEach((control, i) => {
        let eachDoc;
        if(control.value){
          eachDoc = {
                      "name": this.documents[i].name,
                      "selected": control.value
                    };
          this.selectedDocs.push(eachDoc);
        }
        else{
          eachDoc = {
                      "name": this.documents[i].name,
                      "selected": false
                    };
            this.selectedDocs.push(eachDoc);
        }
      });
      return this.selectedDocs;
  }


  minSelectedCheckboxes(min = 1) {
    const validator: ValidatorFn = (formArray: FormArray) => {
      const totalSelected = formArray.controls
        // get a list of checkbox values (boolean)
        .map(control => control.value)
        // total up the number of checked checkboxes
        .reduce((prev, next) => next ? prev + next : prev, 0);
  
      // if the total is not greater than the minimum, return the error message
      return totalSelected >= min ? null : { required: true };
    };
  
    return validator;
  }

  //populate document list 
  setDocumentList(category){
    this.formSetupService.fetchDocuments(category);
    this.formSetupService.documents$.subscribe(reqDocs=>{
      this.form.controls.documents = new FormArray([]);
      this.documents = reqDocs;
      this.documents.map((document, i) => {
        let control = new FormControl() ; 
        if(document.required == true){
        control.setValidators(Validators.required);
        }
        (this.form.controls.documents as FormArray).push(control);
      });
    });
  }

  // mark fetched documents as checked
  setDocuments(studentDocs,formType){
    this.form.controls.documents = this.fb.array([]);
    this.documents = studentDocs;
    this.documents.map(document => {
      let control = document.selected == true ? new FormControl(document.selected) : new FormControl();
      (this.form.controls.documents as FormArray).push(control);
    });
    // if form is open in view mode
    if(formType == FormType.View.toLowerCase()){
      this.formTitle ='Onboarding Form (View)';
      this.form.disable();
    }
    //if form is open in edit mode
    else if(formType == FormType.Edit.toLowerCase()){
      this.formTitle ='Onboarding Form (Edit)';
      this.btnOnboard = 'Update';
      this.form.controls['studentName'].disable();
    }
  }
}