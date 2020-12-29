import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router,  RouterStateSnapshot,
    CanActivateChild } from '@angular/router';
import { loginStatus } from 'src/app/providers/loginStatus.provider';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {
  constructor(
      private authService: AuthService, 
      private router: Router,
      private loginstatus: loginStatus
  ) {}

  canActivate( 
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
    ): boolean {

    if (!this.loginstatus.status) {
      this.router.navigate(['login']);
      return false;
    }
    
    return true;
  }

  canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    return this.canActivate(route, state);
  }
 
}

