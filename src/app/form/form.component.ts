import { Component, OnInit, } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

interface Role 
{
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})


export class FormComponent implements OnInit {
  sampleForm!: FormGroup;
  genderList = ["Male", "Female", "Other"];
  isLoading = false;

  roles: Role[] = [
    { value: 'Developer', viewValue: 'Developer' },
    { value: 'Tester', viewValue: 'Tester' },
    { value: 'Manager', viewValue: 'Manager' },
    { value: 'Teamleader', viewValue: 'TeamLeader' }
  ];




  skills = this.formBuilder.group({
    Java: false,
    nodejs: false,
    react: false,
    angular: false,
    android: false
  }, { validators: this.checkSkills });
  
  checkSkills(group: FormGroup) {
    const values = Object.values(group.value);
    const isChecked = values.some(val => val === true);
    return isChecked ? null : { skillRequired: true };
  }
  


  constructor(private formBuilder: FormBuilder, private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.sampleForm = this.formBuilder.group({
      
      FirstName: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z]+$'), this.numericValidator]),
      LastName: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z]+$'), this.numericValidator]),

      date: ['', Validators.required],
      Gender: ['', Validators.required],
      skills: this.skills,
      Role: ['', Validators.required],
      AboutEmployee: ['', [Validators.required, Validators.maxLength(30)]],// Added form control for the textarea
     
        
    });
}

  


  numericValidator(control: FormControl): { [key: string]: boolean } | null 
  {
    const isNumeric = /^[0-9]+$/.test(control.value);
    return isNumeric ? { 'numeric': true } : null;
  }
  hasError(controlName: string, errorName: string) {
    return this.sampleForm.controls[controlName].hasError(errorName) 
  }



  onSubmit() {
    console.log(this.sampleForm.value);

    // this.isLoading = true;


    // form submission logic
    setTimeout(() => {
      // this.isLoading = false;

      this.sampleForm.reset();

      this.snackBar.open('Form submitted successfully!', 'Close', {
        duration: 2000, // duration for the message to display (in milliseconds)
      });
    }, 1000);
  }
}






