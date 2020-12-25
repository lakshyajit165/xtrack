import { Injectable } from '@angular/core';
import { HTTP } from '@ionic-native/http/ngx';
import { Observable } from 'rxjs';
import { IUser } from '../../model/IUser';
import { IUserLogin } from '../../model/IUserLogin';
import { api } from 'src/app/providers/api.provider';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { HttpResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  serviceRoute = this.api.serviceRoute;
  constructor(
    private http: HTTP,
    private api: api,
    private storage: NativeStorage
  ) { }

  signUp(user: IUser): Promise<object> {
    
    return this.http.post(this.serviceRoute + 'v1/auth/signup', user, {})
   
  }

  logIn(user: IUserLogin): Promise<object> {
    return this.http.post(this.serviceRoute + 'v1/auth/signin', user, {});
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
