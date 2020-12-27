import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {FormBuilder, FormGroup, FormControl, AbstractControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';


import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { IUser } from '../model/IUser';
import { AuthService } from '../services/auth/auth.service';



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

  user: IUser = {
    name: '',
    email: '',
    username: '',
    password: ''
  };

  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  status: string = 'status';
  errors: string = 'errors';
  error: string = 'error';
  success: string = 'success';
  message: string = 'message';
  registerloading: boolean = false;
  
  pageloading: boolean = true;

  
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private _snackBar: MatSnackBar,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      name: ['',  [Validators.required, Validators.minLength(5), Validators.maxLength(40)]],
      email: ['', [Validators.required, Validators.email]],
      username: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(30)]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]],
      
  });
  }

  ionViewDidEnter() {
    this.pageloading = false;
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

  
  onSubmit() {
    // TODO: Use EventEmitter with form value
    // console.log(this.formGroup.value.email);
    this.user.email = this.registerForm.value.email;
    this.user.name = this.registerForm.value.name;
    this.user.username = this.registerForm.value.username;
    this.user.password = this.registerForm.value.password;

    this.registerloading = true;

    console.log(this.user);
    this.authService.signUp(this.user)
    .then(res => {

      // console.log(res);
      // success
      if(res[this.success]){
        
        this.registerloading = false;
        this.openSnackBar('Sign Up successful!');
        this.router.navigate(['/login']);
       
      } else  {

        this.registerloading = false;
        if(res[this.message] !== undefined)
          this.openSnackBar(res[this.message]);
        else
          this.openSnackBar('An error occurred. Try again!');
          
      }
    })
    .catch(
      err => {
        console.log(err);
        if(!err[this.success]){

          this.registerloading = false;
          console.log("ERROR message", err[this.message]);
          this.openSnackBar(err[this.message]);

        }else{

          this.registerloading = false;
          this.openSnackBar('An error occurred. Try again!');
          
        }
      }
    )
   
  }



  openSnackBar(msg: string) {
    this._snackBar.open(msg, 'Close', {
      duration: 3000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }





  routeFunction(path: string): void {
    this.router.navigate([path]);
  }

}
