import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {Validators, FormBuilder, FormGroup, FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  private loginform : FormGroup;
  formGroup: any;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder 
  ) {

    this.loginform = this.formBuilder.group({
      usernameOrEmail: ['', [Validators.required, Validators.min(4), Validators.max(30)]],
      password: ['', [Validators.required, Validators.min(6), Validators.max(20)]],
    });

   }

  ngOnInit() {
  }

  routeFunction(path: string): void {
    this.router.navigate([path]);
  }

  matcher = new MyErrorStateMatcher();

  get usernameOrEmailValue() {
    return this.loginform.get('usernameOrEmail');
  }

  get passwordValue() {
    return this.loginform.get('password');
  }


  loginSubmit(): void {
    console.log(this.loginform.value)
  }
}
