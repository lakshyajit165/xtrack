import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IUser } from '../../model/IUser';
import { IUserLogin } from '../../model/IUserLogin';
import { api } from 'src/app/providers/api.provider';
import { NativeStorage } from '@ionic-native/native-storage/ngx';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  serviceRoute = this.api.serviceRoute;
  constructor(
    private http: HttpClient,
    private api: api,
    private storage: NativeStorage
  ) { }

  signUp(user: IUser): Observable<object> {
    return this.http.post(this.serviceRoute + 'v1/auth/signup', user);
  }

  logIn(user: IUserLogin): Observable<object> {
    return this.http.post(this.serviceRoute + 'v1/auth/signin', user);
  }

  logOut() {
    this.storage.remove('key').then(
      val => {},
      err => {}
      
    )
  
  }

  async isLoggedIn(): Promise<boolean> {
   // console.log(localStorage.getItem('key')); 

   let status: boolean;
   await this.storage.getItem('key').then(value => { 
     status = value ? true : false;
   });


   return status;
   
  }
}
