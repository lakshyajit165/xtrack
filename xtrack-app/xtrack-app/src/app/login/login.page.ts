import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {Validators, FormBuilder, FormGroup, FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { AuthService } from '../services/auth/auth.service';
import { IUserLogin } from '../model/IUserLogin';
import { NativeStorage } from '@ionic-native/native-storage/ngx';

import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { loginStatus } from '../providers/loginStatus.provider';


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
  user: IUserLogin = {
    usernameOrEmail: '',
    password: ''
  };

  pageloading: boolean = true;

  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  accessToken: string = 'accessToken';
  loginloading: boolean = false;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private _snackBar: MatSnackBar,
    private storage: NativeStorage,
    private loginstatus: loginStatus

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

  ionViewDidEnter() {
    this.pageloading = false;
  }



  loginSubmit(): void {
    console.log(this.loginform.value);

    this.user.usernameOrEmail = this.loginform.value.usernameOrEmail;
    this.user.password = this.loginform.value.password;
    this.loginloading = true;

    this.authService.logIn(this.user)
    .then(res => {
      console.log(res);
      // store the token in localstorage
      // console.log(res);
      

      if(res[this.accessToken]){
          // navigate to home
          this.storage.setItem('key', res[this.accessToken])
          .then(
            () => {},
            error => {}
          );

          // reset the form here
          this.loginform.reset();
          this.loginform.markAsPristine();
          this.loginform.markAsUntouched();

          this.loginstatus.status = true;
          this.loginloading = false;
          this.router.navigate(['/xtrack/menu/home']);
          this.openSnackBar('Login successful!');
      }else {
        this.loginloading = false;
        this.openSnackBar('Bad credentials!');
      }
     
     
    

    })
    .catch(err => {
      this.loginloading = false;
    })

  }

  openSnackBar(msg: string) {
    this._snackBar.open(msg, 'Close', {
      duration: 3000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      panelClass: 'snackbar'
    });
  }

}
