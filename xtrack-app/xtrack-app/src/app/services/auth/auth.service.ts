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
    private storage: NativeStorage,

  ) { }

  async signUp(user: IUser): Promise<object> {
    
    let response: object;
    this.http.setDataSerializer('json');
    await this.http.post(this.serviceRoute + 'v1/auth/signup', user, {})
    .then(res => {
      
      // console.log("INSIDE service:",res);
      // console.log(JSON.parse(res.data));
      response = JSON.parse(res.data);
     

    })
    .catch(err => {
      // console.log("INSIDE service: ERR", err);
      response = JSON.parse(err.error);
      // console.log("ERR PARSED", response);
    });

    return response;
   
  }

  async logIn(user: IUserLogin): Promise<object> {

    let response: object;
    this.http.setDataSerializer('json');

    await this.http.post(this.serviceRoute + 'v1/auth/signin', user, {})
    .then(res => {
      // console.log(res);
      // console.log(JSON.parse(res.data));
      response = JSON.parse(res.data);
    })
    .catch(err => {
      //console.log(err);
      response = JSON.parse(err.error);
    });

    return response;
  }

  async logOut(): Promise<boolean> {
    let status: boolean;
    await this.storage.remove('key').then(
      val => { status = true },
      err => { status = false }
      
    )

    await this.storage.remove('user').then(
      val => { 
        console.log(val, 'user removed from nativestorage');

      },
      err => {}
    ) 

    return status;
  
  }

  async isLoggedIn(): Promise<boolean> {
   // console.log(localStorage.getItem('key')); 

   let status: boolean;
   await this.storage.getItem('key').then(value => { 
      const expiry = (JSON.parse(atob(value.split('.')[1]))).exp;
      // console.log("EXPIRY",expiry);
      status = !((Math.floor((new Date).getTime() / 1000)) >= expiry);

      // status = value ? true : false;
   });


   return status;
   
  }
}
