import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AbstractControl } from '@angular/forms';

interface Role {
  value: string;
}
interface Skill {
  value: string;
}

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent implements OnInit {
  sampleForm!: FormGroup;
  isLoading = false;

  roles: Role[] = [
    { value: 'Developer' },
    { value: 'Tester' },
    { value: 'Manager' },
    { value: 'Teamleader' },
  ];

  skills: Skill[] = [
    { value: 'Java' },
    { value: 'NodeJs' },
    { value: 'React' },
    { value: 'Angular' },
    { value: 'Android' },
  ];

  checkSkills(control: AbstractControl): { skillRequired: boolean } | null {
    const values = Object.values(control.value);
    const isChecked = values.some((val) => val === true);
    return isChecked ? null : { skillRequired: true };
  }

  constructor(
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.sampleForm = this.formBuilder.group({
      FirstName: new FormControl('', [
        Validators.required,
        Validators.pattern('^[a-zA-Z]+$'),
        this.numericValidator,
      ]),
      LastName: new FormControl('', [
        Validators.required,
        Validators.pattern('^[a-zA-Z]+$'),
        this.numericValidator,
      ]),

      date: ['', Validators.required],
      Gender: ['', Validators.required],
      Skills: this.formBuilder.array(
        this.skills.map((skill) => this.formBuilder.control(false))
      ),

      Role: ['', Validators.required],
      AboutEmployee: ['', [Validators.required, Validators.maxLength(30)]], // Added form control for the textarea
    });
  }

  numericValidator(control: FormControl): { [key: string]: boolean } | null {
    const isNumeric = /^[0-9]+$/.test(control.value);
    return isNumeric ? { numeric: true } : null;
  }
  hasError(controlName: string, errorName: string) {
    return this.sampleForm.controls[controlName].hasError(errorName);
  }

  onSubmit() {
    if (this.sampleForm.valid) {
      console.log(this.sampleForm.value);

      this.isLoading = true;

      // form submission logic
      setTimeout(() => {
        this.isLoading = false;

        this.sampleForm.reset();

        this.snackBar.open('Form submitted successfully!', 'Close', {
          duration: 2000,
        });
      }, 1000);
    } else {
      // Handle invalid form state
      console.log('Form is invalid');
    }
  }
}
