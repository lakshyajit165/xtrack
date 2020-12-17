import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PreviousrouteService {

  private previousUrl: string;
  private currentUrl: string;

  constructor(private _router: Router) { 
    this.currentUrl = this._router.url;
    _router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.previousUrl = this.currentUrl;
        this.currentUrl = event.url;
        console.log("inside service", this.previousUrl, this.currentUrl);
      }
    });
  }

  public getPreviousUrl() {
    return this.previousUrl;
  }
}
