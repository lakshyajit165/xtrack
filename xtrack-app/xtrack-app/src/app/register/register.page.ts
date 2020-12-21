import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {FormBuilder, FormGroup, FormControl, AbstractControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';



export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}


@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  registerForm: FormGroup;

  matcher = new MyErrorStateMatcher();
  
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      name: ['',  [Validators.required, Validators.minLength(5), Validators.maxLength(40)]],
      email: ['', [Validators.required, Validators.email]],
      username: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(30)]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]],
      
  });
  }

  get nameValue() {
    return this.registerForm.get('name');
  }

  get emailValue() {
    return this.registerForm.get('email');
  }

  get userNameValue() {
    return this.registerForm.get('username');
  }

  get passwordValue() {
    return this.registerForm.get('password');
  }

  resetForm() {
    this.registerForm.markAsPristine();
    this.registerForm.markAsUntouched();
  }



  routeFunction(path: string): void {
    this.router.navigate([path]);
  }

}
