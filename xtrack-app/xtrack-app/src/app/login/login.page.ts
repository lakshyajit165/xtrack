import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  private loginform : FormGroup;

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

  loginSubmit(): void {
    console.log(this.loginform.value)
  }
}
