import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router,  RouterStateSnapshot,
    CanActivateChild } from '@angular/router';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { loginStatus } from 'src/app/providers/loginStatus.provider';
import { AuthService } from './auth.service';


@Injectable()
export class AuthRouteGuard implements CanActivate {

 
  constructor(
      private authService: AuthService, 
      private router: Router,
      private loginstatus: loginStatus,
      private storage: NativeStorage
  ) {

    
   
  }

  canActivate( route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    console.log("Inside authroute guard:" ,this.loginstatus.status);

    
    if (this.loginstatus.status) {
      this.router.navigate(['/xtrack/menu/home']);
      return false;
    }
    
    return true;
  }

 
}
